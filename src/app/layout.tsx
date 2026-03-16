import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VE Enablement Academy',
  description: 'Master Ivanti Value Engineering frameworks. Get certified.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Sidebar />
        <main className="ml-0 md:ml-[280px] p-4 md:p-8 min-h-screen pt-16 md:pt-8">
          {children}
        </main>
      </body>
    </html>
  );
}
