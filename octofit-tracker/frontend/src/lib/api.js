const DEFAULT_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim() || ''

function getApiHost() {
  if (DEFAULT_CODESPACE_NAME) {
    return `https://${DEFAULT_CODESPACE_NAME}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

export function buildApiUrl(path) {
  const normalizedPath = path.replace(/^\//, '')
  const baseUrl = getApiHost()

  return `${baseUrl}/api/${normalizedPath}`
}

export async function fetchCollection(resource, fallbackValue) {
  const url = buildApiUrl(resource)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  const collection = payload?.[resource] ?? payload?.data ?? payload

  if (Array.isArray(collection)) {
    return collection
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.users)) {
      return payload.users
    }
    if (Array.isArray(payload.activities)) {
      return payload.activities
    }
    if (Array.isArray(payload.teams)) {
      return payload.teams
    }
    if (Array.isArray(payload.leaderboard)) {
      return payload.leaderboard
    }
    if (Array.isArray(payload.workouts)) {
      return payload.workouts
    }
  }

  return fallbackValue
}
