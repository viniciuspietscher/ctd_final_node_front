import { useParams } from "react-router-dom"

export function PetSitting() {
  const { eventId } = useParams()
  return <div>{eventId}</div>
}
