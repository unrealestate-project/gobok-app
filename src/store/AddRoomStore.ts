import { action, computed, observable } from 'mobx'
import { Image } from 'react-native-image-crop-picker'
import { roomApi } from 'api/RoomApi'
import { showError, toast } from 'infra/Util'
import { Alert } from 'react-native'
import { Room } from 'infra/Types'

export class AddRoomStore {
  @observable id: number | null = null
  @observable title: string = ''
  @observable content: string = ''
  @observable displayImages: string[] = []
  internalImages: { url: string }[] = []
  @observable loading: boolean = false
  imageLoading: boolean = false

  @computed get isEmpty(): boolean {
    return (
      this.title === '' &&
      this.content === '' &&
      this.displayImages.length === 0
    )
  }

  @computed get isEdit(): boolean {
    return this.id !== null
  }

  @action async addImages(images: Image[]) {
    if (this.imageLoading) return
    this.imageLoading = true
    const startIndex = this.displayImages.length
    const imageCount = images.length
    this.displayImages = this.displayImages.concat(images.map((i) => i.path))
    try {
      const ts = new Date().toISOString()
      const res = await Promise.all(
        images.map((i, index) => {
          return roomApi.postRoomImage({
            uri: i.path,
            type: i.mime,
            name: `${ts}-${index}`,
          })
        }),
      )
      // set internal images
      this.internalImages = this.internalImages.concat(res)
    } catch (e) {
      showError(e)
      this.displayImages.splice(startIndex, imageCount)
      this.internalImages.splice(startIndex, imageCount)
    } finally {
      this.imageLoading = false
    }
  }

  @action removeImage(index: number) {
    Alert.alert(
      '사진 삭제',
      '사진을 삭제할까요?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            this.displayImages.splice(index, 1)
            this.internalImages.splice(index, 1)
          },
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  @action async done(): Promise<number | null> {
    if (this.imageLoading) {
      return null
    }
    if (!this.title.trim().length) {
      toast('제목을 입력해주세요!')
      return null
    }
    if (!this.content.trim().length) {
      toast('내용을 입력해주세요!')
      return null
    }
    this.loading = true
    let id = null
    try {
      if (this.isEdit) {
        await roomApi.putRoom(
          this.title,
          this.content,
          this.internalImages,
          this.id!,
        )
        return this.id
      } else {
        id = await roomApi.postRoom(
          this.title,
          this.content,
          this.internalImages,
        )
      }
    } catch (e) {
      showError(e)
      id = null
    } finally {
      this.loading = false
    }
    return id
  }

  @action feedData(roomData: Room) {
    if (!roomData) return
    this.id = roomData.id
    this.title = roomData.title
    this.content = roomData.content
    this.displayImages = roomData.images.map((i) => i.url)
    this.internalImages = [...roomData.images]
  }
}
