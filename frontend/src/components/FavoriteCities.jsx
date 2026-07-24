import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getCurrentWeather } from '../services/weatherApi'
import {
    convertTemperature,
    getTemperatureUnit,
} from '../utils/temperature'

function FavoriteCities({ favorites, currentCity, temperatureUnit }) {
    const navigate = useNavigate()
    const [favoritesWeather, setFavoritesWeather] = useState({})

    const displayedFavorites = favorites
        .filter(
            (favorite) =>
                favorite.cityName.toLowerCase() !==
                currentCity.toLowerCase()
        )
        .slice(0, 3)
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
    }, [favorites, currentCity])

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
        <section className="rounded-4xl bg-(--color-primary) p-5 md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="font-title flex items-center justify-center gap-2 text-xl md:justify-start">
                    <i
                        className="fa-solid fa-star"
                        style={{ color: 'rgb(255, 212, 59)' }}
                    ></i>

                    Mes favoris
                </h2>
            </div>

            {displayedFavorites.length === 0 ? (
                <p className="text-center text-sm text-(--color-text-secondary)">
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
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    px-4
                                    py-3
                                    text-left
                                    text-(--color-text-primary)
                                    transition
                                    hover:bg-(--color-background)
                                "
                            >
                                <div className="min-w-0">
                                    <p className="font-detail truncate">
                                        {favorite.cityName}
                                    </p>

                                    {weather?.location && (
                                        <p className="mt-0.5 truncate text-xs text-(--color-text-secondary)">
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

                                            <span className="font-title text-lg">
                                                {convertTemperature(
                                                    weather.current
                                                        .temperatureCelsius,
                                                    temperatureUnit
                                                )}
                                                {unit}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-sm text-(--color-text-secondary)">
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
                className="
                    mt-5
                    w-full
                    rounded-2xl
                    bg-(--color-secondary)
                    py-3
                    text-sm
                    font-detail
                    text-(--color-primary)
                    transition
                    hover:opacity-80
                "
            >
                Afficher tous les favoris
            </button>
        </section>
    )
}

export default FavoriteCities