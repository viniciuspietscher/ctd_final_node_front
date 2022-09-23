import {
  Autocomplete,
  Button,
  Center,
  Container,
  Paper,
  Text,
  TextInput,
} from "@mantine/core"
import { useState } from "react"
import { PasswordStrength } from "../../ui/components/inputs/password"

export function Welcome() {
  const [email, setEmail] = useState("")
  const data =
    email.trim().length > 0 && !email.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map(
          (provider) => `${email}@${provider}`
        )
      : []
  return (
    <Paper>
      <Text>Sign up to start Pet sitting</Text>
      <Container size='xs'>
        <TextInput placeholder='Your name' label='Full name' withAsterisk />
        <Autocomplete
          value={email}
          onChange={setEmail}
          label='Email'
          placeholder='Start typing to see options'
          data={data}
          withAsterisk
        />
        <PasswordStrength />
        <Center>
          <Button>Sign up</Button>
        </Center>
      </Container>
    </Paper>
  )
}
