"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, Link, FileText, ImageIcon, File } from "lucide-react"
import toast from "react-hot-toast"
import type { MemoryItem } from "@/lib/types"

interface UploadDropzoneProps {
  onUpload: (item: Omit<MemoryItem, "id" | "createdAt">) => void
}

export default function UploadDropzone({ onUpload }: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      setIsUploading(true)

      const files = Array.from(e.dataTransfer.files)
      const text = e.dataTransfer.getData("text/plain")

      if (files.length > 0) {
        files.forEach((file) => {
          const fileType = file.type.startsWith("image/") ? "image" : file.type === "application/pdf" ? "pdf" : "text"

          onUpload({
            type: fileType,
            title: file.name,
            content: `File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
            priority: "medium",
            tags: [fileType],
          })
        })
        toast.success(`Uploaded ${files.length} file(s)`)
      } else if (text) {
        const isUrl = text.startsWith("http")
        onUpload({
          type: isUrl ? "link" : "text",
          title: isUrl ? "Shared Link" : "Dropped Text",
          content: text,
          priority: "medium",
          tags: [isUrl ? "link" : "text"],
        })
        toast.success(`Added ${isUrl ? "link" : "text"}`)
      }

      setTimeout(() => setIsUploading(false), 1000)
    },
    [onUpload],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const fileType = file.type.startsWith("image/") ? "image" : file.type === "application/pdf" ? "pdf" : "text"

      onUpload({
        type: fileType,
        title: file.name,
        content: `File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        priority: "medium",
        tags: [fileType],
      })
    })
    if (files.length > 0) {
      toast.success(`Uploaded ${files.length} file(s)`)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
        isDragOver
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-105"
          : "border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500"
      } ${isUploading ? "animate-pulse" : ""}`}
    >
      <input
        type="file"
        multiple
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept=".pdf,.txt,.jpg,.jpeg,.png,.gif,.webp"
      />

      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Drop files, links, or text here</h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6">Or click to browse files from your computer</p>

        <div className="flex justify-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link className="w-4 h-4" />
            <span>Links</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <FileText className="w-4 h-4" />
            <span>Text</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <File className="w-4 h-4" />
            <span>PDFs</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <ImageIcon className="w-4 h-4" />
            <span>Images</span>
          </div>
        </div>
      </div>
    </div>
  )
}
