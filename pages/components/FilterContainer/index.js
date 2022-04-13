import React from 'react'
import { Flex, Box, Input, Button } from 'theme-ui'

const FilterContainer = () => {
  return (
    <Flex
      sx={{ alignItems: 'center', flexDirection: 'column', width: '100%' }}
      my="4"
    >
      <Box>
        <Flex sx={{ flexFlow: 'row' }}>
          <Input placeholder="O que você procura?" mr="2" />
          <Button sx={{ flex: '0 0 auto' }}>Buscar</Button>
        </Flex>
        <Flex m="3" sx={{ gap: '10px' }}>
          <Button bg="secondary">Filter 1</Button>
          <Button bg="secondary">Filter 2</Button>
          <Button bg="secondary">Filter 3</Button>
          <Button bg="secondary">Filter 4</Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default FilterContainer
