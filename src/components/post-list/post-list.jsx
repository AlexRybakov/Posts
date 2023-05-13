import { Row } from "antd"
import Post from "../post/post"




export const PostList = ({posts,  onPostLike, currentUser, onDelete}) => {
  return (
        <Row>
          {posts.map(postData => <Post key={postData._id} {...postData} onPostLike={onPostLike} onDelete={onDelete} currentUser={currentUser}/>)}
        </Row>
  )
}


