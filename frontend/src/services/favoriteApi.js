export async function getFavorites() {
    const response = await fetch('/api/favorites', {
        method: 'GET',
        credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || 'Impossible de récupérer les favoris'
        )
    }

    return Array.isArray(data)
        ? data
        : data.favorites ?? []
}

export async function addFavorite(cityName, country) {
    const response = await fetch('/api/favorites', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cityName,
            country,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || "Impossible d'ajouter le favori"
        )
    }

    return data.favorite ?? data
}

export async function deleteFavorite(id) {
    const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })

    let data = null

    if (response.status !== 204) {
        data = await response.json()
    }

    if (!response.ok) {
        throw new Error(
            data?.message || 'Impossible de supprimer le favori'
        )
    }

    return data
}