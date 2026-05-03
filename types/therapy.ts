export interface Therapy {
  id: string;
  name: string;
  description: string;
  ailmentIds: string[];
  durationMinutes: number;
}
