export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id: string;
  agentId: string;
  staffMemberId: string;
  therapyId: string;
  scheduledAt: string;
  durationMinutes: number;
  status: AppointmentStatus;
}
