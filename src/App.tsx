import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { ContactList } from './components/Public/ContactList';
import { SubmissionForm } from './components/Public/SubmissionForm';
import { UserLogin } from './components/Public/UserLogin';
import { contactService } from './services/contactService';
import { ContactFormData, AppState } from './types';

const USER_CODE = (import.meta.env.VITE_USER_CODE as string) || 'user123';

function App() {
  const [state, setState] = useState<AppState>({
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
    if (!state.hasAccess ) return;
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchContacts();
  }, [state.hasAccess]);


  const handleViewChange = (view: 'public' | 'submit') => {
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


  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'public':
        if (!state.hasAccess) {
          return <UserLogin onLogin={handleUserLogin} />;
        }
        return (
          <ContactList
            contacts={state.contacts}
            loading={state.loading}
          />
        );

      case 'submit':
        if (!state.hasAccess) {
          return <UserLogin onLogin={handleUserLogin} />;
        }
        return (
          <SubmissionForm
            onSubmit={handleAddContact}
          />
        );
      
      default:
        if (!state.hasAccess) {
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
    <div className="relative min-h-screen pb-24 bg-slate-100 dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900 dark:text-gray-100">
      <Header
        currentView={state.currentView}
        onViewChange={handleViewChange}
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