

export default function getCourseDuration(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) return '00:00 hour';

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(mins).padStart(2, '0');
  const label = hours === 1 ? 'hour' : 'hours';

  return `${hh}:${mm} ${label}`;
}