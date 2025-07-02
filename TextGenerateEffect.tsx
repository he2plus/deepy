"use client"

import { useState, useEffect } from "react"

interface TextGenerateEffectProps {
  text: string
  className?: string
}

export default function TextGenerateEffect({ text, className = "" }: TextGenerateEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 20)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  return (
    <p className={`text-sm ${className}`}>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </p>
  )
}
