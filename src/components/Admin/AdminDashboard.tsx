import React, { useState } from 'react';
import { Plus, Users, Building2, UserCheck, UserX } from 'lucide-react';
import { Contact, ContactFormData } from '../../types';
import { ContactListItem } from '../Common/ContactListItem';
import { ContactForm } from '../Common/ContactForm';

interface AdminDashboardProps {
  contacts: Contact[];
  onAddContact: (data: ContactFormData) => Promise<void>;
  onUpdateContact: (id: string, data: ContactFormData) => Promise<void>;
  onDeleteContact: (id: string) => Promise<void>;
  loading: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  contacts,
  onAddContact,
  onUpdateContact,
  onDeleteContact,
  loading
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kontak ini?')) {
      await onDeleteContact(id);
    }
  };

  const handleFormSubmit = async (data: ContactFormData) => {
    if (editingContact) {
      await onUpdateContact(editingContact.id, data);
    } else {
      await onAddContact(data);
    }
    setShowForm(false);
    setEditingContact(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingContact(undefined);
  };

  const stats = {
    total: contacts.length,
    active: contacts.filter(c => c.isActive).length,
    inactive: contacts.filter(c => !c.isActive).length,
    organizations: new Set(contacts.map(c => c.organization)).size
  };

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingContact ? 'Edit Kontak' : 'Tambah Kontak Baru'}
          </h2>
          <p className="text-gray-600">
            {editingContact ? 'Perbarui informasi kontak' : 'Masukkan data kontak baru'}
          </p>
        </div>
        
        <div className="bg-slate-50 rounded-lg shadow-md p-6">
          <ContactForm
            contact={editingContact}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            submitLabel={editingContact ? 'Perbarui' : 'Tambah Kontak'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel Admin</h2>
          <p className="text-gray-600">Kelola data kontak dan direktori</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Kontak</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Kontak</div>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Aktif</div>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
              <div className="text-sm text-gray-600">Nonaktif</div>
            </div>
            <UserX className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.organizations}</div>
              <div className="text-sm text-gray-600">Organisasi</div>
            </div>
            <Building2 className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari kontak..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contact List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Memuat kontak...</span>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kontak ditemukan</h3>
          <p className="text-gray-500">
            {contacts.length === 0 
              ? 'Belum ada kontak yang tersimpan.' 
              : 'Coba ubah kata kunci pencarian.'}
          </p>
        </div>
      ) : (
        <ul className="bg-white dark:bg-blue-800 divide-y divide-gray-200 dark:divide-blue-700 rounded-md shadow">
          {filteredContacts.map(contact => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};