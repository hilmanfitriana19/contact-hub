import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { ContactList } from './components/Public/ContactList';
import { SubmissionForm } from './components/Public/SubmissionForm';
import { AdminLogin } from './components/Admin/AdminLogin';
import { UserLogin } from './components/Public/UserLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { contactService } from './services/contactService';
import { ContactFormData, AppState } from './types';

const ADMIN_CODE = (import.meta.env.VITE_ADMIN_CODE as string) || 'admin123';
const USER_CODE = (import.meta.env.VITE_USER_CODE as string) || 'user123';

function App() {
  const [state, setState] = useState<AppState>({
    isAdmin: false,
    hasAccess: false,
    contacts: [],
    loading: false,
    currentView: 'public'
  });
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return false;
  });

  const hasFetched = useRef(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const fetchContacts = async () => {
    setState(prev => ({ ...prev, loading: true }));
    const contacts = await contactService.getAllContacts();
    setState(prev => ({
      ...prev,
      contacts,
      loading: false
    }));
  };

  const handleUserLogin = (code: string): boolean => {
    if (code === USER_CODE) {
      setState(prev => ({ ...prev, hasAccess: true }));
      fetchContacts();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!state.hasAccess && !state.isAdmin) return;
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchContacts();
  }, [state.hasAccess, state.isAdmin]);

  const handleAdminLogin = (code: string): boolean => {
    if (code === ADMIN_CODE) {
      setState(prev => ({
        ...prev,
        isAdmin: true,
        hasAccess: true,
        currentView: 'admin'
      }));
      fetchContacts();
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setState(prev => ({
      ...prev,
      isAdmin: false,
      currentView: 'public'
    }));
  };

  const handleViewChange = (view: 'public' | 'admin' | 'submit') => {
    if (view === 'admin' && !state.isAdmin) {
      setState(prev => ({ ...prev, currentView: 'admin' }));
      return;
    }
    setState(prev => ({ ...prev, currentView: view }));
  };

  const handleAddContact = async (data: ContactFormData) => {
    try {
      await contactService.addContact(data);
      await fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  };

  const handleUpdateContact = async (id: string, data: ContactFormData) => {
    try {
      await contactService.updateContact(id, data);
      await fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await contactService.deleteContact(id);
      await fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'public':
        if (!state.hasAccess && !state.isAdmin) {
          return <UserLogin onLogin={handleUserLogin} />;
        }
        return (
          <ContactList
            contacts={state.contacts}
            loading={state.loading}
          />
        );

      case 'submit':
        if (!state.hasAccess && !state.isAdmin) {
          return <UserLogin onLogin={handleUserLogin} />;
        }
        return (
          <SubmissionForm
            onSubmit={handleAddContact}
          />
        );
      
      case 'admin':
        if (!state.isAdmin) {
          return <AdminLogin onLogin={handleAdminLogin} />;
        }
        return (
          <AdminDashboard
            contacts={state.contacts}
            onAddContact={handleAddContact}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
            loading={state.loading}
          />
        );
      
      default:
        if (!state.hasAccess && !state.isAdmin) {
          return <UserLogin onLogin={handleUserLogin} />;
        }
        return (
          <ContactList
            contacts={state.contacts}
            loading={state.loading}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen pb-24 bg-slate-100 dark:bg-blue-950 dark:text-gray-100">
      <Header
        currentView={state.currentView}
        isAdmin={state.isAdmin}
        onViewChange={handleViewChange}
        onAdminLogout={handleAdminLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;