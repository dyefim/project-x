import axios from 'axios'
import { FormDataService } from 'services'

// https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions#query-string-parameters
const authRedirectUri =
  process.env.INSTAGRAM_AUTH_REDIRECT_URI || 'https://localhost:3001/'
const clientId = '5373692859350025'
const scope = 'user_profile,user_media'
const responseType = 'code'

const instagramAuthParams = {
  client_id: clientId,
  redirect_uri: authRedirectUri,
  scope,
  response_type: responseType,
}

const instagramAuthParamsString = new URLSearchParams(
  instagramAuthParams
).toString()

export const InstagramAuthorizationWindowURL =
  'https://api.instagram.com/oauth/authorize/?' + instagramAuthParamsString

interface SuccessResponse {
  access_token: string
  user_id: number
}

interface RejectedResponse {
  error_type: string
  code: number
  error_message: string
}

type InstagramAccessTokenResponse = SuccessResponse | RejectedResponse

export const getAccessToken = async (
  authorizationCode: string
): Promise<InstagramAccessTokenResponse> => {
  const params = {
    client_id: clientId,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    code: authorizationCode,
    grant_type: 'authorization_code',
    redirect_uri: authRedirectUri,
  }

  const formData = FormDataService.convertToFormData(params)

  try {
    const response = await axios.post(
      'https://api.instagram.com/oauth/access_token',
      formData,
      {
        headers: formData.getHeaders(),
      }
    )
    return response.data
  } catch (error: any) {
    return error.message
  }
}
