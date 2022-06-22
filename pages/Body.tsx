import { Button } from '@chakra-ui/react'
import { InstagramAuthorizationWindowURL } from '../constants/URLs'

import styles from '../styles/Home.module.css'

const Body = () => {
  return (
    <main className={styles.main}>
      <form
        name="instagram-auth-form"
        action={InstagramAuthorizationWindowURL}
        method="post"
      >
        <Button type="submit">Submit</Button>
      </form>
    </main>
  )
}

export default Body
