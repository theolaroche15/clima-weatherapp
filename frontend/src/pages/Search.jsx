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
        <main
            className="
                min-h-screen
                bg-(--color-background)
                text-(--color-text-primary)
            "
        >
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 md:p-6">
                <div className="hidden md:block">
                    <Header />
                </div>

                <section className="rounded-4xl bg-(--color-primary) p-5 md:p-6">
                    <div className="mb-8 flex items-center gap-3">
                        <Link
                            to="/"
                            aria-label="Retour à l'accueil"
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-2xl
                                text-lg
                                transition
                                hover:bg-(--color-background)
                            "
                        >
                            ←
                        </Link>

                        <h1 className="hidden lg:block font-title text-2xl">
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
                            className="
                                w-full
                                rounded-2xl
                                bg-(--color-background)
                                px-4
                                py-4
                                text-center
                                text-sm
                                text-(--color-text-primary)
                                outline-none
                                placeholder:text-(--color-text-secondary)
                                md:text-left
                            "
                        />

                        <button
                            type="submit"
                            className="
                                rounded-xl
                                bg-[#3691eb]
                                px-4
                                py-2
                                text-sm
                                font-detail
                                text-white
                                transition-colors
                                duration-200
                                hover:bg-[#2b82d8]
                            "
                        >
                            Rechercher
                        </button>
                    </form>

                    <div
                        className="mt-6 pt-5"
                        aria-live="polite"
                    >
                        {!showResults && user && historyLoading && (
                            <p className="text-center text-sm text-(--color-text-secondary) md:text-left">
                                Chargement de l&apos;historique...
                            </p>
                        )}

                        {!showResults &&
                            user &&
                            !historyLoading &&
                            history.length === 0 && (
                                <p className="text-center text-sm text-(--color-text-secondary) md:text-left">
                                    Aucune recherche récente.
                                </p>
                            )}

                        {!showResults &&
                            user &&
                            !historyLoading &&
                            history.length > 0 && (
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h2 className="font-title">
                                            Recherches récentes
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={handleClearHistory}
                                            className="group"
                                            aria-label="Effacer l'historique"
                                        >
                                            <i className="fa-solid fa-trash text-[rgb(223,42,42)] transition-colors duration-200 group-hover:text-[rgb(170,28,28)]"></i>
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
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-between
                                                    rounded-2xl
                                                    px-4
                                                    py-3
                                                    text-left
                                                    text-(--color-text-primary)
                                                    transition
                                                    hover:bg-(--color-background)
                                                "
                                            >
                                                <span>
                                                    <span className="font-detail block">
                                                        {city.cityName}
                                                    </span>

                                                    <span className="block text-sm text-(--color-text-secondary)">
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
                                                    className="text-(--color-text-primary)"
                                                >
                                                    →
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {showResults && loading && (
                            <p className="text-center text-sm text-(--color-text-secondary) md:text-left">
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
                                <p className="text-center text-sm text-(--color-text-secondary) md:text-left">
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
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                justify-between
                                                rounded-2xl
                                                px-4
                                                py-3
                                                text-left
                                                text-(--color-text-primary)
                                                transition
                                                hover:bg-(--color-background)
                                            "
                                        >
                                            <span>
                                                <span className="font-detail block">
                                                    {city.name}
                                                </span>

                                                <span className="block text-sm text-(--color-text-secondary)">
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
                                                className="text-(--color-text-primary)"
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