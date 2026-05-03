import { NextRequest, NextResponse } from 'next/server';
import { getTherapy, insertAppointment } from '@/db/queries';
import type { Appointment } from '@/types';

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    agentId?: string;
    therapyId?: string;
    staffMemberId?: string;
    date?: string;
    time?: string;
  };

  const { agentId, therapyId, staffMemberId, date, time } = body;

  if (!agentId || !therapyId || !staffMemberId || !date || !time) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const therapy = getTherapy(therapyId);
  if (!therapy) {
    return NextResponse.json({ error: 'Therapy not found.' }, { status: 400 });
  }

  const scheduledAt = new Date(`${date}T${time}:00`).toISOString();

  const appointment: Appointment = {
    id: crypto.randomUUID(),
    agentId,
    staffMemberId,
    therapyId,
    scheduledAt,
    durationMinutes: therapy.durationMinutes,
    status: 'pending',
  };

  insertAppointment(appointment);

  return NextResponse.json({ success: true });
}
