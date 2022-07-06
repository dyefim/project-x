import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.get(
    'https://graph.instagram.com/v14.0/me?fields=id,username&access_token=' +
      req.body.access_token
  )

  res.status(200).send(response.data)
}
