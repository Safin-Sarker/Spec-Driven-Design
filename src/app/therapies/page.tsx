import { getAllTherapies, getAllAilments } from '@/db/queries';

export default function TherapiesPage() {
  const therapies = getAllTherapies();
  const allAilments = getAllAilments();
  const ailmentMap = new Map(allAilments.map(a => [a.id, a]));

  return (
    <div>
      <h1>Therapies</h1>
      <p className="text-muted" style={{ marginTop: '0.25rem' }}>
        Available treatments and sessions offered at AgentClinic.
      </p>

      <div className="page-section">
        {therapies.length === 0 ? (
          <p className="empty">No therapies found. Run the seed script to populate data.</p>
        ) : (
          <ul className="card-list">
            {therapies.map(t => (
              <li key={t.id} className="card">
                <div className="card-header">
                  <h3>{t.name}</h3>
                  <span className="text-muted text-sm">{t.durationMinutes} min</span>
                </div>
                <p className="text-muted">{t.description}</p>
                {t.ailmentIds.length > 0 && (
                  <div className="tag-list">
                    {t.ailmentIds.map(aid => {
                      const ailment = ailmentMap.get(aid);
                      return ailment ? (
                        <span key={aid} className="tag">{ailment.name}</span>
                      ) : null;
                    })}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
