"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, TrendingUp, Clock, Target } from "lucide-react"
import type { MemoryItem } from "@/lib/types"
import TextGenerateEffect from "./TextGenerateEffect"

interface SummaryModalProps {
  isOpen: boolean
  onClose: () => void
  items: MemoryItem[]
}

export default function SummaryModal({ isOpen, onClose, items }: SummaryModalProps) {
  const highPriorityItems = items.filter((item) => item.priority === "high")
  const upcomingDeadlines = items
    .filter((item) => item.deadline && new Date(item.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())

  const mockSummary = `Based on your ${items.length} saved items, here's your daily summary:

🎯 You have ${highPriorityItems.length} high-priority items that need attention today.

📅 ${upcomingDeadlines.length} upcoming deadlines in the next week - the most urgent being ${upcomingDeadlines[0]?.title || "none"}.

📊 Your memory collection includes ${items.filter((i) => i.type === "link").length} links, ${items.filter((i) => i.type === "pdf").length} documents, and ${items.filter((i) => i.type === "text").length} notes.

💡 Recommendation: Focus on completing your React documentation review and project proposal to stay on track with your goals.`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Daily Summary</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Items</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{items.length}</p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-medium text-red-900 dark:text-red-100">High Priority</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{highPriorityItems.length}</p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Deadlines</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                    {upcomingDeadlines.length}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-900 dark:text-green-100">This Week</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                    {
                      items.filter((item) => {
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return item.createdAt > weekAgo
                      }).length
                    }
                  </p>
                </div>
              </div>

              {/* AI Summary */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Insights</h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <TextGenerateEffect text={mockSummary} />
                </div>
              </div>

              {/* Upcoming Deadlines */}
              {upcomingDeadlines.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {upcomingDeadlines.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.type} • {item.priority} priority
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {new Date(item.deadline!).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.ceil(
                              (new Date(item.deadline!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            )}{" "}
                            days
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
