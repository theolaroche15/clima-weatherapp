import { currentWeather } from '../data/weatherData'

function CurrentWeather() {
    return (
        <section className="rounded-4xl bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-center text-center md:flex-row md:items-stretch md:justify-between md:text-left">
                <div className="flex flex-col md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold md:text-3xl">
                            {currentWeather.city}, {currentWeather.country}
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {currentWeather.date}
                        </p>
                    </div>

                    <div className="mt-8 md:mt-12">
                        <p className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                            {currentWeather.temperature}°
                        </p>

                        <p className="mt-3 hidden text-sm text-slate-500 md:block">
                            Ressenti {currentWeather.feelsLike}°
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center md:mt-0 md:items-end md:justify-between md:text-right">
                    <p className="hidden text-7xl md:block">
                        {currentWeather.icon}
                    </p>

                    <div>
                        <div className="flex items-center justify-center gap-2 md:block">
                            <span className="text-2xl md:hidden">
                                {currentWeather.icon}
                            </span>

                            <p className="text-base font-semibold text-slate-700">
                                {currentWeather.condition}
                            </p>
                        </div>

                        <div className="mt-3 flex justify-center gap-5 text-sm font-medium text-slate-500 md:justify-end">
                            <span>↑ {currentWeather.max}°</span>
                            <span>↓ {currentWeather.min}°</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CurrentWeather