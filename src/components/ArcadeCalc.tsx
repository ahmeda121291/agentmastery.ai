'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ArcadeCalc<T extends Record<string, any>>({
  title,
  description,
  inputs,
  compute,
  resultRender
}: {
  title: string
  description: string
  inputs: {
    key: keyof T
    label: string
    type?: 'number' | 'text'
    min?: number
    max?: number
    step?: number
    placeholder?: string
    defaultValue?: any
    helpText?: string
  }[]
  compute: (values: T) => Record<string, number | string>
  resultRender: (out: Record<string, number | string>) => JSX.Element
}) {
  // Initialize with default values
  const initialValues = inputs.reduce((acc, input) => {
    acc[input.key as string] = input.defaultValue ?? (input.type === 'number' ? 0 : '')
    return acc
  }, {} as any)

  const [values, setValues] = useState<T>(initialValues)

  const out = useMemo(() => {
    try {
      return compute(values)
    } catch {
      return {}
    }
  }, [values, compute])

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {inputs.map((field, i) => (
              <div key={i} className="space-y-2">
                <Label htmlFor={`field-${i}`}>
                  {field.label}
                  {field.helpText && (
                    <span className="text-xs text-muted-foreground ml-2">
                      ({field.helpText})
                    </span>
                  )}
                </Label>
                <Input
                  id={`field-${i}`}
                  type={field.type || 'number'}
                  min={field.min}
                  max={field.max}
                  step={field.step || (field.type === 'number' ? '1' : undefined)}
                  placeholder={field.placeholder}
                  value={values[field.key] || ''}
                  onChange={e => {
                    const val = field.type === 'number'
                      ? Number(e.target.value)
                      : e.target.value
                    setValues(v => ({ ...v, [field.key]: val }))
                  }}
                />
              </div>
            ))}
          </div>

          <div className="rounded-lg border bg-muted/30 p-6">
            <h3 className="font-semibold mb-4 text-lg">Results</h3>
            {resultRender(out)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}