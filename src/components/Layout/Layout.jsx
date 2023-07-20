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
          backgroundImage: 'URL(https://i.ibb.co/94C7GPf/1611839366-1-p-bogatii-sinii-fon-1-gigapixel-very-compressed-scale-4-00x.png)',
        }}
      >
        <Breadcrumb
          items={[
            {
              title: <Button href="/Posts" ><HomeTwoTone/>На главную</Button>,
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
            backgroundImage: 'URL(https://i.ibb.co/F7jy9Xz/1611839347-9-p-bogatii-sinii-fon-9-gigapixel-very-compressed-scale-4-00x.png)',
          }}
        >
          <PostList posts={posts} onPostLike={onPostLike} currentUser={currentUser} onDelete={onDelete} />
        </List>
      </Content>
    </Layout>
  );

};







