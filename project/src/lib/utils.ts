export function validateTrackingNumber(trackingNumber: string): boolean {
  // Basic validation for common carrier formats
  const patterns = {
    ups: /^1Z[A-Z0-9]{16}$/,
    fedex: /^(\d{12}|\d{14}|\d{15})$/,
    usps: /^(\d{20}|\d{26}|\d{30}|9\d{15,21})$/
  };

  return Object.values(patterns).some(pattern => pattern.test(trackingNumber));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}