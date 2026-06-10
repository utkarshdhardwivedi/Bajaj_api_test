import { useState } from 'react'

/**
 * NodeTree — Recursive collapsible tree widget.
 * Renders a node label with its children nested underneath.
 */
export default function NodeTree({ label, children }) {
  const [open, setOpen] = useState(true)
  const entries = Object.entries(children || {})
  const hasKids = entries.length > 0

  return (
    <li className="node-item">
      <button className="node-toggle" onClick={() => setOpen(o => !o)}>
        <span className={`node-chevron ${open && hasKids ? 'open' : ''}`}>
          {hasKids ? '▸' : <span className="node-leaf">●</span>}
        </span>
        {label}
      </button>
      {open && hasKids && (
        <ul className="node-tree">
          {entries.map(([k, v]) => (
            <NodeTree key={k} label={k} children={v} />
          ))}
        </ul>
      )}
    </li>
  )
}
