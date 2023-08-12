import { useState } from 'react'
import { Login } from '../Screen';

export const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const login = () => {
    setAuthenticated(true)
  }
  const logout = () => {
    setAuthenticated(false)
  }

  return {
    authenticated,
    login,
    logout
  }
}

const InitialTokenCheck = (props) => {
  const authentication = useAuthentication()
  if (authentication.authenticated) {
    props.render(authentication)
  } else {
    <Login/>
  }
}

export default InitialTokenCheck
