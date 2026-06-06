import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export default function ContactStrip() {
  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          <a href="tel:+923001234567" className="flex flex-col md:flex-row items-center md:items-start gap-3 group">
            <Phone size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground mb-1">Phone</div>
              <div className="text-foreground font-medium group-hover:text-primary transition-colors">+92 (300) 123-4567</div>
            </div>
          </a>

          <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row items-center md:items-start gap-3 group">
            <MessageCircle size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground mb-1">WhatsApp</div>
              <div className="text-foreground font-medium group-hover:text-primary transition-colors">Chat with us</div>
            </div>
          </a>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <Mail size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <a href="mailto:info@nexvolt.pk" className="text-foreground font-medium hover:text-primary transition-colors">info@nexvolt.pk</a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/contact" className="text-sm text-primary hover:underline font-medium">
            View full contact page →
          </Link>
        </div>
      </div>
    </section>
  );
}
