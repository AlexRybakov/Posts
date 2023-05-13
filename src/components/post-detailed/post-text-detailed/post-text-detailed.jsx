import Meta from "antd/es/card/Meta";
import "./styles.css"
import { Card } from "antd";

export function AllTextDetailedPost({ title, text }) {

  return (
    <Card
      style={{
        width: 600,
        margin: 20
      }}
      type="inner"
      title={title} >
      {text}
    </Card>
  );
}
