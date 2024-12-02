import { useState } from 'react';
import { BarChart3, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ReportFilters } from '../components/reports/ReportFilters';
import { ReportTable } from '../components/reports/ReportTable';
import { usePackages } from '../context/PackageContext';
import { Package } from '../types';
import { startOfToday, startOfWeek, startOfMonth, isWithinInterval } from 'date-fns';

export function Reports() {
  const [timeRange, setTimeRange] = useState('week');
  const [status, setStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { state: { packages } } = usePackages();

  const getFilteredPackages = (): Package[] => {
    let filteredPackages = [...packages];
    
    // Apply status filter
    if (status !== 'all') {
      filteredPackages = filteredPackages.filter(pkg => pkg.status === status);
    }

    // Apply date filter
    const now = new Date();
    let startDateTime: Date;
    let endDateTime = now;

    switch (timeRange) {
      case 'today':
        startDateTime = startOfToday();
        break;
      case 'week':
        startDateTime = startOfWeek(now);
        break;
      case 'month':
        startDateTime = startOfMonth(now);
        break;
      case 'custom':
        if (startDate && endDate) {
          startDateTime = new Date(startDate);
          endDateTime = new Date(endDate);
        } else {
          return [];
        }
        break;
      default:
        startDateTime = startOfWeek(now);
    }

    return filteredPackages.filter(pkg =>
      isWithinInterval(pkg.checkInDate, { start: startDateTime, end: endDateTime })
    );
  };

  const handleExport = () => {
    const filteredData = getFilteredPackages();
    const csvContent = [
      ['Date', 'Tracking Number', 'Recipient', 'Type', 'Status'].join(','),
      ...filteredData.map(pkg => [
        pkg.checkInDate.toLocaleDateString(),
        pkg.trackingNumber,
        pkg.recipientName,
        pkg.recipientType,
        pkg.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `package-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">
                Package Reports
              </h1>
            </div>
            <Button
              onClick={handleExport}
              icon={Download}
              variant="outline"
            >
              Export Report
            </Button>
          </div>
        </div>

        <div className="p-6">
          <ReportFilters
            timeRange={timeRange}
            status={status}
            startDate={startDate}
            endDate={endDate}
            onTimeRangeChange={setTimeRange}
            onStatusChange={setStatus}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          <ReportTable packages={getFilteredPackages()} />
        </div>
      </div>
    </div>
  );
}