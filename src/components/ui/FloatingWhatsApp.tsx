import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/contact';

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center justify-center w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg shadow-accent/30 hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle size={24} />
    </a>
  );
}
