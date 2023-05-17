import { Button, Card, Form, Input, Layout, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { LoginApi, setAuthToken } from "../apis/api";
import { useAtom } from "jotai";
import { loginData } from "../store";
import { useNavigate } from "react-router";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useAtom(loginData);
  const navigate = useNavigate();
  const onFinish = (values) => {
    setLoading(true);
    LoginApi(values).then((resp) => {
      setLoading(false);
      if (resp.status === 200) {
        setUserData(resp.data);
        setAuthToken(resp.data.data.token);
        navigate("/");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      navigate("/");
    }
  }, [userData]);

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
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
    </Space>
  );
}
