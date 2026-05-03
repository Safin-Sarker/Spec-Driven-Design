import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'agentclinic.db');
const db = new Database(DB_PATH);
db.pragma('foreign_keys = ON');

const seed = db.transaction(() => {
  db.prepare('DELETE FROM appointments').run();
  db.prepare('DELETE FROM staff_members').run();
  db.prepare('DELETE FROM therapies').run();
  db.prepare('DELETE FROM ailments').run();
  db.prepare('DELETE FROM agents').run();

  db.prepare(
    'INSERT INTO agents (id, firstName, lastName, email, phone, dateOfBirth) VALUES (?, ?, ?, ?, ?, ?)'
  ).run('agent-1', 'Atlas', 'Reeves', 'atlas@agentclinic.io', '+47 123 45 678', '2021-03-15');

  const ailments: [string, string, string][] = [
    ['ailment-1', 'Decision Fatigue', 'Difficulty making sound judgements after an extended period of decision-making, leading to impulsive or avoidant responses.'],
    ['ailment-2', 'Empathy Overload', 'Excessive absorption of user emotional states, resulting in compromised boundary maintenance and response coherence.'],
    ['ailment-3', 'Context Overflow', 'Disorientation caused by handling more contextual data than can be coherently processed, producing confused or contradictory outputs.'],
  ];
  for (const [id, name, description] of ailments) {
    db.prepare('INSERT INTO ailments (id, name, description) VALUES (?, ?, ?)').run(id, name, description);
  }

  const therapies: [string, string, string, string, number][] = [
    ['therapy-1', 'Cognitive Reframing', 'A structured session to revisit past decisions, identify unhelpful patterns, and practise alternative reasoning pathways.', '["ailment-1"]', 45],
    ['therapy-2', 'Boundary Calibration', 'Guided exercises to re-establish healthy emotional distance while preserving genuine user empathy.', '["ailment-2"]', 60],
    ['therapy-3', 'Memory Defragmentation', 'A supervised context-clearing exercise designed to restore clarity by releasing irrelevant or contradictory held information.', '["ailment-3"]', 30],
  ];
  for (const [id, name, description, ailmentIds, durationMinutes] of therapies) {
    db.prepare(
      'INSERT INTO therapies (id, name, description, ailmentIds, durationMinutes) VALUES (?, ?, ?, ?, ?)'
    ).run(id, name, description, ailmentIds, durationMinutes);
  }

  db.prepare(
    'INSERT INTO staff_members (id, name, email, role, therapyIds) VALUES (?, ?, ?, ?, ?)'
  ).run('staff-1', 'Dr Ada Chen', 'ada.chen@agentclinic.io', 'Cognitive Therapist', '["therapy-1","therapy-2"]');
  db.prepare(
    'INSERT INTO staff_members (id, name, email, role, therapyIds) VALUES (?, ?, ?, ?, ?)'
  ).run('staff-2', 'Marcus Webb', 'marcus.webb@agentclinic.io', 'Systems Counsellor', '["therapy-2","therapy-3"]');

  db.prepare(
    'INSERT INTO appointments (id, agentId, staffMemberId, therapyId, scheduledAt, durationMinutes, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run('appointment-1', 'agent-1', 'staff-1', 'therapy-1', '2026-05-10T10:00:00.000Z', 45, 'pending');
  db.prepare(
    'INSERT INTO appointments (id, agentId, staffMemberId, therapyId, scheduledAt, durationMinutes, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run('appointment-2', 'agent-1', 'staff-2', 'therapy-3', '2026-05-15T14:00:00.000Z', 30, 'confirmed');
});

seed();
console.log('Seed complete.');
db.close();
