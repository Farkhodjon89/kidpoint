import React, {useState,useEffect} from "react";
import Layout from "../../components/Layout/layout";
import CategoriesBar from "../../components/CategoriesBar/categories-bar";
import {StaticDataSingleton} from '../../utils/staticData'
import PersonalCabinet from "../../components/Account/PersonalCabinet/PersonalCabinet";
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";
import s from "../../components/Account/PersonalCabinet/PersonalCabinet.module.scss";
import Whishlist from "../../components/Account/WishList/Whishlist";
import {connect} from "react-redux";
import {addToCart, deleteFromCart} from "../../redux/actions/cartActions";
import {addToWishlist, deleteFromWishlist} from "../../redux/actions/wishlistActions";
import WishlistMain from "../../components/WishlistMain/wishlist-main";
import useUser from "../../utils/useUser";
import SectionTitle from "../../components/SectionTitle";


const WhishListPage = ({categories,cartItems,wishlistItems,deleteFromCart}) => {
  useUser({redirectTo: "/account"});
  const { userData } = useUser();
  const [openNavigation, setOpenNavigation] = useState(false);

  useEffect(() => {
    setOpenNavigation(false);
  }, []);
  if (!userData?.isLoggedIn) {
    return null
  }

  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/',
    },
    {
      name: 'Профиль',
      slug: `/account`,
    },
  ]

  return (
      <Layout categories={categories}>
        <CategoriesBar categories={categories}/>
        <SectionTitle title='Профиль'/>
        <Breadcrumbs breadcrumbs={breadcrumbs}/>
        <PersonalCabinet>
          <h1 className={s.title}>Избранные</h1>
          <WishlistMain openNavigation={openNavigation}
                        setOpenNavigation={setOpenNavigation}/>
        </PersonalCabinet>
      </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)
  const categories = staticData.getRootCategories()

  return {
    props: {
      categories
    },
    revalidate: 200
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCart(item))
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WhishListPage)