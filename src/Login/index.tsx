import React from 'react'
import { Button, Input } from 'src/App/Components/Elements'
import { Box, Flex } from 'rebass'

export function Login(): React.ReactElement<{}> {
  return (
    <Flex width={1} alignItems="center" justifyContent='center'>
      <Box p={3} bg="primary">
        <Input />
        <Button />
      </Box>
    </Flex>
  )
}
