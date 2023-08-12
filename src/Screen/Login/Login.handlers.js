import { useEffect, useState } from "react";


const handleSubmit = ({ credentials }, navigate, authentication) => (e) => {
  e.preventDefault();
  console.log(`email: ${credentials.email}, password: ${credentials.password}`)
  authentication.login()
  navigate('/home')
}

const useLogin = (authentication) => {
  const [credentials, setCredentials] = useState({ email: '', password: ''})
  const setEmail = (e) => {
    const { value } = e.target
    setCredentials({ ...credentials, email: value})
  }
  const setPassword = (e) => {
    const { value } = e.target
    setCredentials({ ...credentials, password: value})
  }

  useEffect(() => {
    authentication.logout()
  })

  return {
    credentials,
    setEmail,
    setPassword
  }
}

export {
  handleSubmit,
  useLogin
}