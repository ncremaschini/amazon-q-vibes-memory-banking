import { HabitData, HabitEntry } from './types'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'habits.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load habits from JSON file
export async function loadHabits(): Promise<HabitData> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist or is invalid, return empty data
    return { entries: [] }
  }
}

// Save habits to JSON file
export async function saveHabits(data: HabitData): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

// Add a new habit entry
export async function addHabitEntry(entry: Omit<HabitEntry, 'id' | 'createdAt'>): Promise<HabitEntry> {
  const data = await loadHabits()
  
  const newEntry: HabitEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }
  
  data.entries.push(newEntry)
  await saveHabits(data)
  
  return newEntry
}

// Get habits for a specific date
export async function getHabitsForDate(date: string): Promise<HabitEntry[]> {
  const data = await loadHabits()
  return data.entries.filter(entry => entry.date === date)
}
