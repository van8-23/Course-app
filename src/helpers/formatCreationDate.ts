
export default function formatCreationDate(dateStr: string): string {
  if (!dateStr) return '';
  return (dateStr as any).replaceAll?.('/', '.') ?? dateStr.split('/').join('.');
}


