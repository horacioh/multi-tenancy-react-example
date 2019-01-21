import React from 'react'
import { styled } from 'src/App/Config/styled-components'
import { Button, Input } from 'src/App/Components/Elements'
import { Box, Flex } from 'rebass'

const LoginPageWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`

export default function Login(): React.ReactElement<{}> {
  return (
    <LoginPageWrapper width={1} alignItems="center" justifyContent='center' bg="lightgray">
      <Box p={3} bg="primary">
        <Input label="email" />
        <Button>Login</Button>
      </Box>
    </LoginPageWrapper>
  )
}
