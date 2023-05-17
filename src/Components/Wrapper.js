import { Breadcrumb, Button, Layout, Menu, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { LogoutApi } from "../apis/api";
import { useAtom } from "jotai";
import { loginData, loginState } from "../store";
import { Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useAtom(loginData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    LogoutApi(userData.data.token).then((resp) => {
      setLoading(false);
      if (resp.status === 200) {
        loginState.persist.clearStorage();
        setUserData({});
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      loginState.persist.clearStorage();
      navigate("/login");
    }
  }, [userData]);

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Layout>
        <Layout.Content style={{ minHeight: "99.9vh" }}>
          <Layout className="layout">
            <Layout.Header
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "white" }}>Tokoweb.co</div>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item>
                  <Button
                    type="link"
                    block
                    style={{ textAlign: "left", padding: 0, color: "inherit" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Menu.Item>
              </Menu>
            </Layout.Header>
            <Layout.Content
              style={{
                padding: "0 50px",
              }}
            >
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>Tokoweb.co</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <Spin spinning={loading} tip="Loading">
                <div
                  className="site-layout-content"
                  style={{
                    background: "white",
                    minHeight: 200,
                    padding: "16px 24px",
                  }}
                >
                  <Outlet />
                </div>
              </Spin>
            </Layout.Content>
            <Layout.Footer
              style={{
                textAlign: "center",
              }}
            >
              Ant Design ©2023 Created by Ant UED
            </Layout.Footer>
          </Layout>
        </Layout.Content>
      </Layout>
    </Space>
  );
}
