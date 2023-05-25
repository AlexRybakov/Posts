import React, { useEffect, useState } from "react";


import { HeartOutlined, MessageOutlined, CalendarOutlined, HeartTwoTone, DeleteFilled } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { isLiked } from "../../utils/post";
import { Avatar, Button, Card, Col, Form, Input, List, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';


import { AllTextDetailedPost } from "./post-text-detailed/post-text-detailed";
import api from "../../utils/api";

dayjs.extend(relativeTime)

function PostDetailed({
  image,
  title,
  text,
  created_at,
  author,
  onPostLike,
  _id,
  likes,
  currentUser,
  user,
  comments }) {
  
  const [comment, setComment] = useState([]);
  const navigate = useNavigate();
  const like = isLiked(likes, user?._id);
  const canDelete = currentUser?._id === comments?.author?._id;
  const inputDataReview = {};
  const [form] = Form.useForm();
  
  useEffect(() => {
    api
      .getCommentPostById(_id)
      .then((commentsData) => {
        setComment(commentsData);
      })
      .catch((err) => console.log(err));
  }, [_id]);


  function handleClickButtonLike() {
    onPostLike({ likes, _id });
  }

  function handleDeleteComments (postId, commentsId) {
    api.deleteComment(postId, commentsId).then((updateComments) => {
      const newComments = updateComments.comments;
      newComments.map((comments) => {
        return comment !== comments;
      });
      setComment(newComments);
    })
    .catch((err) => alert('Нельзя удалить чужой комментарий!'))
  }

  function handleCreateComment (commentsUp) {
      const upComments = commentsUp.comments;
      upComments.map((comments) => {
        return comment !== comments;
      });
      setComment(upComments);
  }

  function onFinish(e) {
    inputDataReview.text = e.text;
    api.createNewComment(_id, inputDataReview).then((upComments) => {
      handleCreateComment(upComments);
    });
    onReset();
  }

  const onReset = () => {
    form.resetFields();
  };



  const IconText = ({ icon, text }) => (
    <Space>
      {icon}
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
              <Meta avatar={<Avatar src={author?.avatar} />} title={author?.name} />,
              
            ]}
            cover={
              <img
                alt="example"
                src={image}
              />
            }
            actions={[
              <Button onClick={handleClickButtonLike}>
              <IconText icon={like ? <HeartTwoTone twoToneColor="#eb2f96"/> : <HeartOutlined />} text={likes?.length} key={_id}/>
            </Button>,
              <IconText icon={<MessageOutlined/>} text={comments?.length} />,
              <IconText icon={<CalendarOutlined/>} text={dayjs(created_at).fromNow()} />,
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
            dataSource={comment}
            renderItem={(item) => (
              <List.Item
                actions={[
                  canDelete && (
                    <Button onClick={() => handleDeleteComments(_id, item._id)}>
                      <DeleteFilled />
                    </Button>
                  )
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.author?.avatar} />}
                  title={<>{item.author?.name}</>}
                  description={item.text}
                />
              </List.Item>
            )}
          />
          <Form
          form={form}
          onFinish={onFinish}
          method='onBlur'
        >
          <Form.Item
            name="text"
          >
            <Input.TextArea allowClear={true} placeholder="Текст комментария" />
          </Form.Item>
          <Form.Item>
          <Button block type='primary' htmlType="submit">Отправить комментарий</Button>
          </Form.Item>
        </Form>
        </Col>
      </Row>
      <Button variant="outlined" size="large" onClick={() => { navigate(-1) }}>
        Назад
      </Button>
    </>
  )
}

export default PostDetailed;