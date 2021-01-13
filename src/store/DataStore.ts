import { action, computed, observable } from 'mobx'
import { Room, RoomListItem } from 'infra/Types'
import { roomApi } from 'api/RoomApi'
import { showError } from 'infra/Util'

class DataStore {
  @observable loading: boolean = true
  @observable roomList: RoomListItem[] = []
  @observable myRoom: Room | null = null
  @observable myRoomLoading: boolean = true

  @computed get hasUploadedRoom() {
    return this.myRoom !== null
  }

  @action async updateRoomList() {
    this.loading = true
    try {
      this.roomList = await roomApi.getRooms()
    } catch (e) {
      showError(e.message)
    } finally {
      this.loading = false
    }
  }

  @action async updateMyRoom() {
    this.myRoomLoading = true
    try {
      this.myRoom = await roomApi.getMyRoom()
    } catch (e) {
    } finally {
      this.myRoomLoading = false
    }
  }
}

export const dataStore = new DataStore()
