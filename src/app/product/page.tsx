'use client';

import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.resetFields();
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: Product) => {
    form.setFieldsValue(record);
    setEditingProduct(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        setProducts(products.map((item) => (item.id === editingProduct.id ? { ...item, ...values } : item)));
      } else {
        const newProduct = { id: Date.now(), ...values };
        setProducts([...products, newProduct]);
      }
      setIsModalOpen(false);
    });
  };

  const columns = [
    { title: 'ຊື່ສິນຄ້າ', dataIndex: 'name' },
    { title: 'ລາຄາ', dataIndex: 'price' },
    {
      title: 'ຈັດການ',
      render: (_: any, record: Product) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="ຢືນຢັນການລຶບ?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">ຈັດການສິນຄ້າ</h2>
      <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd} className="mb-4">
        ເພີ່ມສິນຄ້າ
      </Button>
      <Table dataSource={products} columns={columns} rowKey="id" />

      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleSubmit} title={editingProduct ? 'ແກ້ໄຂສິນຄ້າ' : 'ເພີ່ມສິນຄ້າ'}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="ຊື່ສິນຄ້າ" rules={[{ required: true, message: 'ກະລຸນາປ້ອນຊື່' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="ລາຄາ" rules={[{ required: true, message: 'ກະລຸນາປ້ອນລາຄາ' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
