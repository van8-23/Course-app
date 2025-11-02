import type { Author } from '../constants';

export const getAuthorNames = (ids: string[], allAuthors: Author[]): string[] => {
  const map = new Map(allAuthors.map(a => [a.id, a.name]));
  return ids.map(id => map.get(id)).filter(Boolean) as string[];
};
export default getAuthorNames;

