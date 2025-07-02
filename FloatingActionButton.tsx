"use client"

import { Plus } from "lucide-react"
import { motion } from "framer-motion"

interface FloatingActionButtonProps {
  onClick: () => void
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  )
}
