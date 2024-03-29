import React, { useState } from "react";

import { Button, Form, Image, Input } from "antd";
import api from "../../../utils/api";
import { PostContext } from "../../../context/post-context";



export function ChangePost ({ image, title, text, _id, closeStatus}) {

  const createPost = React.useContext(PostContext);
  const handleUpdatePost = createPost.handleUpdatePost;
  const textInput = React.createRef();
  const [output, setOutput] = useState(null);
  const inputDataChange = {};



  function showInput() {
    setOutput(textInput.current?.value)
  }


  function onFinish(e) {
    inputDataChange.image = e.image;
    inputDataChange.title = e.title;
    inputDataChange.text = e.text;
    api.changePost(_id, inputDataChange).then(
      handleUpdatePost()
    )
    .catch((err) => alert('Ошибка на стороне сервера'))
  }


    return (
      <Form
      onFinish={onFinish}
      method='onBlur'
      initialValues={{
        image: image,
        title: title,
        text: text
      }}
    >
      <Form.Item
        name="image"
      >
        <input className='inputAvatar' onChange={showInput} ref={textInput} placeholder="URL картинки поста" />
      </Form.Item>
      <Form.Item>
        <Image preview={false} src={(output === null ? image : output)} size={200} />
      </Form.Item>
      <Form.Item
        name="title"
      >
        <Input allowClear={true} placeholder="Заголовок поста"/>
      </Form.Item>
      <Form.Item
        name="text"
      >
        <Input.TextArea autoSize allowClear={true} placeholder="Текст поста"/>
      </Form.Item>
      <Form.Item>
        <Button block type='primary' htmlType="submit" onClick={closeStatus}>Изменить</Button>
      </Form.Item>
    </Form>
    )
}
