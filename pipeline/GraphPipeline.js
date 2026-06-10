const { makeCtx } = require('./ctx');
const sanitise    = require('./stages/sanitise');
const dedupe      = require('./stages/dedupe');
const wire        = require('./stages/wire');
const cluster     = require('./stages/cluster');
const analyse     = require('./stages/analyse');
const summarise   = require('./stages/summarise');

const STAGES = [sanitise, dedupe, wire, cluster, analyse, summarise];

function run(rawEdges) {
  return STAGES.reduce((ctx, stage) => stage(ctx), makeCtx(rawEdges));
}
module.exports = { run };
