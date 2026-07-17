export async function getCurrentWeather(city) {
    const response = await fetch(
        `/api/weather/current?city=${encodeURIComponent(city)}`
    )

    if (!response.ok) {
        throw new Error('Impossible de récupérer la météo')
    }

    return response.json()
}