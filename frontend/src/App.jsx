import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'

import Home from './pages/Home'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import Settings from './pages/Settings'
import Login from './pages/Login'

function App() {
  const { user } = useAuth()

  useEffect(() => {
    const isDarkTheme = user?.theme === 'dark'

    document.documentElement.classList.toggle('dark', isDarkTheme)
  }, [user?.theme])

  return (
    <main
      className="
                min-h-screen
                bg-(--color-background)
                text-(--color-text-primary)
            "
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App