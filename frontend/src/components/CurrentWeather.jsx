import { addFavorite, deleteFavorite } from '../services/favoriteApi'
import { useAuth } from '../contexts/AuthContext'

import {
    convertTemperature,
    getTemperatureUnit,
} from '../utils/temperature'

function CurrentWeather({ weather, temperatureUnit, favorites, setFavorites }) {
    const { isAuthenticated } = useAuth()
    const unit = getTemperatureUnit(temperatureUnit)

    const currentFavorite = favorites.find(
        (favorite) =>
            favorite.latitude === weather.location.latitude &&
            favorite.longitude === weather.location.longitude
    )

    const isFavorite = Boolean(currentFavorite)

    async function handleFavorite() {
        try {
            if (isFavorite) {
                await deleteFavorite(currentFavorite.id)

                setFavorites((previous) =>
                    previous.filter((item) => item.id !== currentFavorite.id)
                )

                return
            }

            const response = await addFavorite({
                name: weather.location.name,
                region: weather.location.region,
                country: weather.location.country,
                latitude: weather.location.latitude,
                longitude: weather.location.longitude,
            })

            setFavorites((previous) => [
                ...previous,
                response.favorite,
            ])
        } catch (error) {
            alert(error.message)
        }
    }

    const formatLocalDateTime = (localTime) => {
        if (!localTime) {
            return ''
        }

        const [datePart, timePart] = localTime.split(' ')
        const [year, month, day] = datePart.split('-').map(Number)

        const date = new Date(year, month - 1, day)

        const formattedDate = new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        }).format(date)

        return `${formattedDate} - ${timePart}`
    }

    return (
        <section className="rounded-4xl bg-(--color-primary) p-6 md:p-8">
            <div className="flex flex-col items-center text-center md:flex-row md:items-stretch md:justify-between md:text-left">
                <div className="flex flex-col md:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <h2 className="font-title text-2xl md:text-3xl">
                                {weather.location.name}, {weather.location.country}
                            </h2>

                            {isAuthenticated && (
                                <button
                                    type="button"
                                    onClick={handleFavorite}
                                    className="ml-auto cursor-pointer text-2xl transition"
                                    aria-label={
                                        isFavorite
                                            ? 'Retirer des favoris'
                                            : 'Ajouter aux favoris'
                                    }
                                >
                                    <i
                                        className={
                                            isFavorite
                                                ? 'fa-solid fa-star'
                                                : 'fa-regular fa-star'
                                        }
                                        style={{ color: 'rgb(255, 212, 59)' }}
                                    ></i>
                                </button>
                            )}
                        </div>

                        <p className="mt-2 text-sm text-(--color-text-secondary)">
                            {formatLocalDateTime(weather.location.localTime)}
                        </p>
                    </div>

                    <div className="mt-8 md:mt-12">
                        <p className="font-title text-7xl leading-none tracking-tight md:text-8xl">
                            {convertTemperature(
                                weather.current.temperatureCelsius,
                                temperatureUnit
                            )}
                            {unit}
                        </p>

                        <p className="mt-3 hidden text-sm text-(--color-text-secondary) md:block">
                            Ressenti{' '}
                            {convertTemperature(
                                weather.current.feelsLikeCelsius,
                                temperatureUnit
                            )}
                            {unit}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center md:mt-0 md:items-end md:justify-between md:text-right">
                    <img
                        src={weather.current.condition.icon}
                        alt={weather.current.condition.text}
                        className="hidden h-24 w-24 object-contain md:block"
                    />

                    <div>
                        <div className="flex items-center justify-center gap-2 md:block">
                            <img
                                src={weather.current.condition.icon}
                                alt=""
                                className="h-10 w-10 object-contain md:hidden"
                            />

                            <p className="font-detail text-base text-(--color-text-primary)">
                                {weather.current.condition.text}
                            </p>
                        </div>

                        <div className="mt-3 flex justify-center gap-5 text-sm font-detail text-(--color-text-secondary) md:justify-end">
                            <span>
                                ↑{' '}
                                {convertTemperature(
                                    weather.forecast.today
                                        .maximumTemperatureCelsius,
                                    temperatureUnit
                                )}
                                {unit}
                            </span>

                            <span>
                                ↓{' '}
                                {convertTemperature(
                                    weather.forecast.today
                                        .minimumTemperatureCelsius,
                                    temperatureUnit
                                )}
                                {unit}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CurrentWeather