import { action, observable } from 'mobx'
import { RoomListItem } from 'infra/Types'
import { roomApi } from 'api/RoomApi'
import { showError } from 'infra/Util'

class DataStore {
  @observable roomList: RoomListItem[] = []

  @action async updateRoomList() {
    try {
      this.roomList = await roomApi.getRooms()
    } catch (e) {
      showError(e.message)
    }
  }
}

export const dataStore = new DataStore()
