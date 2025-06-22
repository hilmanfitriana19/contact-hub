import React from 'react';
import { Users, Shield, Plus, Home, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: 'public' | 'admin' | 'submit';
  isAdmin: boolean;
  onViewChange: (view: 'public' | 'admin' | 'submit') => void;
  onAdminLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  isAdmin,
  onViewChange,
  onAdminLogout,
  darkMode,
  onToggleDarkMode
}) => {
  return (
    <header className="bg-slate-200 dark:bg-blue-900/90 shadow-sm border-b border-gray-300 dark:border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">ContactHub</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('public')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'public'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Beranda</span>
            </button>
            
            {/* <button
              onClick={() => onViewChange('submit')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'submit'
                  ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Kontak</span>
            </button>
             */}
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onViewChange('admin')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'admin'
                      ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </button>
                <button
                  onClick={onAdminLogout}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onViewChange('admin')}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};