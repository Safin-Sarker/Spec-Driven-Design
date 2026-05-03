CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  dateOfBirth TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ailments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS therapies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  ailmentIds TEXT NOT NULL DEFAULT '[]',
  durationMinutes INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS staff_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  therapyIds TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  agentId TEXT NOT NULL REFERENCES agents(id),
  staffMemberId TEXT NOT NULL REFERENCES staff_members(id),
  therapyId TEXT NOT NULL REFERENCES therapies(id),
  scheduledAt TEXT NOT NULL,
  durationMinutes INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);
