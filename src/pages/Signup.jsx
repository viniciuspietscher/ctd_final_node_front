import {
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAt, IconLock } from "@tabler/icons"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Signup() {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/home")
    }
  }, [])

  function handleSubmit({ name, email, password }) {
    axios
      .post(`http://localhost:5000/api/v1/user/register`, {
        name,
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token)
        navigate("/home")
      })
  }

  return (
    <Paper>
      <Group position='center' mb={50}>
        <Text>Sign up to start Pet sitting</Text>
      </Group>
      <Container size='xs'>
        {/* <form onSubmit={form.onSubmit((values) => signUp(values))}> */}
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            {...form.getInputProps("name")}
            placeholder='Your name'
            label='Full name'
            withAsterisk
            autoCorrect='off'
            mb={10}
          />
          <TextInput
            {...form.getInputProps("email")}
            placeholder='Your email'
            label='Email'
            withAsterisk
            mb={10}
            autoCapitalize='off'
            autoCorrect='off'
            icon={<IconAt size={14} />}
          />
          <PasswordInput
            {...form.getInputProps("password")}
            placeholder='Your password'
            label='Password'
            withAsterisk
            icon={<IconLock size={14} />}
          />

          <Group position='right' mt={30}>
            <Button type='submit' size='lg'>
              Sign up
            </Button>
          </Group>
        </form>
      </Container>
    </Paper>
  )
}
