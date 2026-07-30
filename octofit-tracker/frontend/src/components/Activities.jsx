import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../lib/api'

const fallbackActivities = [
  { id: 1, type: 'Workout', durationMinutes: 45, userId: 1 },
  { id: 2, type: 'Run', durationMinutes: 30, userId: 2 },
]

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadActivities = async () => {
      try {
        const data = await fetchCollection('activities', fallbackActivities)
        if (isMounted) {
          setActivities(data)
          setError('')
        }
      } catch (err) {
        if (!isMounted) {
          return
        }
        setActivities(fallbackActivities)
        setError(err.message || 'Unable to load activities right now.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Activities</h2>
            <p className="text-muted mb-0">Recent movement logging and training sessions.</p>
          </div>
          <span className="badge bg-success">{activities.length} items</span>
        </div>
        <p className="small text-muted mb-3">Using {buildApiUrl('activities')}</p>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {error ? <div className="alert alert-warning">{error}</div> : null}
            <div className="list-group">
              {activities.map((activity) => (
                <div className="list-group-item" key={activity.id ?? activity.type ?? activity.userId}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="h6 mb-1">{activity.type}</h3>
                      <p className="text-muted mb-0">User #{activity.userId ?? 'n/a'}</p>
                    </div>
                    <span className="badge bg-light text-dark">{activity.durationMinutes ?? 0} min</span>
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

export default Activities
