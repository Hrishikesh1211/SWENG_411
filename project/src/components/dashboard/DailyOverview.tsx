import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { usePackages } from '../../context/PackageContext';

export function DailyOverview() {
  const { state: { stats } } = usePackages();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        title="Total Packages Received"
        value={stats.totalReceived}
        icon={Package}
        variant="neutral"
      />
      <Card
        title="Pending Pick-ups"
        value={stats.pendingPickups}
        icon={Clock}
        variant="warning"
      />
      <Card
        title="Packages Delivered"
        value={stats.delivered}
        icon={CheckCircle}
        variant="success"
      />
      <Card
        title="Overdue Packages"
        value={stats.overdue}
        icon={AlertCircle}
        variant="danger"
      />
    </div>
  );
}