import axios from "axios"

const baseURL = process.env.REACT_APP_BASEURL

let headers = {}

if (localStorage.token) {
  headers.authorization = `Bearer ${localStorage.token}`
}

const axiosInstance = axios.create({
  baseURL,
  headers,
})

export default axiosInstance
