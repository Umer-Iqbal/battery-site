import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import ThemeToggle from '@/components/ui/ThemeToggle';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { useScrollLock } from '@/hooks/useScrollLock';

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Calculator', href: '/calculator' },
  { name: 'Mobile App', href: '/mobile-app' },
  { name: 'Dealer', href: '/become-dealer' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useScrollLock(isMobileMenuOpen);

  const isLinkActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md py-3 border-b border-border shadow-sm'
          : 'bg-background/20 backdrop-blur-sm py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm">NV</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            NexVolt
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-foreground relative py-1',
                isLinkActive(link.href) ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {link.name}
              {isLinkActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
          <ThemeToggle />
          <Link to="/contact" className="btn-primary !px-5 !py-2 text-xs">
            Get Quote
          </Link>
          <WhatsAppButton variant="navbar" />
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'text-base font-medium flex items-center justify-between py-2',
                    isLinkActive(link.href) ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {link.name}
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
              ))}
              <Link to="/contact" className="btn-primary w-full justify-center mt-2">
                Get Quote
              </Link>
              <WhatsAppButton variant="inline" className="w-full justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
