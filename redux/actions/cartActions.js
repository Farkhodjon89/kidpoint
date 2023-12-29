export const ADD_TO_CART = 'ADD_TO_CART'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART'

// add to cart
export const addToCart = (
  item,
  quantityCount,
  selectedProductColor,
  selectedProductSize,
  selectedProductId
) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
        selectedProductColor:
          selectedProductColor ||
          (item.selectedProductColor ? item.selectedProductColor : null),
        selectedProductSize:
          selectedProductSize ||
          (item.selectedProductSize ? item.selectedProductSize : null),
        selectedProductId: selectedProductId,
      },
    })
  }
}
// decrease from cart

export const decreaseQuantity = (selectedProductId, quantity) => (dispatch) =>
  dispatch({
    type: DECREASE_QUANTITY,
    payload: { selectedProductId, quantity },
  })

// delete from cart
export const deleteFromCart = (item) => {
  return (dispatch) => {
    dispatch({ type: DELETE_FROM_CART, payload: item })
  }
}
// delete all from cart
export const deleteAllFromCart = () => {
  return (dispatch) => {
    dispatch({ type: DELETE_ALL_FROM_CART })
  }
}

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stockQuantity) {
    return item.stockQuantity
  } else {
    return item?.variations?.nodes?.filter(
      ({ attributes }) =>
        attributes?.nodes[0].value === color &&
        attributes.nodes[1].value === size
    )[0]?.stockQuantity
  }
}
export const setCartModal = () => {
  return (dispatch) => {
    dispatch({ type: SET_CART_MODAL })
  }
}

export const hideCartModal = () => {
  return (dispatch) => {
    dispatch({ type: HIDE_CART_MODAL })
  }
}