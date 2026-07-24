import { Link } from 'react-router-dom'

function SearchBar() {
    return (
        <section className="rounded-4xl bg-(--color-primary) p-5 md:p-6">
            <Link
                to="/search"
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    px-4
                    py-4
                    font-detail
                    text-(--color-text-primary)
                    transition
                    hover:bg-(--color-background)
                "
            >
                <span>Rechercher une ville</span>

                <span aria-hidden="true">
                    <i
                        className="fa-solid fa-magnifying-glass"
                        style={{ color: 'rgb(116, 192, 252)' }}
                    ></i>
                </span>
            </Link>
        </section>
    )
}

export default SearchBar