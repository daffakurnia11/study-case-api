import { Layout, Space } from "antd";
import React from "react";
import { Outlet } from "react-router";

export default function Wrapper() {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Layout>
        <Layout.Content style={{ minHeight: "99.9vh" }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Space>
  );
}
