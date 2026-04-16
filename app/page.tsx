"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 text-gray-900 flex flex-col relative overflow-hidden">

      {/*  Animated Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-purple-300 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-[-140px] right-[-120px] w-[420px] h-[420px] bg-blue-300 rounded-full blur-3xl"
      />

      {/*  Navbar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-8 py-4 
        bg-transparent backdrop-blur-md 
        border-b border-white/20 
        z-10"
      >
        <h1 className="text-xl font-semibold tracking-tight">
          TaskFlow
        </h1>

        {/*  CREATE BOARD BUTTON */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition"
          onClick={async () => {
            const title = prompt("Enter board name")
            if (!title) return

            const { data, error } = await supabase
              .from("boards")
              .insert({ title })
              .select()
              .single()

            if (error) {
              alert("Error creating board")
              return
            }

            window.location.href = `/board/${data.id}`
          }}
        >
          Create Board
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6 z-10">

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight"
        >
          Organize Your Work <br />
          <span className="text-blue-600">Without the Chaos</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-xl mb-8"
        >
          TaskFlow helps you manage tasks, track progress, and stay productive with a clean Kanban experience.
        </motion.p>

        {/*  BUTTONS */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          {/* CREATE BOARD */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition"
            onClick={async () => {
              const title = prompt("Enter board name")
              if (!title) return

              const { data, error } = await supabase
                .from("boards")
                .insert({ title })
                .select()
                .single()

              if (error) {
                alert("Error creating board")
                return
              }

              window.location.href = `/board/${data.id}`
            }}
          >
            Create Board →
          </motion.button>

          {/* DEMO */}
          <motion.a
            href="https://trello.com"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-xl border border-white/30 text-gray-700 hover:bg-white/20 backdrop-blur-sm transition"
          >
            Live Demo
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-500 mt-6"
        >
          No login required • Demo board included
        </motion.p>

      </div>

      {/*  Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-gray-600 text-sm py-6 
        bg-transparent backdrop-blur-md 
        border-t border-white/20"
      >
        <p>
          Built with ❤️ by <span className="font-semibold text-gray-800">AMiT</span>
        </p>

        <p className="text-xs text-gray-400 mt-1">
          © 2026 TaskFlow. All rights reserved.
        </p>
      </motion.div>

    </div>
  )
}