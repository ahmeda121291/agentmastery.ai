import { ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const icons = {
    info: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
    error: <XCircle className="h-4 w-4" />
  }

  const colors = {
    info: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900',
    warning: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900',
    success: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900',
    error: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
  }

  return (
    <Alert className={`${colors[type]} my-6`}>
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">{icons[type]}</div>
        <div className="space-y-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{children}</AlertDescription>
        </div>
      </div>
    </Alert>
  )
}

interface ProsConsProps {
  pros: string[]
  cons: string[]
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-8">
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader className="bg-green-50 dark:bg-green-950/20">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            Pros
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="bg-red-50 dark:bg-red-950/20">
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <XCircle className="h-5 w-5" />
            Cons
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="space-y-2">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}