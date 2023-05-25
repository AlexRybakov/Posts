import React from 'react';

import { Header } from "antd/es/layout/layout";
import { MyModal } from '../modal/modal';
import { ChangeForm } from '../form-change-profile/form-change-profile';

import s from "./styles.header.css"
import { Link } from 'react-router-dom';


export function AppHeader({ children, user, data }) {

  const modalTitle="Мой профиль";


  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}
    >
      <MyModal buttonTitle={user?.name} modalTitle={modalTitle} form={<ChangeForm user={user}/>}></MyModal>
      <Link to={"/"}>
      <div
        style={{
          float: 'right',
          width: 220,
          height: 31,
          margin: '16px 24px 16px 0',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      </Link>
    </Header>
  )

}



