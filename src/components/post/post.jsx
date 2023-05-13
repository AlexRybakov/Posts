import React from "react";

import { Avatar, Button, Card, Space, Tag } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined, MessageTwoTone, UserOutlined, HeartOutlined, MessageOutlined, CalendarOutlined, CalendarTwoTone, TagsTwoTone, DeleteTwoTone } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import cn from "classnames";
import s from "./styles.post.css"

import { Link } from "react-router-dom";
import { isLiked } from "../../utils/post";


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

    function handleClickButtonLike() {
        onPostLike({ likes, _id });
    }

    function handleClickDelete() {
      onDelete({ _id });
    }

      const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );

        return (
    <Card className='card'
    title={[
      <Meta avatar={<Avatar src={author?.avatar} />} title={author?.name}/>
    ]}
    style={{
      width: 300,
      margin: 15
    }}
    extra={[
      canDelete && (
        <Button  danger onClick={handleClickDelete}>
        <DeleteTwoTone twoToneColor="red"/>
        </Button> )
    ]}
    cover={
      <img
        alt="Изображение"
        src={image}
      />
    }
    actions={[
      <Button onClick={handleClickButtonLike}>
      <IconText icon={HeartOutlined} text={likes.length}/>
      </Button>,
      <Link to={`postpage/${_id}`}>
        <IconText icon={MessageOutlined} text={comments.length}/>
      </Link>,
      <IconText icon={CalendarTwoTone} text={dayjs(created_at).fromNow()}/>,
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


