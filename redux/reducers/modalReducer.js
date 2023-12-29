import {
  SHOW_CART_MODAL,
  HIDE_CART_MODAL
} from '../actions/modalActions'

const initState = {
  cart: false
}

const modalReducer = (state = initState, action) => {
  if (action.type === SHOW_CART_MODAL) {
    return {
      ...state,
      cart: true
    }
  }

  if (action.type === HIDE_CART_MODAL) {
    return {
      ...state,
      cart: false
    }
  }

  return state
}

export default modalReducer
