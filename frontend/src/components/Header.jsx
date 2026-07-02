function Header() {
    const userLocation = 'Roanne, France'

    return (
        <header className="flex items-center justify-between rounded-4xl bg-white px-4 py-3 shadow-sm">
            <h1 className="shrink-0 text-xl font-bold tracking-tight">
                Clima
            </h1>

            <button
                type="button"
                className="hidden items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 md:flex"
                aria-label="Afficher la météo de ma position actuelle"
            >
                <span className="text-xs">⌖</span>
                <span>{userLocation}</span>
            </button>

            <div className="flex items-center gap-2">
                <form className="hidden md:block">
                    <input
                        type="text"
                        placeholder="Rechercher une ville..."
                        className="w-56 rounded-2xl bg-slate-100 px-4 py-2 text-sm outline-none placeholder:text-slate-400 focus:bg-slate-200"
                    />
                </form>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200 md:hidden"
                    aria-label="Rechercher une ville"
                >
                    🔍
                </button>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                    aria-label="Ouvrir le menu utilisateur"
                >
                    👤
                </button>
            </div>
        </header>
    )
}

export default Header