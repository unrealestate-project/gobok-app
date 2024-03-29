import { SERVER_BASE_URL } from 'infra/Constants'
import { AuthError, ServiceError } from './ApiError'
import { events } from 'infra/Events'
import { EventType } from 'infra/Types'

let token: string | null = null
export const setToken = (t: string | null) => {
  token = t
}

export interface NetworkMessage {
  status: number
  data?: any
  array?: any
  detail?: string
}

export class BaseApi {
  get commonHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token ? `JWT ${token}` : '',
    }
  }

  protected async get(path: string): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'GET',
      headers: this.commonHeaders,
    })
    if (res.status === 401) {
      events.emit(EventType.AUTH_ERROR)
      throw new AuthError()
    }
    if (res.status === 500) throw new ServiceError()
    return await res.json()
  }

  protected async post(path: string, body?: object): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
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
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'POST',
      headers: headers,
      body: formData,
    })
    if (res.status === 500) throw new ServiceError()
    return await res.json()
  }

  protected async put(path: string, body: object): Promise<NetworkMessage> {
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
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
    const res = await fetch(`${SERVER_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: this.commonHeaders,
      body: JSON.stringify(body),
    })
    if (res.status === 500) throw new ServiceError()
    return await res.json()
  }
}
