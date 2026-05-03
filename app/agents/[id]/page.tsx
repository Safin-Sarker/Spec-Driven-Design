import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAgent, getAppointmentsForAgent, getAllTherapies, getAllAilments } from '@/db/queries';

export default async function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = getAgent(id);
  if (!agent) notFound();

  const appointments = getAppointmentsForAgent(id);
  const allTherapies = getAllTherapies();
  const allAilments = getAllAilments();

  const therapyMap = new Map(allTherapies.map(t => [t.id, t]));
  const ailmentMap = new Map(allAilments.map(a => [a.id, a]));

  const therapyIds = [...new Set(appointments.map(a => a.therapyId))];
  const therapies = therapyIds.map(tid => therapyMap.get(tid)).filter(Boolean);

  const ailmentIds = [...new Set(therapies.flatMap(t => t!.ailmentIds))];
  const ailments = ailmentIds.map(aid => ailmentMap.get(aid)).filter(Boolean);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{agent.firstName} {agent.lastName}</h1>
          <p className="subtitle">Agent profile</p>
        </div>
        <div className="actions">
          <Link href={`/agents/${id}/dashboard`} className="btn btn-primary">My dashboard</Link>
          <Link href="/appointments/new" className="btn btn-secondary">Book appointment</Link>
        </div>
      </div>

      <div className="card">
        <dl className="dl">
          <dt>Email</dt>      <dd>{agent.email}</dd>
          <dt>Phone</dt>      <dd>{agent.phone}</dd>
          <dt>Date of birth</dt><dd>{agent.dateOfBirth}</dd>
        </dl>
      </div>

      <div className="page-section">
        <h2>Ailments</h2>
        {ailments.length === 0 ? (
          <p className="empty">No ailments recorded yet.</p>
        ) : (
          <ul className="card-list">
            {ailments.map(a => (
              <li key={a!.id} className="card">
                <strong>{a!.name}</strong>
                <p className="text-muted" style={{ marginTop: '0.25rem' }}>{a!.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="page-section">
        <h2>Therapies received</h2>
        {therapies.length === 0 ? (
          <p className="empty">No therapies received yet.</p>
        ) : (
          <ul className="card-list">
            {therapies.map(t => (
              <li key={t!.id} className="card">
                <div className="card-header">
                  <strong>{t!.name}</strong>
                  <span className="text-muted text-sm">{t!.durationMinutes} min</span>
                </div>
                <p className="text-muted">{t!.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
