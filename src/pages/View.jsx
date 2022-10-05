import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

export function View() {
  const { eventId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
  }, [])
  return <div>{eventId}</div>
}
