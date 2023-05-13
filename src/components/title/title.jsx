import { Card } from 'antd';
import { Button, Space } from 'antd';



export function Title() {
  function createNewPost() {
    console.log("Есть контакт!");
  }
  return (

    <Card
      bordered={false}
    >
      <h1>Добро пожаловать на мою страничку!</h1>
      <Space wrap>
        <Button type="primary" onClick={() => createNewPost()}>Создать пост</Button>
      </Space>
    </Card>
  );
}
