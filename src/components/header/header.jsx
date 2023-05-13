import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import cn from "classnames";

import s from "./styles.header.css"


export function AppHeader({ children, user }) {

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}
    >
      <div
        style={{
          float: 'left',
          width: 120,
          height: 31,
          margin: '16px 24px 16px 0',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      <Button style={{
        float: 'right',
        margin: '16px 24px 16px 0',
      }}>{user?.name}: {user?.about}</Button>
    </Header>
  )

}

