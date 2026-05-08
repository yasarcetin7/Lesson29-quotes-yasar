'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="font-medium flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 text-purple dark:text-tahiti p-2 px-4 rounded-full shadow-md hover:scale-105 transition-all active:scale-95"
    aria-label="Toggle Theme" > 
      {theme === 'dark' ? '☀️ White Mode' : '🌙 Dark Mode'}
    </button>
  )
}
export default ThemeSwitcher
