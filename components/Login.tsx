import { Button } from '@chakra-ui/react'

import InstagramAuthButton from 'components/InstagramAuthButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

interface Props {
  onSuccess: () => void
}

const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || ''
const authRedirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_AUTH_REDIRECT_URI

const Login = (props: Props) => {
  return (
    <InstagramAuthButton
      clientId={clientId}
      redirectUri={authRedirectUri}
      onSuccess={props.onSuccess}
      onFailure={(e) => {
        console.log(e)
      }}
    >
      <Button
        colorScheme="pink"
        leftIcon={<FontAwesomeIcon icon={faInstagram} />}
      >
        Login with Instagram
      </Button>
    </InstagramAuthButton>
  )
}

export default Login
