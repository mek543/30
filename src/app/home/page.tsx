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
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      // Redirect to login page if not logged in
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
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Redirect to login page
    router.push('/');
  };

  if (!username) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <Layout className="min-h-screen">
      <Header className="flex justify-between items-center bg-white px-6 shadow-md">
        <div className="flex items-center">
          <Title level={4} className="m-0">My App</Title>
        </div>
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          <Text className="mr-4">{username}</Text>
          <Button 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Header>
      
      <Content className="p-6">
        <Card className="max-w-2xl mx-auto mt-8 shadow-md">
          <Title level={2}>Welcome, {username}!</Title>
          <Text className="text-lg">You have successfully logged in to the application.</Text>
          
          <div className="mt-6">
            <Title level={4}>What's Next?</Title>
            <Text>This is a simple demo showing a login page that redirects to a home page.</Text>
            <Text className="block mt-2">
              In a real application, you would connect this to a real authentication system with a database and API.
            </Text>
          </div>
        </Card>console.log('HomePage component rendered');
console.log('Username:', username);
console.log('User data:', localStorage.getItem('user'));
      </Content>
    </Layout>
  );
}