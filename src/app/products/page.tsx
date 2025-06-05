'use client';

import { Table } from 'antd';

const ProductPage = () => {
  const products = [
    { id: 1, name: 'ກະປອມຕາກແຫ້ງ', price: 100, stock: 10 },
    { id: 2, name: 'ເກີບເກົ່າອີ່ແມ່', price: 150, stock: 5 },
    { id: 3, name: 'ເຫຼັກແທງອ່ຽນ', price: 200, stock: 0 },
  ];

  const columns = [
    { title: 'ລະຫັດ', dataIndex: 'id', key: 'id' },
    { title: 'ຊື່ສິນຄ້າ', dataIndex: 'name', key: 'name' },
    { title: 'ລາຄາ', dataIndex: 'price', key: 'price', render: (price: any) => `${price} ₭` },
    { title: 'ຄົງເຫຼືອ', dataIndex: 'stock', key: 'stock' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>ສິນຄ້າທັງໝົດ</h1>
      <Table dataSource={products} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ProductPage;
