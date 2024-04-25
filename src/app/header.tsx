'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export const Header = ({ className }: { className?: string }) => {
  return (
    <header className={cn(className)}>
      <div className="container flex h-12 items-center">
        <h1 className="font-bold">Pianote</h1>
        <div className="ml-6 flex gap-3">
          <GlobalMenuLink href="/chord/memo">コードのメモ帳</GlobalMenuLink>
          <GlobalMenuLink href="/chord/search">コード検索</GlobalMenuLink>
          <GlobalMenuLink href="/scale/search">スケール検索</GlobalMenuLink>
        </div>
      </div>
    </header>
  );
};

const GlobalMenuLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const current = usePathname() === href;
  return (
    <motion.div className={'relative'}>
      <Link
        className={cn(
          'inline-flex items-center h-8 px-4 py-2 w-full rounded-md font-medium text-sm text-foreground/60',
          'hover:text-foreground',
          current && 'text-foreground',
        )}
        href={href}
      >
        {children}
      </Link>
      {current && (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-full rounded-md bg-primary/10"
          layoutId="underline"
        />
      )}
    </motion.div>
  );
};
