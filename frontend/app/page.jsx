'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!username || !password) {
      setError('Por favor ingrese nombre de usuario y contraseña')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      
      const response = await axios.post('/api/login', { username, password })
      
      if (response.data.success) {
        localStorage.setItem('userData', JSON.stringify(response.data.user))
        router.push('/welcome')
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Error al iniciar sesión. Por favor intente nuevamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Biblioteca Virtual NovaLearn
        </h1>
        <h2 className="text-xl text-center text-gray-600 mb-6">
          Iniciar Sesión
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" 
              htmlFor="username"
            >
              Nombre de Usuario:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su nombre de usuario"
              required
            />
          </div>
          
          <div className="mb-6">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" 
              htmlFor="password"
            >
              Contraseña:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          
          <div className="flex items-center justify-center">
            <button
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}