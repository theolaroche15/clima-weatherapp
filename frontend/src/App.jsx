// import { useState } from 'react'
import './App.css'

import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import SearchBar from './components/SearchBar'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import WeatherStats from './components/WeatherStats'
import FavoriteCities from './components/FavoriteCities'

function App() {
  return (
    <main className="min-h-screen bg-[#e7e7e7] text-[#1e1e2e]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5">

        <Header />

        <CurrentWeather />

        <SearchBar />

        <HourlyForecast />

        <DailyForecast />

        <WeatherStats />

        <FavoriteCities />

      </div>
    </main>
  )
}

export default App