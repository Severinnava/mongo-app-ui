import { css } from "glamor"
import { Button } from "react-bootstrap"
import styles from "./Home.style"

const Home = () => (
  <div {...css(styles.container)}>
      <Button variant="primary" type="submit" onClick={() => { console.log('clicked') }}>
        Get Started
      </Button>
  </div>
)

export default Home