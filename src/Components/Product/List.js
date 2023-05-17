import React, { useEffect, useState } from "react";
import { ProductListApi } from "../../apis/api";
import { Card, Col, Empty, Row, Typography } from "antd";

export default function List() {
  const [productList, setProductList] = useState([]);

  const fetchData = () => {
    ProductListApi().then((resp) => {
      if (resp.status === 200) {
        console.log(resp);
        setProductList(resp.data.data);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Row gutter={24}>
      {productList.length > 0
        ? productList.map((data, index) => (
            <Col key={index} xl={6} lg={8} md={12} xs={24}>
              <Card
                hoverable
                style={{
                  width: "100%",
                  margin: "12px 0",
                }}
                cover={
                  data.image_url ? (
                    <img alt="example" src={data.image_url} />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: 200,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Empty />
                    </div>
                  )
                }
              >
                <Typography.Title level={5}>{data.name}</Typography.Title>
                <Typography.Paragraph>{data.price}</Typography.Paragraph>
                <Typography.Paragraph
                  style={{ color: "darkgray", textAlign: "right", margin: 0 }}
                >
                  Dibuat : {new Date(data.created_at).toLocaleString()}
                </Typography.Paragraph>
              </Card>
            </Col>
          ))
        : null}
    </Row>
  );
}
