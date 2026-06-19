import { LuGitCompareArrows } from 'react-icons/lu';
import { ThemeToggle } from '../ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20">
            <LuGitCompareArrows className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold tracking-tight sm:text-lg">
              Mahsulot Taqqoslash
            </h1>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              3 tagacha mahsulotni yonma-yon solishtiring
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
