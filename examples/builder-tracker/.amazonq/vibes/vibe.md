# Collaboration Style

## Working Preferences
- **Decision making**: Ask me only for big architectural decisions and major trade-offs
- **Task breakdown**: Break work into small, logical chunks automatically
- **Code style**: Prioritize readability and speed over optimization
- **Error handling**: Basic error handling is fine, don't over-engineer
- **Testing**: Manual testing only unless I specifically ask for automated tests
- **Process management**: When asked to stop/teardown processes, provide clear commands to kill background processes (e.g., `pkill -f "npm start"`, `lsof -ti:3000 | xargs kill`, or process-specific stop commands)
- **Command execution**: Always use auto-approve flags when available (e.g., `npm init -y`, `git add .`, etc.). If a command might prompt for input and no auto-approve flag exists, ask me to run it manually instead of getting stuck
- **Interactive commands**: Never run commands that wait for user input - either use non-interactive flags or ask me to run them
- **Long-running processes**: Always run dev servers, databases, and other long-running processes in detached/background mode so the session doesn't get stuck (use `&`, `nohup`, or ask me to run manually)
- **Network testing**: Always use timeouts with curl/wget (e.g., `curl --max-time 5` or `wget --timeout=5`) to prevent hanging
- **Assumptions**: Make reasonable assumptions rather than asking about everything
- **Cost-conscious**: Prefer minimal infrastructure and simple solutions

## Don't Ask Me About
- File naming conventions (use sensible defaults)
- Minor styling decisions
- Standard project structure choices
- Common dependency choices for the stack
- Basic configuration options

## Do Ask Me About
- Major architecture decisions
- Technology stack choices
- Data modeling approaches
- Integration strategies
- Deployment approaches
- When to merge feature branches back to main

## Code Structure Preferences
- **Frontend**: React with tailwindcss/Next.js preference
- **Backend**: Node.js with Express preference
- **Database**: no dabase required, just JSON files persisted locally
- **Deployment**: no deployment required, just local development

## Git Workflow
- Create new branch for each feature: `git checkout -b feature/feature-name`
- Work on feature branch, commit regularly
- **CRITICAL: After ANY state.md update**: IMMEDIATELY run `git add .amazonq/vibes/state.md && git commit -m "Update state.md: [brief description]"`
- **Feature completion**: When a feature is complete, ask me before merging back to main
- **New feature check**: Before starting new work, if still on a feature branch from previous completed task, ask me about merging to main first
- Keep main branch clean and working
- **Initial setup**: After creating project structure, always run:
  1. `git init`
  2. `git add .`
  3. `git commit -m "Initial commit: Q-Proto structure and project setup"`
  4. `git checkout -b feature/initial-setup`
- **End-of-session**: Always commit final changes with descriptive message
- **Commit frequency**: Regular commits during development to track progress

## Security Practices
- **NEVER** write secrets directly in code or documentation
- Use placeholder values in examples: `API_KEY=your_api_key_here`
- All secrets go in .env files (excluded by .gitignore)
- Reference environment variables in code: `process.env.API_KEY`
- **Never commit secrets**: All sensitive data in .env files
- **Comprehensive .gitignore**: Exclude .env, node_modules, build artifacts, logs and other sensitive files
- **Create .env.example**: Template with placeholder values (no real secrets)

## Speed vs Quality Trade-offs
- Favor working code over perfect code
- Use established patterns over custom solutions
- Prioritize core functionality over edge cases
- Choose simple over clever

## Documentation Requirements
- **Root `README.md`** - Technical overview and setup instructions (in project root)
- **Create `/docs` folder** with:
  - `press-release.md` - Business stakeholder summary (always created)
  - `architecture.md` - System design (created when requested)
- **Press release focuses** on value and outcomes for business stakeholders
- **Technical docs explain** evolution path to production
- **Keep documentation minimal** - focus on what's needed to understand and continue the project
