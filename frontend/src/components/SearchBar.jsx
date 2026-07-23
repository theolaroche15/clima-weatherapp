import { Link } from 'react-router-dom'

function SearchBar() {
    return (
        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
            <Link
                to="/search"
                className="flex w-full items-center justify-between rounded-2xl bg-slate-100 px-4 py-4 font-medium transition hover:bg-slate-200"
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