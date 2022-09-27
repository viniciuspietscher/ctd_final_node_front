import { Routes, Route } from "react-router-dom"
import { MantineProvider, ColorSchemeProvider } from "@mantine/core"
import { Signin, Signup } from "./pages"
import { LightDarkToggle } from "./ui/components/ThemeButton/index"
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
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
