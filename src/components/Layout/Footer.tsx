import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
      <p>&copy; {new Date().getFullYear()} ContactHub</p>
      <p className="mt-2 sm:mt-0">Dibuat dengan <span className="text-red-500">&hearts;</span> menggunakan React &amp; Tailwind</p>
    </div>
  </footer>
);

export default Footer;
