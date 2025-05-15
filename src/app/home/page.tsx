'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Typography, Button, Card, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/');
      return;
    }

    try {
      const userData = JSON.parse(user);
      setUsername(userData.username);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!username) return null;

  return (
    <Layout className="min-h-screen">
      <Header className="flex justify-between items-center bg-white px-6 shadow-md">
        {/* Left section: Logout Button */}
        <div className="flex items-center">
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            type="primary"
            danger
            className="mr-4"
          >
            Logout
          </Button>
          <Title level={4} className="m-0 text-blue-600">My App</Title>
        </div>

        {/* Right section: User Info */}
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2 bg-blue-500" />
          <Text className="font-medium text-gray-700">{username}</Text>
        </div>
      </Header>

      <Content className="p-6 bg-gray-100">
        <Card className="max-w-2xl mx-auto mt-8 shadow-lg rounded-xl border border-gray-200">
          <Title level={2} className="text-blue-700">ຍິນດີຕ້ອນຮັບ, {username}ສຸດຫຼໍ່</Title>

          <div className="mt-6">
          </div>
        </Card>
      </Content>
    </Layout>
  );
}