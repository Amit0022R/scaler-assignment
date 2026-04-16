// "use client"

// import Link from "next/link"

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col">

//       <div className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200">
//         <h1 className="text-xl font-semibold tracking-tight">
//           TaskFlow
//         </h1>

//         <Link href="/board">
//           <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black transition">
//             Open Board
//           </button>
//         </Link>
//       </div>

//       <div className="flex flex-1 flex-col items-center justify-center text-center px-6">

//         <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
//           Organize Your Work <br />
//           <span className="text-blue-600">Without the Chaos</span>
//         </h1>

//         <p className="text-lg text-gray-600 max-w-xl mb-8">
//           TaskFlow helps you manage tasks, track progress, and stay productive with a clean Kanban experience.
//         </p>

//         <div className="flex gap-4">
//           <Link href="/board">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
//               Try It Now →
//             </button>
//           </Link>

//           <a
//             href="https://trello.com"
//             target="_blank"
//             className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//           >
//             Live Demo
//           </a>
//         </div>

//         <p className="text-sm text-gray-500 mt-6">
//           No login required • Demo board included
//         </p>

//       </div>

//       <div className="text-center text-gray-500 text-sm py-4 border-t bg-white/70 backdrop-blur-md">
//         Built by AMiT ❤️
//       </div>
//     </div>
//   )
// }


app/board/page.tsx
"use client"

import Link from "next/link"
import DragBoard from "@/components/DragBoard"
import { useBoard } from "@/components/useBoard"
import { motion } from "framer-motion"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function BoardPage() {
  const { board, lists, cards, fetchData, handleDragEnd } = useBoard()

  const [search, setSearch] = useState("")

  if (!board) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 text-lg">
          Loading board...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-purple-300 opacity-40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-140px] right-[-120px] w-[420px] h-[420px] bg-blue-300 opacity-40 rounded-full blur-3xl"></div>

      {/* HEADER */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col gap-4 mb-8 px-6 py-5 bg-transparent backdrop-blur-md border-b border-white/20 z-10"
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

            {/* ➕ ADD LIST */}
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

            {/* 🔙 BACK */}
            <Link href="/">
              <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition shadow-md">
                ← Back
              </button>
            </Link>

          </div>
        </div>

        {/* 🔍 SEARCH BAR */}
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

      </motion.div>

      {/* BOARD */}
      <div className="px-6 pb-10 relative z-10  max-w-7xl mx-auto ">
        <DragBoard
          lists={lists}
          cards={cards}
          handleDragEnd={handleDragEnd}
          fetchData={fetchData}
          boardId={board.id}
          search={search}
        />
      </div>

    </div>
  )
}