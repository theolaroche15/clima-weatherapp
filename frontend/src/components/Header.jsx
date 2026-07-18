import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
    const { isAuthenticated } = useAuth()

    return (
        <header className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm">
            <Link
                to="/"
                className="text-xl font-bold tracking-tight"
            >
                Clima
            </Link>

            <nav
                className="flex items-center gap-2"
                aria-label="Navigation principale"
            >
                <Link
                    to="/search"
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                    aria-label="Rechercher une ville"
                    title="Rechercher"
                >
                    🔍
                </Link>

                {isAuthenticated ? (
                    <>
                        <Link
                            to="/favorites"
                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                            aria-label="Afficher mes favoris"
                            title="Favoris"
                        >
                            ⭐
                        </Link>

                        <Link
                            to="/settings"
                            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                            aria-label="Ouvrir les réglages"
                            title="Réglages"
                        >
                            ⚙️
                        </Link>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                        aria-label="Se connecter"
                        title="Connexion"
                    >
                        👤
                    </Link>
                )}
            </nav>
        </header>
    )
}

export default Header