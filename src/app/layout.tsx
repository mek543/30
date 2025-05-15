'use client';

import { ConfigProvider } from 'antd';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <ConfigProvider>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
