function SearchBar() {
    return (
        <section className="rounded-[32px] bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 text-center md:text-left">
                <h2 className="text-xl font-bold">
                    Rechercher une ville
                </h2>
            </div>

            <form className="flex flex-col gap-3 md:flex-row">
                <input
                    type="text"
                    placeholder="Ex : Paris, Lyon..."
                    className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm outline-none placeholder:text-slate-400 md:text-left"
                />

                <button
                    type="button"
                    className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 md:w-auto"
                >
                    Rechercher
                </button>
            </form>
        </section>
    )
}

export default SearchBar