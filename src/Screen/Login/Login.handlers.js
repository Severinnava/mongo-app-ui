import { useEffect, useState } from "react";


const handleSubmit = (request, navigate, authentication) => ({ credentials }) => async (e) => {
  e.preventDefault();
  const { email, password } = credentials
  console.log(`email: ${email}, password: ${password}`)
  try {
    const token = await request.post(
      '/accounts/login',
      {
        email,
        password
      }
      )
  
    authentication.login(token)
    navigate('/home')
  } catch (e) {
    console.log('error', e)
    return
  }
}

const getHandlers = (request, navigate, authentication) => {
  return {
    handleLogin: handleSubmit(request, navigate, authentication)
  }
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
  getHandlers,
  useLogin
}