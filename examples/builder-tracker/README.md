# Builder Tracker - Technical Overview

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Architecture

- **Frontend**: Next.js 15 with React and TailwindCSS
- **Data**: Local JSON file storage in `/data` directory
- **State**: React hooks for simple state management
- **Styling**: TailwindCSS for responsive design

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Data Structure

Habits are stored as JSON entries with:
- `date`: ISO date string
- `project`: String description of what was worked on
- `duration`: Number of minutes spent
- `productivity`: Rating from 1-5
- `notes`: Optional additional notes

## File Structure

- `/src/app` - Next.js pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utilities and data handling
- `/data` - Local JSON storage
- `/.amazonq/vibes` - Q-Vibes context files

## Evolution Path to Production

1. **Database**: Replace JSON files with SQLite or PostgreSQL
2. **Authentication**: Add user accounts and sessions
3. **Cloud Sync**: Add data synchronization across devices
4. **Analytics**: Enhanced insights and pattern recognition
5. **Mobile App**: React Native companion app
