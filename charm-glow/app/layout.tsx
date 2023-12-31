import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import Providers from './Providers';
import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'Charm Glow',
  description: 'Jewelry and much more..',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>
        <Providers>
          <ConfigProvider theme={theme}>
            {children}
          </ConfigProvider>
        </Providers>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;