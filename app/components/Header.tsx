import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>AgentClinic</Link>
        <nav className={styles.nav}>
          <Link href="/ailments">Ailments</Link>
          <Link href="/therapies">Therapies</Link>
          <Link href="/appointments/new">Book</Link>
          <Link href="/agents/agent-1/dashboard">My Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
