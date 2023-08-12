import { useState } from "react"
import { Button, FormGroup } from "react-bootstrap"
import { Form } from "react-bootstrap"

import styles from "./Login.styles"
import { css } from "glamor"

const renderPasswordForm = ({ setPassword }) => (
  <div {...css(styles.formInputContainer)}>
    <Form.Label htmlFor="passwordField">Password</Form.Label>
    <Form.Control
      type="password"
      id="passwordField"
      placeholder="Password"
      onChange={setPassword}
    />
  </div>
)

const renderEmailForm = ({ setEmail }) => (
  <div {...css(styles.formInputContainer)}>
    <Form.Label htmlFor="emailField">Email</Form.Label>
    <Form.Control
      type="text"
      id="emailField"
      placeholder="Email"
      onChange={setEmail}
    />
  </div>
)

const renderActionButton = () => (
  <Button variant="primary" type="submit">
    Login
  </Button>
)

const handleSubmit = ({ credentials }) => (e) => {
  e.preventDefault();
  console.log(`email: ${credentials.email}, password: ${credentials.password}`)
}

const useLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: ''})
  const setEmail = (e) => {
    const { value } = e.target
    setCredentials({ ...credentials, email: value})
  }
  const setPassword = (e) => {
    const { value } = e.target
    setCredentials({ ...credentials, password: value})
  }
  return {
    credentials,
    setEmail,
    setPassword
  }
}

function Login() {
  const methods = useLogin()

  return (
    <div {...css(styles.container)}>
      <Form onSubmit={handleSubmit(methods)}>
          <FormGroup>
            {renderEmailForm(methods)}
            {renderPasswordForm(methods)}
            {renderActionButton()}
          </FormGroup>
      </Form>
    </div>
  )
}

export default Login
 