export type PackageStatus = 'checked-in' | 'picked-up' | 'overdue';
export type RecipientType = 'student-on-campus' | 'student-off-campus' | 'faculty';

export interface Package {
  id: string;
  trackingNumber: string;
  recipientName: string;
  recipientId: string;
  recipientType: RecipientType;
  recipientEmail: string;
  status: PackageStatus;
  checkInDate: Date;
  pickUpDate?: Date;
  location?: string;
}

export interface DailyStats {
  totalReceived: number;
  pendingPickups: number;
  delivered: number;
  overdue: number;
}