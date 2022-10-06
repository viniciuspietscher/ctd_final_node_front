import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../helpers/axios"
import {
  createStyles,
  ThemeIcon,
  Text,
  Group,
  Badge,
  Paper,
  Container,
} from "@mantine/core"
import { IconWalk } from "@tabler/icons"
import dayjs from "dayjs"

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

export function GetWalk() {
  const { uuid } = useParams()
  const [petWalk, setPetWalk] = useState({})
  const { classes } = useStyles()

  const getPetWalk = (uuid) => {
    axiosInstance
      .get(`/customer/walk/${uuid}`)
      .then((response) => setPetWalk(response.data.petWalk))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getPetWalk(uuid)
  }, [])

  return (
    <Container size='sm' mt={50}>
      <Paper radius='md' withBorder className={classes.card} mt={ICON_SIZE / 3}>
        <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
          <IconWalk size={34} stroke={1.5} />
        </ThemeIcon>

        <Text align='center' weight={700} className={classes.title}>
          Pet Walk - {dayjs(petWalk.date).format("MMM DD")} -{" "}
          {dayjs(petWalk.starttime).format("hh:mm A")} -{" "}
          {dayjs(petWalk.endtime).format("hh:mm A")}
        </Text>
        <Text color='dimmed' align='center' size='md'>
          Total time:{" "}
          {dayjs(petWalk.endtime).diff(dayjs(petWalk.starttime), "minutes")}{" "}
          minutes.
        </Text>
        <Group position='center'>
          <Container size='xs' mt={20}>
            <Group position='apart' mt='md'>
              <Badge size='md'>Poop</Badge>
              <Text size='md'>
                {petWalk.poop} {petWalk.poop > 1 ? "times" : "time"}
              </Text>
            </Group>
            <Group position='apart' mt='md'>
              <Badge size='md'>Pee</Badge>
              <Text size='md'>
                {petWalk.pee} {petWalk.pee > 1 ? "times" : "time"}
              </Text>
            </Group>
            <Group position='apart' mt='md'>
              <Badge size='md'>Food</Badge>
              <Text size='md'>
                {petWalk.food} {petWalk.food ? "Yes" : "No"}
              </Text>
            </Group>
            <Group position='apart' mt='md'>
              <Badge size='md'>Water</Badge>
              <Text size='md'>
                {petWalk.water} {petWalk.water ? "Yes" : "No"}
              </Text>
            </Group>
            <Group position='apart' mt='md'>
              <Badge size='md'>Medicine</Badge>
              <Text size='md'>
                {petWalk.medicine} {petWalk.medicine ? "Yes" : "No"}
              </Text>
            </Group>
          </Container>
        </Group>
      </Paper>
    </Container>
  )
}
