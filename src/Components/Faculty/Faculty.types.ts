export interface Faculty {
  id: string;
  firstName: string;
  lastName?: string;
  subject: string;
  email?: string;
  mobile: string;
  gender?: string;
  dateOfBirth?: string;
  availability: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  days: string;
  startTime: string;
  endTime: string;
}
