import { useParams, useNavigate } from 'react-router-dom';
import { Package, Clock, User, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { usePackages } from '../context/PackageContext';
import { format } from 'date-fns';

export function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: { packages } } = usePackages();
  
  const packageDetails = packages.find(pkg => pkg.id === id);

  if (!packageDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900">Package Not Found</h2>
          <p className="mt-2 text-gray-600">The requested package could not be found.</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Package className="w-6 h-6 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              Package Details
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Tracking Number</p>
                  <p className="mt-1 text-sm text-gray-900">{packageDetails.trackingNumber}</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Recipient</p>
                  <p className="mt-1 text-sm text-gray-900">{packageDetails.recipientName}</p>
                  <p className="text-sm text-gray-500">{packageDetails.recipientType}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-sm text-gray-900">{packageDetails.recipientEmail}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Check-In Date</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(packageDetails.checkInDate, 'PPp')}
                  </p>
                </div>
              </div>

              {packageDetails.pickUpDate && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Pick-Up Date</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {format(packageDetails.pickUpDate, 'PPp')}
                    </p>
                  </div>
                </div>
              )}

              {packageDetails.location && (
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="mt-1 text-sm text-gray-900">{packageDetails.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <div className="ml-8 mt-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    packageDetails.status === 'picked-up'
                      ? 'bg-green-100 text-green-800'
                      : packageDetails.status === 'overdue'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {packageDetails.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}