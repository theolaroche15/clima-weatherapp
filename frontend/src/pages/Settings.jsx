import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext.jsx'

function Settings() {
    const { user, logout, updateSettings } = useAuth()

    const [temperatureUnit, setTemperatureUnit] = useState(
        user?.temperatureUnit || 'celsius'
    )
    const [isUpdatingTemperature, setIsUpdatingTemperature] =
        useState(false)

    const [isLocationEnabled, setIsLocationEnabled] = useState(true)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (user?.temperatureUnit) {
            setTemperatureUnit(user.temperatureUnit)
        }
    }, [user])

    async function handleLogout() {
        setIsLoggingOut(true)

        try {
            await logout()
            navigate('/')
        } catch (error) {
            console.error('Erreur pendant la déconnexion :', error)
        } finally {
            setIsLoggingOut(false)
        }
    }

    async function handleTemperatureUnitChange(newUnit) {
        if (
            newUnit === temperatureUnit ||
            isUpdatingTemperature
        ) {
            return
        }

        const previousUnit = temperatureUnit

        setTemperatureUnit(newUnit)
        setIsUpdatingTemperature(true)

        try {
            await updateSettings({
                temperatureUnit: newUnit,
            })
        } catch (error) {
            setTemperatureUnit(previousUnit)

            console.error(
                "Erreur lors de la mise à jour de l'unité :",
                error
            )
        } finally {
            setIsUpdatingTemperature(false)
        }
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

                        <h1 className="text-2xl font-bold">
                            Settings
                        </h1>
                    </div>

                    <div className="space-y-5">
                        <div className="rounded-2xl bg-slate-100 p-4">
                            <div className="mb-3">
                                <h2 className="font-semibold">
                                    Unité de température
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleTemperatureUnitChange('celsius')
                                    }
                                    disabled={isUpdatingTemperature}
                                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${temperatureUnit === 'celsius'
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    Celsius °C
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleTemperatureUnitChange('fahrenheit')
                                    }
                                    disabled={isUpdatingTemperature}
                                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${temperatureUnit === 'fahrenheit'
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    Fahrenheit °F
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 p-4">
                            <div>
                                <h2 className="font-semibold">
                                    Géolocalisation
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Autoriser Clima à utiliser ta position.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsLocationEnabled(
                                        (previousValue) => !previousValue
                                    )
                                }
                                className={`relative h-7 w-12 shrink-0 rounded-full transition ${isLocationEnabled
                                    ? 'bg-slate-900'
                                    : 'bg-slate-300'
                                    }`}
                                aria-pressed={isLocationEnabled}
                                aria-label="Activer ou désactiver la géolocalisation"
                            >
                                <span
                                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${isLocationEnabled
                                        ? 'left-6'
                                        : 'left-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="rounded-2xl bg-slate-100 p-4">
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoggingOut
                                    ? 'Déconnexion...'
                                    : 'Se déconnecter'}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Settings