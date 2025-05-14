'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      
      // For demo purposes, accept any credentials
      // In a real app, you would validate against a backend
      message.success('Login successful!');
      
      // Store some user info in localStorage to simulate authentication
      localStorage.setItem('user', JSON.stringify({ username: values.username }));
      
      // Redirect to home page
      router.push('/home');
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-10">
      <Card 
        title="Login" 
        className="w-full max-w-md shadow-md"
        headStyle={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="Username" 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}