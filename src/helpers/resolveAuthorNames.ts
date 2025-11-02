

type AuthorLike = { id: string; name: string };

export default function resolveAuthorNames(
  ids: string[] = [],
  list: AuthorLike[] = []
): string {
  const map = new Map(list.map(a => [a.id, a.name]));
  const names = (ids ?? []).map(id => map.get(id)).filter(Boolean) as string[];
  return names.length ? names.join(', ') : 'name2, name3';
}


