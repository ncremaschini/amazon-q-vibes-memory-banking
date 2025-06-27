'use client'

import { useState } from 'react'
import HabitForm from '@/components/HabitForm'
import HabitList from '@/components/HabitList'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleHabitAdded = () => {
    // Trigger refresh of habit list
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Builder Tracker</h1>
        <p className="text-gray-600">Track your daily coding habits and improve your focus</p>
        
        {/* Navigation */}
        <div className="mt-4">
          <a
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            📊 View Dashboard
          </a>
        </div>
      </header>
      
      <div className="grid md:grid-cols-2 gap-8">
        <HabitForm onSuccess={handleHabitAdded} />
        <div key={refreshKey}>
          <HabitList />
        </div>
      </div>
    </main>
  )
}
