import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/Header'

const initialFavorites = [
  {
    city: 'Roanne',
    country: 'France',
  },
  {
    city: 'Paris',
    country: 'France',
  },
  {
    city: 'Lyon',
    country: 'France',
  },
  {
    city: 'Nice',
    country: 'France',
  },
]

function Favorites() {
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState(initialFavorites)
  const [isEditing, setIsEditing] = useState(false)

  function handleSelectFavorite(favorite) {
    if (isEditing) {
      return
    }

    // Plus tard, on transmettra réellement la ville sélectionnée à la Home.
    console.log('Favori sélectionné :', favorite)

    navigate('/')
  }

  function handleDeleteFavorite(cityToDelete) {
    setFavorites((previousFavorites) =>
      previousFavorites.filter(
        (favorite) => favorite.city !== cityToDelete
      )
    )
  }

  function handleMoveFavorite(index, direction) {
    setFavorites((previousFavorites) => {
      const newIndex = index + direction

      if (newIndex < 0 || newIndex >= previousFavorites.length) {
        return previousFavorites
      }

      const updatedFavorites = [...previousFavorites]
      const favoriteToMove = updatedFavorites[index]

      updatedFavorites[index] = updatedFavorites[newIndex]
      updatedFavorites[newIndex] = favoriteToMove

      return updatedFavorites
    })
  }

  function handleToggleEditMode() {
    setIsEditing((previousValue) => !previousValue)
  }

  return (
    <main className="min-h-screen bg-[#e7e7e7] text-[#1e1e2e]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 md:p-6">
        <div className="hidden md:block">
          <Header />
        </div>

        <section className="rounded-4xl bg-white p-5 shadow-sm md:p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                aria-label="Retour à l'accueil"
              >
                ←
              </Link>

              <h1 className="text-2xl font-bold">
                Favoris
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {!isEditing && (
                <Link
                  to="/search"
                  className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
                >
                  Ajouter
                </Link>
              )}

              <button
                type="button"
                onClick={handleToggleEditMode}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
              >
                {isEditing ? 'Terminé' : 'Modifier'}
              </button>
            </div>
          </div>

          {favorites.length > 0 ? (
            <div className="space-y-3">
              {favorites.map((favorite, index) => (
                <div
                  key={`${favorite.city}-${favorite.country}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-slate-100 px-4 py-3"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectFavorite(favorite)}
                    disabled={isEditing}
                    className="flex min-w-0 flex-1 items-center justify-between text-left disabled:cursor-default"
                  >
                    <span className="truncate font-medium">
                      {favorite.city}, {favorite.country}
                    </span>

                    {!isEditing && (
                      <span className="ml-3 text-slate-400">
                        →
                      </span>
                    )}
                  </button>

                  {isEditing && (
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveFavorite(index, -1)}
                        disabled={index === 0}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Monter ${favorite.city}`}
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveFavorite(index, 1)}
                        disabled={index === favorites.length - 1}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Descendre ${favorite.city}`}
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteFavorite(favorite.city)
                        }
                        className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                        aria-label={`Supprimer ${favorite.city} des favoris`}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-slate-500">
                Aucun favori enregistré.
              </p>

              <Link
                to="/search"
                className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Ajouter un favori
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Favorites