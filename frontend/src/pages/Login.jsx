import { useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'

function Login() {
    const [isRegisterMode, setIsRegisterMode] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()

        if (isRegisterMode) {
            console.log('Création du compte')
            return
        }

        console.log('Connexion')
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegisterMode && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Nom
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none"
                                    placeholder="Ton nom"
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
                                    isRegisterMode ? 'new-password' : 'current-password'
                                }
                                required
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
                                    className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none"
                                    placeholder="Confirme ton mot de passe"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            {isRegisterMode ? 'Créer mon compte' : 'Se connecter'}
                        </button>
                    </form>

                    <button
                        type="button"
                        onClick={() => setIsRegisterMode((previousValue) => !previousValue)}
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