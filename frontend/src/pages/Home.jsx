import { useState, useEffect } from 'react'
import '../App.css'

import { getCurrentWeather } from '../services/weatherApi'
import { useAuth } from '../contexts/AuthContext'

import Header from '../components/Header'
import CurrentWeather from '../components/CurrentWeather'
import SearchBar from '../components/SearchBar'
import HourlyForecast from '../components/HourlyForecast'
import DailyForecast from '../components/DailyForecast'
import WeatherStats from '../components/WeatherStats'
import FavoriteCities from '../components/FavoriteCities'

function Home() {
  const { user } = useAuth()
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCurrentWeather('Roanne')
      .then((data) => {
        setWeather(data)
      })
      .catch((error) => {
        console.error(error)
        setError('Impossible de récupérer la météo.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-[#e7e7e7] text-[#1e1e2e]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5">

        <Header />

        {loading && (
          <p className="text-center text-sm text-[#6b7280]">
            Chargement...
          </p>
        )}

        {error && (
          <p className="text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {weather && (
          <>
            <CurrentWeather
              weather={weather}
              temperatureUnit={user?.temperatureUnit} />

            <SearchBar />

            <HourlyForecast
              hourly={weather.forecast.hourly}
              localTime={weather.location.localTime}
              temperatureUnit={user?.temperatureUnit} />

            <DailyForecast
              daily={weather.forecast.daily}
              temperatureUnit={user?.temperatureUnit} />

            <WeatherStats
              current={weather.current}
              today={weather.forecast.today}
              temperatureUnit={user?.temperatureUnit} />

            <FavoriteCities />
          </>
        )}

      </div>
    </main>
  )
}

export default Home