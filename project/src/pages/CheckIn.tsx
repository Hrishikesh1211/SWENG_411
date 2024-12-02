import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackagePlus } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { validateTrackingNumber, generateId } from '../lib/utils';
import { usePackages } from '../context/PackageContext';
import type { Package, RecipientType } from '../types';

const recipientTypes = [
  { value: 'student-on-campus', label: 'Student (On-Campus)' },
  { value: 'student-off-campus', label: 'Student (Off-Campus)' },
  { value: 'faculty', label: 'Faculty' },
];

export function CheckIn() {
  const navigate = useNavigate();
  const { dispatch } = usePackages();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    trackingNumber: '',
    recipientId: '',
    recipientName: '',
    recipientEmail: '',
    recipientType: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateTrackingNumber(formData.trackingNumber)) {
      newErrors.trackingNumber = 'Invalid tracking number format';
    }
    if (!formData.recipientId) {
      newErrors.recipientId = 'Required';
    }
    if (!formData.recipientName) {
      newErrors.recipientName = 'Required';
    }
    if (!formData.recipientEmail) {
      newErrors.recipientEmail = 'Required';
    }
    if (!formData.recipientType) {
      newErrors.recipientType = 'Required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newPackage: Package = {
      id: generateId(),
      ...formData,
      recipientType: formData.recipientType as RecipientType,
      status: 'checked-in',
      checkInDate: new Date(),
    };

    dispatch({ type: 'ADD_PACKAGE', package: newPackage });
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <PackagePlus className="w-6 h-6 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              Package Check-In
            </h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Tracking Number"
            value={formData.trackingNumber}
            onChange={e => setFormData(prev => ({ ...prev, trackingNumber: e.target.value }))}
            error={errors.trackingNumber}
            placeholder="Enter tracking number"
          />
          <Input
            label="Student/Faculty ID"
            value={formData.recipientId}
            onChange={e => setFormData(prev => ({ ...prev, recipientId: e.target.value }))}
            error={errors.recipientId}
            placeholder="Enter student or faculty ID"
          />
          <Input
            label="Recipient Name"
            value={formData.recipientName}
            onChange={e => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
            error={errors.recipientName}
            placeholder="Enter recipient name"
          />
          <Input
            label="Recipient Email"
            type="email"
            value={formData.recipientEmail}
            onChange={e => setFormData(prev => ({ ...prev, recipientEmail: e.target.value }))}
            error={errors.recipientEmail}
            placeholder="Enter recipient email"
          />
          <Select
            label="Recipient Type"
            value={formData.recipientType}
            onChange={e => setFormData(prev => ({ ...prev, recipientType: e.target.value }))}
            options={recipientTypes}
            error={errors.recipientType}
          />
          {formData.recipientType === 'faculty' && (
            <Input
              label="Office Location"
              value={formData.location}
              onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter office location"
            />
          )}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button type="submit">
              Check In Package
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}