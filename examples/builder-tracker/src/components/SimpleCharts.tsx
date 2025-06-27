'use client'

import { HabitEntry } from '@/lib/types'

interface ChartsProps {
  habits: HabitEntry[]
}

export default function SimpleCharts({ habits }: ChartsProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data to visualize yet.</p>
        <p className="text-sm mt-2">Log some coding sessions to see your trends!</p>
      </div>
    )
  }

  // Simple data calculations
  const totalTime = habits.reduce((sum, habit) => sum + habit.duration, 0)
  const avgProductivity = habits.reduce((sum, habit) => sum + habit.productivity, 0) / habits.length
  
  // Get last 7 days data
  const last7Days = getLast7DaysData(habits)
  
  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{habits.length}</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(totalTime / 60 * 10) / 10}h</div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(avgProductivity * 10) / 10}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.round(totalTime / habits.length)}</div>
            <div className="text-sm text-gray-600">Avg Session</div>
          </div>
        </div>
      </div>

      {/* Simple Bar Chart for Last 7 Days */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Activity (Last 7 Days)</h3>
        <div className="space-y-3">
          {last7Days.map((day, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-600">{day.label}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div 
                  className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${Math.max(5, (day.totalTime / Math.max(...last7Days.map(d => d.totalTime))) * 100)}%` }}
                >
                  <span className="text-white text-xs font-medium">
                    {day.totalTime}min
                  </span>
                </div>
              </div>
              <div className="w-16 text-sm text-gray-600">
                ⭐ {day.avgProductivity || 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        <div className="space-y-2">
          {getProjectBreakdown(habits).map((project, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium">{project.name}</span>
              <div className="text-right">
                <div className="text-sm font-medium">{Math.round(project.time / 60 * 10) / 10}h</div>
                <div className="text-xs text-gray-500">{project.sessions} sessions</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getLast7DaysData(habits: HabitEntry[]) {
  const today = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  return last7Days.map(date => {
    const dayHabits = habits.filter(habit => 
      habit.createdAt.startsWith(date)
    )
    
    const totalTime = dayHabits.reduce((sum, habit) => sum + habit.duration, 0)
    const avgProductivity = dayHabits.length > 0 
      ? Math.round((dayHabits.reduce((sum, habit) => sum + habit.productivity, 0) / dayHabits.length) * 10) / 10
      : 0

    const d = new Date(date)
    const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

    return {
      date,
      label,
      totalTime,
      avgProductivity
    }
  })
}

function getProjectBreakdown(habits: HabitEntry[]) {
  const projectData: { [key: string]: { time: number, sessions: number } } = {}
  
  habits.forEach(habit => {
    const project = habit.project || 'Unnamed Project'
    if (!projectData[project]) {
      projectData[project] = { time: 0, sessions: 0 }
    }
    projectData[project].time += habit.duration
    projectData[project].sessions += 1
  })

  return Object.entries(projectData)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.time - a.time)
}
