import { css } from 'glamor';
import { Card, ListGroup, Pagination, Dropdown } from 'react-bootstrap';
import styles from './TransactionHistory.styles';
import { getHandlers, useTransactionHistory } from './TransactionHistory.handlers';

const renderTopSection = (product) => (
  <Card.Body>
    <Card.Text>
      {product.name}
    </Card.Text>
  </Card.Body>
)

const renderText = (label, value) => (
  <div {...css(styles.labelContainer)}>
    <p>{label}</p>
    <p>{value}</p>
  </div>
)

const getTransactionStatus = (status) => {
  const transactionStatus = {
    PENDING: 'IN PROGRESS',
    SETTLED: 'SUCCESS',
    FAILED: 'FAILED'
  }
  return transactionStatus[`${status}`]
}

const renderList = (transaction) => {
  const { amount, type, status, createdAt } = transaction

  return (
  <ListGroup className="list-group-flush">
    {/* <ListGroup.Item variant='light'>{renderText('Unit', item.unit)}</ListGroup.Item> */}
    <ListGroup.Item variant='light'>{renderText('Transaction Type', type)}</ListGroup.Item>
    <ListGroup.Item variant='light'>{renderText('Amount', amount)}</ListGroup.Item>
    <ListGroup.Item variant='light'>{renderText('Transaction Date', new Date(createdAt).toDateString())}</ListGroup.Item>
    <ListGroup.Item variant='light'>{renderText('Status', getTransactionStatus(status))}</ListGroup.Item>
  </ListGroup>
)}

const renderBody = (transaction) => (
  <>
    {renderTopSection(transaction.product)}
    {renderList(transaction)}
  </>
)

const renderPagination = (handlers, methods) => {
  const { nextPage, previousPage, filter, transactions } = methods

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => {
          previousPage()
        }}
        disabled={filter.page === 1 ? true : false}
      />
      <Pagination.Item active>{filter.page}</Pagination.Item>
      <Pagination.Next 
        onClick={() => {
          nextPage()
        }}
        disabled={transactions.length < 6}
      />
    </Pagination>
  )
}

const renderSortFilter = (methods) => {
  const { setSortBy, filter } = methods
  const sortCategory = {
    createdAt: 'Transaction date',
    amount: 'Investment amount'
  }

  return (
    <div {...css(styles.filterContent)}>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {`Sort by: ${sortCategory[`${filter.sortBy}`]}`}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortBy('createdAt')}>Transaction date</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortBy('amount')}>Investment amount</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

const renderOrderFilter = (methods) => {
  const { setOrder, filter } = methods
  const orderCategory = {
    asc: 'Ascending',
    desc: 'Descending'
  }

  return (
    <div {...css(styles.filterContent)}>
    <Dropdown>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {`Order by: ${orderCategory[`${filter.order}`]}`}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => setOrder('asc')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => setOrder('desc')}>Descending</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

const renderProductOptions = (product, methods) => {
  const { setProductCode } = methods
  const { productCode, name } = product

  return (
    <Dropdown.Item onClick={() => setProductCode(productCode)}>{`${name}`}</Dropdown.Item>
  )
}

const renderProductCategory = (methods) => {
  const { transactions, setProductCode } = methods
  const uniqueProduct = transactions.reduce((accProducts, transaction) => {
    const { product } = transaction
    const isPresent = accProducts.find(accProduct => accProduct.productCode === product.productCode)
    
    if (!isPresent) {
        return [
          ...accProducts,
          {
            productCode: product.productCode,
            name: product.name
          }
        ]
    }
    return [...accProducts]
  }, [])

  return (
    <div {...css(styles.filterContent)}>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Product
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {uniqueProduct.map((product) => renderProductOptions(product, methods))}
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setProductCode()}>Reset product</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

const renderTransactionTypeCategory = (methods) => {
  const { setTransactionType, filter } = methods
  const transactionTypeCategory = {
    BUY: 'Buy',
    SELL: 'Sell'
  }

  return (
    <div {...css(styles.filterContent)}>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {`Transaction type: ${transactionTypeCategory[`${filter.transactionType}`] || ''}`}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setTransactionType('BUY')}>Buy</Dropdown.Item>
          <Dropdown.Item onClick={() => setTransactionType('SELL')}>Sell</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setTransactionType()}>Reset transaction type</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

const renderFilterSection = (methods) => (
  <div {...css(styles.filterContainer)}>
  {renderSortFilter(methods)}
  {renderOrderFilter(methods)}
  {renderTransactionTypeCategory(methods)}
  {renderProductCategory(methods)}
  </div>
)

const TransactionHistory = (props) => {
  const methods = useTransactionHistory(props);
  const handlers = getHandlers(props, undefined, methods)
  const { transactions } = methods

  return (
    <>
    {renderFilterSection(methods)}
      <div {...css(styles.container)}>
        {transactions && transactions.map((transaction, index) => (
            <div key={index} {...css(styles.cardContainer)}>
              <Card 
              bg={'light'}
              text={'black'}
              style={{ width: '18rem' }}
              className="mb-2"
              >
                {renderBody(transaction)}
              </Card>
            </div>
        ))}
      </div>
      <div {...css(styles.paginationContainer)}>
        {renderPagination(handlers, methods)}
      </div>
    </>
  );
}

export default TransactionHistory;