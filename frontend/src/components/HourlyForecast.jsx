import {
    convertTemperature,
    getTemperatureUnit,
} from '../utils/temperature'

function HourlyForecast({
    hourly = [],
    localTime = '',
    temperatureUnit,
}) {
    const unit = getTemperatureUnit(temperatureUnit)

    const formatHour = (dateTime) => {
        if (!dateTime) {
            return ''
        }

        return dateTime.split(' ')[1]
    }

    const currentLocalHour = localTime
        ? `${localTime.slice(0, 13)}:00`
        : ''

    const upcomingHours = hourly
        .filter((forecast) => forecast.time >= currentLocalHour)
        .slice(0, 24)

    return (
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="text-xl font-bold">Prévisions horaires</h2>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
                {upcomingHours.map((forecast) => (
                    <article
                        key={forecast.time}
                        className="min-w-22 shrink-0 rounded-2xl bg-slate-100 p-4 text-center"
                    >
                        <p className="text-sm font-semibold text-slate-500">
                            {formatHour(forecast.time)}
                        </p>

                        <img
                            src={forecast.condition.icon}
                            alt={forecast.condition.text}
                            className="mx-auto my-3 h-12 w-12 object-contain"
                        />

                        <p className="text-lg font-bold">
                            {convertTemperature(
                                forecast.temperatureCelsius,
                                temperatureUnit
                            )}
                            {unit}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default HourlyForecast