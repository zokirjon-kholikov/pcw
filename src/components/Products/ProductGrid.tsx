import type { Category } from '../../types/product';
import { PRODUCTS } from '../../data/products';
import { MAX_COMPARE, useComparisonStore } from '../../store/useComparisonStore';
import { ProductCard } from './ProductCard';

const CATEGORY_ORDER: Category[] = ['Smartfon', 'Noutbuk'];

const CATEGORY_LABELS: Record<Category, string> = {
  Smartfon: 'Smartfonlar',
  Noutbuk: 'Noutbuklar',
};

export function ProductGrid() {
  const count = useComparisonStore((s) => s.selectedIds.length);

  return (
    <section aria-labelledby="catalog-heading" className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 id="catalog-heading" className="text-lg font-semibold tracking-tight">
            Mahsulotlar
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Taqqoslash uchun mahsulot tanlang
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {count} / {MAX_COMPARE} tanlandi
        </span>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const items = PRODUCTS.filter((p) => p.category === category);
        if (items.length === 0) return null;

        return (
          <div key={category} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {CATEGORY_LABELS[category]}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
