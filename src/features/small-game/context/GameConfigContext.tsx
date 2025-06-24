import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  useEffect,
} from 'react';
import type { GameConfig, Level, Theme } from '../types';

const STORAGE_KEY = 'urban-sniper-config-v2'; // bump key because our structure changed

const defaultState: GameConfig = {
  level: 'easy',
  theme: 'night',
  targetCount: 30,
  sfxVolume: 0.75,
};

/* helpers */
function load(): GameConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GameConfig) : defaultState;
  } catch {
    return defaultState;
  }
}

/* context shape */
interface Ctx extends GameConfig {
  setLevel: (l: Level) => void;
  setTheme: (t: Theme) => void;
  setTargetCount: (c: 30 | 60 | 90) => void;
  setSfxVolume: (v: number) => void;
}

const GameConfigContext = createContext<Ctx | null>(null);

/* provider */
export function GameConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<GameConfig>(() => load());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value: Ctx = useMemo(
    () => ({
      ...config,
      setLevel:       (level)       => setConfig((c) => ({ ...c, level })),
      setTheme:       (theme)       => setConfig((c) => ({ ...c, theme })),
      setTargetCount: (targetCount) => setConfig((c) => ({ ...c, targetCount })),
      setSfxVolume:   (sfxVolume)   =>
        setConfig((c) => ({ ...c, sfxVolume: Math.min(1, Math.max(0, sfxVolume)) })),
    }),
    [config],
  );

  return (
    <GameConfigContext.Provider value={value}>
      {children}
    </GameConfigContext.Provider>
  );
}

export function useGameConfig() {
  const ctx = useContext(GameConfigContext);
  if (!ctx) throw new Error('useGameConfig must be inside provider');
  return ctx;
}
