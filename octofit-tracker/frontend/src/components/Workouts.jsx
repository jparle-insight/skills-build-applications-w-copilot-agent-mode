import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../lib/api'

const fallbackWorkouts = [
  { id: 1, title: 'Core Circuit', difficulty: 'Intermediate' },
  { id: 2, title: 'Tempo Run', difficulty: 'Advanced' },
]

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('workouts', fallbackWorkouts)
        if (isMounted) {
          setWorkouts(data)
          setError('')
        }
      } catch (err) {
        if (!isMounted) {
          return
        }
        setWorkouts(fallbackWorkouts)
        setError(err.message || 'Unable to load workouts right now.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Personalized coaching suggestions for the week.</p>
          </div>
          <span className="badge bg-danger">{workouts.length} plans</span>
        </div>
        <p className="small text-muted mb-3">Using {buildApiUrl('workouts')}</p>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {error ? <div className="alert alert-warning">{error}</div> : null}
            <div className="row g-3">
              {workouts.map((workout) => (
                <div className="col-md-6" key={workout.id ?? workout.title}>
                  <div className="border rounded p-3 h-100">
                    <h3 className="h6 mb-1">{workout.title}</h3>
                    <p className="text-muted mb-2">{workout.description ?? 'Suggested by the coaching team.'}</p>
                    <span className="badge bg-light text-dark">{workout.difficulty ?? 'Flexible'}</span>
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

export default Workouts
