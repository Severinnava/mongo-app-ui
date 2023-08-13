import { css } from 'glamor';
import { Card, ListGroup} from 'react-bootstrap';
import styles from './TransactionHistory.styles';

const mockData = [
  {
    productName: 'ADENEQ',
    unit: 1000,
    amount: 1000000,
    transactionDate: 'yesterday',
    status: 'success'
  },
  {
    productName: 'ADOUB',
    unit: 100,
    amount: 100000,
    transactionDate: 'yesterday',
    status: 'inprogress'
  },
  {
    productName: 'ADONBF',
    unit: 90,
    amount: 900000,
    transactionDate: 'today',
    status: 'success'
  },
  {
    productName: 'ADENEQ',
    unit: 1000,
    amount: 1000000,
    transactionDate: 'yesterday',
    status: 'success'
  },
  {
    productName: 'ADOUB',
    unit: 100,
    amount: 100000,
    transactionDate: 'yesterday',
    status: 'inprogress'
  },
  {
    productName: 'ADONBF',
    unit: 90,
    amount: 900000,
    transactionDate: 'today',
    status: 'success'
  }
]
const renderTopSection = (productName) => (
  <Card.Body>
    <Card.Text>
      {productName}
    </Card.Text>
  </Card.Body>
)

const renderText = (label, value) => (
  <div {...css(styles.labelContainer)}>
    <p>{label}</p>
    <p>{value}</p>
  </div>
)

const renderList = (item) => (
  <ListGroup className="list-group-flush">
    <ListGroup.Item variant='light'>{renderText('Unit', item.unit)}</ListGroup.Item>
    <ListGroup.Item variant='light'>{renderText('Amount', item.amount)}</ListGroup.Item>
    <ListGroup.Item variant='light'>{renderText('Transaction Date', item.transactionDate)}</ListGroup.Item>
    <ListGroup.Item variant='light'>{renderText('Status', item.status)}</ListGroup.Item>
  </ListGroup>
)

const renderBody = (item) => (
  <>
    {renderTopSection(item.productName)}
    {renderList(item)}
  </>
)

const TransactionHistory = () => {
  return (
    <div {...css(styles.container)}>
      {mockData.map((item, index) => (
          <div key={index} {...css(styles.cardContainer)}>
            <Card 
            bg={'light'}
            text={'black'}
            style={{ width: '18rem' }}
            className="mb-2"
            >
              {renderBody(item)}
            </Card>
          </div>
      ))}
      {/* {renderCard()} */}
    </div>
  );
}

export default TransactionHistory;