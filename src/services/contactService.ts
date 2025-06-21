import { Contact, ContactFormData } from '../types';

// Key atau URL spreadsheet diambil dari environment
const STORAGE_KEY =
  (import.meta.env.VITE_SPREADSHEET_URL as string) || 'contacts_spreadsheet';

const loadContacts = (): Contact[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const parsed = JSON.parse(data) as Contact[];
    return parsed.map(c => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt)
    }));
  } catch {
    return [];
  }
};

const saveContacts = (contacts: Contact[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  window.dispatchEvent(new Event('contacts-changed'));
};

export const contactService = {
  // Get all contacts
  async getAllContacts(): Promise<Contact[]> {
    try {
      const contacts = loadContacts();
      return contacts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  },

  // Subscribe to real-time updates
  subscribeToContacts(callback: (contacts: Contact[]) => void) {
    const handler = () => {
      const contacts = loadContacts().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      callback(contacts);
    };
    window.addEventListener('contacts-changed', handler);
    window.addEventListener('storage', handler);
    // initial call
    handler();
    return () => {
      window.removeEventListener('contacts-changed', handler);
      window.removeEventListener('storage', handler);
    };
  },

  // Add new contact
  async addContact(contactData: ContactFormData): Promise<string> {
    try {
      const contacts = loadContacts();
      const id = crypto.randomUUID();
      const now = new Date();
      contacts.push({
        id,
        ...contactData,
        createdAt: now,
        updatedAt: now
      });
      saveContacts(contacts);
      return id;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  },

  // Update contact
  async updateContact(id: string, contactData: Partial<ContactFormData>): Promise<void> {
    try {
      const contacts = loadContacts();
      const index = contacts.findIndex(c => c.id === id);
      if (index !== -1) {
        contacts[index] = {
          ...contacts[index],
          ...contactData,
          updatedAt: new Date()
        };
        saveContacts(contacts);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  // Delete contact
  async deleteContact(id: string): Promise<void> {
    try {
      let contacts = loadContacts();
      contacts = contacts.filter(c => c.id !== id);
      saveContacts(contacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
};