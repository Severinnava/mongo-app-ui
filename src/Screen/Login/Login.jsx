import { Button, FormGroup } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

import styles from "./Login.styles"
import { css } from "glamor"
import { handleSubmit, useLogin } from "./Login.handlers"

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

function Login({ authentication }) {
  const methods = useLogin(authentication)
  const navigate = useNavigate()

  return (
    <div {...css(styles.container)}>
      <Form onSubmit={handleSubmit(methods, navigate, authentication)}>
          <FormGroup>
            {renderEmailForm(methods)}
            {renderPasswordForm(methods)}
            {renderActionButton()}
          </FormGroup>
      </Form>
    </div>
  )
}

Login.propTypes = {
  authentication: PropTypes.object
}

export default Login
 