import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { type Level, type Target } from '../types';
import { LEVEL_SETTINGS } from '../constants';

interface Params {
  sessionActive: boolean;
  allowSpawn: boolean;
  level: Level;
  stageSize: { width: number; height: number };
  onSpawn: () => void;         // stable reference (see useGameLoop for more info)
}

export function useTargets({
  sessionActive,
  allowSpawn,
  level,
  stageSize,
  onSpawn,
}: Params) {
  const [targets, setTargets] = useState<Target[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!sessionActive) {
      setTargets([]);
      return;
    }

    const { radius, interval } = LEVEL_SETTINGS[level];

    const spawn = () => {
      if (!allowSpawn) return;

      const x = radius + Math.random() * (stageSize.width - radius * 2);
      const y = radius + Math.random() * (stageSize.height - radius * 2);

      const t: Target = {
        id: uuid(),
        x,
        y,
        radius,
        spawnAt: performance.now(),
      };

      setTargets([t]);
      onSpawn();

      /* despawn if player misses */
      window.setTimeout(() => {
        setTargets((prev) => prev.filter((p) => p.id !== t.id));
      }, interval);

      /* schedule next target */
      timerRef.current = window.setTimeout(spawn, interval);
    };

    spawn();
    return () => { if (timerRef.current !== null) clearTimeout(timerRef.current); };
  }, [sessionActive, allowSpawn, level, stageSize, onSpawn]);

  const removeTarget = (id: string) =>
    setTargets((prev) => prev.filter((t) => t.id !== id));

  return { targets, removeTarget };
}
