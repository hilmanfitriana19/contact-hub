import React from 'react';
import { Users, Shield, Plus, Home } from 'lucide-react';

interface HeaderProps {
  currentView: 'public' | 'admin' | 'submit';
  isAdmin: boolean;
  onViewChange: (view: 'public' | 'admin' | 'submit') => void;
  onAdminLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  isAdmin, 
  onViewChange, 
  onAdminLogout 
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">ContactHub</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('public')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'public'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Beranda</span>
            </button>
            
            <button
              onClick={() => onViewChange('submit')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'submit'
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Kontak</span>
            </button>
            
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onViewChange('admin')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'admin'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
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
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};