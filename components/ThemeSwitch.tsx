'use client'

import { useTheme } from 'next-themes'
import Sun from '@/data/sun.svg'
import Moon from '@/data/moon.svg'

const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme()

  const onThemeChange = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center">
      <div className="relative inline-block text-left">
        <button
          className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center"
          type="button"
          onClick={onThemeChange}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4.5 w-4.5" />
          )}
        </button>
      </div>
    </div>
  )
}

export default ThemeSwitch
