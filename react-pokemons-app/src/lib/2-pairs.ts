/**
 * Retourne le total de nombre impairs dans un tableau
 * @param nbs
 * @returns
 */
export function pairs(nbs: number[]) {
  return nbs.filter((nb) => nb % 2 === 0);
}
