'use client';

import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface User {
  id: number;
  username: string;
  role: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.resetFields();
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: User) => {
    form.setFieldsValue(record);
    setEditingUser(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        setUsers(users.map((item) => (item.id === editingUser.id ? { ...item, ...values } : item)));
      } else {
        const newUser = { id: Date.now(), ...values };
        setUsers([...users, newUser]);
      }
      setIsModalOpen(false);
    });
  };

  const columns = [
    { title: 'ຊື່ຜູ້ໃຊ້', dataIndex: 'username' },
    { title: 'ສິດ', dataIndex: 'role' },
    {
      title: 'ຈັດການ',
      render: (_: any, record: User) => (
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
      <h2 className="text-xl font-bold mb-4">ຈັດການຜູ້ໃຊ້</h2>
      <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd} className="mb-4">
        ເພີ່ມຜູ້ໃຊ້
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" />

      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleSubmit} title={editingUser ? 'ແກ້ໄຂຜູ້ໃຊ້' : 'ເພີ່ມຜູ້ໃຊ້'}>
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="ຊື່ຜູ້ໃຊ້" rules={[{ required: true, message: 'ກະລຸນາປ້ອນຊື່' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="ສິດ" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="staff">Staff</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
