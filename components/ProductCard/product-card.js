import React, {useEffect, useState, useRef} from 'react'
import s from './product-card.module.scss'
import BuyModal from '../BuyModal/buy-modal'
import {getFormatPrice, getDiscountPrice} from '../../utils/price'
import Link from 'next/link'
import icons from '../../public/fixture';
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import {LightgalleryProvider, LightgalleryItem} from "react-lightgallery";
import Slider from "react-slick";

const ProductCard = ({
                       product,
                       cartItems,
                       wishlistItems,
                       addToCart,
                       deleteFromCart,
                       addToWishlist,
                       deleteFromWishlist,
                       showCartModal,
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
  // console.log(product)

  // const joki = topColors.filter((r) => r.slug === product.slug)

  const [selectedProductColor, setSelectedProductColor] = useState(
      product.variations
          ? product.variations.nodes[0].color.nodes[0]?.value
          : product.paColors.nodes[0]?.name
  )

  const [selectedProductSize, setSelectedProductSize] = useState(
      product.variations
          ? product.variations.nodes[0].size.nodes[0]?.value
          : product.paRazmerUpakovkis.nodes[0]?.name
  )
  const [selectedProductWeight, setSelectedProductWeight] = useState(
      product.variations
          ? product.variations.nodes[0].weight?.nodes[0]?.value
          : product.paVesUpakovkis.nodes[0]?.name
  )
  const [selectedProductAge, setSelectedProductAge] = useState(
      product.variations
          ? product.variations.nodes[0].age?.nodes[0]?.value
          : product.paVozrastOrigens.nodes[0]?.name
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


  const [windowWidth, setWindowWidth] = useState()
  const resizeWindow = () => setWindowWidth(window.innerWidth)

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  const SliderPrevArrow = (props) => (
      <button
          className="sliderPrevArrow"
          onClick={props.onClick}
          dangerouslySetInnerHTML={{__html: icons.arrowLeft}}
      />
  );

  const SliderNextArrow = (props) => (
      <button
          className="sliderNextArrow"
          onClick={props.onClick}
          dangerouslySetInnerHTML={{__html: icons.arrowRight}}
      />
  );

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderPrevArrow/>,
    nextArrow: <SliderNextArrow/>,
  };


  const [buy, setBuy] = useState(false)
  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()
  const [isShowMore, setShowMore] = useState(false)


  return (
      <>
        <div className={s.wrapper}>
          <div className={s.left}>
            {/*<LightgalleryProvider>*/}
            {/*  <div className={s.images}>*/}
            {/*    <div className={product.galleryImages.nodes.length === 0 ? s.singleImg : s.img}>*/}
            {/*      <LightgalleryItem src={selectedProductImage} thumb={selectedProductImage}>*/}
            {/*        <img src={selectedProductImage}/>*/}
            {/*      </LightgalleryItem>*/}
            {/*    </div>*/}
            {/*    {product.galleryImages.nodes.map(({sourceUrl}) => (*/}
            {/*        <div className={s.img} key={sourceUrl}>*/}
            {/*          <LightgalleryItem src={sourceUrl} thumb={sourceUrl}>*/}
            {/*            <img src={sourceUrl}/>*/}
            {/*          </LightgalleryItem>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</LightgalleryProvider>*/}

            <LightgalleryProvider>
              <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}  {...settings} className={s.slider}>
                <LightgalleryItem
                    src={selectedProductImage}
                    thumb={selectedProductImage}
                >
                  <img src={selectedProductImage}/>
                </LightgalleryItem>
                {product.galleryImages.nodes.map(({sourceUrl}) => (
                    <LightgalleryItem src={sourceUrl} thumb={sourceUrl}>
                      <img src={sourceUrl}/>
                    </LightgalleryItem>
                ))}
              </Slider>
              {product.galleryImages.nodes.length <= 3 ?
                  '' : (
                      <Slider
                          asNavFor={nav1}
                          ref={(slider2) => setNav2(slider2)}
                          slidesToShow={5}
                          swipeToSlide={true}
                          focusOnSelect={true}>
                        <img className={s.sliderMinImg} src={selectedProductImage}/>
                        {product.galleryImages.nodes.map(({sourceUrl}) => (
                            <img className={s.sliderMinImg} src={sourceUrl}/>
                        ))}
                      </Slider>)}
            </LightgalleryProvider>

            {product.description && (
                <div className={s.description}>
                  <div>Описание</div>
                  <div className={isShowMore ? s.showActive : ''}
                       dangerouslySetInnerHTML={{__html: product.description}}/>
                  {isShowMore ? <span onClick={() => setShowMore(prev => !prev)}>Скрыть полное описание</span>
                      : <span onClick={() => setShowMore(prev => !prev)}>Показать больше</span>}
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
                  {selectedProductWeight && (
                      <>
                        <div className={s.attributesName}>
                          Вес: <span> {selectedProductWeight} </span>
                        </div>
                        <div className={s.sizeList}>
                          {product.variations.nodes.map((product, i) => (
                              <button
                                  key={i}
                                  className={`${
                                      selectedProductWeight === product.age.nodes[0].value
                                          ? s.active
                                          : ''
                                  } ${
                                      [null, 0, -1].includes(product.stockQuantity)
                                          ? s.outOfStock
                                          : ''
                                  }`}
                                  onClick={() => {
                                    selectedProductWeight(product.size.nodes[0].value)
                                    setSelectedProductId(product.databaseId)
                                  }}
                              >
                                {product.age.nodes[0].value}
                              </button>
                          ))}
                        </div>
                      </>
                  )}
                  {selectedProductAge && (
                      <>
                        <div className={s.attributesName}>
                          Возраст: <span> {selectedProductAge} </span>
                        </div>
                        <div className={s.sizeList}>
                          {product.variations.nodes.map((product, i) => (
                              <button
                                  key={i}
                                  className={`${
                                      selectedProductAge === product.age.nodes[0].value
                                          ? s.active
                                          : ''
                                  } ${
                                      [null, 0, -1].includes(product.stockQuantity)
                                          ? s.outOfStock
                                          : ''
                                  }`}
                                  onClick={() => {
                                    selectedProductAge(product.age.nodes[0].value)
                                    setSelectedProductId(product.databaseId)
                                  }}
                              >
                                {product.age.nodes[0].value}
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
                          Размер упаковки (см): <span> {selectedProductSize} </span>
                        </div>
                        {/*<div className={s.sizeList}>*/}
                        {/*  <button className={s.active}>{selectedProductSize}</button>*/}
                        {/*</div>*/}
                      </>
                  )}
                  {selectedProductWeight && (
                      <>
                        <div className={s.attributesName}>
                          Вес упаковки: <span> {selectedProductWeight} </span>
                        </div>
                        {/*<div className={s.sizeList}>*/}
                        {/*  <button className={s.active}>{selectedProductAge}</button>*/}
                        {/*</div>*/}
                      </>
                  )}
                  {selectedProductAge && (
                      <>
                        <div className={s.attributesName}>
                          Возраст: <span> {selectedProductAge} </span>
                        </div>
                        {/*<div className={s.sizeList}>*/}
                        {/*  <button className={s.active}>{selectedProductAge}</button>*/}
                        {/*</div>*/}
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
                            showCartModal()

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
              <Link href='https://t.me/KidPointuz'>
                <a>
                  Написать в телеграм
                </a>
              </Link>

            </button>
            <BuyModal
                buy={buy}
                setBuy={setBuy}
                product={product}
                selectedProductColor={selectedProductColor}
                selectedProductSize={selectedProductSize}
                selectedProductId={selectedProductId}
            />
            {/*<div className={s.delivery}>*/}
            {/*  <div>*/}
            {/*    <img src='/public/icons/delivery.svg' alt=''/> Доставка и возврат*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    Бесплатная доставка при заказе свыше 300 000 UZS по Ташкенту*/}
            {/*    осуществляется в течении 24 часов с момента заказа*/}
            {/*  </div>*/}
            {/*</div>*/}

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
