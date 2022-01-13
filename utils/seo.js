import { NextSeo } from 'next-seo'

const Seo = ({ title, description, image }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title: title,
        description: description,
        images: [{ url: image }]
      }}
    />
  )
}

export default Seo
