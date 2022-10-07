import {
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
  createStyles,
  Grid,
  Group,
  NumberInput,
  Paper,
  Text,
  Textarea,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import { IconUser } from "@tabler/icons"

const ICON_SIZE = 60

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}))

export function Walk() {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [uuid, setUuid] = useState("")
  const [userInfo, setUserInfo] = useState({ pets: [] })
  const { classes } = useStyles()
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
        `${process.env.REACT_APP_BASEURL}/petsitting/addPetWalk`,
        {
          ...form.values,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        setUuid(response.data.uuid)
      })
      .catch((error) => console.log(error))
  }

  const getData = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/petsitting/petSitting/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => setUserInfo(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
    getData(eventId)
  }, [])

  return (
    <>
      <Container size='sm' mt={50}>
        <Paper
          radius='md'
          withBorder
          className={classes.card}
          mt={ICON_SIZE / 3}
        >
          <ThemeIcon
            className={classes.icon}
            size={ICON_SIZE}
            radius={ICON_SIZE}
          >
            <IconUser size={34} stroke={1.5} />
          </ThemeIcon>

          <Title align='center' order={3}>
            {userInfo.name}
          </Title>
          <Text color='dimmed' align='center' size='md'>
            {userInfo.address}
          </Text>
          <Text color='dimmed' align='center' size='md'>
            {userInfo.email}
          </Text>
          <Text color='dimmed' align='center' size='md'>
            {userInfo.phone}
          </Text>
          <Text color='dimmed' align='center' size='md'>
            {userInfo.numvisitsperday} visits per day
          </Text>
          <Group position='center' mt={40}>
            <Title order={3}>Pets</Title>
          </Group>
          <Group position='center'>
            <Container size='xs'>
              {userInfo.pets.map((pet) => {
                return (
                  <div key={pet._id}>
                    <Group position='center' mt='md'>
                      <Title order={5}>{pet.name}</Title>
                      <Text size='md'>{pet.petType}</Text>
                    </Group>
                    <Group position='center' mt='xs'>
                      <Text size='md'>
                        {pet.medicine ? "Takes medicine" : ""}
                      </Text>
                    </Group>
                    <Group position='center' mt='xs'>
                      <Text size='md'>{pet.notes ? pet.notes : ""}</Text>
                    </Group>
                  </div>
                )
              })}
            </Container>
          </Group>
        </Paper>
      </Container>

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

              <Group position='center' mt={100}>
                <Button size='lg' component={Link} to={`/home`}>
                  Back
                </Button>
                {uuid ? (
                  <Button
                    size='lg'
                    component={Link}
                    to={`/getwalk/${uuid}`}
                    target='_blank'
                  >
                    View Walk
                  </Button>
                ) : (
                  ""
                )}
              </Group>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}
