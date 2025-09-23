"use client"

import React, { createContext, useContext, useState } from 'react'

interface CollapsibleContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined)

interface CollapsibleProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Collapsible({ children, open: controlledOpen, onOpenChange }: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const setOpen = onOpenChange || setUncontrolledOpen

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div>{children}</div>
    </CollapsibleContext.Provider>
  )
}

export function CollapsibleTrigger({ children, asChild, ...props }: any) {
  const context = useContext(CollapsibleContext)
  if (!context) throw new Error('CollapsibleTrigger must be used within Collapsible')

  const handleClick = () => context.setOpen(!context.open)

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
      ...props
    })
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export function CollapsibleContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const context = useContext(CollapsibleContext)
  if (!context) throw new Error('CollapsibleContent must be used within Collapsible')

  if (!context.open) return null

  return <div className={className}>{children}</div>
}