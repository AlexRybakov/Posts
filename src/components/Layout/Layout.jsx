import { Breadcrumb, Layout, List, theme } from 'antd';
import { PostList } from '../post-list/post-list';
import { Title } from '../title/title';
import Post from '../post/post';
const { Content } = Layout;

export function LayoutApp ({posts,  currentUser, onDelete, onPostLike})  {



  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout>
      <Title/>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
  <Breadcrumb
    items={[
      {
        title: <a href="">Home</a>,
      },
      {
        title: 'List',
      }
    ]}
  />
  <List
  style={{
    padding: 24,
    minHeight: 380,
    background: colorBgContainer,
  }}
>
  <PostList posts={posts} onPostLike={onPostLike} currentUser={currentUser} onDelete={onDelete}/>
</List>
      </Content>
    </Layout>
  );
  
};







