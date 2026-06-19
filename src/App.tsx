import { Header } from './components/Header';
import { ProductGrid } from './components/Products';
import { ComparisonTable } from './components/Table';

export default function App() {
  return (
    <div className='min-h-dvh'>
      <Header />
      <main className='mx-auto max-w-6xl space-y-10 px-4 py-6 sm:px-6 sm:py-8'>
        <ProductGrid />
        <ComparisonTable />
      </main>
      <footer className='border-t border-slate-200/70 py-6 text-center text-xs text-slate-400 dark:border-slate-800/70 dark:text-slate-600'>
        Product Comparison Widget · React + TypeScript + TailwindCSS + TanStack
        Table + Zustand
      </footer>
    </div>
  );
}
