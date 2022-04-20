import { useState, useEffect } from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'
import '../styles/globals.css'
import '../styles/products.css'
import { UserContext } from './context/user'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ isConnected: false })

  function updateUserField(field, newValue) {
    setUser(current => {
      return {
        ...current,
        [field]: newValue,
      }
    })
  }

  function disconnectAccount() {
    updateUserField('isConnected', false)
    updateUserField('address', '')
  }

  useEffect(() => {
    setUser({ ...user, updateUserField, disconnectAccount })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default MyApp
