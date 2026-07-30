import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import heroImg from './assets/hero.png'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function Home() {
  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <section className="card shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img src={heroImg} className="img-fluid" width="80" alt="OctoFit hero" />
              <div>
                <p className="text-uppercase text-muted small mb-1">Presentation tier</p>
                <h2 className="h4 mb-0">OctoFit Tracker</h2>
              </div>
            </div>
            <p className="text-muted mb-3">
              This React 19 presentation tier is connected to the backend API with Vite environment variables and safe fallbacks.
            </p>
            <div className="alert alert-info mb-0">
              Set <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> to target the GitHub Codespaces API URL.
            </div>
          </div>
        </section>
      </div>
      <div className="col-lg-5">
        <section className="card shadow-sm h-100">
          <div className="card-body">
            <h2 className="h4 mb-3">Quick links</h2>
            <div className="d-grid gap-2">
              {navigation.slice(1).map((item) => (
                <NavLink key={item.to} className="btn btn-outline-primary text-start" to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6 mb-3">OctoFit Tracker</h1>
        <nav className="nav nav-pills flex-wrap gap-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to={item.to}
              end={item.end}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
