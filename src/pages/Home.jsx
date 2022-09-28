import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <h2>test</h2>
    </div>
  )
}
