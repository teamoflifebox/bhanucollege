import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        
        <footer className="bg-white border-t border-gray-200 px-4 py-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 Oxford ERP. Powered by Lifebox NextGen Pvt Ltd</p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Terms</a>
              <a href="#" className="hover:text-gray-700">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}