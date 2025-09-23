import React, { createContext, useContext, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

interface TabsProps {
  children: React.ReactNode
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function Tabs({ children, value, onValueChange, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('inline-flex h-10 items-center justify-center rounded-lg bg-mist p-1', className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({
  children,
  value,
  className
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const isActive = context.value === value

  return (
    <button
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5',
          'text-sm font-medium ring-offset-background transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isActive ? 'bg-white text-forest shadow-sm' : 'text-ink/60 hover:text-ink'
        ),
        className
      )}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  children,
  value,
  className
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  if (context.value !== value) return null

  return (
    <div className={twMerge('mt-2', className)}>
      {children}
    </div>
  )
}