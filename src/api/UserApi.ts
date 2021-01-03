import { BaseApi } from 'api/BaseApi'
import { ApiError } from 'api/ApiError'

class UserApi extends BaseApi {
  async getCode(email: string) {
    const res = await this.get(`/auth/code?email=${email}`)
    if (res.status !== 200) throw new ApiError(res)
  }

  async login(email: string, code: string): Promise<string> {
    const res = await this.post('/auth/login', {
      email,
      code,
    })
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async feedback(title: string, content: string) {
    const res = await this.post('/profile/feedback', {
      title,
      content,
    })
    if (res.status !== 200) throw new ApiError(res)
  }
}

export const userApi = new UserApi()
