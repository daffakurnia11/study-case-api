import { Layout, Space } from "antd";
import Login from "./Components/Login";
import "./css/style.css";

function App() {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100vw",
      }}
    >
      <Layout>
        <Layout.Content>
          <Login />
        </Layout.Content>
      </Layout>
    </Space>
  );
}

export default App;
