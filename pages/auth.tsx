import { useState } from 'react'
import { Avatar, Box, Divider, Stack, Text } from '@chakra-ui/react'

import styles from '../styles/Home.module.css'

import Login from 'components/Login'
import { InstagramService } from 'services'

const AuthPage = () => {
  const [userName, setUserName] = useState('')

  const getUser = async (code: string | null) => {
    const token = await InstagramService.exchangeCodeForToken(code)
    const userInfo = await InstagramService.getUserInfo(token)

    setUserName(userInfo.username)
  }

  return (
    <main className={styles.main}>
      <Login onSuccess={getUser} />

      {userName && (
        <Box borderWidth="1px" borderRadius="lg" padding="4" margin="4">
          <Text fontSize="sm">You logged in as:</Text>
          <Divider marginBottom="2" />
          <Stack direction="row">
            <Avatar size="sm" />
            <Text fontSize="xl">{userName}</Text>
          </Stack>
        </Box>
      )}
    </main>
  )
}

export default AuthPage
