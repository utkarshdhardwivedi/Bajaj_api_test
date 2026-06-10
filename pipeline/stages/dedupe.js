function dedupe(ctx) {
  const seen = new Set();
  const dupeSeen = new Set();
  const filtered = [];

  for (const edge of ctx.clean) {
    if (seen.has(edge)) {
      if (!dupeSeen.has(edge)) {
        ctx.dupes.push(edge);
        dupeSeen.add(edge);
      }
    } else {
      seen.add(edge);
      filtered.push(edge);
    }
  }
  ctx.clean = filtered;
  return ctx;
}
module.exports = dedupe;
