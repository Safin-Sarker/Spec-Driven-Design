import db from './client';
import type { Agent, Ailment, Therapy, StaffMember, Appointment } from '@/types';

type TherapyRow = Omit<Therapy, 'ailmentIds'> & { ailmentIds: string };
type StaffMemberRow = Omit<StaffMember, 'therapyIds'> & { therapyIds: string };

function parseTherapy(row: TherapyRow): Therapy {
  return { ...row, ailmentIds: JSON.parse(row.ailmentIds) as string[] };
}

function parseStaff(row: StaffMemberRow): StaffMember {
  return { ...row, therapyIds: JSON.parse(row.therapyIds) as string[] };
}

export function getAgent(id: string): Agent | null {
  return (db.prepare('SELECT * FROM agents WHERE id = ?').get(id) as Agent | undefined) ?? null;
}

export function getAllAgents(): Agent[] {
  return db.prepare('SELECT * FROM agents ORDER BY firstName, lastName').all() as Agent[];
}

export function getAllAilments(): Ailment[] {
  return db.prepare('SELECT * FROM ailments ORDER BY name').all() as Ailment[];
}

export function getAilmentsByIds(ids: string[]): Ailment[] {
  if (ids.length === 0) return [];
  const placeholders = ids.map(() => '?').join(', ');
  return db.prepare(`SELECT * FROM ailments WHERE id IN (${placeholders})`).all(...ids) as Ailment[];
}

export function getAllTherapies(): Therapy[] {
  return (db.prepare('SELECT * FROM therapies ORDER BY name').all() as TherapyRow[]).map(parseTherapy);
}

export function getTherapy(id: string): Therapy | null {
  const row = db.prepare('SELECT * FROM therapies WHERE id = ?').get(id) as TherapyRow | undefined;
  return row ? parseTherapy(row) : null;
}

export function getAllStaffMembers(): StaffMember[] {
  return (db.prepare('SELECT * FROM staff_members ORDER BY name').all() as StaffMemberRow[]).map(parseStaff);
}

export function getStaffMember(id: string): StaffMember | null {
  const row = db.prepare('SELECT * FROM staff_members WHERE id = ?').get(id) as StaffMemberRow | undefined;
  return row ? parseStaff(row) : null;
}

export function getAppointmentsForAgent(agentId: string): Appointment[] {
  return db.prepare(
    'SELECT * FROM appointments WHERE agentId = ? ORDER BY scheduledAt'
  ).all(agentId) as Appointment[];
}

export function getUpcomingAppointmentsForStaff(staffMemberId: string): Appointment[] {
  const now = new Date().toISOString();
  return db.prepare(
    `SELECT * FROM appointments
     WHERE staffMemberId = ?
       AND scheduledAt > ?
       AND status IN ('pending', 'confirmed')
     ORDER BY scheduledAt ASC`
  ).all(staffMemberId, now) as Appointment[];
}

export function insertAppointment(appt: Appointment): void {
  db.prepare(
    `INSERT INTO appointments
     (id, agentId, staffMemberId, therapyId, scheduledAt, durationMinutes, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    appt.id, appt.agentId, appt.staffMemberId, appt.therapyId,
    appt.scheduledAt, appt.durationMinutes, appt.status
  );
}
