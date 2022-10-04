import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export function Walk() {
  const { eventId } = useParams()

  const getPetSittingEvent = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/petsitting/petSitting/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        // console.log(response.data)
      })
      .catch((e) => console.log("error", e))
  }

  useEffect(() => {
    getPetSittingEvent(eventId)
  }, [])

  return <div>{eventId}</div>
}
