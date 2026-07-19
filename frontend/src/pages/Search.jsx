import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext'

import { searchCities } from '../services/weatherApi'
import {
    addSearchHistory,
    clearSearchHistory,
    getSearchHistory,
} from '../services/searchHistoryApi'

function Search() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const [searchValue, setSearchValue] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [history, setHistory] = useState([])
    const [historyLoading, setHistoryLoading] = useState(false)

    const cleanSearch = searchValue.trim()
    const showResults = cleanSearch.length >= 2

    useEffect(() => {
        if (!user) {
            setHistory([])
            return
        }

        setHistoryLoading(true)

        getSearchHistory()
            .then((data) => {
                setHistory(data)
            })
            .catch((error) => {
                console.error('Erreur historique :', error)
                setHistory([])
            })
            .finally(() => {
                setHistoryLoading(false)
            })
    }, [user])

    useEffect(() => {
        if (!showResults) {
            setResults([])
            setLoading(false)
            setError(null)
            return
        }

        const timeoutId = setTimeout(() => {
            setLoading(true)
            setError(null)

            searchCities(cleanSearch)
                .then((data) => {
                    setResults(data)
                })
                .catch((error) => {
                    console.error('Erreur recherche :', error)
                    setResults([])
                    setError(error.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [cleanSearch, showResults])

    async function handleCitySelect(city) {
        if (user) {
            try {
                await addSearchHistory(city)
            } catch (error) {
                console.error(
                    "Erreur lors de l'ajout à l'historique :",
                    error
                )
            }
        }

        navigate('/', {
            state: {
                city,
            },
        })
    }

    async function handleClearHistory() {
        try {
            await clearSearchHistory()
            setHistory([])
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de l'historique :",
                error
            )
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        event.currentTarget.querySelector('input')?.blur()
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
                            aria-label="Retour à l'accueil"
                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                        >
                            ←
                        </Link>

                        <h1 className="text-2xl font-bold">
                            Recherche
                        </h1>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex gap-3"
                    >
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(event) =>
                                setSearchValue(event.target.value)
                            }
                            placeholder="Rechercher une ville..."
                            autoFocus
                            className="w-full rounded-2xl bg-slate-100 px-4 py-4 text-center text-sm outline-none placeholder:text-slate-400 md:text-left"
                        />

                        <button
                            type="submit"
                            className="rounded-2xl bg-[#3691eb] px-6 py-4 font-medium text-white transition hover:bg-[#064487]"
                        >
                            Rechercher
                        </button>
                    </form>

                    <div
                        className="mt-6 border-t border-slate-100 pt-5"
                        aria-live="polite"
                    >

                        {!showResults && user && historyLoading && (
                            <p className="text-center text-sm text-slate-500 md:text-left">
                                Chargement de l&apos;historique...
                            </p>
                        )}

                        {!showResults &&
                            user &&
                            !historyLoading &&
                            history.length === 0 && (
                                <p className="text-center text-sm text-slate-500 md:text-left">
                                    Aucune recherche récente.
                                </p>
                            )}

                        {!showResults &&
                            user &&
                            !historyLoading &&
                            history.length > 0 && (
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h2 className="font-semibold">
                                            Recherches récentes
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={handleClearHistory}
                                            className="text-sm text-slate-500 transition hover:text-red-600"
                                        >
                                            Effacer
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {history.map((city) => (
                                            <button
                                                key={city.id}
                                                type="button"
                                                onClick={() =>
                                                    handleCitySelect({
                                                        name: city.cityName,
                                                        region: city.region,
                                                        country: city.country,
                                                        latitude:
                                                            city.latitude,
                                                        longitude:
                                                            city.longitude,
                                                    })
                                                }
                                                className="flex w-full items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-left transition hover:bg-slate-200"
                                            >
                                                <span>
                                                    <span className="block font-medium">
                                                        {city.cityName}
                                                    </span>

                                                    <span className="block text-sm text-slate-500">
                                                        {[
                                                            city.region,
                                                            city.country,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(', ')}
                                                    </span>
                                                </span>

                                                <span
                                                    aria-hidden="true"
                                                    className="text-slate-400"
                                                >
                                                    →
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {showResults && loading && (
                            <p className="text-center text-sm text-slate-500 md:text-left">
                                Recherche en cours...
                            </p>
                        )}

                        {showResults && !loading && error && (
                            <p className="text-center text-sm text-red-600 md:text-left">
                                {error}
                            </p>
                        )}

                        {showResults &&
                            !loading &&
                            !error &&
                            results.length === 0 && (
                                <p className="text-center text-sm text-slate-500 md:text-left">
                                    Aucune ville trouvée.
                                </p>
                            )}

                        {showResults &&
                            !loading &&
                            !error &&
                            results.length > 0 && (
                                <div className="space-y-3">
                                    {results.map((city) => (
                                        <button
                                            key={`${city.name}-${city.latitude}-${city.longitude}`}
                                            type="button"
                                            onClick={() =>
                                                handleCitySelect(city)
                                            }
                                            className="flex w-full items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-left transition hover:bg-slate-200"
                                        >
                                            <span>
                                                <span className="block font-medium">
                                                    {city.name}
                                                </span>

                                                <span className="block text-sm text-slate-500">
                                                    {[
                                                        city.region,
                                                        city.country,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(', ')}
                                                </span>
                                            </span>

                                            <span
                                                aria-hidden="true"
                                                className="text-slate-400"
                                            >
                                                →
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Search