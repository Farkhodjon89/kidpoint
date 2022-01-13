import React, {useState} from "react";
import Layout from "../../components/Layout/layout";
import CategoriesBar from "../../components/CategoriesBar/categories-bar";
import {StaticDataSingleton} from '../../utils/staticData'
import AuthorizationPage from '../../components/AuthorizationPage'
import useUser from "../../utils/useUser";
import LayoutTwo from "../../components/LayoutTwo/layout-two";

const Authorization = ({categories}) => {
  useUser({ redirectTo: '/account/settings', redirectIfFound: true });
  return (
      <LayoutTwo categories={categories}>
        <AuthorizationPage />
      </LayoutTwo>
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


export default Authorization