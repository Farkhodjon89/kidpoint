import React, {useState,useEffect} from "react";
import Layout from "../../components/Layout/layout";
import CategoriesBar from "../../components/CategoriesBar/categories-bar";
import {StaticDataSingleton} from '../../utils/staticData'
import PersonalCabinet from "../../components/Account/PersonalCabinet/PersonalCabinet";
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";
import s from "../../components/Account/PersonalCabinet/PersonalCabinet.module.scss";
import OrderTabs from "../../components/Account/OrderTabs/OrderTabs";
import useUser from "../../utils/useUser";
import {useRouter} from "next/router"
import AccountOrder from "../../components/AccountOrder";
import SectionTitle from "../../components/SectionTitle";

const OrderPage = ({categories}) => {
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
  const { userData } = useUser({redirectTo: "/account"});
  const [openNavigation, setOpenNavigation] = useState(false);
  const router=useRouter()
  useEffect(() => {
    setOpenNavigation(false);
  }, [router.route]);

  if (!userData?.isLoggedIn) {
    return null
  }

  const content = [
    {
      id: 1,
      number: '№036030',
      date: '30.12.2020',
      img: '/tmp/tick-circle.png',
      text: 'Доставлен',
    },
    {
      id: 2,
      number: '№036030',
      date: '30.12.2020',
      img: '/tmp/clock.png',
      text: 'В обработке',
    },
    {
      id: 3,
      number: '№036030',
      date: '29.12.2020',
      img: '/tmp/tick-circle.png',
      text: 'Доставлен',
    }

  ]
  return (
      <Layout categories={categories}>
        <CategoriesBar categories={categories}/>
        <SectionTitle title='Профиль'/>
        <Breadcrumbs breadcrumbs={breadcrumbs}/>
        <PersonalCabinet>
          <h1 className={s.title}>Мои Заказы</h1>
          <AccountOrder openNavigation={openNavigation}
                        setOpenNavigation={setOpenNavigation} />

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

export default OrderPage