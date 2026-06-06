import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import ThemeToggle from '@/components/ui/ThemeToggle';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

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

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md py-3 border-b border-border'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
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
                'text-sm font-medium transition-colors hover:text-foreground',
                location.pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
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
                    location.pathname === link.href ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {link.name}
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
              ))}
              <WhatsAppButton variant="inline" className="w-full justify-center mt-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
