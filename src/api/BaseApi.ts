import { SERVER_BASE_URL } from 'infra/Constants'
import { ServiceError } from './ApiError'

let token: string | null = null
export const setToken = (t: string | null) => {
  token = t
}

export interface NetworkMessage {
  status: number
  data?: any
  arr?: any
  detail?: string
}

export class BaseApi {
  get commonHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token || '',
    }
  }

  protected async get(path: string): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}/api${path}`, {
      method: 'GET',
      headers: this.commonHeaders,
    })
    if (res.status === 500) throw new ServiceError()
    return await res.json()
  }

  protected async post(path: string, body?: object): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}/api${path}`, {
      method: 'POST',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    if (res.status === 500) throw new ServiceError()
    return await res.json()
  }

  protected async postFormData(
    path: string,
    body: object,
  ): Promise<NetworkMessage> {
    const formData = new FormData()
    for (const [k, v] of Object.entries(body)) {
      formData.append(k, v)
    }
    // NOTE(viz.ko):
    // remove content-type header from headers
    // so that browser can inject content-type with boundary definition
    // https://stackoverflow.com/a/35799817/3535760
    const headers = this.commonHeaders
    delete headers['Content-Type']
    const res = await fetch(`${SERVER_BASE_URL}/api${path}`, {
      method: 'POST',
      headers: headers,
      body: formData,
    })
    if (res.status === 500) throw new ServiceError()
    return await res.json()
  }

  protected async put(path: string, body: object): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}/api${path}`, {
      method: 'PUT',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    if (res.status === 500) throw new ServiceError()
    return await res.json()
  }

  protected async delete(
    path: string,
    body: object = {},
  ): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}/api${path}`, {
      method: 'DELETE',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    if (res.status === 500) throw new ServiceError()
    return await res.json()
  }
}
