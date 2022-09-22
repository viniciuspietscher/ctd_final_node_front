import { Paper, Text } from "@mantine/core"
import { PasswordStrength } from "../../ui/components/inputs/password"

export function Welcome() {
  return (
    <Paper>
      <Text>Pet sitting</Text>
      <PasswordStrength />
    </Paper>
  )
}
