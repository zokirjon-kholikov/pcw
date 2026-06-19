import { LuMoon, LuSun } from 'react-icons/lu';
import { useThemeStore } from '../../store/useThemeStore';
import { cn } from '../../lib/utils';

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={isDark ? 'Yorug‘ rejimga o‘tish' : 'Tungi rejimga o‘tish'}
      title={isDark ? 'Yorug‘ rejim' : 'Tungi rejim'}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full',
        'border border-slate-200 bg-white text-slate-700 shadow-sm transition',
        'hover:bg-slate-100 hover:text-slate-900',
        'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
      )}
    >
      <LuSun
        className={cn(
          'h-[18px] w-[18px] transition-all duration-300',
          isDark
            ? 'scale-0 -rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100',
        )}
      />
      <LuMoon
        className={cn(
          'absolute h-[18px] w-[18px] transition-all duration-300',
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 rotate-90 opacity-0',
        )}
      />
    </button>
  );
}
