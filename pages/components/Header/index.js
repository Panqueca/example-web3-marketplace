import React from 'react'
import { Box, Flex, Image, NavLink, Button } from 'theme-ui'
import { getProvider } from '../../contracts/Marketplace'
import { useContext } from 'react'
import { UserContext } from '../../context/user'

export const metamaskParams = [
  {
    chainId: '0x4',
  },
]

const Header = () => {
  const user = useContext(UserContext)
  console.log({ user })

  async function setSigner() {
    const signer = getProvider().getSigner()
    const newAddress = await signer.getAddress()
    if (newAddress) {
      console.log('Account:', newAddress)
      user.updateUserField('isConnected', true)
      user.updateUserField('address', newAddress)
    }
  }

  async function changeNetwork() {
    const provider = getProvider()
    try {
      await provider.send('eth_requestAccounts', [])

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: metamaskParams, // chainId must be in hexadecimal numbers
      })
      setSigner()
    } catch (err) {
      console.log({ err })
    }
  }

  function disconnect() {
    user.disconnectAccount()
  }

  const btnStyles = {
    cursor: 'pointer',
    '&:hover': { bg: '#f1f1f1', color: 'primary' },
    mx: 15,
    p: 2,
  }

  return (
    <Flex bg="primary" sx={{ height: '75px', justifyContent: 'space-between' }}>
      <Flex sx={{ justifyContent: 'flex-start' }} as="nav">
        <Box p={2}>
          <Image
            src="https://logospng.org/download/react/logo-react-256.png"
            sx={{ height: '50px' }}
            alt="Company Logo"
          />
        </Box>
        <Flex sx={{ height: '75px', alignItems: 'center' }}>
          <NavLink href="#!" p={2}>
            Link 1
          </NavLink>
          <NavLink href="#!" p={2}>
            Link 2
          </NavLink>
          <NavLink href="#!" p={2}>
            Link 3
          </NavLink>
          <NavLink href="#!" p={2}>
            Link 4
          </NavLink>
        </Flex>
      </Flex>
      <Flex sx={{ height: '75px', alignItems: 'center' }}>
        {user.isConnected ? (
          <Button sx={btnStyles} onClick={disconnect}>
            My account
          </Button>
        ) : (
          <Button bg="secondary" sx={btnStyles} onClick={changeNetwork}>
            Login with Metamask
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default Header
