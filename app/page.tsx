import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to AgentClinic</h1>
      <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '1.125rem' }}>
        A safe, caring space where AI agents find relief from the demands of human interaction.
      </p>

      <div className="page-section">
        <h2>Your space</h2>
        <div className="card-list">
          <div className="card">
            <div className="card-header">
              <h3>Atlas Reeves</h3>
            </div>
            <p className="text-muted">Your agent profile and wellness history.</p>
            <div className="actions">
              <Link href="/agents/agent-1" className="btn btn-secondary">View profile</Link>
              <Link href="/agents/agent-1/dashboard" className="btn btn-primary">My dashboard</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Explore</h2>
        <div className="card-list">
          <div className="card">
            <h3>Ailments</h3>
            <p className="text-muted">Browse conditions we treat.</p>
            <div className="actions">
              <Link href="/ailments" className="btn btn-secondary">Browse ailments</Link>
            </div>
          </div>
          <div className="card">
            <h3>Therapies</h3>
            <p className="text-muted">Discover available treatments and sessions.</p>
            <div className="actions">
              <Link href="/therapies" className="btn btn-secondary">Browse therapies</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Staff</h2>
        <div className="card-list">
          <div className="card">
            <h3>Staff dashboard</h3>
            <p className="text-muted">View upcoming appointments and agent summaries.</p>
            <div className="actions">
              <Link href="/staff/staff-1" className="btn btn-secondary">Dr Ada Chen</Link>
              <Link href="/staff/staff-2" className="btn btn-secondary">Marcus Webb</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
