import React, {useState, useEffect} from 'react'
import s from './header.module.scss'
import Link from 'next/link'
import HeaderMenu from '../HeaderMenu/header-menu'
import TopBar from '../TopBar/top-bar'
import {connect} from 'react-redux'
import {deleteFromCart, addToCart, setCartModal} from '../../redux/actions/cartActions'
import client from '../../apollo/apollo-client'
import {useLazyQuery} from '@apollo/react-hooks'
import CartModal from '../CartModal/cart-modal'
import icons from '../../public/fixture'
import PRODUCTS from '../../queries/products'
import {hideCartModal, showCartModal} from '../../redux/actions/modalActions'
import {getFormatPrice} from "../../utils/price";


const Header = ({categories, cartItems, deleteFromCart, wishlistItems, addToCart, showCartModal, modalState}) => {
  const [open, setOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loadProducts, {data, loading}] = useLazyQuery(PRODUCTS, {
    client
  })
  const [windowWidth, setWindowWidth] = useState()
  let resizeWindow = () => setWindowWidth(window.innerWidth)
  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  useEffect(() => {
    if (data && searchQuery.length) {
      setSearchResults(data.products.nodes)
    }
  }, [data])

  const searchData = e => {
    setSearchResults([])
    setSearchQuery(e.target.value)

    if (e.target.value.length) {
      loadProducts({
        variables: {
          first: 10,
          search: e.target.value
        }
      })
    }
  }

  let cartTotalPrice = 0
  cartItems.map(item => {
    const price = item.onSale ? item.woocsSalePrice : item.woocsRegularPrice
    cartTotalPrice = cartTotalPrice + price
  })

  return (
      <>
        <TopBar/>
        <div className={s.wrapper}>
          <div className={s.inner}>
            <div className={s.left}>
              <img src='/header/burger.svg' alt='' className={s.burger} onClick={() => setOpen(true)}/>
            </div>
            <Link href='/'>
              <a>
                <img className={s.logo} src='/header/logo.svg' alt=''/>{' '}
              </a>
            </Link>
            <div className={s.right}>
              <div className={s.search}>
                <Link href="/search">
                  <a>
                        <span
                            dangerouslySetInnerHTML={{__html: icons.search}}
                            onClick={() => setIsSearchActive(true)}
                        />
                  </a>
                </Link>
              </div>
              <div className={s.user}>
                <Link href={'/account'}>
                  <a dangerouslySetInnerHTML={{__html: icons.user}} className={s.account}>
                  </a>
                </Link>
              </div>
              <div className={s.wishlist}>
                <Link href={'/wishlist'}>
                  <a className={s.headerWishlist}>
                    <span dangerouslySetInnerHTML={{__html: icons.wishlist}}/>
                    {wishlistItems.length > 0 && <span className={s.wishlistQuantity}>{wishlistItems.length}</span>}
                  </a>
                </Link>
              </div>
              <div className={s.cartLink}>
                <a onClick={() => !modalState.cart ? showCartModal() : null}>
                  <span dangerouslySetInnerHTML={{__html: icons.cart2}}/>
                  <span> <span className={s.cartWord}>Корзина</span>
                    <span>({windowWidth <= 500 ?  cartItems.length : cartTotalPrice + ' UZS'})</span> </span>
                </a>
              </div>
            </div>
            <CartModal
                cartItems={cartItems}
                deleteFromCart={deleteFromCart}
                addToCart={addToCart}
            />
          </div>
        </div>
        <HeaderMenu categories={categories} open={open} setOpen={setOpen} cartItems={cartItems}/>
      </>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    modalState: state.modalState
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: item => {
      dispatch(deleteFromCart(item))
    },
    showCartModal: () => {
      dispatch(showCartModal())
    },
    hideCartModal: () => {
      dispatch(hideCartModal())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
