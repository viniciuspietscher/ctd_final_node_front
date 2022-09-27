import { Button, Container, Group, Paper, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

export function Signup() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  return (
    <Paper>
      <Group position='center' mb={50}>
        <Text>Sign up to start Pet sitting</Text>
      </Group>
      <Container size='xs'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            {...form.getInputProps("name")}
            placeholder='Your name'
            label='Full name'
            withAsterisk
            mb={10}
          />
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
