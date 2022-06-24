import { useState } from 'react'
import { Avatar, Button, Text } from '@chakra-ui/react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { InstagramService } from 'services'

import styles from '../styles/Home.module.css'

const Body = () => {
  const [user, setUser] = useState('')

  const exchangeCodeForToken = async () => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    const response = await axios.post('/api/instagram/getAccessToken', {
      code,
    })

    Cookie.set('instagram_access_token', response.data.access_token)
    setUser('Unknown')
  }

  return (
    <main className={styles.main}>
      <form
        name="instagram-auth-form"
        action={InstagramService.InstagramAuthorizationWindowURL}
        method="post"
      >
        <Button type="submit">Submit</Button>
      </form>
      <Button onClick={exchangeCodeForToken}>
        Exchange the Code For a Token
      </Button>
      {user && (
        <>
          <Text fontSize="sm">You logged in as:</Text>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Avatar size={'sm'} />
            <Text fontSize="xl">{user}</Text>
          </div>
        </>
      )}
    </main>
  )
}

export default Body
