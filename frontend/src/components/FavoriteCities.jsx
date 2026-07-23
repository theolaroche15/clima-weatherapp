import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getCurrentWeather } from '../services/weatherApi'
import {
    convertTemperature,
    getTemperatureUnit,
} from '../utils/temperature'

function FavoriteCities({ favorites, temperatureUnit }) {
    const navigate = useNavigate()
    const [favoritesWeather, setFavoritesWeather] = useState({})

    const displayedFavorites = favorites.slice(0, 3)
    const unit = getTemperatureUnit(temperatureUnit)

    useEffect(() => {
        async function loadFavoritesWeather() {
            const weatherResults = await Promise.allSettled(
                displayedFavorites.map((favorite) =>
                    getCurrentWeather(favorite.cityName)
                )
            )

            const weatherByFavoriteId = {}

            weatherResults.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    const favoriteId = displayedFavorites[index].id

                    weatherByFavoriteId[favoriteId] = result.value
                }
            })

            setFavoritesWeather(weatherByFavoriteId)
        }

        if (displayedFavorites.length === 0) {
            setFavoritesWeather({})
            return
        }

        loadFavoritesWeather()
    }, [favorites])

    function handleSelectFavorite(favorite) {
        navigate('/', {
            state: {
                city: {
                    name: favorite.cityName,
                },
            },
        })
    }

    return (
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="flex items-center justify-center gap-2 text-xl font-bold md:justify-start">
                    <i
                        className="fa-solid fa-star"
                        style={{ color: 'rgb(255, 212, 59)' }}
                    ></i>

                    Mes favoris
                </h2>
            </div>

            {displayedFavorites.length === 0 ? (
                <p className="text-center text-sm text-slate-500">
                    Vous n&apos;avez aucun favori.
                </p>
            ) : (
                <div className="space-y-3">
                    {displayedFavorites.map((favorite) => {
                        const weather = favoritesWeather[favorite.id]

                        return (
                            <button
                                key={favorite.id}
                                type="button"
                                onClick={() =>
                                    handleSelectFavorite(favorite)
                                }
                                className="flex w-full items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-left transition hover:bg-slate-200"
                            >
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-slate-900">
                                        {favorite.cityName}
                                    </p>

                                    {weather?.location && (
                                        <p className="mt-0.5 truncate text-xs text-slate-500">
                                            {weather.location.region &&
                                                `${weather.location.region}, `}
                                            {weather.location.country}
                                        </p>
                                    )}
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    {weather ? (
                                        <>
                                            <img
                                                src={
                                                    weather.current.condition
                                                        .icon
                                                }
                                                alt={
                                                    weather.current.condition
                                                        .text
                                                }
                                                className="h-10 w-10 object-contain"
                                            />

                                            <span className="text-lg font-bold">
                                                {convertTemperature(
                                                    weather.current
                                                        .temperatureCelsius,
                                                    temperatureUnit
                                                )}
                                                {unit}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-sm text-slate-400">
                                            Indisponible
                                        </span>
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>
            )}

            <button
                type="button"
                onClick={() => navigate('/favorites')}
                className="mt-5 w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
                Afficher tous les favoris
            </button>
        </section>
    )
}

export default FavoriteCities