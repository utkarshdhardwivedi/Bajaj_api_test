/**
 * TagList — Renders a labelled row of pill-shaped tags.
 * Used for invalid_entries and duplicate_edges.
 */
export default function TagList({ id, label, items, variant }) {
  return (
    <div className="tag-section" id={id}>
      <p className="section-label">{label}</p>
      <div className="tag-row">
        {items.map((item, i) => (
          <span key={i} className={`tag tag-${variant}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
