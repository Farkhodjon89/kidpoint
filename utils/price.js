export const getFormatPrice = (price) =>
  parseInt(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' UZS'

export const getDiscountPrice = (product) =>
  Math.round(
    ((parseInt(product.woocsRegularPrice) - parseInt(product.woocsSalePrice)) *
      100) /
      parseInt(product.woocsRegularPrice)
  )
