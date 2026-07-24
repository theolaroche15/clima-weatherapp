import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
    const { isAuthenticated } = useAuth()

    return (
        <header
            className="
                flex
                items-center
                justify-between
                rounded-3xl
                bg-(--color-primary)
                px-4
                py-3
            "
        >
            <div>
                {isAuthenticated ? (
                    <Link
                        to="/settings"
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
                        aria-label="Ouvrir les réglages"
                        title="Réglages"
                    >
                        <i
                            className="fa-solid fa-gear"
                            style={{ color: 'rgb(192, 192, 192)' }}
                        ></i>
                    </Link>
                ) : (
                    <Link
                        to="/login"
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
                        aria-label="Se connecter"
                        title="Connexion"
                    >
                        <i
                            className="fa-solid fa-user"
                            style={{ color: 'rgb(0, 0, 0)' }}
                        ></i>
                    </Link>
                )}
            </div>

            <nav
                className="flex items-center gap-2"
                aria-label="Navigation principale"
            >
                <Link
                    to="/search"
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
                    aria-label="Rechercher une ville"
                    title="Rechercher"
                >
                    <i
                        className="fa-solid fa-magnifying-glass"
                        style={{ color: 'rgb(116, 192, 252)' }}
                    ></i>
                </Link>

                {isAuthenticated && (
                    <Link
                        to="/favorites"
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
                        aria-label="Afficher mes favoris"
                        title="Favoris"
                    >
                        <i
                            className="fa-solid fa-star"
                            style={{ color: 'rgb(255, 212, 59)' }}
                        ></i>
                    </Link>
                )}
            </nav>
        </header>
    )
}

export default Header