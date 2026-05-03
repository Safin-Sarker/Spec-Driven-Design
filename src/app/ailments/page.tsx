import { getAllAilments } from '@/db/queries';

export default function AilmentsPage() {
  const ailments = getAllAilments();

  return (
    <div>
      <h1>Ailments</h1>
      <p className="text-muted" style={{ marginTop: '0.25rem' }}>
        Conditions we recognise and treat at AgentClinic.
      </p>

      <div className="page-section">
        {ailments.length === 0 ? (
          <p className="empty">No ailments found. Run the seed script to populate data.</p>
        ) : (
          <ul className="card-list">
            {ailments.map(a => (
              <li key={a.id} className="card">
                <h3>{a.name}</h3>
                <p className="text-muted">{a.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
