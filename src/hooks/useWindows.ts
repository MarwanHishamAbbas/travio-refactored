"use client"
import { useEffect, useState } from "react"

const useWindowSize = () => {
  const isClient = typeof window === "object"

  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (!isClient) {
      return
    }

    const handleResize = () => {
      requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isClient])

  return windowSize
}

export default useWindowSize
