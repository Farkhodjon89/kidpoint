import s from "./authorization.module.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

import useUser from "../../utils/useUser";
import SectionTitle from "../SectionTitle";
import InputMask from "react-input-mask"
import {Input} from "../../utils/inputs";
import Link from "next/link";

const SignUp = ({
  setContent,
  contentTypes,
  setModalOpen,
  content,
  phone,
  setPhone,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { mutateUser } = useUser();
  const [sendOtp, setSendOtp] = useState(false);
  const [otp, setOtp] = useState(false);
  const [windowWidth, setWindowWidth] = useState();
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };
  // console.log(phone)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);
  const checkOtp = async () => {
    setLoading(true);
    const response = await axios.post("/api/auth/login", {
      phone,
      otp,
    });
    // if (response.status) {
    //   console.log(response.data)
    //   mutateUser(response.data.userData);
    // }
    if(response.status===200){
      mutateUser(response.data.userData)
      // Should over here be redirect funtion?
    }else{
      alert(response.data.message)
    }
    setLoading(false);
  };

  const onSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post("/api/auth/send-otp", {
      firstName,
      lastName,
      phone,
    });

    if (response.data.status) {
      setSendOtp(true);
    }
    setLoading(false);
  };

  return (
    <>
      <SectionTitle title="авторизация" />

      <div className={s.authorization}>
        <div className={s.regOrLogin2}>
          <button className={content === 'signIn' ? s.bold : ''} onClick={() => setContent(contentTypes.signIn)}>
            Войти в аккаунт
          </button>
          <button className={content === 'signUp' ? s.bold : ''} onClick={() => setContent(contentTypes.signUp)}>
            Регистрация
          </button>
        </div>
        <div className={s.inputs}>
          <input
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            className={firstName ? s.valid : ""}
            placeholder="Имя"
          />
          <input
              id='lastName'
              placeholder='Фамилия *'
              onChange={(e) => setLastName(e.target.value)}
              className={lastName ? s.valid : ""}
          />
          <InputMask
            id="phone"
            // mask="(+\9\98\)99 999 99 99"
            mask="+\9\98 (99) 999 99 99"
            alwaysShowMask={true}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={phone ? s.valid : ""}
            disabled={phone && sendOtp}
          />
          {sendOtp ? (
            <div className={s.inputs}>
              <input
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
                className={phone ? s.valid : ""}
                placeholder="Код"
              />
            </div>
          ) : null}
          {sendOtp ? (
            <button
              disabled={!firstName || !phone || !otp || loading}
              className={s.button}
              onClick={(e) => checkOtp(e)}
            >
              Зарегистрироваться
            </button>
          ) : (
            <button
              disabled={!firstName || !phone || loading}
              className={(phone === "+998 (__) ___ __ __" || phone === "") ? s.button : s.activeButton}
              onClick={(e) => onSubmit2(e)}
            >
              Получить код
            </button>
          )}
          <div className={s.regOrLogin}>
            <div className={s.button1}>У меня уже есть аккаунт</div>
          </div>
        </div>
        <div className={s.authorizationPrivacy2}>
          <p>Для получения более подробной информации перейдите в раздел</p>
          <Link href='/privacy'><a className={s.privacyText}>Политика конфиденциальности</a></Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
