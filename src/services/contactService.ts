import { Contact, ContactFormData } from '../types';

// URL web app (Apps Script atau layanan sejenis) untuk mengakses Google Spreadsheet
const BASE_URL = import.meta.env.VITE_SPREADSHEET_URL as string;

const parseContacts = (rows: Record<string, unknown>[]): Contact[] =>
  rows.map(row => {
    const r = row as Record<string, unknown> & {
      createdAt: string;
      updatedAt: string;
    };
    return {
      ...(r as Omit<Contact, 'createdAt' | 'updatedAt'>),
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt)
    } as Contact;
  });

const request = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Network request failed');
  }
  return res.json();
};

export const contactService = {
  // Mendapatkan seluruh kontak
  async getAllContacts(): Promise<Contact[]> {
    try {
      const data = await request(`${BASE_URL}?action=get`);
      const contacts = Array.isArray(data) ? data : data.contacts;
      return parseContacts(contacts).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  },

  // Subscribe menggunakan polling berkala
  subscribeToContacts(callback: (contacts: Contact[]) => void) {
    let cancelled = false;
    const fetchData = async () => {
      const contacts = await this.getAllContacts();
      if (!cancelled) callback(contacts);
    };
    fetchData();
    const id = setInterval(fetchData, 5000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  },

  // Menambahkan kontak baru
  async addContact(contactData: ContactFormData): Promise<string> {
    try {
      const response = await request(`${BASE_URL}?action=add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      return response.id as string;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  },

  // Memperbarui kontak
  async updateContact(id: string, contactData: Partial<ContactFormData>): Promise<void> {
    try {
      await request(`${BASE_URL}?action=update&id=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  // Menghapus kontak
  async deleteContact(id: string): Promise<void> {
    try {
      await request(`${BASE_URL}?action=delete&id=${id}`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
};