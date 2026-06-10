function wire(ctx) {
  for (const edge of ctx.clean) {
    const src = edge[0];
    const dst = edge[3];

    if (!ctx.adj.has(src)) ctx.adj.set(src, []);
    if (!ctx.adj.has(dst)) ctx.adj.set(dst, []);

    // Diamond rule: first parent to claim a child wins
    if (!ctx.owned.has(dst)) {
      ctx.owned.set(dst, src);
      ctx.adj.get(src).push(dst);
    }
  }
  return ctx;
}
module.exports = wire;
