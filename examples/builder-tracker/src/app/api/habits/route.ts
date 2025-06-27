import { NextRequest, NextResponse } from 'next/server'
import { addHabitEntry, loadHabits } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { project, duration, productivity, notes, date } = body

    // Validation
    if (!project || !duration || !productivity || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (productivity < 1 || productivity > 5) {
      return NextResponse.json(
        { error: 'Productivity rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const entry = await addHabitEntry({
      project: project.trim(),
      duration: parseInt(duration),
      productivity: parseInt(productivity),
      notes: notes?.trim() || '',
      date
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Error saving habit entry:', error)
    return NextResponse.json(
      { error: 'Failed to save habit entry' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await loadHabits()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading habits:', error)
    return NextResponse.json(
      { error: 'Failed to load habits' },
      { status: 500 }
    )
  }
}
