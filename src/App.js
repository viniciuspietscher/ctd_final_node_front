import { useForm } from "@mantine/form"
import { TextInput, Button, Group } from "@mantine/core"
import { randomId } from "@mantine/hooks"

function App() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },
  })
  return (
    <div style={{ maxWidth: 320, margin: "auto" }}>
      <TextInput
        label='Name'
        placeholder='Name'
        {...form.getInputProps("name")}
      />
      <TextInput
        mt='md'
        label='Email'
        placeholder='Email'
        {...form.getInputProps("email")}
      />

      <Group position='center' mt='xl'>
        <Button
          variant='outline'
          onClick={() =>
            form.setValues({
              name: randomId(),
              email: `${randomId()}@test.com`,
            })
          }
        >
          Set random values
        </Button>
      </Group>
    </div>
  )
}

export default App
