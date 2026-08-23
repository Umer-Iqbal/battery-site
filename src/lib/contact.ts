import { BRAND } from '@/lib/brand';

export const WHATSAPP_NUMBER = BRAND.phoneE164;
export const WHATSAPP_DISPLAY = BRAND.phoneDisplay;
export const WHATSAPP_URL = `https://wa.me/${BRAND.phoneE164.replace(/\D/g, '')}?text=${encodeURIComponent(
  `Hi ${BRAND.name}, I would like to inquire about your products.`
)}`;
