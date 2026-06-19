import { LuCheck, LuPlus } from 'react-icons/lu';
import type { Product } from '../../types/product';
import { useComparisonStore } from '../../store/useComparisonStore';
import { cn } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const selected = useComparisonStore((s) => s.selectedIds.includes(product.id));
  const isFull = useComparisonStore((s) => s.selectedIds.length >= 3);
  const toggle = useComparisonStore((s) => s.toggle);

  const disabled = isFull && !selected;

  return (
    <button
      type="button"
      onClick={() => toggle(product.id)}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        'group relative flex w-full flex-col rounded-2xl border p-4 text-left transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        selected
          ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500 dark:border-indigo-400 dark:bg-indigo-950/40 dark:ring-indigo-400'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700',
        disabled && 'cursor-not-allowed opacity-50 hover:shadow-none'
      )}
    >
      <span
        className={cn(
          'absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border transition',
          selected
            ? 'border-indigo-500 bg-indigo-500 text-white dark:border-indigo-400 dark:bg-indigo-400'
            : 'border-slate-300 bg-transparent text-transparent group-hover:border-slate-400 dark:border-slate-600'
        )}
      >
        {selected ? <LuCheck className="h-4 w-4" /> : <LuPlus className="h-4 w-4 text-slate-400" />}
      </span>

      <span className="text-3xl" aria-hidden>
        {product.emoji}
      </span>

      <span className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {product.brand}
      </span>
      <span className="text-base font-semibold leading-tight text-slate-900 dark:text-slate-50">
        {product.name}
      </span>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
          ${product.price.toLocaleString('en-US')}
        </span>
        <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
          {product.rating.toFixed(1)} ★
        </span>
      </div>
    </button>
  );
}
