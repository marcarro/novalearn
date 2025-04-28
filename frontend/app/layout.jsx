import './globals.css'

export const metadata = {
  title: 'NovaLearn - Biblioteca Virtual',
  description: 'Acceso a la Biblioteca Virtual para estudiantes de NovaLearn',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <main className="min-h-screen flex items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  )
}