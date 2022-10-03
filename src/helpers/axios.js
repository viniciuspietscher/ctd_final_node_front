import axios from "axios"

const baseURL = process.env.REACT_APP_BASEURL

const axiosInstance = axios.create({
  baseURL,
})

export { axiosInstance }
