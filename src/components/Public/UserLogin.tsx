import React, { useState } from 'react';
import { Key } from 'lucide-react';

const USER_CODE = (import.meta.env.VITE_USER_CODE as string) || 'user123';

interface UserLoginProps {
  onLogin: (code: string) => boolean;
}

export const UserLogin: React.FC<UserLoginProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(code);
    if (!success) {
      setError('Kode akses tidak valid');
      setCode('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Key className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Masuk</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Masukkan kode akses untuk melihat kontak</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <label htmlFor="userCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kode Akses
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                id="userCode"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
                }}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  error ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                } bg-slate-50 dark:bg-slate-700 dark:text-gray-100`}
                placeholder="Masukkan kode akses"
                required
              />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Masuk
          </button>
        </form>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Demo: Gunakan kode <span className="font-mono font-bold">{USER_CODE}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
