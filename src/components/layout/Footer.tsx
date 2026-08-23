import { Link } from 'react-router-dom';
import Logo from '@/components/brand/Logo';
import { BRAND, SOCIAL_PROFILES, copyrightLine } from '@/lib/brand';
import { PRODUCT_FAMILIES } from '@/data/families';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Batteries, electric bikes and &mdash; soon &mdash; solar and inverters. Engineered for
              Pakistan.
            </p>

            <ul className="flex items-center gap-2 mt-2">
              {SOCIAL_PROFILES.map((profile) => {
                const Icon = SOCIAL_ICONS[profile.id];
                return (
                  <li key={profile.id}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${BRAND.name} on ${profile.label}`}
                      title={profile.label}
                      className="w-11 h-11 -ml-2.5 first:ml-0 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background transition-colors cursor-pointer"
                    >
                      <Icon size={20} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-4 text-sm uppercase tracking-widest">Products</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
              {PRODUCT_FAMILIES.map((family) =>
                family.status === 'live' ? (
                  <li key={family.id}>
                    <Link to={family.path} className="hover:text-foreground transition-colors">
                      {family.label}
                    </Link>
                  </li>
                ) : (
                  <li key={family.id} className="text-muted-foreground/60">
                    {family.label} &mdash; soon
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-4 text-sm uppercase tracking-widest">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link to="/become-dealer" className="hover:text-foreground transition-colors">Become a Dealer</Link></li>
              <li><Link to="/calculator" className="hover:text-foreground transition-colors">Energy Calculator</Link></li>
              <li><Link to="/mobile-app" className="hover:text-foreground transition-colors">Mobile App</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-4 text-sm uppercase tracking-widest">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-foreground transition-colors">{BRAND.email}</a></li>
              <li><a href={`tel:${BRAND.phoneE164}`} className="hover:text-foreground transition-colors">{BRAND.phoneDisplay}</a></li>
              <li>{BRAND.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {copyrightLine(currentYear)}
          </p>
          <p className="text-sm text-muted-foreground">
            Engineered in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
