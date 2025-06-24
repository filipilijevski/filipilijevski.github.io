import { useCallback, useMemo, useState } from 'react';

const HISTORY_KEY = 'urban-sniper-history-v1';

export interface AnalyticsData {
  spawned: number;      // total targets that appeared
  clicks: number;       // every mouse click (hit or miss)
  hits: number;         // successful clicks
  reactionTimes: number[];
}

export function useAnalytics(totalTargets: number) {
  const [clicks, setClicks] = useState(0);
  const [hits, setHits] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  /* recorders  */
  const recordClick = useCallback((wasHit: boolean, rt?: number) => {
    setClicks((c) => c + 1);
    if (wasHit) {
      setHits((h) => h + 1);
      if (typeof rt === 'number')
        setReactionTimes((arr) => [...arr, rt]);
    }
  }, []);

  const reset = useCallback(() => {
    setClicks(0);
    setHits(0);
    setReactionTimes([]);
  }, []);

  /*  snapshot & persistence */
  const data: AnalyticsData = useMemo(
    () => ({ spawned: totalTargets, clicks, hits, reactionTimes }),
    [totalTargets, clicks, hits, reactionTimes],
  );

  const persist = useCallback(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const history = raw ? (JSON.parse(raw) as unknown[]) : [];
      history.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-20)));
    } catch {
      /* ignore private-mode issues for now*/
    }
  }, [data]);

  return { data, recordClick, reset, persist };
}
