'use client'

/**
 * LottieAnimation — loads a Lottie JSON file from a URL and renders it.
 *
 * To use your own animation:
 *  1. Go to lottiefiles.com → find a free animation → copy the "Lottie Animation URL"
 *  2. Pass it as the `src` prop
 *
 * If the URL fails or is loading, nothing is rendered (safe fallback).
 */

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import lottie-react to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface Props {
  src: string
  className?: string
  loop?: boolean
  autoplay?: boolean
  style?: React.CSSProperties
}

export default function LottieAnimation({ src, className, loop = true, autoplay = true, style }: Props) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load')
        return r.json()
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {
        // Silent fail — component just doesn't render
      })
    return () => { cancelled = true }
  }, [src])

  if (!animationData) return null

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  )
}
