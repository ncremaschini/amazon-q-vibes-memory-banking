'use client'

import { useState, useEffect } from 'react'
import { HabitEntry } from '@/lib/types'
import SimpleCharts from '@/components/SimpleCharts'

interface DashboardStats {
  totalSessions: number
  totalTime: number
  averageProductivity: number
  averageSessionLength: number
}

export default function Dashboard() {
  const [habits, setHabits] = useState<HabitEntry[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits')
      const data = await response.json()
      setHabits(data.entries || [])
      calculateStats(data.entries || [])
    } catch (error) {
      console.error('Error fetching habits:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (entries: HabitEntry[]) => {
    if (entries.length === 0) {
      setStats({
        totalSessions: 0,
        totalTime: 0,
        averageProductivity: 0,
        averageSessionLength: 0
      })
      return
    }

    const totalTime = entries.reduce((sum, entry) => sum + entry.duration, 0)
    const totalProductivity = entries.reduce((sum, entry) => sum + entry.productivity, 0)

    setStats({
      totalSessions: entries.length,
      totalTime,
      averageProductivity: Math.round((totalProductivity / entries.length) * 10) / 10,
      averageSessionLength: Math.round(totalTime / entries.length)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Coding Habits Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your progress and identify patterns</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Sessions"
              value={stats.totalSessions}
              suffix="sessions"
              icon="📊"
            />
            <StatCard
              title="Total Time"
              value={Math.round(stats.totalTime / 60 * 10) / 10}
              suffix="hours"
              icon="⏱️"
            />
            <StatCard
              title="Avg Productivity"
              value={stats.averageProductivity}
              suffix="/ 5"
              icon="⭐"
            />
            <StatCard
              title="Avg Session"
              value={stats.averageSessionLength}
              suffix="min"
              icon="🎯"
            />
          </div>
        )}

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Analytics & Trends</h2>
          <SimpleCharts habits={habits} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {habits.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No coding sessions logged yet.</p>
              <a href="/" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                Log your first session →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {habits.slice(0, 5).map((habit) => (
                <div key={habit.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{habit.project}</h3>
                      <p className="text-sm text-gray-600">
                        {habit.duration} min • Productivity: {habit.productivity}/5
                      </p>
                      {habit.notes && (
                        <p className="text-sm text-gray-500 mt-1">{habit.notes}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(habit.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              {habits.length > 5 && (
                <p className="text-sm text-gray-500 text-center pt-4">
                  Showing 5 most recent sessions
                </p>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Logging
          </a>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  suffix: string
  icon: string
}

function StatCard({ title, value, suffix, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {value} <span className="text-sm font-normal text-gray-500">{suffix}</span>
          </p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  )
}
