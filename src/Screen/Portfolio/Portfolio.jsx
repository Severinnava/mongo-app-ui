import { css } from 'glamor';
import { Button, Card, ListGroup} from 'react-bootstrap';
import styles from './Portfolio.styles';

const renderTopSection = () => (
  <Card.Body>
    <Card.Title>Portfolio</Card.Title>
    <Card.Text>
      Total Investment
    </Card.Text>
    <Card.Text>
      Rp 100.000.000
    </Card.Text>
  </Card.Body>
)

const renderList = () => (
  <ListGroup className="list-group-flush">
    <ListGroup.Item variant='light'>Product 1</ListGroup.Item>
    <ListGroup.Item variant='light'>Product 2</ListGroup.Item>
    <ListGroup.Item variant='light'>Product 3</ListGroup.Item>
  </ListGroup>
)

const renderBottomSection = () => (
  <Card.Body>
    <Button variant='outline-dark'>
      Top Up
    </Button>
  </Card.Body>
)

const renderBody = () => (
  <>
    {renderTopSection()}
    {renderList()}
    {renderBottomSection()}
  </>
)

const Portfolio = () => {
  return (
    <div {...css(styles.container)}>
      <Card 
      bg={'light'}
      text={'black'}
      style={{ width: '18rem' }}
      className="mb-2"
      >
        {renderBody()}
      </Card>
    </div>
  );
}

export default Portfolio;