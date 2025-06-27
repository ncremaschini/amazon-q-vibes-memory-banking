# Key Decisions Log

## Architecture Decisions
- **2025-06-27**: Single-page app with local storage - Simple and fast for MVP
- **2025-06-27**: Next.js with app directory - Modern React with built-in API routes
- **2025-06-27**: Manual project setup over create-next-app - Avoid interactive prompts that cause stuck agents

## Technology Choices
- **2025-06-27**: Chose Next.js over plain React because built-in API routes simplify data handling
- **2025-06-27**: Decided to use TailwindCSS for rapid styling and responsive design
- **2025-06-27**: Local JSON files over database for simplicity and zero setup
- **2025-06-27**: TypeScript for better development experience and type safety

## Trade-offs Accepted
- **2025-06-27**: No cloud sync for offline-first simplicity and privacy
- **2025-06-27**: Basic analytics over complex insights to keep scope manageable
- **2025-06-27**: Manual setup time vs avoiding interactive command issues

## Patterns Established
- **2025-06-27**: Component-based architecture with clear separation of concerns
- **2025-06-27**: Data stored as daily entries with timestamp, project, duration, rating
- **2025-06-27**: Use auto-approve flags for all commands to avoid stuck agents

## Things NOT to Revisit
- Database choice - JSON files are perfect for this scope
- Authentication - Not needed for local-only MVP
- Interactive command setup - Always use manual or auto-approve approaches

## Lessons Learned
- Starting with clear success criteria helps focus on essential features
- Manual project setup is more reliable than interactive tools in AI environments
- **2025-06-27**: Always commit state.md immediately after updates - context preservation depends on it
