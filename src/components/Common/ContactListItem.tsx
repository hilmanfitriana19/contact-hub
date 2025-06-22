import React from 'react';
import { Contact } from '../../types';
import {
  generateWhatsAppLink,
  generateTelegramLink,
  formatPhoneNumber
} from '../../utils/messaging';

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
    <li className="flex justify-between items-start py-4">
      <div>
        <p className="font-medium text-gray-900">{contact.name}</p>
        <p className="text-sm text-gray-600">{contact.organization}</p>
        <p className="text-sm text-gray-700">
          {formatPhoneNumber(contact.whatsapp)} |
          @{contact.telegramId.replace('@', '')}
        </p>
        {contact.notes && (
          <p className="text-sm text-gray-500 mt-1">{contact.notes}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => window.open(generateWhatsAppLink(contact.whatsapp), '_blank')}
          className="px-2 py-1 bg-green-600 text-white text-xs rounded"
        >
          WA
        </button>
        <button
          onClick={() => window.open(generateTelegramLink(contact.telegramId), '_blank')}
          className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
        >
          TG
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
