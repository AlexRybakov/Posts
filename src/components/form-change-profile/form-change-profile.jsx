import React, { useState } from "react";

import { Avatar, Button, Form, Input } from "antd";
import api from "../../utils/api";



export function ChangeForm ({user}) {

  const [open, setOpen] = useState(false);
  const textInput = React.createRef();
  const [output, setOutput] = useState(null);
  const inputNameAndAbout = {};
  const inputAvatar = {};


  function showInput() {
    setOutput(textInput.current?.value)
  }


  function onFinish(e) {
    inputNameAndAbout.name = e.name;
    inputNameAndAbout.about = e.about;
    inputAvatar.avatar = e.avatar;
    api.changeUserNameAndAbout(inputNameAndAbout);
    api.changeUserAvatar(inputAvatar);
    setTimeout(() => {
      setOpen(false);
    }, 500);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

    return (
      <Form
      onFinish={onFinish}
      method='onBlur'
      initialValues={{
        avatar: user?.avatar,
        name: user?.name,
        about: user?.about,
        email: user?.email
      }}
    >
      <Form.Item
        name="avatar"
        label="URL"
      >
        <input className='inputAvatar' onChange={showInput} ref={textInput} />
      </Form.Item>
      <Form.Item>
        <Avatar src={(output === null ? user?.avatar : output)} size={300} />
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
      >
        <Input allowClear={true} />
      </Form.Item>
      <Form.Item
        name="about"
        label="About"
      >
        <Input allowClear={true} />
      </Form.Item>
      <Form.Item
        name="email"
        label="e-mail"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item>
        <Button block type='primary' htmlType="submit">Изменить</Button>
      </Form.Item>
    </Form>
    )
}
