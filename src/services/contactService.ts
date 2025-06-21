import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Contact, ContactFormData } from '../types';

const COLLECTION_NAME = 'contacts';

export const contactService = {
  // Get all contacts
  async getAllContacts(): Promise<Contact[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Contact[];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  },

  // Subscribe to real-time updates
  subscribeToContacts(callback: (contacts: Contact[]) => void) {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (querySnapshot) => {
      const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Contact[];
      
      callback(contacts);
    });
  },

  // Add new contact
  async addContact(contactData: ContactFormData): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...contactData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  },

  // Update contact
  async updateContact(id: string, contactData: Partial<ContactFormData>): Promise<void> {
    try {
      const contactRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(contactRef, {
        ...contactData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  // Delete contact
  async deleteContact(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
};