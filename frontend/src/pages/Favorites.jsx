import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/Header'

import { useAuth } from '../contexts/AuthContext'
import {
  deleteFavorite,
  getFavorites,
} from '../services/favoriteApi'
import { getCurrentWeather } from '../services/weatherApi'
import {
  convertTemperature,
  getTemperatureUnit,
} from '../utils/temperature'

function Favorites() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [favorites, setFavorites] = useState([])
  const [favoritesWeather, setFavoritesWeather] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const unit = getTemperatureUnit(user?.temperatureUnit)

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true)
        setError(null)

        const favoritesData = await getFavorites()

        setFavorites(favoritesData)

        const weatherResults = await Promise.allSettled(
          favoritesData.map((favorite) =>
            getCurrentWeather(favorite.cityName)
          )
        )

        const weatherByFavoriteId = {}

        weatherResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const favoriteId = favoritesData[index].id

            weatherByFavoriteId[favoriteId] = result.value
          }
        })

        setFavoritesWeather(weatherByFavoriteId)
      } catch (error) {
        console.error('Erreur favoris :', error)
        setError('Impossible de récupérer les favoris.')
      } finally {
        setLoading(false)
      }
    }

    if (!user) {
      setFavorites([])
      setFavoritesWeather({})
      setLoading(false)
      return
    }

    loadFavorites()
  }, [user])

  function handleSelectFavorite(favorite) {
    if (isEditing) {
      return
    }

    navigate('/', {
      state: {
        city: {
          name: favorite.cityName,
        },
      },
    })
  }

  async function handleDeleteFavorite(favoriteId) {
    try {
      setDeletingId(favoriteId)
      setError(null)

      await deleteFavorite(favoriteId)

      setFavorites((previousFavorites) =>
        previousFavorites.filter(
          (favorite) => favorite.id !== favoriteId
        )
      )

      setFavoritesWeather((previousWeather) => {
        const updatedWeather = { ...previousWeather }

        delete updatedWeather[favoriteId]

        return updatedWeather
      })
    } catch (error) {
      console.error('Erreur suppression favori :', error)
      setError('Impossible de supprimer ce favori.')
    } finally {
      setDeletingId(null)
    }
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
            <div className="flex min-w-0 items-center gap-3">
              <Link
                to="/"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg transition hover:bg-slate-200"
                aria-label="Retour à l'accueil"
              >
                ←
              </Link>

              <h1 className="truncate text-2xl font-bold">
                Favoris
              </h1>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/search"
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
              >
                Ajouter
              </Link>

              {favorites.length > 0 && (
                <button
                  type="button"
                  onClick={handleToggleEditMode}
                  className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
                >
                  {isEditing ? 'Terminé' : 'Modifier'}
                </button>
              )}
            </div>
          </div>

          {error && (
            <p className="mb-4 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-center text-sm text-slate-500">
              Chargement des favoris...
            </p>
          ) : favorites.length > 0 ? (
            <div className="space-y-3">
              {favorites.map((favorite) => {
                const weather = favoritesWeather[favorite.id]

                return (
                  <div
                    key={favorite.id}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-slate-100 px-4 py-3"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectFavorite(favorite)
                      }
                      disabled={isEditing}
                      className="flex min-w-0 flex-1 items-center justify-between gap-4 text-left disabled:cursor-default"
                    >
                      <span className="truncate font-medium">
                        {favorite.cityName}
                        {favorite.country &&
                          `, ${favorite.country}`}
                      </span>

                      {!isEditing && (
                        <div className="flex shrink-0 items-center gap-3">
                          {weather ? (
                            <>
                              <img
                                src={weather.current.condition.icon}
                                alt={weather.current.condition.text}
                                className="h-10 w-10 object-contain"
                              />

                              <span className="text-lg font-bold">
                                {convertTemperature(
                                  weather.current
                                    .temperatureCelsius,
                                  user?.temperatureUnit
                                )}
                                {unit}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-slate-400">
                              Indisponible
                            </span>
                          )}
                        </div>
                      )}
                    </button>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteFavorite(favorite.id)
                        }
                        disabled={deletingId === favorite.id}
                        className="shrink-0 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Supprimer ${favorite.cityName} des favoris`}
                      >
                        {deletingId === favorite.id
                          ? 'Suppression...'
                          : 'Supprimer'}
                      </button>
                    )}
                  </div>
                )
              })}
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