import { format } from 'date-fns';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { usePackages } from '../../context/PackageContext';

export function RecentActivity() {
  const { state: { packages } } = usePackages();
  const recentActivities = packages.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-4 divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.recipientName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(activity.checkInDate, 'PPp')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Tracking: {activity.trackingNumber}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'picked-up'
                      ? 'bg-green-100 text-green-800'
                      : activity.status === 'overdue'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status}
                  </span>
                  <Link to={`/package/${activity.id}`} className="ml-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="secondary" className="w-full">
            View More
          </Button>
        </div>
      </div>
    </div>
  );
}