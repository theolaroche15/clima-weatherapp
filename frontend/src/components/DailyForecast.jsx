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
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="text-xl font-bold">
                    Prévisions des prochains jours
                </h2>
            </div>

            <div className="space-y-3">
                {daily.map((forecast) => (
                    <article
                        key={forecast.date}
                        className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3"
                    >
                        <div className="min-w-23.75">
                            <p className="font-bold capitalize">
                                {formatDay(forecast.date)}
                            </p>

                            <p className="text-sm text-slate-500">
                                {forecast.condition.text}
                            </p>
                        </div>

                        <img
                            src={forecast.condition.icon}
                            alt={forecast.condition.text}
                            className="h-12 w-12 object-contain"
                        />

                        <div className="flex gap-4 text-sm font-medium text-slate-500">
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