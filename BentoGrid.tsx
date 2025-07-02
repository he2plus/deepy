"use client"

import type { MemoryItem } from "@/lib/types"
import AnimatedCard from "./AnimatedCard"

interface BentoGridProps {
  items: MemoryItem[]
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<MemoryItem>) => void
}

export default function BentoGrid({ items, onDelete, onUpdate }: BentoGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items yet</h3>
        <p className="text-gray-600 dark:text-gray-400">Start by uploading files, links, or text above</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <AnimatedCard key={item.id} item={item} index={index} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  )
}
