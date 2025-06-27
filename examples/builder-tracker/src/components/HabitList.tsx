'use client'

import { useState, useEffect } from 'react'
import { HabitEntry } from '@/lib/types'

export default function HabitList() {
  const [habits, setHabits] = useState<HabitEntry[]>([])
  const [loading, setLoading] = useState(true)

  const loadHabits = async () => {
    try {
      const response = await fetch('/api/habits')
      if (response.ok) {
        const data = await response.json()
        // Sort by date and time, most recent first
        const sortedEntries = data.entries.sort((a: HabitEntry, b: HabitEntry) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setHabits(sortedEntries.slice(0, 5)) // Show last 5 entries
      }
    } catch (error) {
      console.error('Error loading habits:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHabits()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getProductivityColor = (rating: number) => {
    const colors = {
      1: 'text-red-600 bg-red-50',
      2: 'text-orange-600 bg-orange-50',
      3: 'text-yellow-600 bg-yellow-50',
      4: 'text-green-600 bg-green-50',
      5: 'text-emerald-600 bg-emerald-50'
    }
    return colors[rating as keyof typeof colors] || 'text-gray-600 bg-gray-50'
  }

  const getProductivityLabel = (rating: number) => {
    const labels = {
      1: 'Very Low',
      2: 'Low',
      3: 'Neutral',
      4: 'Good',
      5: 'Excellent'
    }
    return labels[rating as keyof typeof labels] || 'Unknown'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
      
      {habits.length === 0 ? (
        <p className="text-gray-600">No habits logged yet. Start by logging your first coding session!</p>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <div key={habit.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 truncate flex-1 mr-2">
                  {habit.project}
                </h3>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {formatDate(habit.date)}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">
                  {habit.duration} min
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProductivityColor(habit.productivity)}`}>
                  {getProductivityLabel(habit.productivity)}
                </span>
              </div>
              
              {habit.notes && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  "{habit.notes}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
