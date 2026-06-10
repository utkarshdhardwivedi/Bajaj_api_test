import InputView from './views/InputView.jsx'
import ResultView from './views/ResultView.jsx'
import { useGraphQuery } from './hooks/useGraphQuery.js'

/**
 * App — Root component.
 * Wires InputView → useGraphQuery hook → ResultView.
 */
export default function App() {
  const { result, loading, error, query, reset } = useGraphQuery()

  function handleSubmit(edges) {
    reset()
    query(edges)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Graph Hierarchy Analyser</h1>
        <p>Parse directed edges, detect cycles, and compute tree depths.</p>
      </header>

      <InputView onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div className="error-banner" id="error-banner">
          <span className="error-icon">✕</span>
          <p>{error}</p>
        </div>
      )}

      {result && <ResultView data={result} />}
    </div>
  )
}
