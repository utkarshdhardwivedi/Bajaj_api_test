import { useState } from 'react'
import NodeTree from '../widgets/NodeTree.jsx'
import TagList from '../widgets/TagList.jsx'

/**
 * ResultView — Renders the full API response:
 * summary stats, hierarchy cards, invalid/dupe tags, and raw JSON viewer.
 */
export default function ResultView({ data }) {
  const [showJson, setShowJson] = useState(false)
  const [copied, setCopied]     = useState(false)

  const { summary, hierarchies, invalid_entries, duplicate_edges } = data

  function copyJson() {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="results-section" id="results-section">
      {/* ── Summary Stats ── */}
      <p className="section-label">Summary</p>
      <div className="summary-bar" id="summary-bar">
        <div className="stat-card">
          <div className="stat-value trees">{summary.total_trees}</div>
          <div className="stat-label">Trees</div>
        </div>
        <div className="stat-card">
          <div className="stat-value cycles">{summary.total_cycles}</div>
          <div className="stat-label">Cycles</div>
        </div>
        <div className="stat-card">
          <div className="stat-value root">{summary.largest_tree_root || '—'}</div>
          <div className="stat-label">Largest tree root</div>
        </div>
      </div>

      {/* ── Hierarchy Cards ── */}
      {hierarchies.length > 0 && (
        <>
          <p className="section-label">Hierarchies</p>
          <div className="hierarchy-grid" id="hierarchy-grid">
            {hierarchies.map((h, i) => (
              <div className="hierarchy-card" key={i} id={`hierarchy-${i}`}>
                <div className="hierarchy-header">
                  <span className="hierarchy-root">Root: {h.root}</span>
                  {h.has_cycle ? (
                    <span className="badge badge-cycle">Cycle</span>
                  ) : (
                    <>
                      <span className="badge badge-tree">Tree</span>
                      <span className="badge badge-depth">Depth {h.depth}</span>
                    </>
                  )}
                </div>
                {h.has_cycle ? (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Cyclic group — no tree structure available.
                  </p>
                ) : (
                  <ul className="node-tree">
                    {Object.entries(h.tree).map(([k, v]) => (
                      <NodeTree key={k} label={k} children={v} />
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Invalid / Duplicate Tags ── */}
      {invalid_entries.length > 0 && (
        <TagList
          id="invalid-entries"
          label="Invalid entries"
          items={invalid_entries}
          variant="invalid"
        />
      )}
      {duplicate_edges.length > 0 && (
        <TagList
          id="duplicate-edges"
          label="Duplicate edges"
          items={duplicate_edges}
          variant="dupe"
        />
      )}

      {/* ── Raw JSON ── */}
      <div className="json-section" id="json-section">
        <button className="json-toggle" onClick={() => setShowJson(s => !s)}>
          {showJson ? '▾' : '▸'} Raw JSON
        </button>
        {showJson && (
          <div className="json-block">
            <button className="copy-btn" onClick={copyJson}>
              {copied ? 'Copied' : 'Copy'}
            </button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
