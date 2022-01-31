import cartReducer from './cartReducer'
import wishlistReducer from './wishlistReducer'
import { combineReducers } from 'redux'
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  modalState: modalReducer
})

export default rootReducer
