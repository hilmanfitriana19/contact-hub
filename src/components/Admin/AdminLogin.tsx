import React, { useState } from 'react';
import { Shield, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (code: string) => boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(code);
    if (!success) {
      setError('Kode admin tidak valid');
      setCode('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          </div>
          <p className="text-gray-600">
            Masukkan kode admin untuk mengakses panel pengelolaan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-2">
              Kode Admin
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                id="adminCode"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
                }}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan kode admin"
                required
              />
            </div>
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          >
            Masuk
          </button>
        </form>

        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600 text-center">
            Demo: Gunakan kode <span className="font-mono font-bold">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};