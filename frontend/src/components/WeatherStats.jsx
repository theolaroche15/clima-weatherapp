function WeatherStats({ current = {}, today = {} }) {
    const currentDetails = [
        {
            title: 'Ressenti',
            value: `${Math.round(current.feelsLikeCelsius ?? 0)}°`,
            icon: '🌡️',
        },
        {
            title: 'Humidité',
            value: `${current.humidity ?? 0} %`,
            icon: '💧',
        },
        {
            title: 'Vent',
            value: `${current.windSpeedKph ?? 0} km/h`,
            description: current.windDirection ?? '—',
            icon: '💨',
        },
        {
            title: 'Pression',
            value: `${current.pressureMb ?? 0} hPa`,
            icon: '⏱️',
        },
        {
            title: 'Visibilité',
            value: `${current.visibilityKm ?? 0} km`,
            icon: '👁️',
        },
        {
            title: 'Précipitations',
            value: `${current.precipitationMm ?? 0} mm`,
            icon: '🌧️',
        },
        {
            title: 'Indice UV',
            value: current.uvIndex ?? 0,
            icon: '☀️',
        },
        {
            title: 'Nuages',
            value: `${current.cloudCover ?? 0} %`,
            icon: '☁️',
        },
    ]

    const dailyDetails = [
        {
            title: 'Risque de pluie',
            value: `${today.dailyRainChance ?? 0} %`,
        },
        {
            title: 'Risque de neige',
            value: `${today.dailySnowChance ?? 0} %`,
        },
        {
            title: 'Précipitations prévues',
            value: `${today.totalPrecipitationMm ?? 0} mm`,
        },
        {
            title: 'Neige prévue',
            value: `${today.totalSnowCm ?? 0} cm`,
        },
        {
            title: 'Vent maximal',
            value: `${today.maximumWindKph ?? 0} km/h`,
        },
        {
            title: 'Rafales actuelles',
            value: `${current.windGustKph ?? 0} km/h`,
        },
        {
            title: 'Humidité moyenne',
            value: `${today.averageHumidity ?? 0} %`,
        },
        {
            title: 'Visibilité moyenne',
            value: `${today.averageVisibilityKm ?? 0} km`,
        },
    ]

    return (
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <div className="mb-6 text-center md:text-left">
                <h2 className="text-xl font-bold text-slate-900">
                    Informations météo
                </h2>
            </div>

            <div className="mb-5 rounded-3xl bg-slate-100 p-4 md:p-5">
                <h3 className="mb-5 font-bold text-slate-900">
                    Soleil
                </h3>

                <div className="flex items-center gap-3">
                    <p className="shrink-0 text-sm font-bold text-slate-900 md:text-base">
                        {today.astro?.sunrise ?? '—'}
                    </p>

                    <div className="flex flex-1 items-center gap-2">
                        <div className="h-px flex-1 bg-slate-300" />

                        <span
                            aria-hidden="true"
                            className="text-xl md:text-2xl"
                        >
                            ☀️
                        </span>

                        <div className="h-px flex-1 bg-slate-300" />
                    </div>

                    <p className="shrink-0 text-sm font-bold text-slate-900 md:text-base">
                        {today.astro?.sunset ?? '—'}
                    </p>
                </div>

                <div className="mt-3 flex justify-between text-xs text-slate-500">
                    <span>Lever</span>
                    <span>Coucher</span>
                </div>
            </div>

            <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
                <div className="flex h-full flex-col rounded-3xl bg-slate-100 p-4 md:p-5">
                    <h3 className="mb-4 font-bold text-slate-900">
                        Conditions actuelles
                    </h3>

                    <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        {currentDetails.map((detail) => (
                            <article
                                key={detail.title}
                                className="h-full rounded-2xl bg-white p-4 shadow-sm"
                            >
                                <div className="flex h-full items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">
                                            {detail.title}
                                        </p>

                                        <p className="mt-2 text-lg font-bold text-slate-900 md:text-xl">
                                            {detail.value}
                                        </p>

                                        {detail.description && (
                                            <p className="mt-1 text-xs text-slate-500">
                                                {detail.description}
                                            </p>
                                        )}
                                    </div>

                                    <span
                                        aria-hidden="true"
                                        className="shrink-0 text-xl"
                                    >
                                        {detail.icon}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="flex h-full flex-col rounded-3xl bg-slate-100 p-4 md:p-5">
                    <h3 className="mb-4 font-bold text-slate-900">
                        Prévisions du jour
                    </h3>

                    <div className="grid flex-1 grid-rows-8 divide-y divide-slate-200">
                        {dailyDetails.map((detail) => (
                            <div
                                key={detail.title}
                                className="flex min-h-11 items-center justify-between gap-4"
                            >
                                <p className="text-sm text-slate-500">
                                    {detail.title}
                                </p>

                                <p className="shrink-0 text-sm font-bold text-slate-900">
                                    {detail.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WeatherStats