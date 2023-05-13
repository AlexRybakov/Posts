import React from "react";


import {  HeartOutlined, MessageOutlined, CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { isLiked } from "../../utils/post";
import { Avatar, Button, Card, Col, List, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

import s from "./styles.post-detailed.css"
import { AllTextDetailedPost } from "./post-text-detailed/post-text-detailed";

dayjs.extend(relativeTime)

function PostDetailed({  
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
    comments }) {
    const navigate = useNavigate();
    
    const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );        
    return (
        <>
        <Row>
          <Col>
          <Card 
    style={{
      width: 500,
      margin: 20
    }}
    extra={[
        <Meta avatar={<Avatar src={author?.avatar} />} title={author?.name}/>
    ]}
    cover={
      <img
        alt="example"
        src={image}
      />
    }
    actions={[
      <IconText icon={HeartOutlined} text={likes?.length}/>,
      <IconText icon={MessageOutlined} text={comments?.length}/>,
      <IconText icon={CalendarOutlined} text={dayjs(created_at).fromNow()}/>,
    ]}
  >
    </Card>
          </Col>
          <Col flex={0}>
            <AllTextDetailedPost title={title} text={text} />
          </Col>
          <Col flex={1}>
            <h2>Комментарии: </h2>
          <List
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.author.avatar} />}
          title={<a>{item.author.name}</a>}
          description={item.text}
        />
      </List.Item>
    )}
  />
          </Col>


        </Row>
    <Button variant="outlined"  size="large" onClick ={() => {navigate(-1)}}>
        Назад
    </Button>
    </>
    )
}

export default PostDetailed;