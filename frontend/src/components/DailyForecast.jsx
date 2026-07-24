import {
    convertTemperature,
    getTemperatureUnit,
} from '../utils/temperature'

function DailyForecast({ daily = [], temperatureUnit }) {
    const unit = getTemperatureUnit(temperatureUnit)

    const formatDay = (date) => {
        if (!date) {
            return ''
        }

        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
        }).format(new Date(`${date}T12:00:00`))
    }

    return (
        <section className="rounded-4xl bg-(--color-primary) p-5 md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="font-title text-xl">
                    Prévisions des prochains jours
                </h2>
            </div>

            <div className="space-y-3">
                {daily.map((forecast) => (
                    <article
                        key={forecast.date}
                        className="flex items-center justify-between gap-2 rounded-2xl bg-(--color-background) px-3 py-3 sm:gap-4 sm:px-4"
                    >
                        <div className="min-w-18 flex-1 sm:min-w-22">
                            <p className="font-title truncate text-sm capitalize sm:text-base">
                                {formatDay(forecast.date)}
                            </p>

                            <p className="truncate text-xs text-(--color-text-secondary) sm:text-sm">
                                {forecast.condition.text}
                            </p>
                        </div>

                        <img
                            src={forecast.condition.icon}
                            alt={forecast.condition.text}
                            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
                        />

                        <div className="flex shrink-0 gap-2 text-xs font-detail text-(--color-text-secondary) sm:gap-4 sm:text-sm">
                            <span>
                                ↑{' '}
                                {convertTemperature(
                                    forecast.maximumTemperatureCelsius,
                                    temperatureUnit
                                )}
                                {unit}
                            </span>

                            <span>
                                ↓{' '}
                                {convertTemperature(
                                    forecast.minimumTemperatureCelsius,
                                    temperatureUnit
                                )}
                                {unit}
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default DailyForecast