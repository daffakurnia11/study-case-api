import {
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
  ProductDeleteApi,
  ProductDetailApi,
  ProductListApi,
  ProductUpdateApi,
} from "../../apis/api";
import { Link } from "react-router-dom";

export default function List() {
  const [productList, setProductList] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(""); // Store edited key data
  const isEditing = (record) => record.id === editingKey; // Check whether is in editing mode

  const loadData = () => {
    setLoading(true);
    ProductListApi().then((resp) => {
      setLoading(false);
      if (resp.status === 200) {
        setProductList(resp.data.data);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Edit handler
  const edit = (record) => {
    form.setFieldsValue({
      image_url: "",
      name: "",
      price: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  // Show handler
  const show = (id) => {
    setIsModalOpen(true);
    setModalLoading(true);
    ProductDetailApi(id).then((resp) => {
      setModalLoading(false);
      if (resp.status === 200) {
        setProductDetail(resp.data.data);
      }
    });
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setProductDetail({});
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setProductDetail({});
  };

  // Cancel edit handler
  const cancel = () => {
    setEditingKey("");
  };

  // Save handler
  const save = async (id) => {
    let data = await form.validateFields();
    data = { ...data, product_id: id };
    console.log(data);
    ProductUpdateApi(data).then((resp) => {
      if (resp.status === 200) {
        setEditingKey("");
        loadData();
      }
    });
  };

  const onDeleteHandler = (id) => {
    ProductDeleteApi(id).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        loadData();
      }
    });
  };

  const columns = [
    {
      title: "No",
      render: (id, render, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "Gambar",
      dataIndex: "image_url",
      key: "image_url",
      editable: true,
      render: (data) =>
        data ? <img src={data} alt="gambar produk" /> : <Empty />,
    },
    {
      title: "Produk",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (data, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Popconfirm
              placement="bottom"
              title={"Delete confirmation"}
              description={"Are you sure you want to delete this product?"}
              onConfirm={() => onDeleteHandler(record.id)}
              okText="Yes"
              cancelText="Cancel"
            >
              <Button
                disabled={editingKey !== ""}
                type="text"
                style={{ padding: "0 8px" }}
              >
                <Typography.Text type="danger">
                  <DeleteOutlined />
                </Typography.Text>
              </Button>
            </Popconfirm>
            <Button
              type="text"
              onClick={() => edit(record)}
              disabled={editingKey !== ""}
              style={{ padding: "0 8px" }}
            >
              <Typography.Text type="success">
                <EditOutlined />
              </Typography.Text>
            </Button>
            <Button
              type="text"
              onClick={() => show(record.id)}
              style={{ padding: "0 8px" }}
            >
              <Typography.Text type="secondary">
                <EyeOutlined />
              </Typography.Text>
            </Button>
          </>
        );
      },
    },
  ];

  const editableColumn = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "image_url" ? "image" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    const rules =
      inputType === "image"
        ? []
        : [
            {
              required: true,
              message: `Masukkan data ${title}!`,
            },
          ];
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={rules}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <>
      <Form form={form}>
        <Link to={"/create"}>
          <Button type="primary" style={{ marginBottom: 16 }}>
            Tambah Produk
          </Button>
        </Link>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={productList}
          columns={editableColumn}
          loading={loading}
        />
      </Form>

      <Modal
        title={productDetail?.name}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalLoading ? (
          <div
            style={{
              width: "100%",
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin spinning={modalLoading} tip="Loading" size="large" />
          </div>
        ) : (
          <>
            {productDetail?.image_url ? (
              <img src={productDetail?.image_url} alt="gambar produk" />
            ) : (
              <Empty />
            )}
            <Typography.Title level={5}>{productDetail?.name}</Typography.Title>
            <Typography.Paragraph>{productDetail?.price}</Typography.Paragraph>
            <Typography.Paragraph style={{ color: "darkgray", margin: 0 }}>
              Dibuat pada :{" "}
              {new Date(productDetail?.created_at).toLocaleString()}
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: "darkgray", margin: 0 }}>
              Terakhir Diubah:{" "}
              {new Date(productDetail?.updated_at).toLocaleString()}
            </Typography.Paragraph>
          </>
        )}
      </Modal>
    </>
  );
}
