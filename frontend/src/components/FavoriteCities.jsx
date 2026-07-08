import { favoriteCities } from '../data/weatherData'

function FavoriteCities() {
    return (
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="text-xl font-bold">
                    Mes favoris
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Accédez rapidement à vos villes favorites.
                </p>
            </div>

            <div className="space-y-3">
                {favoriteCities.map((city) => (
                    <button
                        key={city.city}
                        type="button"
                        className="flex w-full items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-left transition hover:bg-slate-200"
                    >
                        <div>
                            <p className="font-semibold">
                                {city.city}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">
                                {city.icon}
                            </span>

                            <span className="font-bold">
                                {city.temperature}°
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="mt-5 w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
                Afficher tous les favoris
            </button>
        </section>
    )
}

export default FavoriteCities