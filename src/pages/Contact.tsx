import { motion } from 'framer-motion';
import { BRAND, SOCIAL_PROFILES } from '@/lib/brand';
import { WHATSAPP_URL } from '@/lib/contact';
import { Mail, Phone, MapPin, MessageCircle, Clock, Youtube, Instagram, Facebook, Linkedin } from 'lucide-react';

const SOCIAL_ICONS = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin, youtube: Youtube };

const SOCIAL_LINKS = SOCIAL_PROFILES.map((p) => ({ ...p, icon: SOCIAL_ICONS[p.id] }));

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have questions about our technology or need a custom energy solution?
            Our expert team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <ContactCard
            icon={<Phone className="text-primary" />}
            title="Call Us"
            value={BRAND.phoneDisplay}
            sub="Mon-Sat, 9am-6pm"
            href={`tel:${BRAND.phoneE164}`}
          />
          <ContactCard
            icon={<Mail className="text-accent" />}
            title="Email Us"
            value={BRAND.email}
            sub="Support & Sales"
            href={`mailto:${BRAND.email}`}
          />
          <ContactCard
            icon={<MapPin className="text-primary" />}
            title="Visit Us"
            value="Lahore, Pakistan"
            sub="Headquarters"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:min-h-[500px]">
          <div className="rounded-lg border border-border bg-background p-8 md:p-10 flex flex-col justify-between items-center text-center gap-8">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
              <MessageCircle size={40} className="text-accent" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-foreground">WhatsApp Support</h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Get instant technical support or pricing via WhatsApp.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !bg-accent !text-accent-foreground"
              >
                Start Chat Now
              </a>
            </div>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 min-h-[300px] lg:min-h-0">
            <iframe
              title="Enersol location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108844.20173663717!2d74.19430588698884!3d31.48263523547372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc9026bf99e578171!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactCard({
  icon,
  title,
  value,
  sub,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-muted-foreground text-xs font-medium uppercase tracking-widest mb-2">{title}</h3>
      <div className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{value}</div>
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Clock size={14} /> {sub}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="card-interactive p-8 group block">
        {content}
      </a>
    );
  }

  return <div className="card-interactive p-8 group">{content}</div>;
}
