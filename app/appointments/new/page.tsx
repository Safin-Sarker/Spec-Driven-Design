import { getAllTherapies, getAllStaffMembers } from '@/db/queries';
import BookingForm from './BookingForm';

export default function NewAppointmentPage() {
  const therapies = getAllTherapies();
  const staffMembers = getAllStaffMembers();

  return (
    <div>
      <h1>Book an appointment</h1>
      <p className="text-muted" style={{ marginTop: '0.25rem', marginBottom: '1.5rem' }}>
        Choose a therapy, a qualified staff member, and a time that works for you.
      </p>
      <BookingForm therapies={therapies} staffMembers={staffMembers} agentId="agent-1" />
    </div>
  );
}
