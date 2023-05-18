import { Button, Form, Input, Spin, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCreateApi } from "../../apis/api";

export default function Create() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    ProductCreateApi(values).then((resp) => {
      if (resp.status === 200) {
        navigate("/");
      }
      setLoading(false);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Typography.Title level={5}>Tambah Produk</Typography.Title>
      <Form
        layout={"vertical"}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Spin spinning={loading}>
          <Form.Item
            label="Nama Produk"
            name="name"
            rules={[
              {
                required: true,
                message: "Masukkan nama produk!",
              },
            ]}
          >
            <Input placeholder="Gitar" />
          </Form.Item>
          <Form.Item
            label="Harga Produk"
            name="price"
            rules={[
              {
                required: true,
                message: "Masukkan harga produk!",
              },
            ]}
          >
            <Input placeholder="500000" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tambah Produk!
            </Button>
          </Form.Item>
        </Spin>
      </Form>
    </>
  );
}
