import axios from 'axios'

interface ExchangeTokenResponse {
  access_token: string
  user_id: number
}

export const exchangeCodeForToken = async (code: string | null) => {
  const response = await axios.post<ExchangeTokenResponse>(
    '/api/instagram/exchange-token',
    {
      code,
    }
  )

  return response.data.access_token
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
