import { useState } from 'react'
import { Avatar, Box, Divider, Stack, Text } from '@chakra-ui/react'

import styles from '../styles/Home.module.css'

import Login from 'components/Login'

const Body = () => {
  const [user, setUser] = useState('')

  return (
    <main className={styles.main}>
      <Login onSuccess={() => setUser('Unknown')} />

      {user && (
        <Box borderWidth="1px" borderRadius="lg" padding="4" margin="4">
          <Text fontSize="sm">You logged in as:</Text>
          <Divider marginBottom="2" />
          <Stack direction="row">
            <Avatar size="sm" />
            <Text fontSize="xl">{user}</Text>
          </Stack>
        </Box>
      )}
    </main>
  )
}

export default Body
