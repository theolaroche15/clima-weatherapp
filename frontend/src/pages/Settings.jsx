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

    const [theme, setTheme] = useState(
        user?.theme || 'light'
    )
    const [isUpdatingTheme, setIsUpdatingTheme] = useState(false)

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (user?.temperatureUnit) {
            setTemperatureUnit(user.temperatureUnit)
        }

        if (user?.theme) {
            setTheme(user.theme)
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

    async function handleThemeChange(newTheme) {
        if (
            newTheme === theme ||
            isUpdatingTheme
        ) {
            return
        }

        const previousTheme = theme

        setTheme(newTheme)
        setIsUpdatingTheme(true)

        try {
            await updateSettings({
                theme: newTheme,
            })
        } catch (error) {
            setTheme(previousTheme)

            console.error(
                'Erreur lors de la mise à jour du thème :',
                error
            )
        } finally {
            setIsUpdatingTheme(false)
        }
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
                            aria-label="Retour à l'accueil"
                        >
                            ←
                        </Link>

                        <h1 className="hidden lg:block font-title text-2xl">
                            Settings
                        </h1>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-3 font-title">
                                Unité de température
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleTemperatureUnitChange('celsius')
                                    }
                                    disabled={isUpdatingTemperature}
                                    className={`
                                        rounded-2xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-detail
                                        transition
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        ${temperatureUnit === 'celsius'
                                            ? 'bg-(--color-secondary) text-(--color-primary)'
                                            : 'bg-transparent text-(--color-text-primary) hover:bg-(--color-background)'
                                        }
                                    `}
                                >
                                    Celsius °C
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleTemperatureUnitChange('fahrenheit')
                                    }
                                    disabled={isUpdatingTemperature}
                                    className={`
                                        rounded-2xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-detail
                                        transition
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        ${temperatureUnit === 'fahrenheit'
                                            ? 'bg-(--color-secondary) text-(--color-primary)'
                                            : 'bg-transparent text-(--color-text-primary) hover:bg-(--color-background)'
                                        }
                                    `}
                                >
                                    Fahrenheit °F
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 font-title">
                                Thème
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleThemeChange('light')
                                    }
                                    disabled={isUpdatingTheme}
                                    className={`
                                        rounded-2xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-detail
                                        transition
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        ${theme === 'light'
                                            ? 'bg-(--color-secondary) text-(--color-primary)'
                                            : 'bg-transparent text-(--color-text-primary) hover:bg-(--color-background)'
                                        }
                                    `}
                                >
                                    Clair
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleThemeChange('dark')
                                    }
                                    disabled={isUpdatingTheme}
                                    className={`
                                        rounded-2xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-detail
                                        transition
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        ${theme === 'dark'
                                            ? 'bg-(--color-secondary) text-(--color-primary)'
                                            : 'bg-transparent text-(--color-text-primary) hover:bg-(--color-background)'
                                        }
                                    `}
                                >
                                    Sombre
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="
                                    w-full
                                    rounded-2xl
                                    bg-red-600
                                    px-4
                                    py-3
                                    text-sm
                                    font-detail
                                    text-white
                                    transition
                                    hover:bg-red-700
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
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