import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SeoHead from './components/SeoHead';
import { routeSeo, defaultSeo } from './lib/seo-config';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const EnergyCalculator = lazy(() => import('./pages/EnergyCalculator'));
const MobileApp = lazy(() => import('./pages/MobileApp'));
const BecomeDealer = lazy(() => import('./pages/BecomeDealer'));
const Contact = lazy(() => import('./pages/Contact'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function RouteSeo() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/products/') && pathname !== '/products') return null;

  const meta = routeSeo[pathname] ?? {
    ...defaultSeo,
    path: pathname,
  };
  return <SeoHead meta={meta} />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <RouteSeo />
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/calculator" element={<EnergyCalculator />} />
        <Route path="/mobile-app" element={<MobileApp />} />
        <Route path="/become-dealer" element={<BecomeDealer />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <Navbar />
        <ErrorBoundary
          fallback={
            <div className="min-h-screen flex items-center justify-center px-6 text-center">
              <div>
                <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                <p className="text-muted-foreground mb-6">Please refresh the page to try again.</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-primary text-black font-bold rounded-full"
                >
                  Refresh
                </button>
              </div>
            </div>
          }
        >
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
