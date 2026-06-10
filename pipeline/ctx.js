// pipeline/ctx.js — shared context factory
function makeCtx(rawEdges) {
  return {
    raw:         rawEdges,
    clean:       [],
    invalid:     [],
    dupes:       [],
    adj:         new Map(),
    owned:       new Map(),
    groups:      [],
    hierarchies: [],
    summary:     {}
  };
}
module.exports = { makeCtx };
