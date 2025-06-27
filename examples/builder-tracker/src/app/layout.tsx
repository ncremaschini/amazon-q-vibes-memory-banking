import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Builder Tracker',
  description: 'Track your daily coding habits and improve your focus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}
