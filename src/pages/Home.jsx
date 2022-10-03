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
import { IconWalk } from "@tabler/icons"
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
          {/* <Button size='xl' onClick={() => setOpened(true)}>
            New Pet Sitting event
          </Button> */}
          <Button size='xl' onClick={() => navigate("/new")}>
            New Pet Sitting event
          </Button>
        </Group>
      </Container>
      <Container my='md' mt={50}>
        <Grid>
          {petSittingEvents.map((item) => (
            <Grid.Col key={item._id} xs={4}>
              <Anchor component={Link} to='/home'>
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
                  <Text color='dimmed' align='center' size='md'>
                    {item.numvisitsperday} walks / day
                  </Text>
                  <Group position='center' mt='md'>
                    <Text size='md'>
                      {/* 3 /{" "} */}
                      Duration:{" "}
                      {dayjs(item.enddate).diff(
                        dayjs(item.startdate),
                        "days"
                      )}{" "}
                      days
                    </Text>
                  </Group>
                </Paper>
              </Anchor>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  )
}
