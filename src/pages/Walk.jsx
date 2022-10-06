import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  NumberInput,
  Textarea,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function Walk() {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [uuid, setUuid] = useState("")
  const form = useForm({
    initialValues: {
      petSittingId: eventId,
      date: Date(),
      starttime: Date(),
      endtime: "",
      walknotes: "",
      pee: 0,
      poop: 0,
      food: false,
      water: false,
      medicine: false,
      pictures: [],
    },
  })

  const handleSubmit = () => {
    form.values.endtime = Date()
    axios
      .post(
        "http://localhost:5000/api/v1/petsitting/addPetWalk",
        {
          ...form.values,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => setUuid(response.data.uuid))
      .catch((error) => console.log(error))
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
          <h2>New Walk</h2>
        </Group>
      </Container>
      <Container mt={50}>
        <Grid>
          <Grid.Col xs={12}>
            <Box sx={{ maxWidth: 500 }} mx='auto'>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Group spacing={5}>
                  <NumberInput
                    placeholder='Number of times pet peed'
                    label='Pee'
                    size='md'
                    max={40}
                    min={1}
                    step={1}
                    mb={20}
                    {...form.getInputProps("pee")}
                  />
                </Group>
                <Group spacing={5}>
                  <NumberInput
                    placeholder='Number of times pet poop'
                    label='Poop'
                    size='md'
                    max={40}
                    min={1}
                    step={1}
                    mb={20}
                    {...form.getInputProps("poop")}
                  />
                </Group>
                <Checkbox
                  label='Food'
                  size='md'
                  mb={20}
                  {...form.getInputProps(`food`, {
                    type: "checkbox",
                  })}
                />
                <Checkbox
                  label='Water'
                  size='md'
                  mb={20}
                  {...form.getInputProps(`water`, {
                    type: "checkbox",
                  })}
                />
                <Checkbox
                  label='Medicine'
                  size='md'
                  mb={20}
                  {...form.getInputProps(`medicine`, {
                    type: "checkbox",
                  })}
                />
                <Textarea
                  placeholder='Walk notes'
                  label='Walk notes'
                  size='md'
                  autosize
                  minRows={2}
                  {...form.getInputProps(`walknotes`)}
                  mb={50}
                />
                <Group position='center' mt={30}>
                  <Button type='submit' size='lg'>
                    End Walk
                  </Button>
                </Group>
              </form>
              {uuid ? (
                <Anchor
                  component={Link}
                  to={`/getwalk/${uuid}`}
                  target='_blank'
                >
                  View Walk
                </Anchor>
              ) : (
                ""
              )}
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}
