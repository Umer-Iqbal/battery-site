import { MessageCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/contact';

interface WhatsAppButtonProps {
  variant?: 'navbar' | 'hero' | 'inline';
  className?: string;
}

export default function WhatsAppButton({ variant = 'navbar', className }: WhatsAppButtonProps) {
  if (variant === 'hero') {
    return (
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'min-w-[200px] px-8 py-3.5 border border-accent/50 text-foreground font-medium rounded-sm',
          'hover:bg-accent/10 transition-colors text-sm tracking-wide flex flex-col items-center gap-0.5',
          className
        )}
      >
        <span className="flex items-center gap-2">
          <MessageCircle size={16} className="text-accent" />
          WhatsApp Us
        </span>
        <span className="text-xs text-muted-foreground">{WHATSAPP_DISPLAY}</span>
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-medium rounded-sm hover:opacity-90 transition-opacity text-sm',
          className
        )}
      >
        <MessageCircle size={16} />
        {WHATSAPP_DISPLAY}
      </a>
    );
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-sm hover:opacity-90 transition-opacity',
        className
      )}
    >
      <MessageCircle size={16} />
      <span className="hidden xl:inline">{WHATSAPP_DISPLAY}</span>
      <span className="xl:hidden">WhatsApp</span>
    </a>
  );
}
