import { action, computed, observable } from 'mobx'
import jwtDecode from 'jwt-decode'
import { EventType, User } from 'infra/Types'
import { setToken as _setToken } from 'api/BaseApi'
import { userApi } from 'api/UserApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { events } from 'infra/Events'

class UserStore {
  constructor() {
    events.on(EventType.AUTH_ERROR, () => this.logout())
  }

  @observable loading: boolean = true
  @observable token: string | null = null
  @computed get hasToken() {
    return this.token !== null && this.token.length > 0
  }
  @computed get user(): User | null {
    if (!this.token) return null
    return jwtDecode(this.token)
  }
  emailWithKoreaUniv(email: string) {
    return !__DEV__ ? `${email}@korea.ac.kr` : 'yeechan.ko@gmail.com'
  }

  async getAuthCode(email: string) {
    await userApi.getCode(this.emailWithKoreaUniv(email))
  }

  @action setToken(token: string | null) {
    _setToken(token)
    this.token = token
  }

  @action async load() {
    try {
      const res = await AsyncStorage.getItem('user:token')
      if (res) this.setToken(res)
    } finally {
      this.loading = false
    }
  }

  @action async login(email: string, code: string) {
    const res = await userApi.login(this.emailWithKoreaUniv(email), code)
    if (!res) return
    this.setToken(res)
    AsyncStorage.setItem('user:token', res)
  }

  @action async logout() {
    this.setToken(null)
    AsyncStorage.removeItem('user:token')
  }
}

export const userStore = new UserStore()
