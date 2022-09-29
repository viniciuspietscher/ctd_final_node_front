import { Button, Container, Group, Modal, Navbar } from "@mantine/core"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NewPetSitting } from "./NewPetSitting"

export function Home() {
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
  }, [])
  return (
    <>
      <Container mt={50}>
        <Group position='center'>
          <Button size='xl' onClick={() => setOpened(true)}>
            New Pet Sitting event
          </Button>
        </Group>
      </Container>
      <Modal
        size='55%'
        opened={opened}
        onClose={() => setOpened(false)}
        title='New Pet Sitting Event'
      >
        <NewPetSitting />
      </Modal>
    </>
  )
}
