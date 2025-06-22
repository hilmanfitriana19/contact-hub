import React from 'react';
import { Contact } from '../../types';
import {
  generateWhatsAppLink,
  generateTelegramLink,
  formatPhoneNumber
} from '../../utils/messaging';
import { WhatsAppLogo, TelegramLogo } from './MessagingIcons';

interface ContactListItemProps {
  contact: Contact;
  showActions?: boolean;
  onEdit?: (contact: Contact) => void;
  onDelete?: (id: string) => void;
}

export const ContactListItem: React.FC<ContactListItemProps> = ({
  contact,
  showActions = false,
  onEdit,
  onDelete
}) => {
  return (
    <li className="flex justify-between items-start py-4 px-4 sm:px-6 bg-white dark:bg-blue-900/80 rounded-md hover:bg-slate-100 dark:hover:bg-blue-700/70">
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{contact.organization}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {formatPhoneNumber(contact.whatsapp)} |
          @{contact.telegramId.replace('@', '')}
        </p>
        {contact.notes && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{contact.notes}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <span
          className={`flex items-center space-x-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            contact.isActive
              ? 'bg-green-50 text-green-700 dark:bg-green-700 dark:text-white'
              : 'bg-red-50 text-red-700 dark:bg-red-700 dark:text-white'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              contact.isActive ? 'bg-green-600' : 'bg-red-600'
            }`}
          ></span>
          <span>{contact.isActive ? 'Aktif' : 'Nonaktif'}</span>
        </span>
        <button
          onClick={() =>
            window.open(generateWhatsAppLink(contact.whatsapp), '_blank')
          }
          className="p-1 text-green-600 hover:opacity-80"
          aria-label="WhatsApp"
        >
          <WhatsAppLogo className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            window.open(generateTelegramLink(contact.telegramId), '_blank')
          }
          className="p-1 text-blue-600 hover:opacity-80"
          aria-label="Telegram"
        >
          <TelegramLogo className="w-5 h-5" />
        </button>
        {showActions && (
          <>
            <button
              onClick={() => onEdit?.(contact)}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(contact.id)}
              className="px-2 py-1 bg-red-600 text-white text-xs rounded"
            >
              Hapus
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default ContactListItem;
