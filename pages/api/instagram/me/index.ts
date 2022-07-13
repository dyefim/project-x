import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import respondWithError from 'pages/api/respondWithError'

type Data = {
  name: string
}

const fields = ['id', 'username', 'media_count'].join(',')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { access_token } = req.body

  try {
    const response = await axios.get(
      `https://graph.instagram.com/v14.0/me?fields=${fields}&access_token=${access_token}`
    )

    res.status(200).send(response.data)
  } catch (error) {
    respondWithError(res, error)
  }
}
