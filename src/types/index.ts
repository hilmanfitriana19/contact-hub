export interface Contact {
  id: string;
  organization: string;
  name: string;
  whatsapp: string;
  telegramId: string;
  isActive: boolean;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  organization: string;
  name: string;
  whatsapp: string;
  telegramId: string;
  isActive: boolean;
  notes: string;
}

export interface AppState {
  isAdmin: boolean;
  contacts: Contact[];
  loading: boolean;
  currentView: 'public' | 'admin' | 'submit';
}