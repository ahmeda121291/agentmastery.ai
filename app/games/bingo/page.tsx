'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateBingoCard, checkForWin, generateShareableCard } from '@/src/data/bingo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Trophy,
  RefreshCw,
  Share2,
  Check,
  Sparkles,
  Target,
  Copy,
  Download,
  Twitter
} from 'lucide-react'
import confetti from 'canvas-confetti'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const STORAGE_KEY = 'ai-sales-bingo'

export default function BingoPage() {
  const [bingoCard, setBingoCard] = useState<string[][]>([])
  const [checkedCells, setCheckedCells] = useState<boolean[][]>(
    Array(5).fill(null).map(() => Array(5).fill(false))
  )
  const [winStatus, setWinStatus] = useState<{ hasWin: boolean; winningLines: string[] }>({
    hasWin: false,
    winningLines: []
  })
  const [showWinDialog, setShowWinDialog] = useState(false)
  const [isNewCard, setIsNewCard] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const { card, checked } = JSON.parse(saved)
        setBingoCard(card)
        setCheckedCells(checked)
        setIsNewCard(false)
        // Set center as checked (FREE space)
        const updatedChecked = [...checked]
        updatedChecked[2][2] = true
        setCheckedCells(updatedChecked)
      } catch {
        initializeNewCard()
      }
    } else {
      initializeNewCard()
    }
  }, [])

  // Save to localStorage whenever card or checks change
  useEffect(() => {
    if (bingoCard.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        card: bingoCard,
        checked: checkedCells
      }))
    }
  }, [bingoCard, checkedCells])

  // Check for wins whenever cells change
  useEffect(() => {
    const result = checkForWin(checkedCells)
    setWinStatus(result)

    // Show win dialog and confetti
    if (result.hasWin && !winStatus.hasWin) {
      setShowWinDialog(true)
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }, 300)
    }
  }, [checkedCells])

  const initializeNewCard = () => {
    const newCard = generateBingoCard()
    setBingoCard(newCard)

    // Initialize checked cells with center FREE space checked
    const newChecked = Array(5).fill(null).map(() => Array(5).fill(false))
    newChecked[2][2] = true
    setCheckedCells(newChecked)
    setIsNewCard(true)
  }

  const handleCellClick = (row: number, col: number) => {
    // Don't allow unchecking the FREE space
    if (row === 2 && col === 2) return

    const newChecked = [...checkedCells]
    newChecked[row][col] = !newChecked[row][col]
    setCheckedCells(newChecked)
  }

  const handleNewCard = () => {
    if (confirm('Start a new card? This will reset your progress.')) {
      initializeNewCard()
      setWinStatus({ hasWin: false, winningLines: [] })
    }
  }

  const handleShare = async (platform: 'copy' | 'twitter') => {
    const shareText = generateShareableCard(bingoCard, checkedCells)

    if (platform === 'copy') {
      await navigator.clipboard.writeText(shareText)
      // You could add a toast notification here
    } else if (platform === 'twitter') {
      const tweetText = encodeURIComponent(shareText)
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank')
    }
  }

  const checkedCount = checkedCells.flat().filter(c => c).length
  const progressPercentage = (checkedCount / 25) * 100

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">AI Sales Bingo</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Check off your AI sales achievements! Get 5 in a row to win.
        </p>
      </div>

      {/* Stats Bar */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-xl font-bold">{checkedCount}/25</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-sm text-muted-foreground">Complete</p>
                <p className="text-xl font-bold">{Math.round(progressPercentage)}%</p>
              </div>
              {winStatus.hasWin && (
                <>
                  <div className="h-8 w-px bg-border" />
                  <Badge variant="default" className="gap-1">
                    <Trophy className="h-3 w-3" />
                    WINNER!
                  </Badge>
                </>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Tweet
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewCard}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Card
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bingo Grid */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-5 gap-2">
            {bingoCard.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isChecked = checkedCells[rowIndex][colIndex]
                const isFreeSpace = rowIndex === 2 && colIndex === 2

                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: (rowIndex * 5 + colIndex) * 0.02 }}
                  >
                    <Card
                      className={`
                        aspect-square cursor-pointer transition-all
                        hover:shadow-md hover:scale-105
                        ${isChecked ? 'bg-primary/10 border-primary' : 'hover:border-primary/50'}
                        ${isFreeSpace ? 'bg-gradient-to-br from-primary/20 to-primary/10' : ''}
                      `}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      <CardContent className="p-2 h-full flex flex-col items-center justify-center text-center relative">
                        {isChecked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            {isFreeSpace ? (
                              <Sparkles className="h-8 w-8 text-primary" />
                            ) : (
                              <Check className="h-8 w-8 text-primary" />
                            )}
                          </motion.div>
                        )}
                        <p className={`text-xs ${isChecked ? 'opacity-60' : ''} ${isFreeSpace ? 'font-bold' : ''}`}>
                          {cell}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Win Dialog */}
      <Dialog open={showWinDialog} onOpenChange={setShowWinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Congratulations! You Won!
            </DialogTitle>
            <DialogDescription className="space-y-3">
              <p>You completed: {winStatus.winningLines.join(', ')}</p>
              <p>You've mastered {checkedCount} AI sales activities!</p>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    handleShare('twitter')
                    setShowWinDialog(false)
                  }}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Share Victory
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handleNewCard()
                    setShowWinDialog(false)
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Card
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Tips */}
      <Card className="mt-6 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">How to Play</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Click squares to mark activities you've completed</p>
          <p>• Get 5 in a row (horizontal, vertical, or diagonal) to win</p>
          <p>• Your progress is automatically saved</p>
          <p>• Share your card to challenge colleagues!</p>
        </CardContent>
      </Card>
    </div>
  )
}