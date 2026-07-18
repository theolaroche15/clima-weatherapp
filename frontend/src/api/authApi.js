const API_URL = '/api'

const handleResponse = async (response) => {
    const data = await response.json().catch(() => null)

    if (!response.ok) {
        const error = new Error(
            data?.message || 'Une erreur est survenue.'
        )

        error.status = response.status
        error.data = data

        throw error
    }

    return data
}

export const registerUser = async (credentials) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })

    return handleResponse(response)
}

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })

    return handleResponse(response)
}

export const getAuthenticatedUser = async () => {
    const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        credentials: 'include',
    })

    return handleResponse(response)
}

export const logoutUser = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
    })

    return handleResponse(response)
}

export async function updateUserSettings(settings) {
    const response = await fetch('/api/me/settings', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(settings),
    })

    const data = await response.json()

    if (!response.ok) {
        const error = new Error(
            data.message || 'Impossible de modifier les réglages.'
        )

        error.status = response.status
        error.data = data

        throw error
    }

    return data
}