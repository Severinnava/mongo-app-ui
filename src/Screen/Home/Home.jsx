import { css } from "glamor"
import { Button } from "react-bootstrap"
import styles from "./Home.style"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
  <div {...css(styles.container)}>
      <Button variant="primary" type="submit" onClick={() => {navigate('/portfolio')}}>
        Go to portfolio page
      </Button>
  </div>
)}

export default Home