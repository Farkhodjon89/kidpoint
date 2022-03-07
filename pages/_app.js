import '../styles/globals.css'
import Head from 'next/head'
import {PersistGate} from 'redux-persist/integration/react'
import {useStore} from 'react-redux'
import {store} from '../redux/store'
import React, {useState, useEffect} from 'react'
import Wait from '../components/wait'
import Router from 'next/router'
import {NextSeo} from 'next-seo'

if (typeof window !== 'undefined') {
  const hours = 6
  const now = Date.now()
  const setupTime = localStorage.getItem('version')
  if (setupTime == null) {
    localStorage.clear()
    localStorage.setItem('version', now)
  } else if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear()
    localStorage.setItem('version', now)
  }
}

function MyApp({Component, pageProps}) {
  const store = useStore()

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('findished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
      <>
        <NextSeo
            title='Магазин детских игрушек и товаров в Ташкенте | Kidpoint'
            description='Интернет-магазин детских игрушек, товаров для гигиены, питания, развития и творчества - Kidpoint. Быстрая доставка по всему Узбекистану.'
            openGraph={{
              images: [{url: '/og-mage.png'}],
              url: 'https://kidpoint.uz/',
              title: 'Магазин детских игрушек и товаров в Ташкенте | Kidpoint',
              site_name: 'KidPoint',
              locale: 'ru_RU',
              type: 'website',
              description: 'Интернет-магазин детских игрушек, товаров для гигиены, питания, развития и творчества - Kidpoint. Быстрая доставка по всему Узбекистану.'
            }}
        />
        <Head>
          {/*<title>Крема, лосьоны, гели по уходу за лицом и телом | Bloomshop</title>*/}
          {/*<meta*/}
          {/*    name='description'*/}
          {/*    content='Интернет-магазин BloomShop предлагает вам купить крема, гели, лосьоны и другие предметы гигиенты по уходу за лицом и телом.'*/}
          {/*/>*/}

          <link rel='shortcut icon' type='image/jpg' href='/KidPoint.ico'/>
          {process.env.NODE_ENV === 'production' ? (
              <>
                <script
                    dangerouslySetInnerHTML={{
                      __html: `
                    (function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
                    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                    ym(87728552, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
   });
                        `,
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                      __html: `
                       <div><img src="https://mc.yandex.ru/watch/87728552" style="position:absolute; left:-9999px;" alt="" /></div>
                        `,
                    }}
                />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-MF8HK1LFRF">
                </script>

                <script dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-MF8HK1LFRF');
                  `
                }
                }/>
              </>
          ) : null}
        </Head>
        {loading ? (
            <Wait/>
        ) : (
            <PersistGate persistor={store.__persistor}>
              {() => <Component {...pageProps} />}
            </PersistGate>
        )}
      </>
  )
}

export default store.withRedux(MyApp)
