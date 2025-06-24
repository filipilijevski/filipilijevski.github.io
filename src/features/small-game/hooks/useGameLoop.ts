import { useCallback, useState } from 'react';
import { type Level } from '../types';
import { useTargets } from './useTargets';

interface Opts {
  level: Level;
  targetCount: number;
  stageSize: { width: number; height: number };
  onFinish: () => void;          // invoked only by End-Game button, no automatic finish for now
}

export function useGameLoop({
  level,
  targetCount,
  stageSize,
  onFinish,
}: Opts) {
  const [spawned, setSpawned] = useState(0);
  const [playing, setPlaying] = useState(false);

  const quotaReached = spawned >= targetCount;

  /* stable onSpawn so useTargets effect doesn’t reset prematurely */
  const onSpawn = useCallback(() => setSpawned((s) => s + 1), []);

  const { targets, removeTarget } = useTargets({
    sessionActive: playing,
    allowSpawn: !quotaReached,
    level,
    stageSize,
    onSpawn,                       // stable reference
  });

  /* public API */
  const start = useCallback(() => {
    setSpawned(0);
    setPlaying(true);
  }, []);

  const finish = useCallback(() => {
    if (!playing) return;
    setPlaying(false);
    onFinish();
  }, [playing, onFinish]);

  const registerHit = useCallback(
    (id: string) => {
      removeTarget(id);
    },
    [removeTarget],
  );

  return { playing, start, finish, targets, registerHit };
}
