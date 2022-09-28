import { Routes, Route, useNavigate } from "react-router-dom"
import {
  MantineProvider,
  ColorSchemeProvider,
  Group,
  Button,
} from "@mantine/core"
import { Home } from "./pages/Home"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { LightDarkToggle } from "./ui/components/ThemeButton"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { useState } from "react"
import { useEffect } from "react"

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
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: "Open Sans",
          colorScheme,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Group position='right' spacing='sm' mt={10} mr={10}>
          <LightDarkToggle />
          {signedIn ? <Button onClick={handleSignOut}>Sign out</Button> : ""}
        </Group>
        <Routes>
          <Route path='/' element={<Signin setSignedIn={setSignedIn} />} />
          <Route
            path='/signup'
            element={<Signup setSignedIn={setSignedIn} />}
          />
          <Route path='/home' element={<Home />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
