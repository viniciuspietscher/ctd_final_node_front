import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
} from "@mantine/core"
import { Link } from "react-router-dom"
import { useForm } from "@mantine/form"

export function Signin() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  })
  return (
    <Paper>
      <Group position='center' mb={50}>
        <Text>
          Sign in or{" "}
          <Anchor component={Link} to='/signup'>
            sign up
          </Anchor>{" "}
          to the app.
        </Text>
      </Group>
      <Container size='xs'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            {...form.getInputProps("email")}
            placeholder='Your email'
            label='Email'
            withAsterisk
            mb={10}
          />
          <TextInput
            {...form.getInputProps("password")}
            placeholder='Your password'
            label='Password'
            type='Password'
            withAsterisk
          />

          <Group position='right' mt={30}>
            <Button type='submit'>Submit</Button>
          </Group>
        </form>
      </Container>
    </Paper>
  )
}
