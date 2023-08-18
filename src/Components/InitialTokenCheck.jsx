import { useState } from 'react'
import { createRequest } from '../Config/generateMethod'

export const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const login = (value) => {
    setAccessToken(value)
    setAuthenticated(true)
  }
  const logout = () => {
    setAccessToken('')
    setAuthenticated(false)
  }

  return {
    authenticated,
    login,
    logout,
    accessToken
  };
}

const InitialTokenCheck = (props) => {
  const authentication = useAuthentication()
  const request = createRequest(authentication)

  props.render(authentication, request)
}

export default InitialTokenCheck
