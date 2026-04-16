"use client"

import Link from "next/link"
import DragBoard from "@/components/DragBoard"
import { useBoard } from "@/hooks/useBoard"
import { motion } from "framer-motion"
import { useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function BoardPage() {
  const params = useParams()
  const boardId = params.id as string

  const { board, lists, cards, fetchData, handleDragEnd } = useBoard(boardId)
  const [search, setSearch] = useState("")

  const [selectedLabel, setSelectedLabel] = useState("")
  const [dueFilter, setDueFilter] = useState("")

  if (!board) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 text-sm animate-pulse">
          Loading board...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 relative overflow-hidden">

      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-purple-300 opacity-40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-140px] right-[-120px] w-[420px] h-[420px] bg-blue-300 opacity-40 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col gap-4 mb-8 px-6 py-5 backdrop-blur-md border-b border-white/20"
      >
        <div className="flex justify-between items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {board.title}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Organize your workflow with ease
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex items-center gap-3">

            {/* ADD LIST */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              onClick={async () => {
                const title = prompt("Enter list title")
                if (!title) return

                const maxPos =
                  lists.length > 0
                    ? Math.max(...lists.map((l: any) => l.position || 0))
                    : 0

                await supabase.from("lists").insert({
                  title,
                  position: maxPos + 1,
                  board_id: board.id
                })

                fetchData()
              }}
            >
              + Add List
            </button>

            {/* BACK */}
            <Link href="/">
              <button className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-black transition">
                ← Back
              </button>
            </Link>

          </div>
        </div>

        {/* SEARCH */}
        <div className="relative w-full max-w-md">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>

          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 flex-wrap">

          <select
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Labels</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
          </select>

          <input
            type="date"
            value={dueFilter}
            onChange={(e) => setDueFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm bg-white text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              setSelectedLabel("")
              setDueFilter("")
            }}
            className="px-3 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Clear
          </button>

        </div>

      </motion.div>

      <div className="px-6 pb-10 max-w-7xl mx-auto">
        <DragBoard
          lists={lists}
          cards={cards}
          handleDragEnd={handleDragEnd}
          fetchData={fetchData}
          boardId={board.id}
          search={search}
          selectedLabel={selectedLabel} 
          dueFilter={dueFilter}          
        />
      </div>

    </div>
  )
}