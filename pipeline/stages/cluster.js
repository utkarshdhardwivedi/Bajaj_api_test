function cluster(ctx) {
  const par = {};

  function find(n) {
    if (par[n] !== n) par[n] = find(par[n]); // path compression
    return par[n];
  }

  function union(a, b) {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) par[ra] = rb;
  }

  for (const node of ctx.adj.keys()) par[node] = node;
  for (const edge of ctx.clean) union(edge[0], edge[3]);

  const buckets = new Map();
  for (const node of ctx.adj.keys()) {
    const rep = find(node);
    if (!buckets.has(rep)) buckets.set(rep, new Set());
    buckets.get(rep).add(node);
  }

  ctx.groups = [...buckets.values()];
  return ctx;
}
module.exports = cluster;
