import type { NextApiRequest, NextApiResponse } from 'next'
import respondWithError from '../respondWithError'
import { InstagramService } from 'services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await InstagramService.getAccessToken(req.body.code)

    res.status(200).json(response)
  } catch (error) {
    respondWithError(res, error)
  }
}
