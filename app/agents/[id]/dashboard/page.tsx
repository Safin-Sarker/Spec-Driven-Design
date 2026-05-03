import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAgent, getAppointmentsForAgent, getAllTherapies, getAllStaffMembers } from '@/db/queries';
import type { Appointment } from '@/types';

export default async function AgentDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = getAgent(id);
  if (!agent) notFound();

  const appointments = getAppointmentsForAgent(id);
  const therapies = getAllTherapies();
  const staffMembers = getAllStaffMembers();

  const therapyMap = new Map(therapies.map(t => [t.id, t]));
  const staffMap = new Map(staffMembers.map(s => [s.id, s]));

  const now = new Date().toISOString();
  const upcoming = appointments.filter(
    a => a.scheduledAt > now && (a.status === 'pending' || a.status === 'confirmed')
  );
  const inProgress = appointments.filter(
    a => a.status === 'confirmed' && a.scheduledAt <= now
  );
  const history = appointments.filter(a =>
    (a.status as string) === 'completed' ||
    (a.status as string) === 'cancelled' ||
    (a.status as string) === 'no-show'
  );

  function ApptCard({ a }: { a: Appointment }) {
    const therapy = therapyMap.get(a.therapyId);
    const staff = staffMap.get(a.staffMemberId);
    return (
      <li className="card">
        <div className="card-header">
          <strong>{therapy?.name ?? 'Unknown therapy'}</strong>
          <span className={`badge badge-${a.status}`}>{a.status}</span>
        </div>
        <p className="text-muted">{staff?.name ?? 'Unknown staff'} &middot; {a.durationMinutes} min</p>
        <p className="text-muted text-sm" style={{ marginTop: '0.25rem' }}>
          {new Date(a.scheduledAt).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>
      </li>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">{agent.firstName} {agent.lastName}</p>
        </div>
        <div className="actions">
          <Link href={`/agents/${id}`} className="btn btn-secondary">View profile</Link>
          <Link href="/appointments/new" className="btn btn-primary">Book appointment</Link>
        </div>
      </div>

      <div className="page-section">
        <h2>Upcoming</h2>
        {upcoming.length === 0
          ? <p className="empty">No upcoming appointments.</p>
          : <ul className="card-list">{upcoming.map(a => <ApptCard key={a.id} a={a} />)}</ul>
        }
      </div>

      <div className="page-section">
        <h2>In progress</h2>
        {inProgress.length === 0
          ? <p className="empty">No appointments currently in progress.</p>
          : <ul className="card-list">{inProgress.map(a => <ApptCard key={a.id} a={a} />)}</ul>
        }
      </div>

      <div className="page-section">
        <h2>History</h2>
        {history.length === 0
          ? <p className="empty">No past appointments.</p>
          : <ul className="card-list">{history.map(a => <ApptCard key={a.id} a={a} />)}</ul>
        }
      </div>
    </div>
  );
}
