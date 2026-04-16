export type Board = {
  id: string
  title: string
}

export type List = {
  id: string
  title: string
  board_id: string
  position: number
}

export type Card = {
  id: string
  title: string
  description?: string
  list_id: string
  position: number
}