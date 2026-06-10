import { useState } from 'react'

const EXAMPLE_INPUT = `A->B
A->C
B->D
D->E
C->F
B->C
X->Y
Y->Z
Z->X
hello
1->2
A->A
A->B`

/**
 * InputView — Textarea for edge input with submit and clear controls.
 * Pre-filled with the PDF example for instant evaluator testing.
 */
export default function InputView({ onSubmit, loading }) {
  const [text, setText] = useState(EXAMPLE_INPUT)

  function handleSubmit() {
    const edges = text
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(Boolean)
    onSubmit(edges)
  }

  function handleClear() {
    setText('')
  }

  return (
    <div className="input-panel" id="input-panel">
      <label htmlFor="edge-input">Edge definitions</label>
      <textarea
        id="edge-input"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter edges, one per line (e.g. A->B)"
        spellCheck={false}
      />
      <div className="input-actions">
        <button
          id="submit-btn"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
        >
          {loading && <span className="spinner" />}
          {loading ? 'Analysing…' : 'Analyse'}
        </button>
        <button
          id="clear-btn"
          className="btn btn-ghost"
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
