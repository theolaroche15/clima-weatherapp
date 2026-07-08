import { weatherDetails } from '../data/weatherData'

function WeatherStats() {
    return (
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="text-xl font-bold">
                    Informations météo
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Les principales données météorologiques.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {weatherDetails.map((detail) => (
                    <article
                        key={detail.title}
                        className="rounded-2xl bg-slate-100 p-5 text-center"
                    >
                        <p className="text-3xl">
                            {detail.icon}
                        </p>

                        <p className="mt-3 text-2xl font-bold">
                            {detail.value}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            {detail.title}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default WeatherStats