import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../lib/api'

const fallbackUsers = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Founder' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'Navigator' },
]

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadUsers = async () => {
      try {
        const data = await fetchCollection('users', fallbackUsers)
        if (isMounted) {
          setUsers(data)
          setError('')
        }
      } catch (err) {
        if (!isMounted) {
          return
        }
        setUsers(fallbackUsers)
        setError(err.message || 'Unable to load users right now.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Users</h2>
            <p className="text-muted mb-0">People powering OctoFit’s community.</p>
          </div>
          <span className="badge bg-primary">{users.length} members</span>
        </div>
        <p className="small text-muted mb-3">Using {buildApiUrl('users')}</p>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {error ? <div className="alert alert-warning">{error}</div> : null}
            <div className="row g-3">
              {users.map((user) => (
                <div className="col-md-6" key={user.id ?? user.email ?? user.name}>
                  <div className="border rounded p-3 h-100">
                    <h3 className="h6 mb-1">{user.name}</h3>
                    <p className="text-muted mb-2">{user.email}</p>
                    <span className="badge bg-secondary">{user.role ?? 'Member'}</span>
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

export default Users
