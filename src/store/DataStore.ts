import { action, observable } from 'mobx'
import { RoomListItem } from 'infra/Types'
import { roomApi } from 'api/RoomApi'
import { showError } from 'infra/Util'

class DataStore {
  @observable loading: boolean = false
  @observable roomList: RoomListItem[] = []

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
}

export const dataStore = new DataStore()
