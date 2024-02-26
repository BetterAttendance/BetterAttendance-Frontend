import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import SocketsProvider from '@/context/socket.context';

import './globals.css';
import UserProvider from '@/context/user.context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BetterAttendance',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketsProvider>
      <UserProvider>
        <html lang="en" className="light">
          <body className={inter.className}>
            <Providers>{children}</Providers>
          </body>
        </html>
      </UserProvider>
    </SocketsProvider>
  );
}
