import { Select } from '../ui/Select';

const timeRanges = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'custom', label: 'Custom Range' },
];

const statusFilters = [
  { value: 'all', label: 'All Status' },
  { value: 'checked-in', label: 'Checked In' },
  { value: 'picked-up', label: 'Picked Up' },
  { value: 'overdue', label: 'Overdue' },
];

interface ReportFiltersProps {
  timeRange: string;
  status: string;
  startDate: string;
  endDate: string;
  onTimeRangeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export function ReportFilters({
  timeRange,
  status,
  startDate,
  endDate,
  onTimeRangeChange,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
}: ReportFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Select
        label="Time Range"
        value={timeRange}
        onChange={(e) => onTimeRangeChange(e.target.value)}
        options={timeRanges}
      />
      <Select
        label="Status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        options={statusFilters}
      />
      {timeRange === 'custom' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </>
      )}
    </div>
  );
}