import React from 'react'
import { Flex, Box, Text, Badge, Avatar } from 'theme-ui'

const avatarStyles = {
  width: '30px',
  height: '30px',
}

const avatarBoxStyles = {
  alignItems: 'center',
  gap: '5px',
}

const ProjectCard = props => {
  const { project = {} } = props || {}
  const { title, status, deadline, responsibles } = project

  return (
    <Flex
      sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          borderRadius: '8px',
          padding: '15px',
          border: '2px solid #999',
          boxShadow: '1px 1px 15px 0px rgba(0,0,0,0.2)',
        }}
      >
        <Text as="h2" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          {title}
        </Text>
        <Text as="h3" sx={{ fontWeight: 'normal' }}>
          Stage: <Badge sx={{ fontSize: '16px' }}>{status}</Badge>
        </Text>
        <Text as="h3" sx={{ fontWeight: 'normal' }}>
          Deadline: <b>{deadline}</b>
        </Text>
        <Text as="h3" sx={{ fontWeight: 'normal' }}>
          Responsbibles:
        </Text>
        <Flex sx={{ flexDirection: 'column', gap: '10px', mt: '5px' }}>
          {responsibles.map(name => {
            return (
              <Flex sx={avatarBoxStyles} key={name}>
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${name}`}
                  sx={avatarStyles}
                />{' '}
                {name}
              </Flex>
            )
          })}
        </Flex>
        <Flex sx={{ justifyContent: 'flex-end' }}>See details</Flex>
      </Box>
    </Flex>
  )
}

export default ProjectCard
