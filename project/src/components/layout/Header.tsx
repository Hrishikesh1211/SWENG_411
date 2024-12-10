import { Package, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/dist/download.png" 
              alt="Penn State Logo" 
              className="h-10 w-auto mr-3"
            />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Live-On Mailing Services
            </h1>
          </div>
          {!isHome && (
            <Link to="/">
              <Button variant="outline" icon={Home}>
                Back to Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
