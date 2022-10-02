import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  NumberInput,
  Select,
  Skeleton,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { DatePicker } from "@mantine/dates"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  IconAt,
  IconCalendar,
  IconHome,
  IconPhone,
  IconUser,
} from "@tabler/icons"
import axiosInstance from "../helpers/axios"
import { randomId } from "@mantine/hooks"

export function NewPetSitting() {
  const navigate = useNavigate()
  const [numPets, setNumPets] = useState(1)
  const [numVisits, setNumVisits] = useState(1)
  // const handlers = useRef()
  const child = <Skeleton height={250} radius='md' animate={false} />
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

  function handleNumPets(value) {
    form.insertListItem("pets", {
      key: randomId(),
      name: "",
      petType: "",
      age: 1,
      medicine: false,
      notes: "",
    })
  }

  function handleSubmit(values) {
    console.log(values)
    // axiosInstance
    //   .post(`/user/login`, {
    //     email,
    //     password,
    //   })
    //   .then((response) => {
    //     localStorage.setItem("token", response.data.token)
    //     setSignedIn(true)
    //     navigate("/home")
    //   })
  }

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
  }, [])

  return (
    <>
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
                  withAsterisk
                  mb={10}
                  autoCapitalize='off'
                  autoCorrect='off'
                  icon={<IconUser size={14} />}
                />
                <TextInput
                  {...form.getInputProps("email")}
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
                  placeholder='Customer adress'
                  label='Customer Address'
                  withAsterisk
                  mb={10}
                  autoCapitalize='off'
                  autoCorrect='off'
                  icon={<IconHome size={14} />}
                />
                <DatePicker
                  {...form.getInputProps("startdate")}
                  placeholder='Select date'
                  label='Start date'
                  withAsterisk
                  mb={10}
                  icon={<IconCalendar size={14} />}
                />
                <DatePicker
                  {...form.getInputProps("enddate")}
                  placeholder='Select date'
                  label='End date'
                  withAsterisk
                  mb={10}
                  icon={<IconCalendar size={14} />}
                />
                <>
                  <Text size='sm'>Number of Visits per day</Text>
                  <Group spacing={5}>
                    <NumberInput
                      value={numVisits}
                      onChange={(val) => setNumVisits(val)}
                      max={10}
                      min={1}
                      step={1}
                      styles={{ input: { width: 60 } }}
                      mb={10}
                    />
                  </Group>
                  <Text size='sm'>Number of Pets</Text>
                  <Group spacing={5}>
                    <NumberInput
                      value={numPets}
                      onChange={(val) => handleNumPets(val)}
                      max={10}
                      min={1}
                      step={1}
                      styles={{ input: { width: 60 } }}
                      mb={10}
                    />
                  </Group>
                </>
                <>
                  {form.values.pets.map((item, index) => (
                    <div key={item.key}>
                      <TextInput
                        placeholder='Pet Name'
                        label='Pet Name'
                        withAsterisk
                        mb={10}
                        autoCapitalize='off'
                        autoCorrect='off'
                        {...form.getInputProps(`pets.${index}.name`)}
                      />
                      <Select
                        withAsterisk
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
                          max={40}
                          min={1}
                          step={1}
                          styles={{ input: { width: 60 } }}
                          mb={20}
                          {...form.getInputProps(`pets.${index}.age`)}
                        />
                      </Group>
                      <Checkbox
                        label='Takes medicine?'
                        mb={10}
                        {...form.getInputProps(`pets.${index}.medicine`, {
                          type: "checkbox",
                        })}
                      />
                      <Textarea
                        placeholder='Additional notes'
                        label='Additional notes'
                        autosize
                        minRows={2}
                        {...form.getInputProps(`pets.${index}.notes`)}
                      />
                    </div>
                  ))}
                </>
                <Group position='right' mt={30}>
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
