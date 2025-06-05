'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {Layout,Typography,Button,Avatar,Drawer,Menu,Card,Row,Col,Statistic,Tooltip,Badge,Divider,} from 'antd';
import {UserOutlined,LogoutOutlined,MenuOutlined,AppstoreOutlined,EditOutlined,ShoppingCartOutlined,TeamOutlined,SettingOutlined,BellOutlined,HomeOutlined,TrophyOutlined,RiseOutlined,DollarOutlined,} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

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

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
    setDrawerOpen(false);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'ສະບາຍດີຕອນເຊົ້າ';
    if (hour < 17) return 'ສະບາຍດີຕອນບ່າຍ';
    return 'ສະບາຍດີຕອນແລງ';
  };

  if (!username) return null;

  const menuItems = [
    { label: 'ໜ້າຫຼັກ', key: '/dashboard', icon: <HomeOutlined /> },
    { label: 'ສິນຄ້າທັງໝົດ', key: '/products', icon: <AppstoreOutlined /> },
    { label: 'ຈັດການສິນຄ້າ', key: '/product', icon: <EditOutlined /> },
    { label: 'ຈັດການຜູ້ໃຊ້', key: '/user', icon: <UserOutlined /> },
    { label: 'ຄໍາສັ່ງຊື້', key: '/orders', icon: <ShoppingCartOutlined /> },
    { label: 'ຕັ້ງຄ່າ', key: '/settings', icon: <SettingOutlined /> },
  ];
  
  return (
    <Layout className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header
        className="flex justify-between items-center shadow-xl border-b border-white/20 backdrop-blur-sm"
        style={{
          height: 80,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="flex items-center space-x-4">
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-sm"
            size="large"
          >
            ເມນູ
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <TrophyOutlined className="text-yellow-300 text-xl" />
            </div>
            <div>
              <Title level={3} className="m-0 text-white font-bold">
               
              </Title>
              <Text className="text-white/80 text-sm">
                {currentTime.toLocaleDateString('lo-LA')} •{' '}
                {currentTime.toLocaleTimeString('lo-LA', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">

        </div>
      </Header>

      <Layout>
        <Drawer
          title={
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <MenuOutlined className="text-white" />
              </div>
              <span className="font-bold text-lg">ເມນູຫຼັກ</span>
            </div>
          }
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          className="lg:hidden"
          width={280}
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          }}
        >
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
            <div className="flex items-center space-x-3">
              <Avatar icon={<UserOutlined />} size="large" className="border-2 border-white" />
              <div>
                <Text className="text-white font-semibold block">{username}</Text>
                <Text className="text-white/80 text-sm">ຜູ້ດູແລລະບົບ</Text>
              </div>
            </div>
          </div>

          <Menu
            mode="vertical"
            onClick={handleMenuClick}
            items={menuItems}
            className="border-none bg-transparent"
            style={{ fontSize: '16px' }}
          />

          <Divider />

          <div className="px-4">
            <Text className="text-gray-500 text-sm">© 2024 My Dashboard</Text>
          </div>
        </Drawer>

        <Content
          style={{
            padding: '24px',
            background: 'transparent',
          }}
        >
          {/* Welcome Section */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-none shadow-2xl" style={{ borderRadius: '16px' }}>
              <div className="text-white">
                <Title level={2} className="text-white mb-2">
                  {getGreeting()}, {username}! 👋
                </Title>
                <Text className="text-white/90 text-lg">ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບຈັດການຂອງທ່ານ</Text>
              </div>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
