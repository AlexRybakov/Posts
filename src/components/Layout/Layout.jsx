import { Breadcrumb, Button, Layout, List } from 'antd';
import { PostList } from '../post-list/post-list';
import { Title } from '../title/title';
import { HomeTwoTone } from '@ant-design/icons';
const { Content } = Layout;

export function LayoutApp({ posts, currentUser, onDelete, onPostLike }) {




  return (
    <Layout>
      <Title />
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          backgroundImage: 'URL(https://oir.mobi/uploads/posts/2021-01/1611839366_1-p-bogatii-sinii-fon-1.jpg)',
        }}
      >
        <Breadcrumb
          items={[
            {
              title: <Button href="/" ><HomeTwoTone/>На главную</Button>,
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
            backgroundImage: 'URL(https://oir.mobi/uploads/posts/2021-01/1611839347_9-p-bogatii-sinii-fon-9.jpg)',
          }}
        >
          <PostList posts={posts} onPostLike={onPostLike} currentUser={currentUser} onDelete={onDelete} />
        </List>
      </Content>
    </Layout>
  );

};







