export interface User {
  id: number
  email: string
}

export interface RoomListItem {
  id: number
  title: string
  thumbnail: {
    url: string
  }
  view_count: number
  bumped_at: string
}

export interface RoomImage {
  id: number
  url: string
}

export interface Room {
  id: number
  title: string
  content: string
  images: RoomImage[]
  nickname: string
  view_count: number
  bumped_at: string
  is_mine: boolean
}

export enum EventType {
  AUTH_ERROR = 'auth_error',
}
