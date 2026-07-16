import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/Header'

const availableCities = [
    'Roanne, France',
    'Paris, France',
    'Lyon, France',
    'Nice, France',
    'Marseille, France',
    'Londres, Royaume-Uni',
    'Tokyo, Japon',
    'Madrid, Espagne',
    'Rome, Italie',
]

function Search() {
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('')
    const [history, setHistory] = useState([
        'Roanne, France',
        'Paris, France',
        'Lyon, France',
    ])

    const cleanSearch = searchValue.trim().toLowerCase()

    const filteredCities =
        cleanSearch.length >= 2
            ? availableCities.filter((city) =>
                city.toLowerCase().includes(cleanSearch)
            )
            : []

    const showResults = cleanSearch.length >= 2
    const showHistory = cleanSearch.length < 2

    function handleCitySelect(city) {
        setHistory((previousHistory) => {
            const updatedHistory = [
                city,
                ...previousHistory.filter((item) => item !== city),
            ]

            return updatedHistory.slice(0, 5)
        })

        navigate('/')
    }

    function handleClearHistory() {
        setHistory([])
    }

    return (
        <main className="min-h-screen bg-[#e7e7e7] text-[#1e1e2e]">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 md:p-6">
                <div className="hidden md:block">
                    <Header />
                </div>

                <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <Link
                            to="/"
                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                            aria-label="Retour à l'accueil"
                        >
                            ←
                        </Link>

                        <h1 className="text-2xl font-bold">Recherche</h1>
                    </div>

                    <input
                        type="text"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Rechercher une ville..."
                        className="w-full rounded-2xl bg-slate-100 px-4 py-4 text-center text-sm outline-none placeholder:text-slate-400 md:text-left"
                    />

                    <div className="mt-6 border-t border-slate-100 pt-5">
                        {showHistory && (
                            <>
                                {history.length > 0 ? (
                                    <>
                                        <div className="space-y-3">
                                            {history.map((city) => (
                                                <button
                                                    key={city}
                                                    type="button"
                                                    onClick={() => handleCitySelect(city)}
                                                    className="flex w-full items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-left font-medium transition hover:bg-slate-200"
                                                >
                                                    <span>{city}</span>
                                                    <span className="text-slate-400">→</span>
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleClearHistory}
                                            className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                                        >
                                            Supprimer l'historique
                                        </button>
                                    </>
                                ) : (
                                    <p className="text-center text-sm text-slate-500 md:text-left">
                                        Aucun historique pour le moment.
                                    </p>
                                )}
                            </>
                        )}

                        {showResults && (
                            <>
                                {filteredCities.length > 0 ? (
                                    <div className="space-y-3">
                                        {filteredCities.map((city) => (
                                            <button
                                                key={city}
                                                type="button"
                                                onClick={() => handleCitySelect(city)}
                                                className="flex w-full items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-left font-medium transition hover:bg-slate-200"
                                            >
                                                <span>{city}</span>
                                                <span className="text-slate-400">→</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-sm text-slate-500 md:text-left">
                                        Aucune ville trouvée.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Search