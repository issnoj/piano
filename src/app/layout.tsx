import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import React from 'react';
import { Header } from '@/app/header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Pianote',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex flex-col min-h-screen bg-background font-sans antialiased',
          'bg-gradient-to-br from-white via-gray-100 to-white',
          inter.variable,
        )}
      >
        <Header className="sticky top-0 w-full border-b bg-background shadow-sm" />
        <main className="container p-4 md:p-8">{children}</main>
      </body>
    </html>
  );
}
