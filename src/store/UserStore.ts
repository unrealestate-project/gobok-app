import { action, computed, observable, reaction } from 'mobx'
import jwtDecode from 'jwt-decode'
import { User } from 'infra/Types'
import { setToken } from 'api/BaseApi'

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

  async getAuthCode(email: string): Promise<string> {
    return ''
  }

  @action async login(email: string, code: string) {}

  @action async logout() {
    this.token = null
  }
}

export const userStore = new UserStore()
