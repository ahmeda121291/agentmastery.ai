'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Copy,
  Share2,
  Mail,
  Download,
  Check,
  Twitter,
  Linkedin
} from 'lucide-react'

interface ShareResultsProps {
  title: string
  results: Record<string, any>
  calculatorType: string
}

export default function ShareResults({ title, results, calculatorType }: ShareResultsProps) {
  const [copied, setCopied] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const formatResults = () => {
    const lines = [`${title} Results:\n`]
    Object.entries(results).forEach(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').trim()
      const formattedValue = typeof value === 'number'
        ? value.toLocaleString()
        : value
      lines.push(`${formattedKey}: ${formattedValue}`)
    })
    return lines.join('\n')
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(formatResults())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const text = `Just calculated my ${title}! Check out the results:`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const downloadCSV = () => {
    const csv = Object.entries(results)
      .map(([key, value]) => `"${key}","${value}"`)
      .join('\n')

    const blob = new Blob([`"Metric","Value"\n${csv}`], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${calculatorType}-results.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const emailResults = async () => {
    if (!email || !email.includes('@')) return

    // In production, this would send to your API
    console.log('Sending results to:', email)
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Share2 className="h-5 w-5" />
        Share Your Results
      </h3>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={copyToClipboard}
            className="gap-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Results'}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={shareOnTwitter}
            className="gap-2"
          >
            <Twitter className="h-4 w-4" />
            Tweet
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={shareOnLinkedIn}
            className="gap-2"
          >
            <Linkedin className="h-4 w-4" />
            Share
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={downloadCSV}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Email results to..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={emailResults}
            disabled={!email || !email.includes('@')}
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            {emailSent ? 'Sent!' : 'Send'}
          </Button>
        </div>
      </div>
    </Card>
  )
}