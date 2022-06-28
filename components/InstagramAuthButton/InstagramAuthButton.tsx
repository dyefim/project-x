import { useEffect, useCallback } from 'react'
import { Props, ResolveValue } from './types'
import { openPopupWindow } from 'utils/popupWindow'
import URLParams from 'utils/urlParams'

const oAuthCancellationError = {
  error: 'closed',
  error_reason: 'oauth_canceled',
  error_description: 'User canceled the authentication',
}

const InstagramAuthButton = ({
  clientId,
  children,
  redirectUri,
  onFailure,
  onSuccess,
}: Props) => {
  const checkInstagramAuthentication = useCallback(
    (context: Window) => {
      const searchParams = context.location.search
      const params = URLParams(searchParams)

      if (searchParams.includes('code')) {
        onSuccess(params.get('code'))
        return true
      } else if (searchParams.includes('error')) {
        onFailure({
          error: params.get('error'),
          error_reason: params.get('error_reason'),
          error_description: params.get('error_description'),
        })
        return true
      }

      return false
    },
    [onFailure, onSuccess]
  )

  const onCredentialsChanged = (
    popup: Window | null,
    resolve?: (value: ResolveValue) => void,
    reject?: () => void
  ): Promise<ResolveValue> | void => {
    if (popup == null) {
      onFailure(oAuthCancellationError)
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
      onFailure(oAuthCancellationError)
    } else {
      setTimeout(() => onCredentialsChanged(popup, resolve, reject), 1000)
    }
  }

  const oAuthSignIn = (url: string) => {
    const popup = openPopupWindow(url)
    onCredentialsChanged(popup)
  }

  const onButtonClicked = () => {
    const stringParams = URLParams({
      client_id: clientId,
      redirect_uri: redirectUri || window.location.href,
      response_type: 'code',
      scope: 'user_profile,user_media',
    }).toString()

    const url = `https://api.instagram.com/oauth/authorize?${stringParams}`

    oAuthSignIn(url)
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
