'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    
    if (!storedUserData) {
      router.push('/')
      return
    }
    
    setUserData(JSON.parse(storedUserData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('userData')
    router.push('/')
  }

  if (!userData) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-white shadow-lg rounded-lg px-8 py-10">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Biblioteca Virtual NovaLearn
        </h1>
        
        <div className="text-center text-lg mb-6">
          ¡Bienvenid@, <span className="font-bold">{userData.fullName}</span>!
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="mb-2">Tu libro favorito:</p>
          <p className="text-lg font-semibold text-primary">
            "{userData.favoriteBook}"
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}