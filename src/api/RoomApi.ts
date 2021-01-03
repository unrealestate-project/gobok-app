import { BaseApi } from 'api/BaseApi'
import { ApiError } from 'api/ApiError'
import { Room, RoomListItem } from 'infra/Types'

class RoomApi extends BaseApi {
  async getRooms(): Promise<RoomListItem[]> {
    const res = await this.get('/rooms')
    if (res.status !== 200) throw new ApiError(res)
    return res.arr
  }

  async getRoom(roomId: number): Promise<Room> {
    const res = await this.get(`/rooms/${roomId}`)
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async postRoom(title: string, content: string, images: [{ url: string }]) {
    const res = await this.post('/rooms', {
      title,
      content,
      images,
    })
    if (res.status !== 200) throw new ApiError(res)
  }

  async postRoomImage(image: Blob): Promise<string> {
    const res = await this.postFormData('/rooms/images', {
      file: image,
    })
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async putRoom(title: string, content: string, images: [{ url: string }]) {
    const res = await this.put('/rooms', {
      title,
      content,
      images,
    })
    if (res.status !== 200) throw new ApiError(res)
  }

  async deleteRoom(roomId: number) {
    const res = await this.delete(`/rooms/${roomId}`)
    if (res.status !== 200) throw new ApiError(res)
  }

  async bumpRoom(roomId: number) {
    const res = await this.post(`/rooms/${roomId}/bump`)
    if (res.status !== 200) throw new ApiError(res)
  }

  async getOwnRoom(userId: number): Promise<Room> {
    const res = await this.get(`/users/${userId}/room`)
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }
}

export const roomApi = new RoomApi()
