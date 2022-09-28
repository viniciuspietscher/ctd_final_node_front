import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "@mantine/form"
import { IconAt, IconLock } from "@tabler/icons"
import { useEffect } from "react"
import axios from "axios"

export function Signin({ setSignedIn }) {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  })

  function handleSubmit({ email, password }) {
    axios
      .post(`${process.env.URL}/api/v1/user/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token)
        setSignedIn(true)
        navigate("/home")
      })
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/home")
    }
  }, [])
  return (
    <Paper>
      <Group position='center' mb={50}>
        <Text>
          Sign in or{" "}
          <Anchor component={Link} to='/signup'>
            sign up
          </Anchor>
          .
        </Text>
      </Group>
      <Container size='xs'>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
              Sign in
            </Button>
          </Group>
        </form>
      </Container>
    </Paper>
  )
}
