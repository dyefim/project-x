import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Divider, Stack, Text } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { InstagramService } from 'services'
import Login from 'components/Login'

import styles from 'styles/Home.module.css'

const AuthPage = () => {
  const [userName, setUserName] = useState('')
  const [isFailed, setIsFailed] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const token = Cookies.get('instagramToken')

      if (token) {
        const userInfo = await InstagramService.getUserInfo(token)
        setUserName(userInfo.username)
      }
    }

    getUser()
  }, [])

  const getUser = async (code: string | null) => {
    setIsFailed(false)

    try {
      const { access_token } = await InstagramService.exchangeCodeForToken(code)
      const userInfo = await InstagramService.getUserInfo(access_token)

      InstagramService.storeInstagramToken(access_token)
      setUserName(userInfo.username)
    } catch (error) {
      console.log('Error while getting user', error)
      setIsFailed(true)
    }
  }

  const handleLogout = () => {
    InstagramService.removeInstagramToken()
    setUserName('')
  }

  return (
    <main className={styles.main}>
      <Stack>
        <Login onSuccess={getUser} buttonLabel={isFailed ? 'Try again' : ''} />
        {userName && (
          <Button variant="outline" colorScheme="red" onClick={handleLogout}>
            Log Out from Instagram
          </Button>
        )}
      </Stack>
      {userName && (
        <>
          <Box borderWidth="1px" borderRadius="lg" padding="4" margin="4">
            <Text fontSize="sm">You logged in as:</Text>
            <Divider marginBottom="2" />
            <Stack direction="row">
              <Avatar size="sm" />
              <Text fontSize="xl">{userName}</Text>
            </Stack>
          </Box>
        </>
      )}
    </main>
  )
}

export default AuthPage
