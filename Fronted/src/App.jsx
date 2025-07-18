import { useState } from 'react'
import Login from './pages/Login'
import MCQTest from './pages/MCQTest'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (username) => {
    setUser(username)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="app">
      {user ? (
        <MCQTest onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
