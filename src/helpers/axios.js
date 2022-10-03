import axios from "axios"

const baseURL = process.env.REACT_APP_BASEURL

const axiosInstance = axios.create({
  baseURL,
  headers: {},
})

const axiosInstanceAuth = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${localStorage.token}` },
})

export { axiosInstance, axiosInstanceAuth }
