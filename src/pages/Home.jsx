import {
  Anchor,
  Button,
  Container,
  createStyles,
  Grid,
  Group,
  Paper,
  Text,
  ThemeIcon,
} from "@mantine/core"
import { IconAt, IconHome, IconPhone, IconWalk } from "@tabler/icons"
import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()
  const [petSittingEvents, setPetSittingEvents] = useState([])

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

  const { classes } = useStyles()

  const getPetSittingEvents = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/petsitting/petSitting`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => setPetSittingEvents(response.data.petSittingEvent))
  }

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
    getPetSittingEvents()
  }, [])

  return (
    <>
      <Container mt={50}>
        <Group position='center'>
          <Button size='xl' component={Link} to={`/new`}>
            New Pet Sitting event
          </Button>
        </Group>
      </Container>
      <Container my='md' mt={50}>
        <Grid>
          {petSittingEvents.map((item) => (
            <Grid.Col key={item._id} xs={4}>
              {/* <Anchor component={Link} to={`/view/${item._id}`}> */}
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
                  <IconWalk size={34} stroke={1.5} />
                </ThemeIcon>
                <Text
                  align='center'
                  weight={700}
                  size='md'
                  className={classes.title}
                >
                  {item.name}
                </Text>
                <Text mt='md' color='dimmed' align='center' size='md'>
                  <IconHome size={14} />
                  {item.address}
                </Text>
                <Text color='dimmed' align='center' size='md'>
                  <IconPhone size={14} /> {item.phone}
                </Text>
                <Text color='dimmed' align='center' size='md'>
                  <IconAt size={14} /> {item.email}
                </Text>
                <Text color='dimmed' align='center' size='md'>
                  <IconWalk size={14} />
                  {item.numvisitsperday} walks / day
                </Text>
                <Group position='center' mt='md'>
                  <Text size='md'>
                    {dayjs(item.enddate).diff(dayjs(item.startdate), "days")}{" "}
                    days - {dayjs(item.startdate).format("MMM DD")} /{" "}
                    {dayjs(item.enddate).format("MMM DD")}
                  </Text>
                </Group>
              </Paper>
              {/* </Anchor> */}
              <Group position='center' mt='sm' mb='sm'>
                <Button component={Link} to={`/walk/${item._id}`}>
                  Start Walk
                </Button>
              </Group>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  )
}
