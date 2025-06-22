import React, { useState } from 'react';
import { Search, Filter, Users, FileText } from 'lucide-react';
import { Contact } from '../../types';
import { ContactListItem } from '../Common/ContactListItem';

interface ContactListProps {
  contacts: Contact[];
  loading: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({ contacts, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [showNotesOnly, setShowNotesOnly] = useState(false);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.notes && contact.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filterActive === 'all' ||
      (filterActive === 'active' && contact.isActive) ||
      (filterActive === 'inactive' && !contact.isActive);

    const matchesNotes = !showNotesOnly || (contact.notes && contact.notes.trim().length > 0);

    return matchesSearch && matchesFilter && matchesNotes;
  });

  const contactsWithNotes = contacts.filter(c => c.notes && c.notes.trim().length > 0).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Memuat kontak...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Users className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Direktori Kontak</h2>
        </div>
        <p className="text-gray-600">
          Temukan dan hubungi rekan kerja dengan mudah
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, organisasi, atau catatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showNotesOnly"
            checked={showNotesOnly}
            onChange={(e) => setShowNotesOnly(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="showNotesOnly" className="flex items-center space-x-1 text-sm text-gray-700">
            <FileText className="h-4 w-4" />
            <span>Ada Catatan</span>
          </label>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{contacts.length}</div>
          <div className="text-sm text-blue-700">Total Kontak</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {contacts.filter(c => c.isActive).length}
          </div>
          <div className="text-sm text-green-700">Kontak Aktif</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-600">
            {contacts.filter(c => !c.isActive).length}
          </div>
          <div className="text-sm text-gray-700">Kontak Nonaktif</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{contactsWithNotes}</div>
          <div className="text-sm text-purple-700">Ada Catatan</div>
        </div>
      </div>

      {/* Contact List */}
      {filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kontak ditemukan</h3>
          <p className="text-gray-500">
            {contacts.length === 0
              ? 'Belum ada kontak yang tersimpan.'
              : 'Coba ubah kata kunci pencarian atau filter.'}
          </p>
        </div>
      ) : (
        <ul className="bg-white divide-y divide-gray-200 rounded-md shadow">
          {filteredContacts.map(contact => (
            <ContactListItem key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </div>
  );
};