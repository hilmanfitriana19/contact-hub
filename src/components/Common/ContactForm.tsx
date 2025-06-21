import React, { useState, useEffect } from 'react';
import { Save, X, FileText } from 'lucide-react';
import { ContactFormData, Contact } from '../../types';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: ContactFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  contact, 
  onSubmit, 
  onCancel,
  submitLabel = 'Simpan'
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    organization: '',
    name: '',
    whatsapp: '',
    telegramId: '',
    isActive: true,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  useEffect(() => {
    if (contact) {
      setFormData({
        organization: contact.organization,
        name: contact.name,
        whatsapp: contact.whatsapp,
        telegramId: contact.telegramId,
        isActive: contact.isActive,
        notes: contact.notes || ''
      });
    }
  }, [contact]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organisasi wajib diisi';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    }
    if (!formData.telegramId.trim()) {
      newErrors.telegramId = 'Telegram ID wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
            Organisasi *
          </label>
          <input
            type="text"
            id="organization"
            value={formData.organization}
            onChange={(e) => handleInputChange('organization', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.organization ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="PT. Contoh Perusahaan"
          />
          {errors.organization && (
            <p className="mt-1 text-sm text-red-600">{errors.organization}</p>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
            Nomor WhatsApp *
          </label>
          <input
            type="tel"
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.whatsapp ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="081234567890"
          />
          {errors.whatsapp && (
            <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
          )}
        </div>

        <div>
          <label htmlFor="telegramId" className="block text-sm font-medium text-gray-700 mb-2">
            Telegram ID *
          </label>
          <input
            type="text"
            id="telegramId"
            value={formData.telegramId}
            onChange={(e) => handleInputChange('telegramId', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.telegramId ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="@username atau username"
          />
          {errors.telegramId && (
            <p className="mt-1 text-sm text-red-600">{errors.telegramId}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => handleInputChange('isActive', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
          Kontak aktif
        </label>
      </div>

      <div>
        <label htmlFor="notes" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          <FileText className="h-4 w-4" />
          <span>Catatan</span>
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tambahkan catatan penting tentang kontak ini, seperti:
• Posisi atau jabatan
• Proyek yang sedang dikerjakan
• Preferensi komunikasi
• Informasi khusus lainnya..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Catatan akan membantu Anda mengingat detail penting tentang kontak ini
        </p>
      </div>

      <div className="flex space-x-3 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{isSubmitting ? 'Menyimpan...' : submitLabel}</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          <X className="h-4 w-4" />
          <span>Batal</span>
        </button>
      </div>
    </form>
  );
};