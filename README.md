# Impause - Financial Responsibility App

Impause is a progressive web application designed to promote financial responsibility through visualized spending insights, impulse buying buffers, and accountability systems.

## Features

### 1. Finance Wrapped – Weekly, Monthly, Yearly
Users receive personalized spending summaries in visually engaging formats:
- Weekly Wrap: Tracks quick spending spikes and small wins
- Monthly Wrap: Shows top merchants, category breakdowns, and goal progress
- Yearly Wrap: Reflects long-term changes, big saves, and habits over time

Each wrap includes:
- Charts + insights on where money went
- Spending score (how well you stuck to your plan)
- Shareable visual summary

### 2. Impulse Buying Buffer
When a non-essential transaction is initiated:
- The app activates a user-set timer (15 min, 1 hour, or 24 hours)
- During the wait, it displays:
  - The cost in hours of work
  - Current goal progress
  - Reflective prompts

Users can hit a "Proceed Anyway" button if they consciously choose to go ahead, which is logged for self-review and accountability.

### 3. Accountability Buddy System
Users can link up with a trusted friend to share key financial progress:
- Buddies get notified for:
  - Impulse buys (especially bypassed ones)
  - Weekly wrap summaries
  - Missed or hit budget goals

## Tech Stack

- React
- Tailwind CSS
- Chart.js
- Headless UI (for accessible components)
- Local Storage (for demo data)

## Installation and Running

### Prerequisites
- Node.js 16+ or Bun

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd impause

# Install dependencies
bun install
```

### Development
```bash
# Start the development server
bun run dev
```

### Build
```bash
# Build for production
bun run build
```

## License
MIT

## Credits
Created as a demonstrative project for financial responsibility.
