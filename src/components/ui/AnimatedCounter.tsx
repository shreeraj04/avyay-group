'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function AnimatedCounter({ to, suffix = '', prefix = '', duration = 1800 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    const steps = 60
    const increment = to / steps
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isInView, to, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
