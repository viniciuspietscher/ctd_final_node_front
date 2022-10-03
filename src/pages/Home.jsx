import { Button, Container, Grid, Group, Modal, Skeleton } from "@mantine/core"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false)
  const child = <Skeleton height={250} radius='md' animate={false} />

  useEffect(() => {
    console.log(localStorage.token)
    if (!localStorage.token) {
      navigate("/")
    }
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
          <Grid.Col xs={3}>{child}</Grid.Col>
        </Grid>
      </Container>
    </>
  )
}
