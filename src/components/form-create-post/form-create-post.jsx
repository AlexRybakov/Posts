import React, { useState } from "react";

import { Button, Form, Image, Input } from "antd";
import api from "../../utils/api";
import { PostContext } from "../../context/post-context";



export function CreateForm({closeStatus}) {

  const createPost = React.useContext(PostContext);
  const handlerCreatePost = createPost.handleCreatePost;
  const textInput = React.createRef();
  const [output, setOutput] = useState(null);
  const defImg = "https://b-n-c.ru/local/templates/.default/img/no-img.jpg";
  const inputData = {};

  function onFinish(e) {
    inputData.image = e.image;
    inputData.title = e.title;
    inputData.text = e.text;
    api.createNewPost(inputData).then(
      handlerCreatePost()
    );
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
        rules={[
          {
            required: true,
            message: "Введите URL изображения"
          },
          {
            type: 'url',
            warningOnly: true,
            message: "Некорректный адрес изображения"
          },
          {
            type: 'string',
            min: 1,
          },
        ]}
      >
        <input className='inputAvatar' onChange={showInput} ref={textInput} placeholder="URL картинки поста" />
      </Form.Item>
      <Form.Item>
        <Image preview={false} src={(output === null ? defImg : output)} size={300} />
      </Form.Item>
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: "Введите заголовок поста"
          },
          {
            type: 'string',
            warningOnly: true,
          },
          {
            type: 'string',
            min: 1,
          },
        ]}
      >
        <Input allowClear={true} placeholder="Заголовок поста" />
      </Form.Item>
      <Form.Item
        name="text"
        rules={[
          {
            required: true,
            message: "Введите текст поста"
          },
          {
            type: 'string',
            warningOnly: true,
          },
          {
            type: 'string',
            min: 1,
          },
        ]}
      >
        <Input.TextArea allowClear={true} placeholder="Текст поста" />
      </Form.Item>
      <Form.Item>
        <Button block type='primary' htmlType="submit" onClick={closeStatus}>Создать</Button>
      </Form.Item>
    </Form>
  )
}

