import Layout from '../components/Layout/layout';
import {StaticDataSingleton} from '../utils/staticData';
import BRANDS from '../queries/brands';
import client from '../apollo/apollo-client';
import BrandList from '../components/BrandList/brand-list';
import Breadcrumbs from '../components/Breadcrumbs/breadcrumbs';

let arr_EN = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
let arr_RU = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'И',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
      'Щ',
'Ъ',
'Ы',
'Ь',
'Э',
'Ю',
'Я'

];

const Brands = ({categories, brands}) => {

  let letter = arr_EN.map((letter) => {
    const brandList = [];
    for (const brand of brands) {
      if (letter == brand.name[0]) {
        brandList.push({name: brand.name.toUpperCase(), slug: brand.slug});
      }
    }
    return (letter = {
      letter,
      brands: brandList,
    });
  });
  let letter2 = arr_RU.map((letter) => {
    const brandList = [];
    for (const brand of brands) {
      if (letter == brand.name[0]) {
        brandList.push({name: brand.name.toUpperCase(), slug: brand.slug});
      }
    }
    return (letter = {
      letter,
      brands: brandList,
    });
  });

  const breadcrumbs = [
    {
      name: 'Главная',
      slug: '/',
    },
    {
      name: 'Бренды',
      slug: '/brands',
    },
  ];

  return (
      <Layout categories={categories}>
        <div className="brands">Бренды</div>
        {/*<Breadcrumbs breadcrumbs={breadcrumbs}/>*/}
        <BrandList brands={letter} brands2={letter2}/>
      </Layout>
  );
};

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);
  const categories = staticData.getRootCategories();

  const brands = await client.query({
    query: BRANDS,
    fetchPolicy: 'no-cache',
  });

  // const niJoki = brands.data.paBrands.nodes.filter(({products}) => products.nodes.length !== 0);

  return {
    props: {
      categories,
      brands: brands.data.paBrands.nodes,
    },
    revalidate: 60,
  };
}

export default Brands;