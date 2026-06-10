// Regex: single uppercase letter -> single uppercase letter
const EDGE_RE = /^[A-Z]->[A-Z]$/;

function sanitise(ctx) {
  for (const entry of ctx.raw) {
    const t = (typeof entry === 'string' ? entry : String(entry)).trim();
    // Empty, bad format, or self-loop (t[0] === t[3])
    if (t === '' || !EDGE_RE.test(t) || t[0] === t[3]) {
      ctx.invalid.push(t || entry);
      continue;
    }
    ctx.clean.push(t);
  }
  return ctx;
}
module.exports = sanitise;
