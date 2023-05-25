import React, { useState } from "react";

import { Button, Form, Image, Input } from "antd";
import api from "../../utils/api";



export function CreateForm() {


  const [open, setOpen] = useState(false);
  const textInput = React.createRef();
  const [output, setOutput] = useState(null);
  const defImg = "https://b-n-c.ru/local/templates/.default/img/no-img.jpg";
  const inputData = {};

  function onFinish(e) {
    inputData.image = e.image;
    inputData.title = e.title;
    inputData.text = e.text;
    api.createNewPost(inputData).then(
    setTimeout(() => {
      setOpen(false);
    }, 500),
    setTimeout(() => {
      window.location.reload();
    }, 1000))
    .catch((err) => alert('Ошибка на стороне сервера'))
  }

  function showInput() {
    setOutput(textInput.current?.value)
  }


  return (
    <Form
      onFinish={onFinish}
      method='onBlur'
    >
      <Form.Item
        name="image"
      >
        <input className='inputAvatar' onChange={showInput} ref={textInput} placeholder="URL картинки поста" />
      </Form.Item>
      <Form.Item>
        <Image preview={false} src={(output === null ? defImg : output)} size={300} />
      </Form.Item>
      <Form.Item
        name="title"
      >
        <Input allowClear={true} placeholder="Заголовок поста" />
      </Form.Item>
      <Form.Item
        name="text"
      >
        <Input.TextArea allowClear={true} placeholder="Текст поста" />
      </Form.Item>
      <Form.Item>
        <Button block type='primary' htmlType="submit">Создать</Button>
      </Form.Item>
    </Form>
  )
}
