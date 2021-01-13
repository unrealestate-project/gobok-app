import { action, computed, observable } from 'mobx'
import { Room } from 'infra/Types'
import { roomApi } from 'api/RoomApi'
import { showError, toast } from 'infra/Util'

export class RoomItemStore {
  @observable data: Room | null = null
  @observable loading: boolean = false
  @observable bumpLoading: boolean = false
  @observable deleteLoading: boolean = false

  @computed get title() {
    return this.data
      ? this.data.title.length > 12
        ? `${this.data.title.substring(0, 12)}...`
        : this.data.title
      : ''
  }

  @action async updateData(roomId: number): Promise<boolean> {
    let success = false
    try {
      this.loading = true
      this.data = await roomApi.getRoom(roomId)
      success = true
    } catch (e) {
      showError(e)
      success = false
    } finally {
      this.loading = false
    }
    return success
  }

  @action async bump() {
    const data = this.data
    if (!data) return
    this.bumpLoading = true
    try {
      await roomApi.bumpRoom(data.id)
      data.bumped_at = new Date().toISOString()
      toast('방이 끌올되었어요!')
    } catch (e) {
      showError(e)
    } finally {
      this.bumpLoading = false
    }
  }

  @action async delete(cb: () => void) {
    const data = this.data
    if (!data) return
    this.deleteLoading = true
    try {
      await roomApi.deleteRoom(data.id)
      toast('방이 삭제되었어요!')
      cb()
    } catch (e) {
      showError(e)
    } finally {
      this.deleteLoading = false
    }
  }
}
