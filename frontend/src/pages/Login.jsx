import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

import Header from '../components/Header'

function Login() {
    const [isRegisterMode, setIsRegisterMode] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { login, register } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        setError('')
        setSuccessMessage('')

        if (isRegisterMode && password !== passwordConfirmation) {
            setError('Les mots de passe ne correspondent pas.')
            return
        }

        setIsSubmitting(true)

        try {
            if (isRegisterMode) {
                await register({
                    email,
                    username,
                    password,
                })

                setSuccessMessage(
                    'Ton compte a bien été créé. Tu peux maintenant te connecter.'
                )

                setIsRegisterMode(false)
                setUsername('')
                setPassword('')
                setPasswordConfirmation('')

                return
            }

            await login({
                email,
                password,
            })

            navigate('/')
        } catch (requestError) {
            const validationErrors = requestError.data?.errors

            if (
                validationErrors &&
                typeof validationErrors === 'object'
            ) {
                const firstValidationError =
                    Object.values(validationErrors)[0]

                if (Array.isArray(firstValidationError)) {
                    setError(firstValidationError[0])
                } else {
                    setError(String(firstValidationError))
                }

                return
            }

            if (requestError.status === 401) {
                setError('Email ou mot de passe incorrect.')
                return
            }

            if (requestError.status === 422) {
                setError(
                    requestError.message ||
                    'Les informations renseignées sont invalides.'
                )
                return
            }

            setError(
                requestError.message ||
                'Une erreur est survenue. Réessaie plus tard.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#e7e7e7] text-[#1e1e2e]">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 md:p-6">
                <div className="hidden md:block">
                    <Header />
                </div>

                <section className="mx-auto w-full max-w-xl rounded-4xl bg-white p-5 shadow-sm md:p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <Link
                            to="/"
                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                            aria-label="Retour à l'accueil"
                        >
                            ←
                        </Link>

                        <h1 className="text-2xl font-bold">
                            {isRegisterMode ? 'Créer un compte' : 'Se connecter'}
                        </h1>
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                            {error}
                        </p>
                    )}

                    {successMessage && (
                        <p
                            role="status"
                            className="mb-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700"
                        >
                            {successMessage}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegisterMode && (
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Nom d'utilisateur
                                </label>

                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none"
                                    placeholder="Ton nom d’utilisateur"
                                />
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none"
                                placeholder="exemple@email.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Mot de passe
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={
                                    isRegisterMode
                                        ? 'new-password'
                                        : 'current-password'
                                }
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none"
                                placeholder="Ton mot de passe"
                            />
                        </div>

                        {isRegisterMode && (
                            <div>
                                <label
                                    htmlFor="passwordConfirmation"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Confirmer le mot de passe
                                </label>

                                <input
                                    id="passwordConfirmation"
                                    name="passwordConfirmation"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={passwordConfirmation}
                                    onChange={(event) =>
                                        setPasswordConfirmation(event.target.value)
                                    }
                                    className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none"
                                    placeholder="Confirme ton mot de passe"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting
                                ? 'Chargement...'
                                : isRegisterMode
                                    ? 'Créer mon compte'
                                    : 'Se connecter'}
                        </button>
                    </form>

                    <button
                        type="button"
                        onClick={() => {
                            setIsRegisterMode((previousValue) => !previousValue)
                            setError('')
                            setSuccessMessage('')
                            setPassword('')
                            setPasswordConfirmation('')
                        }}
                        className="mt-5 w-full text-center text-sm font-medium text-slate-600"
                    >
                        {isRegisterMode
                            ? 'J’ai déjà un compte'
                            : 'Créer un compte'}
                    </button>
                </section>
            </div>
        </main>
    )
}

export default Login