import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { DatePicker } from "@mantine/dates"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  IconAt,
  IconCalendar,
  IconHome,
  IconPhone,
  IconTrash,
  IconUser,
} from "@tabler/icons"
import axios from "axios"
import { randomId } from "@mantine/hooks"

export function NewPetSitting() {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      startdate: Date.now(),
      enddate: Date.now(),
      numvisitsperday: 1,
      pets: [
        {
          key: randomId(),
          name: "",
          petType: "",
          age: 1,
          medicine: false,
          notes: "",
        },
      ],
    },
  })

  const petFields = form.values.pets.map((item, index) => (
    <div key={item.key}>
      <Group>
        <TextInput
          placeholder='Pet Name'
          label='Pet Name'
          withAsterisk
          size='md'
          mb={10}
          autoCapitalize='off'
          autoCorrect='off'
          sx={{ flex: 1 }}
          {...form.getInputProps(`pets.${index}.name`)}
        />
        <ActionIcon
          color='red'
          onClick={() => form.removeListItem("pets", index)}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
      <Select
        withAsterisk
        size='md'
        data={["Cat", "Dog"]}
        placeholder='Pick one'
        label='Pet type'
        mb={10}
        {...form.getInputProps(`pets.${index}.petType`)}
      />
      <Group spacing={5}>
        <NumberInput
          placeholder='Pet age'
          label='Pet age'
          size='md'
          max={40}
          min={1}
          step={1}
          styles={{ input: { width: 80 } }}
          mb={20}
          {...form.getInputProps(`pets.${index}.age`)}
        />
      </Group>
      <Checkbox
        label='Takes medicine?'
        size='md'
        mb={10}
        {...form.getInputProps(`pets.${index}.medicine`, {
          type: "checkbox",
        })}
      />
      <Textarea
        placeholder='Additional notes'
        label='Additional notes'
        size='md'
        autosize
        minRows={2}
        {...form.getInputProps(`pets.${index}.notes`)}
        mb={60}
      />
    </div>
  ))

  function handleSubmit({
    name,
    email,
    phone,
    address,
    startdate,
    enddate,
    numvisitsperday,
    pets,
  }) {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/petsitting/newPetSitting`,
        {
          name,
          email,
          phone,
          address,
          startdate,
          enddate,
          numvisitsperday,
          pets,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        // console.log(response)
        navigate("/home")
      })
      .catch((e) => console.log("error", e))
  }

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
  }, [])

  return (
    <>
      <Group position='left'>
        <Button onClick={() => navigate("/home")}>Cancel</Button>
      </Group>
      <Container mt={50}>
        <Group position='center'>
          <h2>New Pet sitting form</h2>
        </Group>
      </Container>
      <Container mt={50}>
        <Grid>
          <Grid.Col xs={12}>
            <Box sx={{ maxWidth: 500 }} mx='auto'>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                  {...form.getInputProps("name")}
                  placeholder='Customer Name'
                  label='Customer Name'
                  size='md'
                  withAsterisk
                  mb={10}
                  autoCapitalize='off'
                  autoCorrect='off'
                  icon={<IconUser size={14} />}
                />
                <TextInput
                  {...form.getInputProps("email")}
                  size='md'
                  placeholder='Customer email'
                  label='Customer Email'
                  withAsterisk
                  mb={10}
                  autoCapitalize='off'
                  autoCorrect='off'
                  icon={<IconAt size={14} />}
                />
                <TextInput
                  {...form.getInputProps("phone")}
                  size='md'
                  placeholder='Customer phone'
                  label='Phone'
                  withAsterisk
                  mb={10}
                  autoCapitalize='off'
                  autoCorrect='off'
                  icon={<IconPhone size={14} />}
                />
                <TextInput
                  {...form.getInputProps("address")}
                  size='md'
                  placeholder='Customer address'
                  label='Customer Address'
                  withAsterisk
                  mb={10}
                  autoCapitalize='off'
                  autoCorrect='off'
                  icon={<IconHome size={14} />}
                />
                <DatePicker
                  {...form.getInputProps("startdate")}
                  size='md'
                  placeholder='Select date'
                  label='Start date'
                  withAsterisk
                  mb={10}
                  icon={<IconCalendar size={14} />}
                />
                <DatePicker
                  {...form.getInputProps("enddate")}
                  size='md'
                  placeholder='Select date'
                  label='End date'
                  withAsterisk
                  mb={10}
                  icon={<IconCalendar size={14} />}
                />
                <>
                  <Text size='sm'>Number of visits per day</Text>
                  <Group spacing={5}>
                    <NumberInput
                      placeholder='Number of visits per day'
                      size='md'
                      max={40}
                      min={1}
                      step={1}
                      styles={{ input: { width: 80 } }}
                      mb={20}
                      {...form.getInputProps("numvisitsperday")}
                    />
                  </Group>
                </>
                {petFields}
                <Group position='apart' mt={30}>
                  <Button
                    onClick={() =>
                      form.insertListItem("pets", {
                        key: randomId(),
                        name: "",
                        petType: "",
                        age: 1,
                        medicine: false,
                        notes: "",
                      })
                    }
                  >
                    Add another pet
                  </Button>
                  <Button type='submit'>Add Pet Sitting Event</Button>
                </Group>
              </form>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}
