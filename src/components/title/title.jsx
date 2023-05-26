import { Card } from 'antd';
import { Button, Space, Form, Input } from 'antd';
import { useState } from 'react';

import s from "./styles.title.css"
import { MyModal } from '../modal/modal';
import { CreateForm } from '../form-create-post/form-create-post';




export function Title() {

  const buttonTitle = "Создать пост";
  
  return (

    <Card
      bordered={false}
    >
      <h1>Добро пожаловать на мою страничку!</h1>
      <Space wrap>
        <MyModal buttonTitle={buttonTitle} modalTitle={buttonTitle} form={<CreateForm />}></MyModal>
      </Space>
    </Card>
  );
}
