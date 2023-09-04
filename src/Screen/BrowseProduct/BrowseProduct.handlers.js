import { useEffect, useState } from "react";

const fetchProducts = async (request, setProducts) => {
  const { data } = await request.get(
    '/products'
    )
  
    setProducts(data)
}

const useBuyModal = () => {
  const [buyModal, setBuyModal] = useState(false)
  const [buyAmount, setBuyAmount] = useState(0)

  const setAmount = (e) => {
    const { value } = e.target
    setBuyAmount(parseInt(value, 10))
  }

  return {
    showModal: buyModal,
    showBuyModal: () => setBuyModal(true),
    hideBuyModal: () => {
      setBuyAmount(0)
      setBuyModal(false)
    },
    buyAmount,
    setAmount
  }
}

const usePaymentRequest = () => {
  const [paymentRequest, setPaymentRequest] = useState({})
  const [paymentRequestModal, setPaymentRequestModal] = useState(false)

  return {
    paymentRequest,
    setPaymentRequest,
    paymentRequestModal,
    showPaymentRequestModal: () => setPaymentRequestModal(true),
    hidePaymentRequestModal: () => setPaymentRequestModal(false)
  }
}

const useBrowseProducts = (props, state) => {
  const [products, setProducts] = useState([])
  const [portfolioCode, ] = useState(state?.portfolioCode)
  const [selectedProduct, setSelectedProduct] = useState({})

  useEffect(() => {
      fetchProducts(props.request, setProducts)
  }, [])

  return {
    ...useBuyModal(),
    ...usePaymentRequest(),
    portfolioCode,
    products,
    selectedProduct,
    setSelectedProduct,
  }
}

const navigateToPortfolio = (navigate) => () => {
  navigate('/portfolio')
}

const handleBuyProduct = (request, methods) => async () => {
  const {
    buyAmount,
    selectedProduct,
    portfolioCode,
    hideBuyModal,
    setPaymentRequest,
    showPaymentRequestModal
  } = methods
  const params = {
    amount: buyAmount, 
    productCode: selectedProduct.productCode,
    portfolioCode,
    type: 'BUY'
  }
  try {
    const { data } = await request.post(
      '/transactions', params
    )

    console.log({data})

    setPaymentRequest(data)
    hideBuyModal()
    showPaymentRequestModal()
  } catch(error) {
    console.log(error)
  }
}

const getHandlers = (props, navigate, methods) => ({
  navigateToPortfolio: navigateToPortfolio(navigate),
  handleBuyProduct: handleBuyProduct(props.request, methods)
})

export {
  useBrowseProducts,
  getHandlers
}