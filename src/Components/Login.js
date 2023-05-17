import { Button, Card, Form, Input, Layout, Spin } from "antd";
import React, { useState } from "react";
import { LoginApi } from "../apis/api";
import { useSetAtom } from "jotai";
import { loginData } from "../store";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const setUserData = useSetAtom(loginData);
  const onFinish = (values) => {
    setLoading(true);
    LoginApi(values).then((resp) => {
      setLoading(false);
      if (resp.status === 200) {
        setUserData(resp.data.data);
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card style={{ width: "fit-content" }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Spin spinning={loading}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email harus diisi!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password harus diisi!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </Card>
    </Layout>
  );
}
