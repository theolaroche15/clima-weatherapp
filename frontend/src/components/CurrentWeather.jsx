import { currentWeather } from '../data/weatherData'

function CurrentWeather({ weather }) {

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
        <section className="rounded-4xl bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-center text-center md:flex-row md:items-stretch md:justify-between md:text-left">
                <div className="flex flex-col md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold md:text-3xl">
                            {weather.location.name}, {weather.location.country}
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {formatLocalDateTime(weather.location.localTime)}
                        </p>
                    </div>

                    <div className="mt-8 md:mt-12">
                        <p className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                            {weather.current.temperatureCelsius}°
                        </p>

                        <p className="mt-3 hidden text-sm text-slate-500 md:block">
                            Ressenti {weather.current.feelsLikeCelsius}°
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

                            <p className="text-base font-semibold text-slate-700">
                                {weather.current.condition.text}
                            </p>
                        </div>

                        <div className="mt-3 flex justify-center gap-5 text-sm font-medium text-slate-500 md:justify-end">
                            <span>↑ {weather.forecast.today.maximumTemperatureCelsius}°</span>
                            <span>↓ {weather.forecast.today.minimumTemperatureCelsius}°</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CurrentWeather