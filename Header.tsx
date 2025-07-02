"use client"
import { Moon, Sun, Grid3X3, MessageCircle, User } from "lucide-react"

interface HeaderProps {
  view: "grid" | "chat"
  setView: (view: "grid" | "chat") => void
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
}

export default function Header({ view, setView, isDarkMode, setIsDarkMode }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Deepy
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-all duration-200 ${
                  view === "grid"
                    ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="text-sm font-medium">Grid</span>
              </button>
              <button
                onClick={() => setView("chat")}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-all duration-200 ${
                  view === "chat"
                    ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Chat</span>
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
