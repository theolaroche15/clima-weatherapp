import {
    convertTemperature,
    getTemperatureUnit,
} from '../utils/temperature'

function WeatherStats({
    current = {},
    today = {},
    temperatureUnit,
}) {
    const unit = getTemperatureUnit(temperatureUnit)

    const formatFrenchTime = (time) => {
        if (!time) {
            return '—'
        }

        const [hourMinute, period] = time.split(' ')
        let [hours, minutes] = hourMinute.split(':').map(Number)

        if (period === 'PM' && hours !== 12) {
            hours += 12
        }

        if (period === 'AM' && hours === 12) {
            hours = 0
        }

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    }

    const currentDetails = [
        {
            title: 'Ressenti',
            value: `${convertTemperature(
                current.feelsLikeCelsius,
                temperatureUnit
            )}${unit}`,
        },
        {
            title: 'Humidité',
            value: `${current.humidity ?? 0} %`,
        },
        {
            title: 'Vent',
            value: `${current.windSpeedKph ?? 0} km/h`,
            description: current.windDirection ?? '—',
        },
        {
            title: 'Pression',
            value: `${current.pressureMb ?? 0} hPa`,
        },
        {
            title: 'Visibilité',
            value: `${current.visibilityKm ?? 0} km`,
        },
        {
            title: 'Précipitations',
            value: `${current.precipitationMm ?? 0} mm`,
        },
        {
            title: 'Indice UV',
            value: current.uvIndex ?? 0,
        },
        {
            title: 'Nuages',
            value: `${current.cloudCover ?? 0} %`,
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
                        {formatFrenchTime(today.astro?.sunrise)}
                    </p>

                    <div className="flex flex-1 items-center gap-2">
                        <div className="h-px flex-1 bg-slate-300" />

                        <span
                            aria-hidden="true"
                            className="text-xl md:text-2xl"
                        >
                            <i className="fa-solid fa-sun"
                                style={{ color: 'rgb(255, 199, 0)' }}></i>
                        </span>

                        <div className="h-px flex-1 bg-slate-300" />
                    </div>

                    <p className="shrink-0 text-sm font-bold text-slate-900 md:text-base">
                        {formatFrenchTime(today.astro?.sunset)}
                    </p>
                </div>

                <div className="mt-3 flex justify-between text-xs text-slate-500">
                    <span>Lever</span>
                    <span>Coucher</span>
                </div>
            </div>

            <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
                <div className="flex h-full flex-col rounded-3xl bg-slate-100 p-4 md:p-5">
                    <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                        <i className="fa-solid fa-earth-africa fa-float"
                            style={{ color: 'rgb(0, 142, 255)' }}></i>

                        Conditions actuelles
                    </h3>

                    <div className="grid flex-1 grid-cols-2 gap-x-5">
                        {currentDetails.map((detail) => (
                            <div
                                key={detail.title}
                                className="flex min-h-14 flex-col justify-center border-b border-slate-200 py-2 md:flex-row md:items-center md:justify-between md:gap-3"
                            >
                                <div>
                                    <p className="text-sm text-slate-500">
                                        {detail.title}
                                    </p>

                                    {detail.description && (
                                        <p className="mt-1 text-xs text-slate-400">
                                            {detail.description}
                                        </p>
                                    )}
                                </div>

                                <p className="mt-1 shrink-0 text-sm font-bold text-slate-900 md:mt-0">
                                    {detail.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex h-full flex-col rounded-3xl bg-slate-100 p-4 md:p-5">
                    <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                        <i className="fa-solid fa-meteor fa-float"
                            style={{ color: 'rgb(235, 119, 57)' }}></i>

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