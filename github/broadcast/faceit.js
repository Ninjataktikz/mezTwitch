// faceit.js — live FACEIT Data API fetch for mez. OBS scenes
// Get a free API key: developers.faceit.com → create app → API key (client-side).
export async function fetchFaceitLive(nickname, apiKey) {
  const headers = { Authorization: 'Bearer ' + apiKey };
  const pr = await fetch(
    'https://open.faceit.com/data/v4/players?nickname=' + encodeURIComponent(nickname),
    { headers }
  );
  if (!pr.ok) throw new Error('faceit player lookup failed: ' + pr.status);
  const player = await pr.json();
  const pid = player.player_id;
  const gameId = player.games && player.games.cs2 ? 'cs2' : 'csgo';
  const game = player.games && player.games[gameId];
  const out = {
    elo: game && game.faceit_elo != null ? String(game.faceit_elo) : undefined,
    kd: undefined, hs: undefined, todayW: undefined, todayL: undefined, last: undefined,
  };
  // lifetime averages
  try {
    const sr = await fetch('https://open.faceit.com/data/v4/players/' + pid + '/stats/' + gameId, { headers });
    if (sr.ok) {
      const life = (await sr.json()).lifetime || {};
      out.kd = life['Average K/D Ratio'];
      out.hs = life['Average Headshots %'];
    }
  } catch (e) {}
  // today's W–L
  try {
    const day = new Date(); day.setHours(0, 0, 0, 0);
    const hr = await fetch('https://open.faceit.com/data/v4/players/' + pid + '/history?game=' + gameId + '&from=' + Math.floor(day.getTime() / 1000) + '&offset=0&limit=20', { headers });
    if (hr.ok) {
      const items = (await hr.json()).items || [];
      let w = 0, l = 0;
      items.forEach((it) => {
        const f1 = it.teams && it.teams.faction1 && (it.teams.faction1.players || []).some((p) => p.player_id === pid);
        const mine = f1 ? 'faction1' : 'faction2';
        if (it.results && it.results.winner) (it.results.winner === mine ? w++ : l++);
      });
      out.todayW = w; out.todayL = l;
    }
  } catch (e) {}
  // last finished map
  try {
    const hr = await fetch('https://open.faceit.com/data/v4/players/' + pid + '/history?game=' + gameId + '&offset=0&limit=1', { headers });
    if (hr.ok) {
      const item = ((await hr.json()).items || [])[0];
      if (item) {
        const mr = await fetch('https://open.faceit.com/data/v4/matches/' + item.match_id + '/stats', { headers });
        if (mr.ok) {
          const round = ((await mr.json()).rounds || [])[0];
          if (round && round.round_stats) {
            const rs = round.round_stats;
            const myTeam = (round.teams || []).find((t) => (t.players || []).some((p) => p.player_id === pid));
            out.last = {
              map: String(rs.Map || '').replace(/^de_/, ''),
              score: String(rs.Score || '').replace(/\s+/g, ''),
              win: !!(myTeam && rs.Winner === myTeam.team_id),
            };
          }
        }
      }
    }
  } catch (e) {}
  console.log('[faceit] live stats loaded:', JSON.stringify(out));
  return out;
}

// legacy name kept for compatibility
export const fetchFaceitStats = fetchFaceitLive;

function snapshotDelta(key, id, elo) {
  if (elo == null) return null;
  const n = parseInt(elo, 10);
  if (isNaN(n)) return null;
  let snap = null;
  try { snap = JSON.parse(localStorage.getItem(key)); } catch (e) {}
  if (!snap || snap.id !== id) {
    snap = { id: id, e: n };
    try { localStorage.setItem(key, JSON.stringify(snap)); } catch (e) {}
  }
  return n - snap.e;
}

// elo gained/lost since first load today (stream session)
export function sessionDelta(elo) {
  return snapshotDelta('mez_session_elo', new Date().toISOString().slice(0, 10), elo);
}

function isoWeek(dt) {
  const d = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
  const dayNum = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = d.getTime();
  d.setUTCMonth(0, 1);
  if (d.getUTCDay() !== 4) d.setUTCMonth(0, 1 + ((4 - d.getUTCDay()) + 7) % 7);
  return { week: 1 + Math.round((firstThursday - d.getTime()) / 604800000), year: new Date(firstThursday).getUTCFullYear() };
}

// elo gained/lost since first load this ISO week (for the ledger post)
export function weekDelta(elo) {
  const w = isoWeek(new Date());
  return snapshotDelta('mez_week_elo', w.year + '-W' + w.week, elo);
}

export function isoWeekLabel() {
  const w = isoWeek(new Date());
  return 'week ' + w.week + ' — ' + w.year;
}
