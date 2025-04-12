import type { ReactNode } from 'react';
import Navbar from '../../components/Layout/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">© 2025 Impause. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
