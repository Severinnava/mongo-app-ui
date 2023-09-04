import { useEffect, useState } from "react";

const fetchTransactions = async (request, setTransactions, filter) => {
  const { page, sortBy, order, transactionType, productCode } = filter
  const { data } = await request.get(
    '/transactions', {
      params: {
        page: page || 1,
        sortBy: sortBy || 'createdAt',
        order: order ||'desc',
        ...transactionType && { transactionType },
        ...productCode && { productCode }
      }
    })
  
    setTransactions(data)
}

const initialFilter = {
  page: 1,
  order: 'desc',
  sortBy: 'createdAt',
  transactionType: undefined,
  productCode: undefined
}

const useFilter = () => {
  const [filter, setFilter] = useState(initialFilter)

  const nextPage = () => setFilter({
    ...filter,
    page: filter.page + 1,
  })

  const previousPage = () => setFilter({
    ...filter,
    page: filter.page - 1,
  })

  const setOrder = (order) => setFilter({
    ...filter,
    order,
  })

  const setSortBy = (sortBy) => setFilter({
    ...filter,
    sortBy,
  })

  const setTransactionType = (transactionType) => setFilter({
    ...filter,
    transactionType,
  })

  const setProductCode = (productCode) => setFilter({
    ...filter,
    productCode,
  })

  return {
    filter, 
    nextPage,
    previousPage,
    setOrder,
    setSortBy,
    setProductCode,
    setTransactionType
  }
}

const useTransactionHistory = (props) => {
  const [transactions, setTransactions] = useState([])
  const filterState = useFilter()
  
  useEffect(() => {
      fetchTransactions(props.request, setTransactions, filterState.filter)
  }, [filterState.filter])

  return {
    ...filterState,
    transactions,
    setTransactions
  }
}

export {
  useTransactionHistory
}