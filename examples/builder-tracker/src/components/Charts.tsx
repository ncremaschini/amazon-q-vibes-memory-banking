'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { HabitEntry } from '@/lib/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface ChartsProps {
  habits: HabitEntry[]
}

export default function Charts({ habits }: ChartsProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data to visualize yet.</p>
        <p className="text-sm mt-2">Log some coding sessions to see your trends!</p>
      </div>
    )
  }

  // Prepare data for charts
  const last7Days = getLast7DaysData(habits)
  const productivityDistribution = getProductivityDistribution(habits)
  const projectBreakdown = getProjectBreakdown(habits)

  return (
    <div className="space-y-8">
      {/* Productivity Trend */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Productivity Trend (Last 7 Days)</h3>
        <div className="h-64">
          <Line
            data={last7Days.productivityData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 5,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Daily Time Spent */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Time Spent (Last 7 Days)</h3>
        <div className="h-64">
          <Bar
            data={last7Days.timeData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return value + ' min'
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Productivity Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Productivity Distribution</h3>
          <div className="h-64">
            <Doughnut
              data={productivityDistribution}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Project Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Time by Project</h3>
          <div className="h-64">
            <Doughnut
              data={projectBreakdown}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.label || ''
                        const value = context.parsed
                        const hours = Math.round(value / 60 * 10) / 10
                        return `${label}: ${hours}h (${value}min)`
                      }
                    }
                  }
                },
              }}
            />
          </div>
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

  const dailyData = last7Days.map(date => {
    const dayHabits = habits.filter(habit => 
      habit.createdAt.startsWith(date)
    )
    
    const totalTime = dayHabits.reduce((sum, habit) => sum + habit.duration, 0)
    const avgProductivity = dayHabits.length > 0 
      ? dayHabits.reduce((sum, habit) => sum + habit.productivity, 0) / dayHabits.length
      : 0

    return {
      date,
      totalTime,
      avgProductivity: Math.round(avgProductivity * 10) / 10
    }
  })

  const labels = last7Days.map(date => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  })

  return {
    productivityData: {
      labels,
      datasets: [
        {
          label: 'Average Productivity',
          data: dailyData.map(d => d.avgProductivity),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
      ],
    },
    timeData: {
      labels,
      datasets: [
        {
          label: 'Time Spent (minutes)',
          data: dailyData.map(d => d.totalTime),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1,
        },
      ],
    },
  }
}

function getProductivityDistribution(habits: HabitEntry[]) {
  const distribution = [0, 0, 0, 0, 0] // ratings 1-5
  
  habits.forEach(habit => {
    if (habit.productivity >= 1 && habit.productivity <= 5) {
      distribution[habit.productivity - 1]++
    }
  })

  return {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        data: distribution,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   // red
          'rgba(245, 158, 11, 0.8)',  // amber
          'rgba(59, 130, 246, 0.8)',  // blue
          'rgba(34, 197, 94, 0.8)',   // green
          'rgba(168, 85, 247, 0.8)',  // purple
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(168, 85, 247)',
        ],
        borderWidth: 2,
      },
    ],
  }
}

function getProjectBreakdown(habits: HabitEntry[]) {
  const projectTimes: { [key: string]: number } = {}
  
  habits.forEach(habit => {
    const project = habit.project || 'Unnamed Project'
    projectTimes[project] = (projectTimes[project] || 0) + habit.duration
  })

  const projects = Object.keys(projectTimes)
  const times = Object.values(projectTimes)

  // Generate colors for projects
  const colors = [
    'rgba(59, 130, 246, 0.8)',   // blue
    'rgba(34, 197, 94, 0.8)',    // green
    'rgba(245, 158, 11, 0.8)',   // amber
    'rgba(168, 85, 247, 0.8)',   // purple
    'rgba(239, 68, 68, 0.8)',    // red
    'rgba(20, 184, 166, 0.8)',   // teal
    'rgba(236, 72, 153, 0.8)',   // pink
    'rgba(99, 102, 241, 0.8)',   // indigo
  ]

  return {
    labels: projects,
    datasets: [
      {
        data: times,
        backgroundColor: colors.slice(0, projects.length),
        borderColor: colors.slice(0, projects.length).map(color => 
          color.replace('0.8', '1')
        ),
        borderWidth: 2,
      },
    ],
  }
}
