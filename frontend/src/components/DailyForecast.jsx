import { dailyForecast } from '../data/weatherData'

function DailyForecast() {
    return (
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="text-xl font-bold">Prévisions des prochains jours</h2>

                <p className="mt-2 text-sm text-slate-500">
                    Une vue simple des jours à venir.
                </p>
            </div>

            <div className="space-y-3">
                {dailyForecast.map((forecast) => (
                    <article
                        key={forecast.day}
                        className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3"
                    >
                        <div className="min-w-23.75">
                            <p className="font-bold">{forecast.day}</p>
                            <p className="text-sm text-slate-500">
                                {forecast.condition}
                            </p>
                        </div>

                        <p className="text-3xl">{forecast.icon}</p>

                        <div className="flex gap-4 text-sm font-medium text-slate-500">
                            <span>↑ {forecast.max}°</span>
                            <span>↓ {forecast.min}°</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default DailyForecast