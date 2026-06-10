function summarise(ctx) {
  const trees  = ctx.hierarchies.filter(h => !h.has_cycle);
  const cycles = ctx.hierarchies.filter(h => h.has_cycle);

  const largest = trees.reduce((best, h) => {
    if (h.depth > best.depth) return h;
    if (h.depth === best.depth && h.root < best.root) return h;
    return best;
  }, { depth: -1, root: '' });

  ctx.summary = {
    total_trees:       trees.length,
    total_cycles:      cycles.length,
    largest_tree_root: largest.root
  };
  return ctx;
}
module.exports = summarise;
