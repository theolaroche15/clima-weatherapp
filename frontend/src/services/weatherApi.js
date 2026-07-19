export async function getCurrentWeather(city) {
    const response = await fetch(
        `/api/weather/current?city=${encodeURIComponent(city)}`
    )

    if (!response.ok) {
        throw new Error('Impossible de récupérer la météo')
    }

    return response.json()
}

export async function searchCities(query) {
    const response = await fetch(
        `/api/weather/search?query=${encodeURIComponent(query)}`,
        {
            credentials: 'include',
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || 'Impossible de rechercher les villes'
        )
    }

    return Array.isArray(data) ? data : data.cities ?? []
}