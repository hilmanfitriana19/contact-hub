import React, { useState } from 'react';
import { Send, CheckCircle, FileText } from 'lucide-react';
import { ContactFormData } from '../../types';
import { ContactForm } from '../Common/ContactForm';

interface SubmissionFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (data: ContactFormData) => {
    await onSubmit(data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    // Reset form or navigate away if needed
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Send className="h-8 w-8 text-teal-600" />
          <h2 className="text-2xl font-bold text-gray-900">Tambah Kontak Baru</h2>
        </div>
        <p className="text-gray-600">
          Ajukan data kontak baru untuk ditambahkan ke dalam direktori
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              Kontak berhasil diajukan! Data akan ditinjau oleh admin.
            </span>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <ContactForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="Ajukan Kontak"
        />
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="font-medium text-blue-900 mb-2">Informasi Penting:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Pastikan semua data yang dimasukkan akurat dan terkini</li>
          <li>• Nomor WhatsApp harus aktif dan dapat dihubungi</li>
          <li>• Telegram ID dapat berupa username (dengan atau tanpa @)</li>
          <li>• Tambahkan catatan untuk informasi tambahan yang berguna</li>
          <li>• Data akan ditinjau oleh admin sebelum dipublikasikan</li>
        </ul>
      </div>

      {/* Notes Tips */}
      <div className="mt-4 p-4 bg-purple-50 rounded-md border-l-4 border-purple-500">
        <div className="flex items-start space-x-2">
          <FileText className="h-5 w-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-900 mb-1">Tips untuk Catatan:</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Jabatan atau posisi dalam organisasi</li>
              <li>• Bidang keahlian atau spesialisasi</li>
              <li>• Proyek yang sedang dikerjakan</li>
              <li>• Waktu terbaik untuk dihubungi</li>
              <li>• Informasi khusus yang perlu diingat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};