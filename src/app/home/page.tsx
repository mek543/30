'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Typography, Button, Card, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined, DatabaseOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
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
    <Layout className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <Header
        className="flex justify-between items-center shadow-lg border-b-2 border-gradient-to-r from-blue-400 to-purple-400"
        style={{ 
          height: 70,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="flex items-center">
          <Title level={4} className="m-0 text-white font-bold">
            🌟 My App
          </Title>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
            <Avatar 
              icon={<UserOutlined />} 
              className="mr-3" 
              style={{ 
                backgroundColor: '#ff7875',
                border: '2px solid white'
              }} 
            />
            <Text className="font-semibold text-white">{username}</Text>
          </div>
        </div>
        
        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white font-medium rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5d5d 100%)',
            borderColor: 'transparent'
          }}
        >
          Logout
        </Button>
      </Header>

      {/* Main Layout */}
      <Layout>
        {/* Left Sidebar */}
        <Sider
          width={220}
          className="shadow-xl"
          style={{ 
            minWidth: 120, 
            height: 'calc(100vh - 70px)', 
            top: 70, 
            position: 'sticky',
            background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)'
          }}
        >
          <nav className="p-6">
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                >
                  <HomeOutlined className="mr-3 text-lg" />
                  ໜ້າຫຼັກ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                >
                  <DatabaseOutlined className="mr-3 text-lg" />
                  ຂໍ້ມູນ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                >
                  <SettingOutlined className="mr-3 text-lg" />
                  ການຕັ້ງຄ່າ
                </a>
              </li>
            </ul>
          </nav>
        </Sider>

        {/* Content */}
        <Content
          className="bg-gradient-to-br from-gray-50 to-blue-50"
          style={{
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
          }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Welcome Card */}
            <Card 
              className="mb-6 shadow-2xl rounded-2xl border-0 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <div className="text-center py-8">
                <Title level={2} className="text-white mb-4 font-bold">
                  🎉 ຍິນດີຕ້ອນຮັບ, {username}ສຸດຫຼໍ່ 🎉
                </Title>
                <Text className="text-white/90 text-lg">
                  ຂອບໃຈທີ່ເຂົ້າມາໃຊ້ລະບົບຂອງພວກເຮົາ
                </Text>
              </div>
            </Card>
            {/* Recent Activity Card */}
            
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}