import React, {useEffect, useState} from 'react'
import s from './product-card.module.scss'
import BuyModal from '../BuyModal/buy-modal'
import ImageGallery from 'react-image-gallery'
import {getFormatPrice, getDiscountPrice} from '../../utils/price'
import Link from 'next/link'
import icons from '../../public/fixture';
import CartModal from '../CartModal/cart-modal'

const ProductCard = ({
                       product,
                       cartItems,
                       wishlistItems,
                       addToCart,
                       deleteFromCart,
                       addToWishlist,
                       deleteFromWishlist,
                       getActiveStatus,
                       topColors,
                     }) => {
  const discountPrice = getDiscountPrice(product)
  const [selectedProductId, setSelectedProductId] = useState(
      product.variations
          ? product.variations.nodes[0].databaseId
          : product.databaseId
  )
  const quantityCount = 1;

  // const joki = topColors.filter((r) => r.slug === product.slug)

  const [selectedProductColor, setSelectedProductColor] = useState(
      product.variations
          ? product.variations.nodes[0].color.nodes[0]?.value
          : product.paColors.nodes[0]?.name
  )

  const [selectedProductSize, setSelectedProductSize] = useState(
      product.variations
          ? product.variations.nodes[0].size.nodes[0]?.value
          : product.paSizes.nodes[0]?.name
  )

  const [selectedProductImage, setSelectedProductImage] = useState(
      product.variations
          ? product.variations.nodes[0].image.sourceUrl
          : product.image.sourceUrl
  )
  const cartItem = cartItems.filter(
      (cartItem) => cartItem.selectedProductId === selectedProductId
  )[0]
  // console.log(cartItems)
  const wishlistItem = wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0]
  console.log(wishlistItem)

  const galleryImages = product.galleryImages.nodes.map(({sourceUrl}) => ({
    original: sourceUrl,
    thumbnail: sourceUrl,
  }))
  const images = [
    {
      original: selectedProductImage,
      thumbnail: selectedProductImage,
    },
    ...galleryImages,
  ]

  const [windowWidth, setWindowWidth] = useState()
  const resizeWindow = () => setWindowWidth(window.innerWidth)

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const [buy, setBuy] = useState(false)
  const [cartModal, setCartModal] = useState(false)


  return (
      <>
        <div className={s.wrapper}>
          <div className={s.left}>
            <ImageGallery
                items={images}
                thumbnailPosition='left'
                showThumbnails={windowWidth <= 1100 ? false : true}
                showBullets={windowWidth <= 1100 ? true : false}
                showPlayButton={false}
                showFullscreenButton={false}
                autoPlay={false}
            />
            {product.description && (
                <div className={s.description}>
                  <div>Описание</div>
                  <div dangerouslySetInnerHTML={{__html: product.description}}/>
                </div>
            )}
          </div>

          <div className={s.right}>
            <div className={s.sku}> SKU: {product.sku}</div>
            <div className={s.name}>{product.name}</div>
            <div className={s.jokiPrice}>
              {product.onSale ? (
                  <>
                    <div className={s.discountPrice}>-{discountPrice}%</div>
                    <div className={s.normalPrice}>
                      {getFormatPrice(product.woocsRegularPrice)}
                    </div>
                    {' '}
                    <div className={s.salePrice}>
                      {getFormatPrice(product.woocsSalePrice)}
                    </div>
                  </>
              ) : (
                  <div className={s.price}>
                    {getFormatPrice(product.woocsRegularPrice)}
                  </div>
              )}
            </div>
            {product.variations ? (
                <>
                  {selectedProductColor && (
                      <>
                        <div className={s.attributesName}>
                          Размер: <span> {selectedProductColor} </span>
                        </div>
                        <div className={s.sizeList}>
                          {product.variations.nodes.map((product, i) => (
                              <button
                                  key={i}
                                  className={`${
                                      selectedProductColor === product.color.nodes[0].value
                                          ? s.active
                                          : ''
                                  } ${
                                      [null, 0, -1].includes(product.stockQuantity)
                                          ? s.outOfStock
                                          : ''
                                  }`}
                                  onClick={() => {
                                    setSelectedProductColor(product.color.nodes[0].value)
                                    setSelectedProductId(product.databaseId)
                                  }}
                              >
                                {product.color.nodes[0].value}
                              </button>
                          ))}
                        </div>
                      </>
                  )}
                  {selectedProductSize && (
                      <>
                        <div className={s.attributesName}>
                          Размер: <span> {selectedProductSize} </span>
                        </div>
                        <div className={s.sizeList}>
                          {product.variations.nodes.map((product, i) => (
                              <button
                                  key={i}
                                  className={`${
                                      selectedProductSize === product.size.nodes[0].value
                                          ? s.active
                                          : ''
                                  } ${
                                      [null, 0, -1].includes(product.stockQuantity)
                                          ? s.outOfStock
                                          : ''
                                  }`}
                                  onClick={() => {
                                    setSelectedProductSize(product.size.nodes[0].value)
                                    setSelectedProductId(product.databaseId)
                                  }}
                              >
                                {product.size.nodes[0].value}
                              </button>
                          ))}
                        </div>
                      </>
                  )}
                </>
            ) : (
                <>
                  {selectedProductColor && (
                      <>
                        <div className={s.attributesName}>
                          Цвет: <span> {selectedProductColor} </span>
                        </div>
                        <div className={s.colorList}>
                          <div className={s.active}>
                            <button
                                style={{
                                  backgroundColor: product.color?.nodes[0].color
                                      ? product.color.nodes[0].color
                                      : 'orange',
                                }}
                            ></button>
                          </div>
                        </div>
                      </>
                  )}
                  {selectedProductSize && (
                      <>
                        <div className={s.attributesName}>
                          Размер: <span> {selectedProductSize} </span>
                        </div>
                        <div className={s.sizeList}>
                          <button className={s.active}>{selectedProductSize}</button>
                        </div>
                      </>
                  )}
                </>
            )}
            <button
                className={s.addToCard}
                onClick={
                  cartItem
                      ? () => deleteFromCart(selectedProductId)
                      : () => {
                        addToCart(
                            product,
                            quantityCount,
                            selectedProductColor,
                            selectedProductSize,
                            selectedProductId,
                        ),
                            setCartModal(true)
                      }
                }
            >
              {cartItem ? 'В корзине' : 'Добавить в корзину'}
            </button>
            <div className={s.twoButtons}>
              <button className={s.buy} onClick={() => setBuy(true)}>
                Купить сейчас
              </button>
              <button className={s.addToWishlist} dangerouslySetInnerHTML={{
                __html: wishlistItem ? icons.wishlistChosen : icons.wishlist
              }} onClick={wishlistItem ? () => deleteFromWishlist(product) : () => addToWishlist(product)}/>
            </div>
            <button className={s.telegram}>
              Написать в телеграм
            </button>


            <BuyModal
                buy={buy}
                setBuy={setBuy}
                product={product}
                selectedProductColor={selectedProductColor}
                selectedProductSize={selectedProductSize}
                selectedProductId={selectedProductId}
            />
            <CartModal cartModal={cartModal}
                       setCartModal={setCartModal}/>
            <div className={s.delivery}>
              <div>
                <img src='/public/icons/delivery.svg' alt=''/> Доставка и возврат
              </div>
              <div>
                Бесплатная доставка при заказе свыше 300 000 UZS по Ташкенту
                осуществляется в течении 24 часов с момента заказа
              </div>
            </div>

            {product.paMaterials?.nodes[0]?.name && (
                <div className={s.description}>
                  <div>Состав</div>
                  <div
                      dangerouslySetInnerHTML={{
                        __html: product.paMaterials?.nodes[0].name,
                      }}
                  />
                </div>
            )}
          </div>
        </div>

      </>
  )
}


export default ProductCard
