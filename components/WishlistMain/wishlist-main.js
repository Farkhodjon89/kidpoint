import s from "./wishlist-main.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
import { getPrice, getFormat } from "../../utils";
import SectionTitle from "../SectionTitle";
import icons from "../../public/fixture";
import { useRouter } from "next/router";



const WishlistMain = ({ wishlistItems, deleteFromWishlist, account,openNavigation,setOpenNavigation }) => {
  const path = [
    {
      name: "Главная",
      link: "/",
    },
    {
      name: "Избранные товары",
      link: "/wishlist",
    },
  ];

    const router = useRouter();
  const { slug } = router.query;

  return wishlistItems.length >= 1 ? (
    <div className="container">

      <div className={`${s.pageContent} ${!openNavigation ? s.activeMobile : ""}`}>
         
        <button
        className={s.activeMenu}
        dangerouslySetInnerHTML={{ __html: icons.fullArrowLeft }}
        onClick={() => setOpenNavigation(!openNavigation)}
        />
      <div className="visible">
      </div>
      <div className={`${s.content} ${router.route == slug ? s.active : ""}`}>
      <div className={s.cardlist}>
        <div className={s.row}>
          {wishlistItems.map((product) => {
            const { normalPrice, salePrice } = getPrice(product);
            const normalPriceFront = getFormat(normalPrice) + " UZS";
            const salePriceFront = getFormat(salePrice) + " UZS";

            return (
              <div className={s.wrapper}>
                <div className={s.card} key={uuidv4()}>
                  <div className={s.top}>
                    <img
                      src={product.image.sourceUrl}
                      alt=""
                      className={s.img}
                    />
                    <Link href={`/product/${product.slug}`}>
                      <a className={s.productLink}>Выбрать размер</a>
                    </Link>
                    <div className={s.remove}>
                      <button
                        onClick={() => deleteFromWishlist(product)}
                        dangerouslySetInnerHTML={{ __html: icons.times }}
                      />

                    </div>
                  </div>
                  <div className={s.details}>
                    <div className={s.nameRemove}>
                      {/*<div className={s.brand}>*/}
                      {/*  {product.paBrands.nodes[0].name*/}
                      {/*    ? product.paBrands.nodes[0].name*/}
                      {/*    : null}*/}
                      {/*</div>*/}
                      <div className={s.name}>{product.name}</div>
                    </div>
                    <div className={s.price}>
                      {product.onSale ? salePriceFront : normalPriceFront}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    
      </div>
      
    </div>
    </div>
  ) : (
    <div className={`${s.pageContent} ${!openNavigation ? s.activeMobile : ""}`}>
         
      {/*<button*/}
      {/*className={s.activeMenu}*/}
      {/*dangerouslySetInnerHTML={{ __html: icons.fullArrowLeft }}*/}
      {/*// onClick={() => setOpenNavigation(!openNavigation)}*/}
      {/*/> */}
    <SectionTitle title="Избранные товары" />
    <div className={`${s.content} ${router.route == slug ? s.active : ""}`}>
      <div className={s.emptyCart}>
        <p>Здесь будут сохраняться товары, которые вы добавили</p>
        <Link href="/">
          <a>Перейти к каталогу</a>
        </Link>
      </div>
    </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item) => {
      dispatch(addToWishlist(item));
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistMain);
