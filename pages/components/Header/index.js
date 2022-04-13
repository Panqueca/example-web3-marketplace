import React from 'react'
import { Box, Flex, Image, NavLink } from 'theme-ui'

const Header = () => {
  return (
    <Box bg="primary" sx={{ height: '75px' }}>
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
    </Box>
  )
}

export default Header
