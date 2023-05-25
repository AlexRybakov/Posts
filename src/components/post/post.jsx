import React from "react";
import { useState } from 'react';

import { Avatar, Button, Card, Space, Image } from "antd";
import { HeartOutlined, MessageOutlined, EditTwoTone, CalendarTwoTone, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import cn from "classnames";
import s from "./styles.post.css"

import { Link } from "react-router-dom";
import { isLiked } from "../../utils/post";
import { MyModal } from "../modal/modal";
import { ChangePost } from "../form-change-post/form-change-profile/form-change-post";
import Icon from "@ant-design/icons/lib/components/Icon";


dayjs.extend(relativeTime)

export const Post = ({
  image,
  title,
  text,
  created_at,
  author,
  onPostLike,
  onDelete,
  _id,
  likes,
  currentUser,
  comments,
  tags
}) => {

  const like = isLiked(likes, currentUser?._id);
  const canDelete = currentUser?._id === author._id;
  const canChange = currentUser?._id === author._id;
  const canChangeTitle = "Редактирование поста";

  function handleClickButtonLike() {
    onPostLike({ likes, _id });
  }

  function handleClickDelete() {
    onDelete({ _id });
  }


  const IconText = ({ icon, text }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );

  return (
    <Card className='card'
      title={[
        <Meta avatar={<Avatar src={author?.avatar} />} title={author?.name} key={_id}/>
      ]}
      style={{
        width: 300,
        margin: 15
      }}
      extra={[
        canChange && (
          <MyModal buttonTitle={<EditTwoTone twoToneColor="blue"/>} modalTitle={canChangeTitle} form={<ChangePost image={image} title={title} text={text} key={_id} _id={_id}/>}></MyModal>
        ),
        canDelete && (
          <Button danger style={{marginLeft: 10}} onClick={handleClickDelete} key={_id}>
            <DeleteTwoTone twoToneColor="red" />
          </Button>)
      ]}
      cover={
        <Image 
          alt="Изображение"
          src={image}
        />
      }
      actions={[
        <Button onClick={handleClickButtonLike}>
          <IconText icon={like ? <HeartTwoTone twoToneColor="#eb2f96"/> : <HeartOutlined />} text={likes.length} key={_id}/>
        </Button>,
        <Link to={`postpage/${_id}`}>
          <IconText icon={<MessageOutlined/>} text={comments.length} key={_id}/>
        </Link>,
        <IconText icon={<CalendarTwoTone/>} text={dayjs(created_at).fromNow()} key={_id}/>,
      ]}
    >
      <Link to={`postpage/${_id}`}>
        <Meta
          title={title}
          description={text}
        />
      </Link>
    </Card>
  )
}
export default Post;