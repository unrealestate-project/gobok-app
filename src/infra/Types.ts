export interface User {
  id: number
  email: string
}

export interface RoomListItem {
  id: number
  title: string
  thumb_img: string
  view_count: number
  bumped_at: string
}

export interface Room {
  id: number
  title: string
  content: string
  images: string[]
  user_id: number
  user_nickname: string
  view_count: number
  bumped_at: string
}
