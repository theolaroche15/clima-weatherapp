export async function getSearchHistory() {
    const response = await fetch('/api/search-history', {
        method: 'GET',
        credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || "Impossible de récupérer l'historique"
        )
    }

    return Array.isArray(data)
        ? data
        : data.history ?? []
}

export async function addSearchHistory(city) {
    const response = await fetch('/api/search-history', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cityName: city.name,
            region: city.region,
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || "Impossible d'ajouter la recherche"
        )
    }

    return data
}

export async function clearSearchHistory() {
    const response = await fetch('/api/search-history', {
        method: 'DELETE',
        credentials: 'include',
    })

    let data = null

    if (response.status !== 204) {
        data = await response.json()
    }

    if (!response.ok) {
        throw new Error(
            data?.message || "Impossible de vider l'historique"
        )
    }

    return data
}