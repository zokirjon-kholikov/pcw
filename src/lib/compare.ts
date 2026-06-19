import type { Product, SpecRow } from '../types/product';

export function winnersFor(spec: SpecRow, products: Product[]): Set<string> {
  const empty = new Set<string>();
  if (!spec.rank || products.length < 2) return empty;

  const entries = products.map((p) => ({ id: p.id, value: spec.rank!.value(p) }));
  if (entries.some((e) => e.value === null)) return empty;

  const units = new Set(entries.map((e) => e.value!.unit));
  if (units.size > 1) return empty;

  const nums = entries.map((e) => e.value!.num);
  const best = spec.rank.better === 'higher' ? Math.max(...nums) : Math.min(...nums);
  if (nums.every((n) => n === best)) return empty;

  return new Set(entries.filter((e) => e.value!.num === best).map((e) => e.id));
}

export function winnersByRow(
  rows: SpecRow[],
  products: Product[]
): Record<string, Set<string>> {
  const map: Record<string, Set<string>> = {};
  for (const row of rows) {
    map[row.key] = winnersFor(row, products);
  }
  return map;
}
