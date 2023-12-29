import Layout from '../../components/Layout/layout';
import Breadcrumbs from '../../components/Breadcrumbs/breadcrumbs';
import Catalog from '../../components/CatalogMain/catalog-main';
import client from '../../apollo/apollo-client';
import PRODUCTS from '../../queries/products';
import {StaticDataSingleton} from '../../utils/staticData';
import CategoriesBar from "../../components/CategoriesBar/categories-bar";
import SectionTitle from "../../components/SectionTitle";

const CatalogPage = ({pageInfo, products, category, categories, activeTerms}) => {

  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/',
    },
    {
      name: 'Каталог',
      slug: `/catalog`,
    },
  ];

  return (
      <>
        <Layout categories={categories}>
          <CategoriesBar categories={categories}/>
          <div className="container">
            {/*<SectionTitle title='Каталог'/>*/}
            <Breadcrumbs breadcrumbs={breadcrumbs}/>
            <Catalog
                index='index'
                products={products}
                categories={categories}
                pageInfo={pageInfo}
                category={category}
                activeTerms={activeTerms}
            />
          </div>
        </Layout>
      </>
  );
};

export default CatalogPage;

export async function getServerSideProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch();

  const categories = staticData.getRootCategories();

  const products = await client.query({
    fetchPolicy: 'no-cache',
    query: PRODUCTS,
    variables: {first: 9},
  });

  return {
    props: {
      products: products.data.products.nodes,
      pageInfo: products.data.products.pageInfo,
      activeTerms: products.data.products.activeTerms,
      categories,
    },
  };
}
