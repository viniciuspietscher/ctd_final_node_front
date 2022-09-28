import { Routes, Route } from "react-router-dom"
import { MantineProvider, ColorSchemeProvider } from "@mantine/core"
import { Home } from "./pages/Home"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { LightDarkToggle } from "./ui/components/ThemeButton"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark")

  useHotkeys([["mod+J", () => toggleColorScheme()]])
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
        <LightDarkToggle />
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
