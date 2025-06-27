export interface HabitEntry {
  id: string
  date: string // ISO date string
  project: string
  duration: number // minutes
  productivity: number // 1-5 rating
  notes?: string
  createdAt: string // ISO timestamp
}

export interface HabitData {
  entries: HabitEntry[]
}
