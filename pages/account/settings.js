import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout/layout";
import CategoriesBar from "../../components/CategoriesBar/categories-bar";
import {StaticDataSingleton} from '../../utils/staticData'
import PersonalCabinet from "../../components/Account/PersonalCabinet/PersonalCabinet";
import Breadcrumbs from "../../components/Breadcrumbs/breadcrumbs";
import s from "../../components/Account/PersonalCabinet/PersonalCabinet.module.scss";
import {Input} from "../../utils/inputs";
import MaskedInput from "react-input-mask";
import {useForm} from "react-hook-form";
import axios from "axios";
import useUser from "../../utils/useUser";
import SectionTitle from "../../components/SectionTitle";

const AccountPage = ({categories}) => {
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
  const {userData} = useUser({redirectTo: "/account"});
  const {register, handleSubmit, setValue, errors} = useForm()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState()
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendInfo = async (data) => {
    const response = await axios.post("/api/user/edit", {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      city: data.city,
      address: data.address,
    });
  };

  const cities = [
    "Ташкент",
    "Республика Каракалпакстан",
    "Андижанская область",
    "Бухарская область",
    "Джизакская область",
    "Кашкадарьинская область",
    "Навоийская область",
    "Наманганская область",
    "Самаркандская область",
    "Сурхандарьинская область",
    "Сырдарьинская область",
    "Ташкентская область",
    "Ферганская область",
    "Хорезмская область",
  ];

  useEffect(() => {
    if (userData && userData.isLoggedIn) {
      setValue('firstName', userData.user.firstName)
      setValue('lastName', userData.user.lastName)
      setValue('phone', userData.user.billing.phone)
      setPhone(userData.user.billing.phone)
      setValue('email', userData.user.email)
      setValue('city', cities.includes(userData.user.billing.city) ? userData.user.billing.city : 'Ташкент')
      setValue('address', userData.user.billing.address1)
    }
  }, [userData]);

  const actions = [
    <Input
        name='firstName'
        placeholder='Имя *'
        setAction={setName}
        innerRef={register({required: true})}
        style={errors.name && s.error}
    />,
    <Input
        name='lastName'
        setAction={setSurname}
        placeholder='Фамилия *'
        innerRef={register({required: true})}
        style={errors.name && s.error}
    />,
    <MaskedInput
        name='phone'
        mask='+\9\98999999999'
        alwaysShowMask
        className={errors.phone && s.error}
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
    >
      {(inputProps) => (
          <input
              ref={register({
                required: true,
                pattern: /^[\+]?[0-9]{12}$/im,
              })}
              value={phone}
              name={inputProps.name}
              {...inputProps}
          />
      )}
    </MaskedInput>,
    <Input
        name='email'
        setAction={setEmail}
        value={email}
        innerRef={register({required: false})}
        placeholder='Введите email(необязательно)'
        onChange={(e) => validateEmail(e)}
    />,
    <Input
        name='city'
        placeholder='Город *'
        setAction={setCity}
        innerRef={register({required: true})}
        style={errors.city && s.error}
    />,
    <input
        id="country"
        name="country"
        onChange={(e) => setCountry(e.target.value)}
        ref={register({required: true})}
        className={`${errors.country && s.error} ${country ? s.valid : ""}`}
        value='Узбекистан'
        disabled={true}
        placeholder='Узбекистан'
    />,






]
  const makeOrder = async () => {
    setIsLoading(true)

    const orderData = {
      billing: {
        address_1: `${city}, ${country}, ${address}`,
        first_name: name,
        last_name: surname,
        phone: phone,
      },

      customer_note: comment && comment,
    }
  }


  return (
      <Layout categories={categories}>
        <CategoriesBar categories={categories}/>
        <SectionTitle title='Профиль'/>
        <Breadcrumbs breadcrumbs={breadcrumbs}/>
        <PersonalCabinet>
          <h1 className={s.title}>Персоналные данные</h1>
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
            {actions.map((r, i) => (
                <div className={s.action} key={i}>
                  {r}
                </div>
            ))}
            <div className={s.inputs}>
              <input
                  id="address"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  ref={register({required: true})}
                  className={`${errors.address && s.error} ${address ? s.valid : ""}`}
                  value={address}
                  placeholder='Район, улица, номер дома и квартиры'
              />
              {errors.address ? (
                  <p className={s.errorMessage}>Необходимо заполнить</p>
              ) : null}
              <button
                  onClick={handleSubmit(sendInfo)}
                  disabled={isLoading}
                  className={s.submitButton}
              >
                {isLoading ? (
                    <div className={s.loaderAnimation}></div>
                ) : (
                    <>Сохранить</>
                )}
              </button>
            </div>
          </div>
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


export default AccountPage