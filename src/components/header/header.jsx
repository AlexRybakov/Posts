import React, { useState } from 'react';

import { Header } from "antd/es/layout/layout";
import { MyModal } from '../modal/modal';
import { ChangeForm } from '../form-change-profile/form-change-profile';

import s from "./styles.header.css"
import { Link } from 'react-router-dom';


export function AppHeader({ children, user, data }) {

  const modalTitle="Мой профиль";
  const [open, setOpen] = useState(false)
  const openStatus = () => setOpen(true);
  const closeStatus = () => setOpen(false)


  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}
    >
      <MyModal closeStatus={closeStatus} openStatus={openStatus} status={open} buttonTitle={user?.name} modalTitle={modalTitle} form={<ChangeForm user={user} closeStatus={closeStatus}/>}></MyModal>
      <Link to={'/Posts'}>
      <div
        style={{
          float: 'right',
          width: 220,
          height: 31,
          margin: '16px 24px 16px 0',
          background: 'rgba(66, 135, 245, 0.5)',
        }}
      />
      </Link>
    </Header>
  )
}
