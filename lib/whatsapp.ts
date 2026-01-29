import { CONTACT_INFO } from './constants';

export function getWhatsAppLink(message: string): string {
  const phoneNumber = CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function openWhatsApp(message: string): void {
  const link = getWhatsAppLink(message);
  window.open(link, '_blank', 'noopener,noreferrer');
}
