import { Moon, Leaf, Flame, Sprout, Droplet } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const modes = [
    { value: 'dark' as const, icon: Moon, label: 'Moon' },
    { value: 'leaf' as const, icon: Droplet, label: 'Water' },
    { value: 'water' as const, icon: Leaf, label: 'Leaf' },
    { value: 'orange' as const, icon: Flame, label: 'Fire' },
  ];

  return (
    <div className="flex items-center gap-1 bg-white/5 dark:bg-white/5 water:bg-white/10 leaf:bg-white/10 orange:bg-orange-950/30 p-1 rounded-lg border border-white/10 dark:border-white/10 water:border-white/20 leaf:border-white/20 orange:border-orange-500/20">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = theme === mode.value;
        
        return (
          <button
            key={mode.value}
            onClick={() => setTheme(mode.value)}
            className={`p-2 rounded-md transition-all ${
              isActive
                ? mode.value === 'orange'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : mode.value === 'leaf'
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                  : mode.value === 'water'
                  ? 'bg-lime-500 text-black shadow-lg shadow-lime-500/30'
                  : 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-gray-400 dark:text-gray-400 water:text-gray-500 leaf:text-gray-500 orange:text-orange-300 hover:text-white dark:hover:text-white water:hover:text-gray-300 leaf:hover:text-gray-300 orange:hover:text-orange-100 hover:bg-white/5 dark:hover:bg-white/5 water:hover:bg-white/10 leaf:hover:bg-white/10 orange:hover:bg-orange-500/20'
            }`}
            aria-label={`Switch to ${mode.label} mode`}
            title={mode.label}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}