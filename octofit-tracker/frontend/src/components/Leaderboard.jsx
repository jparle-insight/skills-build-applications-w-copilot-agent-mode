import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../lib/api'

const fallbackLeaderboard = [
  { id: 1, name: 'Ada', score: 980 },
  { id: 2, name: 'Grace', score: 945 },
]

function Leaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadLeaderboard = async () => {
      try {
        const data = await fetchCollection('leaderboard', fallbackLeaderboard)
        if (isMounted) {
          setScores(data)
          setError('')
        }
      } catch (err) {
        if (!isMounted) {
          return
        }
        setScores(fallbackLeaderboard)
        setError(err.message || 'Unable to load leaderboard right now.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">The competitors sitting at the top of the board.</p>
          </div>
          <span className="badge bg-warning text-dark">{scores.length} ranks</span>
        </div>
        <p className="small text-muted mb-3">Using {buildApiUrl('leaderboard')}</p>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {error ? <div className="alert alert-warning">{error}</div> : null}
            <div className="list-group">
              {scores.map((entry, index) => (
                <div className="list-group-item d-flex justify-content-between align-items-center" key={entry.id ?? entry.name ?? index}>
                  <div>
                    <h3 className="h6 mb-1">#{index + 1} {entry.name}</h3>
                    <p className="text-muted mb-0">{entry.team ?? 'Independent'}</p>
                  </div>
                  <span className="badge bg-dark">{entry.score ?? 0}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Leaderboard
