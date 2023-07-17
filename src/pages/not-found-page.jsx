import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router";


export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        cover={
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/6b443b70759853.5bade2d0a6685.png"/>
        }
      >
      </Card>
      <Button variant="outlined" size="large" onClick={() => { navigate(-1) }}>
        Назад
      </Button>
    </>
  );
};