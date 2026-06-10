import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || ''

export function useGraphQuery() {
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function query(edgeList) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/api/graph`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ edges: edgeList })
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || `HTTP ${res.status}`)
      }
      setResult(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setResult(null)
    setError(null)
  }

  return { result, loading, error, query, reset }
}
