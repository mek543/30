'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [form] = Form.useForm();

  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    setLoginError('');

    setTimeout(() => {
      const { email, password } = values;

      if (email === 'me@mail.com' && password === '00000000') {
        localStorage.setItem('user', JSON.stringify({ username: email }));
        message.success('Login successful!');
        router.push('/home');
      } else {
        setLoginError('Incorrect email or password. Please try again.');
        message.error('Incorrect credentials');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <Card
        className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-200"
        bodyStyle={{ padding: '2rem' }}
        headStyle={{ display: 'none' }}
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-1">Welcome Back 👋</h1>
          <p className="text-gray-500 text-sm">Log in to your account below</p>
        </div>

        {loginError && (
          <Alert
            message={loginError}
            type="error"
            showIcon
            closable
            onClose={() => setLoginError('')}
            className="mb-4"
          />
        )}

        <Form
          form={form}
          name="login"
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input
              autoFocus
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="you@example.com"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 rounded-lg"
                disabled={
                  loading ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().some(({ errors }) => errors.length)
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>

        <div className="flex justify-between text-sm mt-4">
          <a href="/forgot-password" className="text-indigo-500 hover:underline">
            Forgot Password?
          </a>
          <a href="/register" className="text-indigo-500 hover:underline">
            Create Account
          </a>
        </div>

        <div className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </Card>
    </div>
  );
}
