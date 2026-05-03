export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  agentId: string;
  staffMemberId: string;
  therapyId: string;
  scheduledAt: string;
  status: AppointmentStatus;
}
