export const generateWhatsAppLink = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // Add country code if not present (assuming Indonesia +62)
  const formattedNumber = cleanNumber.startsWith('62') 
    ? cleanNumber 
    : cleanNumber.startsWith('0')
    ? '62' + cleanNumber.slice(1)
    : '62' + cleanNumber;
  
  return `https://wa.me/${formattedNumber}`;
};

export const generateTelegramLink = (telegramId: string): string => {
  // Remove @ if present
  const cleanId = telegramId.replace('@', '');
  return `https://t.me/${cleanId}`;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+62${cleaned.slice(1)}`;
  }
  return `+62${cleaned}`;
};