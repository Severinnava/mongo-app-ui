const formatCurrency = (number) => {
  const formatting_options = {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
 }
  const idrString = new Intl.NumberFormat("en-US", formatting_options);

  return idrString.format(number)
}

const formatPercentage = (number) => {
  const formatting_options = {
    style: 'percent',
    minimumFractionDigits: 2,
 }
  const percentage = new Intl.NumberFormat(undefined, formatting_options);

  return percentage.format(number/100)
}

export { formatCurrency, formatPercentage };