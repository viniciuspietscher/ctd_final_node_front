import { Routes, Route, useNavigate } from "react-router-dom"
import {
  MantineProvider,
  ColorSchemeProvider,
  Group,
  Button,
  Header,
  AppShell,
} from "@mantine/core"
import { Home } from "./pages/Home"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { LightDarkToggle } from "./ui/components/ThemeButton"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { useState } from "react"
import { useEffect } from "react"
import { NewPetSitting } from "./pages/NewPetSitting"
import { Walk } from "./pages/Walk"
import { View } from "./pages/View"
import { GetWalk } from "./pages/GetWalk"

function App() {
  const navigate = useNavigate()
  const [signedIn, setSignedIn] = useState(false)
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark")
  useHotkeys([["mod+J", () => toggleColorScheme()]])

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setSignedIn(false)
    navigate("/")
  }

  useEffect(() => {
    if (localStorage.token) {
      setSignedIn(true)
    }
  }, [])
  return (
    <AppShell>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            // fontFamily: "Open Sans",
            colorScheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Header height={60} p='sm'>
            <Group position='right' spacing='sm'>
              <LightDarkToggle />
              {signedIn ? (
                <Button onClick={handleSignOut}>Sign out</Button>
              ) : (
                ""
              )}
            </Group>
          </Header>
          <Routes>
            <Route path='/' element={<Signin setSignedIn={setSignedIn} />} />
            <Route
              path='/signup'
              element={<Signup setSignedIn={setSignedIn} />}
            />
            <Route path='/home' element={<Home />} />
            <Route path='/new' element={<NewPetSitting />} />
            <Route path='/walk/:eventId' element={<Walk />} />
            <Route path='/view/:eventId' element={<View />} />
            <Route path='/getwalk/:uuid' element={<GetWalk />} />
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </AppShell>
  )
}

export default App
