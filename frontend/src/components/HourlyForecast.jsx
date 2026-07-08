import { hourlyForecast } from '../data/weatherData'

function HourlyForecast() {
    return (
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="text-xl font-bold">Prévisions horaires</h2>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
                {hourlyForecast.map((forecast) => (
                    <article
                        key={forecast.hour}
                        className="min-w-22 rounded-2xl bg-slate-100 p-4 text-center"
                    >
                        <p className="text-sm font-semibold text-slate-500">
                            {forecast.hour}
                        </p>

                        <p className="my-3 text-3xl">{forecast.icon}</p>

                        <p className="text-lg font-bold">
                            {forecast.temperature}°
                        </p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default HourlyForecast