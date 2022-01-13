import React, {useState} from 'react';
import {TABS} from "../Tabs";
import MenuItem from "../MenuItem/MenuItem";
import s from './PersonalCabinet.module.scss'
import useUser from '../../../utils/useUser'
import axios from "axios";
import {useRouter} from "next/router"

const PersonalCabinet = ({children}) => {
  const {mutateUser} = useUser()
  const router = useRouter()
  const logout = async () => {
    mutateUser(
        await axios.post("/api/auth/logout"),
        false
    )
    router.push('/account')
  }

  return (
      <>
        <div className={s.wrapper}>
          <div className={s.leftSide}>
            {/*<h1 className={s.title}>Персональные данные</h1>*/}
            <div>
              <ul>
                {TABS.map(({label, link}) => <MenuItem label={label} link={link}/>)}
                <li className={`${s.tab} ${s.logout}`}>
                  <button className={s.label} onClick={() => logout()}>Выйти с аккаунта</button>
                </li>
              </ul>
            </div>

          </div>
          <div className={s.rightSide}>
            {children}
          </div>
        </div>
      </>
  );
};

export default PersonalCabinet;