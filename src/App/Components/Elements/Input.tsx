import React from "react";
import { styled } from 'src/App/Config/styled-components'
import { Flex, Box, BoxProps } from 'rebass'
import { fontFamily, FontFamilyProps } from 'styled-system'

const Label = styled(Box)<BoxProps & FontFamilyProps>`
  ${fontFamily}
`
interface TextFieldProps extends BoxProps {
  placeholder?: string
}

const TextField = styled(Box)<TextFieldProps>`
  outline: none;
  border: none;
  border-radius: 2px;
`
interface InputProps {
  label: string
  placeholder?: string
}

export function Input(props: InputProps) {
  const { label, placeholder } = props
  return (
    <Flex flexDirection="column" py={2} width={1}>
      <Box py={1}>
        <Label as="label" fontFamily="sans">{label}</Label>
      </Box>
      <Box py={1}>
        <TextField as="input" p={2} placeholder={placeholder || "placeholder"} />
      </Box>
    </Flex>
  )
}
