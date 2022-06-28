import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Body = () => {
  return (
    <main className={styles.main}>
      <Link href="/auth">Go to Auth page</Link>
    </main>
  )
}

export default Body
