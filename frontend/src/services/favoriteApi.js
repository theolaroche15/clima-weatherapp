export async function getFavorites() {
    const response = await fetch('/api/favorites', {
        credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || 'Impossible de récupérer les favoris'
        )
    }

    return data.favorites ?? []
}

export async function addFavorite(city) {
    const response = await fetch('/api/favorites', {
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
        throw new Error(data.message)
    }

    return data
}

export async function deleteFavorite(id) {
    const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })

    let data = {}

    try {
        data = await response.json()
    } catch { }

    if (!response.ok) {
        throw new Error(
            data.message || 'Impossible de supprimer le favori'
        )
    }
}