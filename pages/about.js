import Layout from '../components/Layout/layout'
import AboutMain from '../components/AboutMain'
import { StaticDataSingleton } from '../utils/staticData'

export default function Contacts({ categories }) {
  return (
    <Layout categories={categories}>
      <AboutMain />
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
    revalidate: 60
  }
}
