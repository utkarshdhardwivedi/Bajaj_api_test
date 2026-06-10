const { run } = require('../pipeline/GraphPipeline');

const IDENTITY = {
  user_id:           'YOUR_NAME_DDMMYYYY',       // ← CHANGE THIS
  email_id:          'YOUR_EMAIL@university.edu', // ← CHANGE THIS
  enrollment_number: 'YOUR_ENROLLMENT'            // ← CHANGE THIS
};

function graphHandler(req, res) {
  try {
    if (!Array.isArray(req.body?.edges)) {
      return res.status(400).json({ error: 'edges must be an array' });
    }
    const ctx = run(req.body.edges);
    return res.json({
      ...IDENTITY,
      hierarchies:     ctx.hierarchies,
      invalid_entries: ctx.invalid,
      duplicate_edges: ctx.dupes,
      summary:         ctx.summary
    });
  } catch (err) {
    console.error('Error processing request:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
module.exports = { graphHandler };
