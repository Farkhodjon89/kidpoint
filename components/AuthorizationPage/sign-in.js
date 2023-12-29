import s from "./authorization.module.scss";
import axios from "axios";
import React, {useState, useEffect} from "react";
import useUser from "../../utils/useUser";
import icons from "../../public/fixture";
import SectionTitle from "../SectionTitle";
import InputMask from "react-input-mask";
import Link from "next/link";

const SignIn = ({setContent, contentTypes, phone, setPhone, content}) => {
  const [sendOtp, setSendOtp] = useState(false);
  const [otp, setOtp] = useState(false);
  const [windowWidth, setWindowWidth] = useState();
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const {mutateUser} = useUser();
  const checkOtp = async () => {
    setLoading(true);
    setOtpError(false);
    const response = await axios.post("/api/auth/login", {
      phone,
      otp,
    });

    setLoading(false);
    if (response.status && response.data.status) {
      mutateUser(response.data.userData);
    } else {
      setOtpError(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post("/api/auth/send-otp", {phone});
    if (response.data.status) {
      setSendOtp(true);
    }
    setLoading(false);
  };

  return (
      <>
        <SectionTitle title="авторизация"/>
        <div className={s.authorization}>
          <div className={s.regOrLogin2}>
            <button className={content === 'signIn' ? s.bold : ''} onClick={() => setContent(contentTypes.signIn)}>
              Войти в аккаунт
            </button>
            <button className={content === 'signUp' ? s.bold : ''} onClick={() => setContent(contentTypes.signUp)}>
              Регистрация
            </button>
          </div>
          <div className={s.subtitle}>
            {sendOtp && (
                <button
                    className={s.loginGoBack}
                    onClick={() => {
                      setSendOtp(false);
                      setOtp(false);
                    }}
                    dangerouslySetInnerHTML={{__html: icons.fullArrowLeft}}
                />
            )}
            {/*Вход в персональный кабинет*/}
          </div>
          <div className={s.inputs}>
            {/* <input
            id="phone"
            placeholder='Номер телефона'
            onChange={(e) => setPhone(e.target.value)}
            className={phone ? s.valid : ""}
          /> */}

            <InputMask
                id="phone"
                // mask="(+\9\98\)99 999 99 99"
                mask="+\9\98 (99) 999 99 99"
                value={phone}
                alwaysShowMask={true}
                onChange={(e) => setPhone(e.target.value)}
                className={phone ? s.valid : ""}
                disabled={phone && sendOtp}
            />
            {sendOtp ? (
                <>
                  <input
                      id="otp"
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Код"
                      className={!otpError ? s.valid : s.error}
                  />
                  <div className={s.regOrLogin}>
                    <div>Не получили код?</div>
                    <button onClick={(e) => onSubmit(e)}>Отправить повторно</button>
                  </div>
                  <button
                      disabled={!phone || !otp || loading}
                      className={!otp ? s.button : s.activeButton}
                      onClick={(e) => checkOtp(e)}
                  >
                    Войти
                  </button>
                </>
            ) : (
                <>
                  <div className={s.space}/>
                  <button
                      disabled={phone === "" || loading}
                      className={(phone === "+998 (__) ___ __ __" || phone === "") ? s.button : s.activeButton}
                      onClick={(e) => onSubmit(e)}
                  >
                    Получить код
                  </button>
                  <div className={s.regOrLogin}>
                    <div>У вас нет аккаунта ?</div>
                    <button onClick={() => setContent(contentTypes.signUp)}>
                      Зарегистрироваться
                    </button>
                  </div>
                </>
            )}
            <div className={s.authorizationPrivacy}>
              <p>Для получения более подробной информации перейдите в раздел</p>
              <Link href='/privacy'><a className={s.privacyText}>Политика конфиденциальности</a></Link>
            </div>

          </div>
        </div>
      </>
  );
};

export default SignIn;
