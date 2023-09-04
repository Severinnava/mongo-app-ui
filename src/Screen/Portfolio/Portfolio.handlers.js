import { useEffect, useState } from "react";
import { formatCurrency } from '../../util/number'

const calculateTotalInvestment = (products) => {
  if (!products) {
    return
  }

  const totalInvestment =  products.reduce((total, product) => {
    return total + product.capitalInvestment
  }, 0)
  
  return formatCurrency(totalInvestment)
}

const navigateToBrowseProduct = (navigate) => (portfolio) => {
  navigate('/browse-product', { state: { portfolioCode: portfolio.portfolioCode } })
}

const getHandlers = (props, navigate) => ({
  calculateTotalInvestment,
  navigateToBrowseProduct : navigateToBrowseProduct(navigate),
  formatCurrency
})

const fetchPortfolio = async (request, setPortfolios) => {
  const { data } = await request.get(
    '/portfolios'
    )
  
  setPortfolios(data)
}

const usePortfolio = (props) => {
  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
      fetchPortfolio(props.request, setPortfolios)
  }, [])

  return {
    portfolios
  }
}

export {
  usePortfolio,
  getHandlers
}