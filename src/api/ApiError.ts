import { NetworkMessage } from './BaseApi'

export class ApiError extends Error {
  constructor(res: NetworkMessage) {
    super(`[${res.status}] ${res.detail}`)
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
