import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import Settings from './pages/Settings'
import Login from './pages/Login'

function App() {
  return (
    <main className="min-h-screen bg-[#e7e7e7] text-[#1e1e2e]">
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