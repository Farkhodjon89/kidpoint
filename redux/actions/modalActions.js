export const SHOW_CART_MODAL = 'SHOW_CART_MODAL'
export const HIDE_CART_MODAL = 'HIDE_CART_MODAL'

export const showCartModal = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_CART_MODAL })
  }
}

export const hideCartModal = () => {
  return (dispatch) => {
    dispatch({ type: HIDE_CART_MODAL })
  }
}
