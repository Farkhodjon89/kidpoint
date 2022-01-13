import Layout from '../components/Layout/layout'
import ContactsMain from '../components/ContactsMain'
import { StaticDataSingleton } from '../utils/staticData'

export default function Contacts({ categories }) {
  return (
    <Layout categories={categories}>
      <ContactsMain />
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
