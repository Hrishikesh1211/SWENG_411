import { PackagePlus, PackageCheck, BarChart3 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link to="/check-in">
        <Button icon={PackagePlus} className="w-full">
          Start Package Check-In
        </Button>
      </Link>
      <Link to="/pick-up">
        <Button icon={PackageCheck} className="w-full">
          Start Package Pick-Up
        </Button>
      </Link>
      <Link to="/reports">
        <Button icon={BarChart3} className="w-full">
          View Reports
        </Button>
      </Link>
    </div>
  );
}