import { notFound } from 'next/navigation';
import { getStaffMember, getUpcomingAppointmentsForStaff, getAllAgents, getAllTherapies } from '@/db/queries';

export default async function StaffDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const staff = getStaffMember(id);
  if (!staff) notFound();

  const appointments = getUpcomingAppointmentsForStaff(id);
  const agents = getAllAgents();
  const therapies = getAllTherapies();

  const agentMap = new Map(agents.map(a => [a.id, a]));
  const therapyMap = new Map(therapies.map(t => [t.id, t]));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{staff.name}</h1>
          <p className="subtitle">{staff.role}</p>
        </div>
      </div>

      <div className="page-section">
        <h2>Upcoming appointments</h2>
        {appointments.length === 0 ? (
          <p className="empty">No upcoming appointments.</p>
        ) : (
          <ul className="card-list">
            {appointments.map(a => {
              const agent = agentMap.get(a.agentId);
              const therapy = therapyMap.get(a.therapyId);
              return (
                <li key={a.id} className="card">
                  <div className="card-header">
                    <strong>
                      {agent ? `${agent.firstName} ${agent.lastName}` : 'Unknown agent'}
                    </strong>
                    <span className={`badge badge-${a.status}`}>{a.status}</span>
                  </div>
                  <p className="text-muted">
                    {therapy?.name ?? 'Unknown therapy'} &middot; {a.durationMinutes} min
                  </p>
                  <p className="text-muted text-sm" style={{ marginTop: '0.25rem' }}>
                    {new Date(a.scheduledAt).toLocaleString('en-GB', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
