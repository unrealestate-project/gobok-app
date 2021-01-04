import { observable } from 'mobx'
import { EmitterSubscription, Keyboard } from 'react-native'

class KeyboardStore {
  @observable isVisible = false
  _subs: EmitterSubscription[] = []

  sub() {
    this._subs = [
      Keyboard.addListener('keyboardDidShow', () => (this.isVisible = true)),
      Keyboard.addListener('keyboardDidHide', () => (this.isVisible = false)),
    ]
  }

  unsub() {
    this._subs.forEach((sub) => sub.remove())
    this._subs = []
  }

  hide() {
    Keyboard.dismiss()
  }
}

export const keyboardStore = new KeyboardStore()
