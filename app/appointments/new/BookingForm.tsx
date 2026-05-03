'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Therapy, StaffMember } from '@/types';

interface Props {
  therapies: Therapy[];
  staffMembers: StaffMember[];
  agentId: string;
}

export default function BookingForm({ therapies, staffMembers, agentId }: Props) {
  const router = useRouter();
  const [selectedTherapyId, setSelectedTherapyId] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const eligibleStaff = selectedTherapyId
    ? staffMembers.filter(s => s.therapyIds.includes(selectedTherapyId))
    : [];

  const today = new Date().toISOString().split('T')[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const body = {
      agentId,
      therapyId: data.get('therapyId'),
      staffMemberId: data.get('staffMemberId'),
      date: data.get('date'),
      time: data.get('time'),
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const json = await res.json() as { error?: string };
        setError(json.error ?? 'Booking failed. Please try again.');
        setSubmitting(false);
        return;
      }

      router.push(`/agents/${agentId}/dashboard`);
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label htmlFor="therapyId">Therapy</label>
        <select
          id="therapyId"
          name="therapyId"
          required
          value={selectedTherapyId}
          onChange={e => setSelectedTherapyId(e.target.value)}
        >
          <option value="">Select a therapy…</option>
          {therapies.map(t => (
            <option key={t.id} value={t.id}>
              {t.name} ({t.durationMinutes} min)
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="staffMemberId">Staff member</label>
        <select
          id="staffMemberId"
          name="staffMemberId"
          required
          disabled={!selectedTherapyId}
        >
          <option value="">
            {selectedTherapyId ? 'Select a staff member…' : 'Choose a therapy first'}
          </option>
          {eligibleStaff.map(s => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.role}
            </option>
          ))}
        </select>
        {selectedTherapyId && eligibleStaff.length === 0 && (
          <p className="form-hint">No staff available for this therapy.</p>
        )}
      </div>

      <div className="form-field-row">
        <div className="form-field">
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" required min={today} />
        </div>
        <div className="form-field">
          <label htmlFor="time">Time</label>
          <input id="time" name="time" type="time" required />
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Booking…' : 'Book appointment'}
        </button>
      </div>
    </form>
  );
}
