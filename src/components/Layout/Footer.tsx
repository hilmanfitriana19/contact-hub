import React from 'react';

export const Footer: React.FC = () => (
  <footer className="absolute bottom-0 left-0 w-full bg-slate-200 dark:bg-blue-900/90 border-t border-gray-300 dark:border-blue-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
      <p>&copy; {new Date().getFullYear()} ContactHub</p>
      <p className="mt-2 sm:mt-0">Dibuat dengan <span className="text-red-500">&hearts;</span> menggunakan React &amp; Tailwind</p>
    </div>
  </footer>
);

export default Footer;
