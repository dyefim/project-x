import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { FormDataService } from 'services'
import URLParams from 'utils/urlParams'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || ''
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET || ''
  const grantType = 'authorization_code'
  const redirectUri =
    process.env.INSTAGRAM_AUTH_REDIRECT_URI || window.location.href

  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: grantType,
    redirect_uri: redirectUri,
    code: req.body.code,
  }

  const formData = FormDataService.convertToFormData(params)

  const stringParams = URLParams(params).toString()

  const response = await axios.post(
    `https://api.instagram.com/oauth/access_token?${stringParams}`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
      },
    }
  )

  res.status(200).send(response.data)
}
