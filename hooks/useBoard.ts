"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Board, List, Card } from "@/types"

type StateType = {
  board: Board | null
  lists: List[]
  cards: Card[]
}

export function useBoard(boardId: string) {
  const [data, setData] = useState<StateType>({
    board: null,
    lists: [],
    cards: []
  })

  async function fetchData() {
    if (!boardId) return

    const { data: board } = await supabase
      .from("boards")
      .select("*")
      .eq("id", boardId)
      .single()

    if (!board) return

    const { data: lists } = await supabase
      .from("lists")
      .select("*")
      .eq("board_id", board.id)
      .order("position")

    const { data: cards } = await supabase
      .from("cards")
      .select("*")
      .in(
        "list_id",
        (lists || []).map((l: any) => l.id)
      )
      .order("position")

    setData({
      board,
      lists: lists || [],
      cards: cards || []
    })
  }

  useEffect(() => {
    if(boardId){
      fetchData()
    }
  }, [boardId])

  async function handleDragEnd(result: any) {
    const { source, destination, type } = result
    if (!destination) return

    if (type === "list") {
      const newLists = Array.from(data.lists)
      const [moved] = newLists.splice(source.index, 1)
      newLists.splice(destination.index, 0, moved)

      const updatedLists = newLists.map((l, i) => ({
        ...l,
        position: i
      }))

      setData(prev => ({
        ...prev,
        lists: updatedLists
      }))

      for (let l of updatedLists) {
        await supabase
          .from("lists")
          .update({ position: l.position })
          .eq("id", l.id)
      }

      return
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return

    let updatedCards = [...data.cards]

    const sourceCards = updatedCards.filter(
      c => c.list_id === source.droppableId
    )

    const [movedCard] = sourceCards.splice(source.index, 1)
    movedCard.list_id = destination.droppableId

    const destCards = updatedCards.filter(
      c => c.list_id === destination.droppableId
    )

    destCards.splice(destination.index, 0, movedCard)

    destCards.forEach((card, i) => (card.position = i))

    updatedCards = updatedCards.map(c =>
      c.id === movedCard.id ? movedCard : c
    )

    setData(prev => ({ ...prev, cards: updatedCards }))

    await supabase
      .from("cards")
      .update({
        list_id: movedCard.list_id,
        position: movedCard.position
      })
      .eq("id", movedCard.id)
  }

  return {
    ...data,
    fetchData,
    handleDragEnd
  }
}