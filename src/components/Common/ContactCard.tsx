import React from 'react';
import { MessageCircle, Send, Building2, FileText, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import { Contact } from '../../types';
import { generateWhatsAppLink, generateTelegramLink, formatPhoneNumber } from '../../utils/messaging';

interface ContactCardProps {
  contact: Contact;
  showActions?: boolean;
  onEdit?: (contact: Contact) => void;
  onDelete?: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  showActions = false, 
  onEdit, 
  onDelete 
}) => {
  const handleWhatsAppClick = () => {
    window.open(generateWhatsAppLink(contact.whatsapp), '_blank');
  };

  const handleTelegramClick = () => {
    window.open(generateTelegramLink(contact.telegramId), '_blank');
  };

  return (
    <div className="bg-white dark:bg-blue-900 border border-gray-200 dark:border-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">{contact.organization}</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                contact.isActive
                  ? 'bg-green-100 dark:bg-green-700 dark:text-white text-green-800'
                  : 'bg-red-100 dark:bg-red-700 dark:text-white text-red-800'
              }`}>
                {contact.isActive ? (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Aktif</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <XCircle className="h-3 w-3" />
                    <span>Nonaktif</span>
                  </div>
                )}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{contact.name}</h3>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{formatPhoneNumber(contact.whatsapp)}</span>
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Send className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">@{contact.telegramId.replace('@', '')}</span>
            </div>
            <button
              onClick={handleTelegramClick}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors"
            >
              Telegram
            </button>
          </div>
        </div>

        {contact.notes && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-800 mb-1">Catatan:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{contact.notes}</p>
              </div>
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex space-x-2 pt-4 border-t border-gray-100">
            <button
              onClick={() => onEdit?.(contact)}
              className="flex items-center justify-center space-x-1 flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-3 w-3" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete?.(contact.id)}
              className="flex items-center justify-center space-x-1 flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Hapus</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};