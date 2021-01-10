import { BaseApi } from 'api/BaseApi'
import { ApiError } from 'api/ApiError'
import { Room, RoomImage, RoomListItem } from 'infra/Types'

class RoomApi extends BaseApi {
  async getRooms(): Promise<RoomListItem[]> {
    const res = await this.get('/rooms')
    if (res.status !== 200) throw new ApiError(res)
    return res.array
  }

  async getRoom(roomId: number): Promise<Room> {
    const res = await this.get(`/rooms/${roomId}`)
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async postRoom(
    title: string,
    content: string,
    images: { url: string }[],
  ): Promise<number> {
    const res = await this.post('/rooms', {
      title,
      content,
      images,
    })
    if (res.status !== 200) throw new ApiError(res)
    return res.data.room_id
  }

  async postRoomImage(image: {
    uri: string
    type: string
    name: string
  }): Promise<RoomImage> {
    const res = await this.postFormData('/rooms/images', {
      file: image,
    })
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async putRoom(
    title: string,
    content: string,
    images: { url: string }[],
    roomId: number,
  ) {
    const res = await this.put(`/rooms/${roomId}`, {
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

  async getMyRoom(): Promise<Room | null> {
    const res = await this.get('/my/rooms')
    if (res.status !== 200) throw new ApiError(res)
    return res.array.length > 0 ? res.array[0] : null
  }
}

export const roomApi = new RoomApi()
