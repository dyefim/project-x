import axios from 'axios'
import Cookies from 'js-cookie'

export const storeInstagramToken = (token: string) => {
  Cookies.set('instagramToken', token, {
    expires: 1,
  })
}

export const removeInstagramToken = () => {
  Cookies.remove('instagramToken')
}

interface ExchangeTokenResponse {
  access_token: string
  user_id: string
}

export const exchangeCodeForToken = async (code: string | null) => {
  const response = await axios.post<ExchangeTokenResponse>(
    '/api/instagram/exchange-token',
    {
      code,
    }
  )

  return response.data
}

interface InstagramUserInfo {
  id: string
  username: string
}

export const getUserInfo = async (token: string) => {
  const response = await axios.post<InstagramUserInfo>('/api/instagram/me', {
    access_token: token,
  })

  return response.data
}
