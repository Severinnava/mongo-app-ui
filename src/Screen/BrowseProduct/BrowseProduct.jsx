import { css } from 'glamor';
import { Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import styles from './BrowseProduct.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatCurrency, formatPercentage } from '../../util/number'
import { getHandlers, useBrowseProducts } from './BrowseProduct.handlers';

const renderTopSection = (product) => (
  <Card.Body>
    <Card.Title>
      {product.name}
    </Card.Title>
    <Card.Text>
      {product.productCategory}
    </Card.Text>
  </Card.Body>
)

const renderAmount = (label, value) => (
  <div {...css(styles.labelContainer)}>
    <p>{label}</p>
    <p>{formatCurrency(value)}</p>
  </div>
)

const renderPercentage = (label, value) => (
  <div {...css(styles.labelContainer)}>
    <p>{label}</p>
    <p>{formatPercentage(value)}</p>
  </div>
)

const renderList = (product) => (
  <ListGroup className="list-group-flush">
    <ListGroup.Item variant='light'>{renderAmount('Current value', product.nav.currentValue)}</ListGroup.Item>
    <ListGroup.Item variant='light'>{renderAmount('Year to date value', product.nav.ytdValue)}</ListGroup.Item>
    <ListGroup.Item variant='light'>{renderPercentage('Year to date percent', product.nav.ytdPercent)}</ListGroup.Item>
  </ListGroup>
)

const renderBottomSection = (product, methods) => (
  <Card.Body>
    <Button
    variant='outline-dark'
    onClick={() => {
      methods.setSelectedProduct(product)
      methods.showBuyModal()
    }}
    >
      Buy
    </Button>
  </Card.Body>
)

const renderBody = (product, methods) => (
  <>
    {renderTopSection(product)}
    {renderList(product)}
    {renderBottomSection(product, methods)}
  </>
)

const renderForm = (methods) => {
  const { selectedProduct, buyAmount, setAmount } = methods

  return (
  selectedProduct &&
  <Form>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Product Name</Form.Label>
      <br/>
      <Form.Label>{selectedProduct.name}</Form.Label>
      <br/>
      <Form.Label>Investment Amount</Form.Label>
      <Form.Control
        type="number"
        placeholder="0" 
        onChange={setAmount}
      />
      <br/>
      <Form.Label>Estimated units</Form.Label>
      <br/>
      <Form.Label>{(buyAmount / selectedProduct?.nav?.currentValue).toFixed(2)} Units</Form.Label>
    </Form.Group>
  </Form>
)}

const transactionModal = (methods, handlers) => {
  const { handleBuyProduct } = handlers
  const { showModal, hideBuyModal } = methods

  return (
    <Modal
      show={showModal}
      onHide={hideBuyModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Buy Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderForm(methods)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={hideBuyModal}>Close</Button>
        <Button onClick={handleBuyProduct}>
          Buy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const renderPaymentDetails = (methods) => {
  const { paymentRequest: { paymentCode, transactionID, expiredAt, status} } = methods

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Payment Code</Form.Label>
        <br/>
        <Form.Label>{paymentCode}</Form.Label>
        <br/>
        <Form.Label>Transaction ID</Form.Label>
        <br/>
        <Form.Label>{transactionID}</Form.Label>
        <br/>
        <Form.Label>Valid Until</Form.Label>
        <br/>
        <Form.Label>{new Date(expiredAt).toString()}</Form.Label>
        <br/>
        <Form.Label>Status</Form.Label>
        <br/>
        <Form.Label>{status}</Form.Label>
      </Form.Group>
    </Form>
  )
}

const paymentRequestModal = (methods) => {
  const { paymentRequestModal, hidePaymentRequestModal } = methods

  return (
    <Modal
      show={paymentRequestModal}
      onHide={hidePaymentRequestModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Complete the payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderPaymentDetails(methods)}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hidePaymentRequestModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const BrowseProduct = (props) => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const methods = useBrowseProducts(props, state)
  const handlers = getHandlers(props, navigate, methods)

  return (
    <>
      <div {...css(styles.contentContainer)}>
        {methods.products.map((product, index) => (
            <div key={index} {...css(styles.cardContainer)}>
              <Card 
              bg={'light'}
              text={'black'}
              style={{ width: '18rem' }}
              className="mb-2"
              >
                {renderBody(product, methods)}
              </Card>
            </div>
        ))}
      </div>
      {transactionModal(methods, handlers)}
      {paymentRequestModal(methods)}
    </>
  );
}

export default BrowseProduct;