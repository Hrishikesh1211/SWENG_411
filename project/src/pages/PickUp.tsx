import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageCheck, Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { usePackages } from '../context/PackageContext';

export function PickUp() {
  const navigate = useNavigate();
  const { state: { packages }, dispatch } = usePackages();
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState<typeof packages>([]);
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = packages.filter(pkg => 
      pkg.status === 'checked-in' && pkg.recipientId === searchId
    );
    setSearchResults(results);
  };

  const handlePickUp = () => {
    dispatch({ 
      type: 'PICKUP_PACKAGES', 
      packageIds: Array.from(selectedPackages) 
    });
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <PackageCheck className="w-6 h-6 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              Package Pick-Up
            </h1>
          </div>
        </div>
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <Input
              label="Student/Faculty ID"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              placeholder="Scan or enter ID"
              className="flex-1"
            />
            <Button
              type="submit"
              className="mt-6"
              icon={Search}
            >
              Search
            </Button>
          </form>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tracking Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-In Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map(pkg => (
                      <tr key={pkg.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedPackages.has(pkg.id)}
                            onChange={e => {
                              const newSelected = new Set(selectedPackages);
                              if (e.target.checked) {
                                newSelected.add(pkg.id);
                              } else {
                                newSelected.delete(pkg.id);
                              }
                              setSelectedPackages(newSelected);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {pkg.trackingNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pkg.checkInDate.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {pkg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePickUp}
                  disabled={selectedPackages.size === 0}
                >
                  Confirm Pick-Up
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchId ? 'No packages found for this ID.' : 'Please scan or enter an ID to search.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}