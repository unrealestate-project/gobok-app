import { action, computed, observable, reaction } from 'mobx'
import jwtDecode from 'jwt-decode'
import { User } from 'infra/Types'
import { setToken } from 'api/BaseApi'
import { userApi } from 'api/UserApi'
import { AsyncStorage } from 'react-native'

class UserStore {
  constructor() {
    reaction(
      () => this.token,
      (v) => setToken(v),
    )
  }

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

  @action async login(email: string, code: string) {
    const res = await userApi.login(this.emailWithKoreaUniv(email), code)
    console.log(res)
  }

  @action async logout() {
    this.token = null
  }
}

export const userStore = new UserStore()
