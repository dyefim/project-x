// https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions#query-string-parameters
const instagramAuthRedirectUri =
  process.env.INSTAGRAM_AUTH_REDIRECT_URI || 'https://localhost:3001/'
const clientId = '5373692859350025'
const scope = 'user_profile,user_media'
const responseType = 'code'

const instagramAuthParams = {
  client_id: clientId,
  redirect_uri: instagramAuthRedirectUri,
  scope,
  response_type: responseType,
}

const instagramAuthParamsString = new URLSearchParams(
  instagramAuthParams
).toString()

const instagramAuthorizeBaseURL = 'https://api.instagram.com/oauth/authorize/'

export const InstagramAuthorizationWindowURL = `${instagramAuthorizeBaseURL}?${instagramAuthParamsString}`
