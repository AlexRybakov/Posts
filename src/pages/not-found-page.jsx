import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router";


export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <Typography variant="h1" align="center">404</Typography>
        <Typography variant="h1" align="center">УПС!</Typography>
        <Typography variant="h1" align="center">Такой страницы не существует</Typography>
      </Card>
      <Button variant="outlined" size="large" onClick={() => { navigate(-1) }}>
        Назад
      </Button>
    </>
  );
};