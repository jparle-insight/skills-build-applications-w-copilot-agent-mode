import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../lib/api'

const fallbackTeams = [
  { id: 1, name: 'Momentum', members: 8, focus: 'Endurance' },
  { id: 2, name: 'Velocity', members: 6, focus: 'Strength' },
]

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadTeams = async () => {
      try {
        const data = await fetchCollection('teams', fallbackTeams)
        if (isMounted) {
          setTeams(data)
          setError('')
        }
      } catch (err) {
        if (!isMounted) {
          return
        }
        setTeams(fallbackTeams)
        setError(err.message || 'Unable to load teams right now.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
            <p className="text-muted mb-0">Group challenges and shared progress.</p>
          </div>
          <span className="badge bg-info text-dark">{teams.length} squads</span>
        </div>
        <p className="small text-muted mb-3">Using {buildApiUrl('teams')}</p>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {error ? <div className="alert alert-warning">{error}</div> : null}
            <div className="row g-3">
              {teams.map((team) => (
                <div className="col-md-6" key={team.id ?? team.name}>
                  <div className="border rounded p-3 h-100">
                    <h3 className="h6 mb-1">{team.name}</h3>
                    <p className="text-muted mb-2">{team.focus ?? 'Shared challenge'}</p>
                    <span className="badge bg-light text-dark">{team.members ?? 0} members</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Teams
