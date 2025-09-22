# AgentMastery.ai

A production-ready design system and UI components for AgentMastery.ai - the platform to master AI agent development.

## Design System

### Brand Colors
- **Forest**: #014421 - Primary dark green
- **Green**: #28A745 - Primary action color
- **Ink**: #111111 - Text color
- **Paper**: #FFFFFF - Background white
- **Mist**: #F7F9F7 - Light background

### Components
- Button (primary, ghost, white, link variants)
- Card
- Badge
- Container
- Navbar with mobile menu
- Footer with links
- Site Layout wrapper

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Tech Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React 18
- MDX for blog content
- Framer Motion for animations

## Automated Blog Generation

The site includes an automated blog generation system that creates SEO-optimized content nightly.

### Setup

1. **Add OpenAI API Key as GitHub Secret:**
   - Go to your repository's Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key

2. **Keyword Management:**
   - Keywords are stored in `src/data/keywords.json`
   - Add new keywords with priority levels (high/medium/low)
   - System automatically balances affiliate link density:
     - 40% heavy (full reviews)
     - 30% medium (listicles)
     - 20% light (how-to guides)
     - 10% none (trust-building content)

3. **Manual Generation:**
   ```bash
   # Set your API key locally
   export OPENAI_API_KEY="your-key-here"

   # Run the generation script
   npx ts-node scripts/generate_posts.ts
   ```

4. **Monitoring:**
   - Check Actions tab for nightly run status (03:07 UTC)
   - Generated posts appear in `/content/blog/`
   - Processed keywords are tracked in `keywords.json`

### Configuration

Edit `src/data/keywords.json` to:
- Add new keywords to the queue
- Adjust posts per run (1-3 default)
- Modify push level distribution
- View processed keywords history
