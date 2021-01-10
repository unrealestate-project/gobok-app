import { NetworkMessage } from './BaseApi'

export class ApiError extends Error {
  constructor(res: NetworkMessage) {
    super(`${res.detail ? res.detail : res.status}`)
    this.name = 'ApiError'
  }
}

export class ServiceError extends Error {
  constructor() {
    super(
      '어이쿠, 에러가 났어요!\n불편을 드려 죄송합니다 ㅠㅠ\n계속될 경우 개선사항 제안으로 알려주세요~',
    )
  }
}

export class AuthError extends Error {
  constructor() {
    super('로그인 정보가 없습니다!')
  }
}
