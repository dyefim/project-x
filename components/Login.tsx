import { Button } from '@chakra-ui/react'

import InstagramAuthButton from 'components/InstagramAuthButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

interface Props {
  buttonLabel?: string
  onSuccess: (token: string | null) => void
}

const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || ''

const Login = (props: Props) => {
  return (
    <InstagramAuthButton
      clientId={clientId}
      onSuccess={props.onSuccess}
      onFailure={(e) => {
        console.error(e)
      }}
    >
      <Button
        colorScheme="pink"
        leftIcon={<FontAwesomeIcon icon={faInstagram} />}
      >
        {props.buttonLabel || 'Login with Instagram'}
      </Button>
    </InstagramAuthButton>
  )
}

export default Login
