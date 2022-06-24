import { NextApiResponse } from 'next'

const respondWithError = (
  res: NextApiResponse<any>,
  error: any,
  fallbackStatus = 500
) => {
  const statusCode = error.status || fallbackStatus
  const message = error.message || 'Unknown error'

  console.error('Error from:', (res as any)?.req?.url)

  res.status(statusCode).send(message)
}

export default respondWithError
