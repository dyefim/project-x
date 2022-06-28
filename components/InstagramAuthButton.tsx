import { ReactNode, useEffect, useCallback } from 'react'

import { openPopupWindow } from 'utils/popupWindow'
import URLParams from 'utils/urlParams'

export interface Error {
  error: string | null
  error_reason: string | null
  error_description?: string | null
}

interface Props {
  clientId: string
  children?: ReactNode
  redirectUri?: string
  useRedirect?: boolean
  implicitAuth?: boolean
  onFailure: (error: Error) => void
  onSuccess: (response: string | null) => void
}

const InstagramAuthButton = ({
  clientId,
  children,
  redirectUri,
  implicitAuth = false,
  useRedirect = false,
  onFailure,
  onSuccess,
}: Props) => {
  const checkInstagramAuthentication = useCallback(
    (context: Window) => {
      const { location } = context

      const params = URLParams(location.search)

      if (implicitAuth) {
        const [, matchedUrl] = location.hash.match(/=(.*)/) || []

        if (matchedUrl) {
          onSuccess(matchedUrl)
          return true
        }
      } else if (location.search.includes('code')) {
        onSuccess(params.get('code'))
        return true
      } else if (location.search.includes('error')) {
        onFailure({
          error: params.get('error'),
          error_reason: params.get('error_reason'),
          error_description: params.get('error_description'),
        })
        return true
      }

      return false
    },
    [implicitAuth, onFailure, onSuccess]
  )

  const onCredentialsChanged = (
    popup: Window | null,
    resolve?: (value: Record<string, unknown> | string) => void,
    reject?: () => void
  ): Promise<Record<string, unknown> | string> | void => {
    const error = {
      error: 'closed',
      error_reason: 'oauth_canceled',
      error_description: 'User canceled the authentication',
    }
    if (popup == null) {
      onFailure(error)
      return
    }
    if (!resolve) {
      return new Promise((res, rej) => onCredentialsChanged(popup, res, rej))
    }
    let isFinished
    try {
      isFinished = checkInstagramAuthentication(popup)
    } catch (err) {
      // An exception is thrown when we try to access to another website's url
    }

    if (isFinished) {
      popup.close()
    } else if (popup.closed) {
      onFailure(error)
    } else {
      setTimeout(() => onCredentialsChanged(popup, resolve, reject), 0)
    }
  }

  const oAuthSignIn = ({
    url,
    tab = false,
  }: {
    url: string
    tab?: boolean
  }) => {
    const name = tab ? '_blank' : 'instagram'
    const popup = openPopupWindow({ url, name })
    onCredentialsChanged(popup)
  }

  const onButtonClicked = () => {
    const stringParams = URLParams({
      client_id: clientId,
      redirect_uri: redirectUri || window.location.href,
      response_type: implicitAuth ? 'token' : 'code',
      scope: 'user_profile,user_media',
    }).toString()

    const url = `https://api.instagram.com/oauth/authorize?${stringParams}`

    if (useRedirect) {
      window.location.href = url
    } else {
      oAuthSignIn({ url })
    }
  }

  useEffect(() => {
    checkInstagramAuthentication(window)
  }, [checkInstagramAuthentication])

  return (
    <div className="instagram-login-button" onClick={onButtonClicked}>
      {children || 'Login with Instagram'}
    </div>
  )
}

export default InstagramAuthButton
