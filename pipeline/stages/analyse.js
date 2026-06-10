const WHITE = 0, GRAY = 1, BLACK = 2;

function analyse(ctx) {
  for (const group of ctx.groups) {
    const candidates = [...group].filter(n => !ctx.owned.has(n)).sort();
    const root = candidates.length > 0
      ? candidates[0]
      : [...group].sort()[0]; // pure cycle: lex-smallest

    // DFS 3-color cycle detection
    const color = new Map();
    for (const n of group) color.set(n, WHITE);
    let cycleFound = false;

    function dfs(node) {
      color.set(node, GRAY);
      for (const child of ctx.adj.get(node) || []) {
        if (!group.has(child)) continue;
        if (color.get(child) === GRAY) { cycleFound = true; return; }
        if (color.get(child) === WHITE) dfs(child);
        if (cycleFound) return;
      }
      color.set(node, BLACK);
    }

    for (const n of group) {
      if (color.get(n) === WHITE) dfs(n);
      if (cycleFound) break;
    }

    if (cycleFound) {
      ctx.hierarchies.push({ root, has_cycle: true, tree: {} });
    } else {
      function buildTree(node) {
        const result = {};
        for (const child of ctx.adj.get(node) || []) {
          if (!group.has(child)) continue;
          result[child] = buildTree(child);
        }
        return result;
      }

      function calcDepth(node) {
        const kids = (ctx.adj.get(node) || []).filter(c => group.has(c));
        if (kids.length === 0) return 1;
        return 1 + Math.max(...kids.map(calcDepth));
      }

      ctx.hierarchies.push({
        root,
        depth: calcDepth(root),
        tree: { [root]: buildTree(root) }
      });
    }
  }
  return ctx;
}
module.exports = analyse;
