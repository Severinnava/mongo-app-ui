import { css } from 'glamor';
import { Button, Card, ListGroup} from 'react-bootstrap';
import styles from './Portfolio.styles';
import { usePortfolio, getHandlers } from './Portfolio.handlers';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../util/number'

const renderTopSection = (portfolio, handlers) => (
  <Card.Body>
    <Card.Title>{portfolio.name}</Card.Title>
    <Card.Text>
      Total Investment
    </Card.Text>
    <Card.Text>
      {handlers.calculateTotalInvestment(portfolio.products)}
    </Card.Text>
  </Card.Body>
)

const renderProductInfo = (product) => {
  return (
  <div>
    {product.name}
    <br/>
    <div {...css(styles.amount)}>
      <div>
        {product.units.toFixed(2)} Units
      </div>
      <div>
        {formatCurrency(product.capitalInvestment)}
      </div>
    </div>
  </div>
  )
}

const renderList = (products) => (
  <ListGroup className="list-group-flush">
    {products.map((product, index) => {
      return (
        <ListGroup.Item variant='light' key={index}>
          {renderProductInfo(product)}
        </ListGroup.Item>
      )
    })}
  </ListGroup>
)

const renderBottomSection = (portfolio, handlers) => (
  <Card.Body>
    <Button
    variant='outline-dark'
    onClick={() => handlers.navigateToBrowseProduct(portfolio)}
    >
      Top Up
    </Button>
  </Card.Body>
)

const renderBody = (portfolio, handlers) => (
  <>
    {renderTopSection(portfolio, handlers)}
    {renderList(portfolio.products)}
    {renderBottomSection(portfolio, handlers)}
  </>
)

const renderCard = (portfolio, handlers) => {

  return (
    <>
      <Card 
        bg={'light'}
        text={'black'}
        style={{ width: '18rem' }}
        className="mb-2"
        >
          {renderBody(portfolio, handlers)}
      </Card>
    </>
)}

const Portfolio = (props) => {
  const { portfolios } = usePortfolio(props)
  const navigate = useNavigate()
  const handlers = getHandlers(props, navigate)

  return (
    <div {...css(styles.container)}>
      {portfolios.length &&
        portfolios.map((portfolio, index) => {
          return (
            <div key={index}>
              {renderCard(portfolio, handlers)}
            </div>
          )
        })
      }
    </div>
  );
}

export default Portfolio;