import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-black text-sm">NV</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">NexVolt</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Premium LiFePO4 batteries engineered for Pakistan&apos;s energy future.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-4 text-sm uppercase tracking-widest">Products</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Residential" className="hover:text-foreground transition-colors">Residential</Link></li>
              <li><Link to="/products?category=Commercial" className="hover:text-foreground transition-colors">Commercial</Link></li>
              <li><Link to="/products?category=Portable" className="hover:text-foreground transition-colors">Portable</Link></li>
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
              <li><a href="mailto:info@nexvolt.pk" className="hover:text-foreground transition-colors">info@nexvolt.pk</a></li>
              <li><a href="tel:+923001234567" className="hover:text-foreground transition-colors">+92 (300) 123-4567</a></li>
              <li>Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} NexVolt Technology Ltd. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Engineered in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
