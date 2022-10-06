import { useParams } from "react-router-dom"

export function GetWalk() {
  const { uuid } = useParams()
  return <div>{uuid}</div>
}
