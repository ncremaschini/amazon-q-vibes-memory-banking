# Q-Vibes Memory Banking

A lightweight context preservation framework for AI-assisted rapid prototyping and vibe-coding sessions. Tested with Amazon Q Developer CLI (`q chat` command).

The Q-Vibes framework helps maintain context across AI assistant sessions through 5 lightweight files, enabling quick prototype development without losing momentum between sessions.

## Prerequisites

- Have an idea to explore
- Understanding of your collaboration style (git workflow, documentation preferences, etc.) and tech stack
- Access to the template files in `/templates/` folder

## File Templates Overview

The Q-Vibes framework uses 5 essential files, each with a specific purpose and ownership:

### [`q-vibes-memory-banking.md`](q-vibes-memory-banking.md) - The AI Contract
**👤 User copies** | **The most important file** - this contains the complete framework instructions that tell the AI **HOW TO WORK WITH MEMORY BANKING**. This file must be copied into every `.amazonq/vibes/` folder and serves as the AI's operating manual. It defines the file structure, update processes, and memory preservation workflow.

### [`idea.md`](templates/idea.md) - Project Concept  
**🤖 AI creates from user description** | Captures the core concept and success criteria for your prototype. This is your north star - created once and rarely changes. The AI creates this from your initial description, but may ask clarifying questions to complete all sections using the template structure.

### [`vibe.md`](templates/vibe.md) - Collaboration Style
**👤 User creates & maintains** | Defines how you want to collaborate with the AI assistant. Specifies your interaction style, tech stack preferences, decision-making approach, git workflow, security practices, documentation requirements, and speed vs quality trade-offs.

### [`state.md`](templates/state.md) - Technical Snapshot
**🤖 AI creates & maintains** | The living technical snapshot of your prototype. Updated frequently by the AI as you build. Contains current stack, architecture overview, file structure, what's working/broken, immediate next steps, and current focus.

### [`decisions.md`](templates/decisions.md) - Decision Log
**🤖 AI creates & maintains** | Log of key choices made during development. Prevents re-discussing the same decisions. The AI creates and maintains this file as architectural and technical decisions are made, following the template structure.

## How the System Works

This makes the framework complete and self-contained. The AI gets both:
- **How to work** (from the framework instructions in `q-vibes-memory-banking.md`)
- **What to work on** (from the 4 context files: `idea.md`, `vibe.md`, `state.md`, `decisions.md`)

## Quick Project Setup

Follow these steps to set up a new prototype with Q-Vibes Memory Banking (paths are relative to example project root under the /examples/ folder):

```bash
# Create Q-Vibes memory banking structure
mkdir -p .amazonq/vibes
cd .amazonq/vibes

# Copy the AI instructions (tells AI how to use the framework)
cp ../../q-vibes-memory-banking.md .

# Copy ALL template files (AI uses these as references for consistent formatting)
cp ../../templates/*.md ./

# Customize your collaboration template
# Edit vibe.md to match your preferences

# Return to project root
cd ../..

# Start a new prototype session prompting the AI (see example prompts below)
q chat 
```

**That's it!** The AI agent will automatically handle:
- Using `idea.md` template when creating from your prototype description
- Using `state.md` template when creating and maintaining technical snapshot
- Using `decisions.md` template when logging decisions
- Following your `vibe.md` preferences for git workflow, security practices, and collaboration style

Just describe your prototype idea to the AI, and it will follow the template formats while using your `vibe.md` preferences.

## Real Example: Builder-Tracker

See the complete working example in [`/examples/builder-tracker/`](examples/builder-tracker/) which demonstrates:
- **Starting prompt** used to initialize the prototype (using the [example prompt below](#starting-a-new-prototype-session))
- **Resume prompt** used to continue work across sessions (using the [example prompt below](#resuming-an-existing-project))
- **Compiled templates** showing how the framework files look when filled out
- **Complete vibe.md** with git workflow, documentation requirements, and collaboration preferences

This example shows the Q-Vibes Memory Banking framework applied to a real prototype project using the exact prompts provided in this README.

## Step-by-Step Usage Guide

### 1. Starting a New Prototype Session
1. **AI reads the framework instructions** (`q-vibes-memory-banking.md`) to understand how to use the framework
2. **Describe your prototype idea** to the AI assistant (can be brief - just the core concept)
3. **AI creates `idea.md`** using the template structure:
   - If your description covers all template sections → AI creates complete `idea.md`
   - If information is missing → AI asks clarifying questions to fill gaps
   - You review and approve the final `idea.md` before proceeding
4. **AI follows your `vibe.md` preferences** for collaboration style, workflow, and project setup
5. **Start coding** - AI maintains `state.md` automatically

*See the [Example Prompts](#example-prompts) section below for the exact prompt to use when starting a new project.*

### 2. Collaboration Style Configuration
The Q-Vibes framework is **highly configurable** through your `vibe.md` file. You can specify:
- **Git workflow preferences** (branching, commits, merging)
- **Documentation requirements** (what docs to create, when)
- **Security practices** (how to handle secrets, environment variables)
- **Decision-making style** (what to ask about vs. assume)
- **Process management** (how to run long-running processes)

The template in `/templates/vibe.md` includes an example git workflow configuration. Customize it to match your preferred working style.

### 3. Resuming Work (Key Benefit!)
1. **AI reads the framework instructions** (`q-vibes-memory-banking.md`) to understand how to work
2. **AI reads all 4 context files** (`idea.md`, `vibe.md`, `state.md`, `decisions.md`) - takes ~30 seconds
3. **AI confirms context**: "I see we're building [X], currently working on [Y], next step is [Z]"
4. **AI continues work** following your vibe.md preferences
5. **No re-explaining needed** - context is preserved

*See the [Example Prompts](#example-prompts) section below for the exact prompt to use when resuming work.*

### 4. Ending a Session
1. **AI updates `state.md`** with current progress
2. **AI logs any new decisions** made during the session
3. **AI follows end-of-session preferences** from your vibe.md (e.g., git commits, cleanup)
4. **Ready for next session** - no context loss

## Example Prompts

### Starting a New Prototype Session
```
Hi! I want to start a new prototype using Q-Vibes Memory Banking. 

Please read the framework instructions in .amazonq/vibes/q-vibes-memory-banking.md first to understand how to work with this system.

My prototype idea: [Describe your idea here - can be brief, just the core concept]

Example: "I want to build a simple web app that helps developers track their daily coding habits. Users can log what they worked on, how long they spent, and rate their productivity. The goal is to identify patterns and improve focus."
```

### Resuming an Existing Project
```
Hi! I'm resuming work on my prototype using Q-Vibes Memory Banking.

Please read the framework instructions in .amazonq/vibes/q-vibes-memory-banking.md first, then read all the context files in .amazonq/vibes/ folder to understand the current state.

Once you've reviewed everything, please confirm what we're building, where we left off, and what the next steps should be.
```

## Tips for Effective Q-Vibes Sessions

### Customizing Your `vibe.md`
- **Be comprehensive** - specify every aspect of collaboration (tech stack, git workflow, documentation requirements, etc.)
- **Be specific** about your preferences to avoid back-and-forth questions
- **Define your collaboration style** clearly for consistent AI behavior
- **Include all working preferences** - decision-making style, process management, security practices

### Managing File Sizes
- Keep files under the size limits (see main documentation)
- **Focus on actionable information** only
- **Use bullet points** instead of long paragraphs
- **Remove outdated information** regularly

### Git Workflow Tips
- **Feature branches** keep main clean and working
- **Regular commits** help track progress
- **Descriptive commit messages** aid in context rebuilding
- **Ask before merging** maintains code quality

## Troubleshooting

### "AI doesn't understand my context"
- Check if all 4 files exist in `.amazonq/vibes/` folder
- Ensure `idea.md` clearly describes the core concept
- Update `state.md` if current status is unclear

### "Setup commands don't work"
- Verify template files exist in `/templates/` folder
- Check file paths in copy commands
- Ensure you're in the correct directory

### "Git workflow is confusing"
- Stick to the feature branch pattern
- Let AI handle branch creation and management
- Always ask AI before merging to main

### "Files are getting too long"
- Review size limits in main documentation
- Focus on essential information only
- Archive old decisions that are no longer relevant

## Advanced Usage

### Multiple Prototypes
- Each prototype gets its own `.amazonq/vibes/` folder
- Reuse the same `vibe.md` template across projects
- Maintain separate git repositories for each prototype

### Collaboration with Others
- Share the entire project folder including `.amazonq/vibes/`
- Others can read the context files to understand the project

### Evolution to Production
- Use the prototype as a proof of concept
- Decision log helps avoid repeating the same architectural discussions
