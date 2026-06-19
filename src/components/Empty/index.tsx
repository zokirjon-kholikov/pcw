import { LuMousePointerClick } from 'react-icons/lu';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <LuMousePointerClick className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-800 dark:text-slate-100">
        Hali hech narsa tanlanmagan
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        Yuqoridagi katalogdan 2 yoki 3 ta mahsulot tanlang — ular shu yerda
        jadval ko‘rinishida yonma-yon ko‘rsatiladi.
      </p>
    </div>
  );
}
