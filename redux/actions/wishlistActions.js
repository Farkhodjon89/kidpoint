export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST'
export const DELETE_ALL_FROM_WISHLIST = 'DELETE_ALL_FROM_WISHLIST'

// add to wishlist
export const addToWishlist = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast('Добавлен в избранные', {
        appearance: 'success',
        autoDismiss: true
      })
    }
    dispatch({ type: ADD_TO_WISHLIST, payload: item })
  }
}

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast('Удален из избранных', {
        appearance: 'error',
        autoDismiss: true
      })
    }
    dispatch({ type: DELETE_FROM_WISHLIST, payload: item })
  }
}

// delete all from wishlist
export const deleteAllFromWishlist = addToast => {
  return dispatch => {
    if (addToast) {
      addToast('Избранные очищен', {
        appearance: 'error',
        autoDismiss: true
      })
    }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST })
  }
}
