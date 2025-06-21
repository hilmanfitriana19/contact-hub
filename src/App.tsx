import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { ContactList } from './components/Public/ContactList';
import { SubmissionForm } from './components/Public/SubmissionForm';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { contactService } from './services/contactService';
import { Contact, ContactFormData, AppState } from './types';

const ADMIN_CODE = 'admin123';

function App() {
  const [state, setState] = useState<AppState>({
    isAdmin: false,
    contacts: [],
    loading: true,
    currentView: 'public'
  });

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = contactService.subscribeToContacts((contacts) => {
      setState(prev => ({
        ...prev,
        contacts,
        loading: false
      }));
    });

    return () => unsubscribe();
  }, []);

  const handleAdminLogin = (code: string): boolean => {
    if (code === ADMIN_CODE) {
      setState(prev => ({
        ...prev,
        isAdmin: true,
        currentView: 'admin'
      }));
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
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  };

  const handleUpdateContact = async (id: string, data: ContactFormData) => {
    try {
      await contactService.updateContact(id, data);
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await contactService.deleteContact(id);
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'public':
        return (
          <ContactList 
            contacts={state.contacts} 
            loading={state.loading}
          />
        );
      
      case 'submit':
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
        return (
          <ContactList 
            contacts={state.contacts} 
            loading={state.loading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={state.currentView}
        isAdmin={state.isAdmin}
        onViewChange={handleViewChange}
        onAdminLogout={handleAdminLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2025 ContactHub. Aplikasi Pencatatan Kontak & Relasi Kerja.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;