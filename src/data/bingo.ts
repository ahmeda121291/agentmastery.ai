export const bingoItems = [
  // SmartLead related
  "Used SmartLead for cold email",
  "Set up email warmup",
  "A/B tested subject lines",
  "Achieved 95%+ deliverability",
  "Sent 1000+ emails in a day",

  // Apollo related
  "Found leads with Apollo",
  "Used Apollo Chrome extension",
  "Built a sequence in Apollo",
  "Exported 500+ contacts",
  "Enriched data with Apollo",

  // Motion related
  "Scheduled with Motion",
  "Auto-scheduled a task",
  "Blocked focus time",
  "Let Motion reschedule meetings",
  "Saved 2+ hours with Motion",

  // Synthesia related
  "Generated video with Synthesia",
  "Created an AI avatar",
  "Made video in 5 languages",
  "Replaced Zoom recordings",
  "Made training videos with AI",

  // ElevenLabs related
  "Cloned a voice with ElevenLabs",
  "Generated podcast intro",
  "Created audiobook narration",
  "Made multilingual voiceover",
  "Used AI voice for video",

  // General AI Sales activities
  "Used ChatGPT for sales copy",
  "Automated follow-ups",
  "Personalized 100+ emails with AI",
  "Used AI for lead scoring",
  "Generated proposals with AI",
  "Analyzed calls with AI",
  "Used AI chatbot for leads",
  "Automated data entry",
  "Created sales deck with AI",
  "Used predictive analytics",

  // CRM and tools
  "Migrated from Salesforce",
  "Built custom CRM workflow",
  "Integrated 5+ tools",
  "Used Zapier automation",
  "Set up webhook triggers",

  // Results and milestones
  "Doubled reply rate",
  "Closed deal via cold email",
  "Saved $1000+/month on tools",
  "Hit 30% meeting rate",
  "Generated 50+ SQLs",
  "10x'd outreach volume",
  "Reduced sales cycle by 20%",
  "Achieved 5% reply rate",

  // Fun ones
  "AI wrote better email than me",
  "Forgot I had automation running",
  "Tool paid for itself in a week",
  "Colleague asked for my secret",
  "CEO loved the AI video"
]

export function generateBingoCard(): string[][] {
  // Shuffle and pick 24 items (we need 24 for a 5x5 grid with center free space)
  const shuffled = [...bingoItems].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, 24)

  // Create 5x5 grid
  const card: string[][] = []
  let itemIndex = 0

  for (let row = 0; row < 5; row++) {
    const rowItems: string[] = []
    for (let col = 0; col < 5; col++) {
      // Center cell is FREE
      if (row === 2 && col === 2) {
        rowItems.push("FREE SPACE")
      } else {
        rowItems.push(selected[itemIndex])
        itemIndex++
      }
    }
    card.push(rowItems)
  }

  return card
}

export function checkForWin(checkedCells: boolean[][]): {
  hasWin: boolean
  winningLines: string[]
} {
  const winningLines: string[] = []

  // Check rows
  for (let row = 0; row < 5; row++) {
    if (checkedCells[row].every(cell => cell)) {
      winningLines.push(`Row ${row + 1}`)
    }
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    if (checkedCells.every(row => row[col])) {
      winningLines.push(`Column ${col + 1}`)
    }
  }

  // Check diagonals
  if (checkedCells.every((row, i) => row[i])) {
    winningLines.push("Top-left to bottom-right diagonal")
  }
  if (checkedCells.every((row, i) => row[4 - i])) {
    winningLines.push("Top-right to bottom-left diagonal")
  }

  return {
    hasWin: winningLines.length > 0,
    winningLines
  }
}

export function generateShareableCard(card: string[][], checkedCells: boolean[][]): string {
  let shareText = "🎯 My AI Sales Bingo Card:\n\n"

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (checkedCells[row][col]) {
        shareText += "✅ "
      } else {
        shareText += "⬜ "
      }
    }
    shareText += "\n"
  }

  const flatChecked = checkedCells.flat()
  const checkedCount = flatChecked.filter(c => c).length
  const percentage = Math.round((checkedCount / 25) * 100)

  shareText += `\n${checkedCount}/25 squares (${percentage}% complete)\n`
  shareText += "\nPlay at agentmastery.ai/games/bingo"

  return shareText
}