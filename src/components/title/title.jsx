import { Card } from 'antd';
import { Space} from 'antd';


import s from "./styles.title.css"
import { MyModal } from '../modal/modal';
import { CreateForm } from '../form-create-post/form-create-post';
import { useState } from 'react';




export function Title() {

  const buttonTitle = "Создать пост";
  const [open, setOpen] = useState(false)
  const openStatus = () => setOpen(true);
  const closeStatus = () => setOpen(false);
  return (

    <Card
      bordered={false}
    >
      <h1>Добро пожаловать на мою страничку!</h1>
      <Space wrap>
        <MyModal closeStatus={closeStatus} openStatus={openStatus} status={open} buttonTitle={buttonTitle} modalTitle={buttonTitle} form={<CreateForm closeStatus={closeStatus}/>}></MyModal>
      </Space>
    </Card>
  );
}
