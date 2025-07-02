"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link, FileText, ImageIcon, File, Trash2, Edit3, Calendar, Tag, ExternalLink } from "lucide-react"
import toast from "react-hot-toast"
import type { MemoryItem } from "@/lib/types"

interface AnimatedCardProps {
  item: MemoryItem
  index: number
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<MemoryItem>) => void
}

const typeIcons = {
  link: Link,
  text: FileText,
  image: ImageIcon,
  pdf: File,
}

const priorityColors = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

export default function AnimatedCard({ item, index, onDelete, onUpdate }: AnimatedCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)

  const Icon = typeIcons[item.type]
  const isOverdue = item.deadline && new Date(item.deadline) < new Date()

  const handleSave = () => {
    onUpdate(item.id, { title: editTitle })
    setIsEditing(false)
    toast.success("Item updated")
  }

  const handleDelete = () => {
    onDelete(item.id)
    toast.success("Item deleted")
  }

  const handlePriorityChange = () => {
    const priorities: Array<"low" | "medium" | "high"> = ["low", "medium", "high"]
    const currentIndex = priorities.indexOf(item.priority)
    const nextPriority = priorities[(currentIndex + 1) % priorities.length]
    onUpdate(item.id, { priority: nextPriority })
    toast.success(`Priority changed to ${nextPriority}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Priority stripe */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          item.priority === "high" ? "bg-red-500" : item.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
        }`}
      />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div
              className={`p-2 rounded-lg ${
                item.type === "link"
                  ? "bg-blue-100 dark:bg-blue-900/30"
                  : item.type === "pdf"
                    ? "bg-red-100 dark:bg-red-900/30"
                    : item.type === "image"
                      ? "bg-purple-100 dark:bg-purple-900/30"
                      : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  item.type === "link"
                    ? "text-blue-600 dark:text-blue-400"
                    : item.type === "pdf"
                      ? "text-red-600 dark:text-red-400"
                      : item.type === "image"
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-600 dark:text-gray-400"
                }`}
              />
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {item.type}
            </span>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title */}
        {isEditing ? (
          <div className="mb-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full px-2 py-1 text-sm font-medium bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          </div>
        ) : (
          <h3 className="font-medium text-gray-900 dark:text-white mb-3 line-clamp-2">{item.title}</h3>
        )}

        {/* Content preview */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{item.content}</p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                <Tag className="w-2.5 h-2.5 mr-1" />
                {tag}
              </span>
            ))}
            {item.tags.length > 2 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">+{item.tags.length - 2} more</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePriorityChange}
            className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${priorityColors[item.priority]}`}
          >
            {item.priority}
          </button>

          {item.deadline && (
            <div
              className={`flex items-center space-x-1 text-xs ${
                isOverdue ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>{new Date(item.deadline).toLocaleDateString()}</span>
            </div>
          )}

          {item.type === "link" && (
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
