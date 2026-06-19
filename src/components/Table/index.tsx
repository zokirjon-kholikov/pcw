import { useMemo } from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { LuCheck, LuTrash2, LuX } from 'react-icons/lu';
import type { Product, SpecRow } from '../../types/product';
import { PRODUCTS, SPEC_ROWS } from '../../data/products';
import { useComparisonStore } from '../../store/useComparisonStore';
import { winnersByRow } from '../../lib/compare';
import { cn } from '../../lib/utils';
import { EmptyState } from '../Empty';

function rowHasDiff(spec: SpecRow, products: Product[]): boolean {
  if (products.length < 2) return false;
  const values = products.map((p) => spec.accessor(p));
  return new Set(values).size > 1;
}

export function ComparisonTable() {
  const selectedIds = useComparisonStore((s) => s.selectedIds);
  const remove = useComparisonStore((s) => s.remove);
  const clear = useComparisonStore((s) => s.clear);

  const selectedProducts = useMemo(
    () =>
      selectedIds
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [selectedIds]
  );

  const winners = useMemo(
    () => winnersByRow(SPEC_ROWS, selectedProducts),
    [selectedProducts]
  );

  const columns = useMemo<ColumnDef<SpecRow>[]>(() => {
    const labelColumn: ColumnDef<SpecRow> = {
      id: 'label',
      header: () => <span className="sr-only">Xususiyat</span>,
      cell: ({ row }) => (
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {row.original.label}
        </span>
      ),
    };

    const productColumns: ColumnDef<SpecRow>[] = selectedProducts.map((product) => ({
      id: product.id,
      header: () => (
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-2xl leading-none" aria-hidden>
              {product.emoji}
            </div>
            <div className="mt-1.5 truncate text-sm font-bold text-slate-900 dark:text-slate-50">
              {product.name}
            </div>
            <div className="truncate text-xs text-slate-400 dark:text-slate-500">
              {product.brand}
            </div>
          </div>
          <button
            type="button"
            onClick={() => remove(product.id)}
            aria-label={`${product.name}ni taqqoslashdan olib tashlash`}
            title="Olib tashlash"
            className="shrink-0 rounded-lg p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          >
            <LuX className="h-4 w-4" />
          </button>
        </div>
      ),
      cell: ({ row }) => {
        const isBest = winners[row.original.key]?.has(product.id);
        return (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-sm font-semibold',
              isBest
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                : 'text-slate-800 dark:text-slate-100'
            )}
          >
            {isBest && <LuCheck className="h-3.5 w-3.5 shrink-0" />}
            {row.original.format(product)}
          </span>
        );
      },
    }));

    return [labelColumn, ...productColumns];
  }, [selectedProducts, remove, winners]);

  const table = useReactTable({
    data: SPEC_ROWS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (selectedProducts.length === 0) {
    return <EmptyState />;
  }

  return (
    <section aria-labelledby="compare-heading" className="animate-fade-in">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="compare-heading" className="text-lg font-semibold tracking-tight">
          Taqqoslash
        </h2>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
        >
          <LuTrash2 className="h-3.5 w-3.5" />
          Hammasini tozalash
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full border-collapse text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-200 dark:border-slate-800">
                {headerGroup.headers.map((header, i) => (
                  <th
                    key={header.id}
                    className={cn(
                      'p-4 align-top',
                      i === 0
                        ? 'sticky left-0 z-10 min-w-[140px] bg-white dark:bg-slate-900'
                        : 'min-w-[150px]'
                    )}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const diff = rowHasDiff(row.original, selectedProducts);
              return (
                <tr
                  key={row.id}
                  className={cn(
                    'border-b border-slate-100 transition-colors last:border-0 dark:border-slate-800/60',
                    diff
                      ? 'bg-amber-50/70 dark:bg-amber-400/[0.06]'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  )}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'p-4',
                        i === 0 &&
                          cn(
                            'sticky left-0 z-10',
                            diff ? 'bg-amber-50/70 dark:bg-amber-400/[0.06]' : 'bg-white dark:bg-slate-900'
                          )
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {i === 0 && diff && (
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                            title="Qiymatlar farq qiladi"
                            aria-hidden
                          />
                        )}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-col gap-1.5 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:gap-5">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
          Sariq qator — qiymatlar farq qiladi
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          Yashil — shu xususiyatdagi eng kuchli jihat
        </span>
      </div>
    </section>
  );
}
