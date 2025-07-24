/* global primitives shared by the small-game feature */

export type Level  = 'easy' | 'medium' | 'hard';
export type Theme  = 'night' | 'day' | 'jungle';          

export interface GameConfig {
  level: Level;
  theme: Theme;                                           
  targetCount: 30 | 60 | 90;
  sfxVolume: number; // 0 – 1
}

/* runtime */
export interface Target {
  id: string;
  x: number;
  y: number;
  radius: number;
  spawnAt: number;
}

export interface AnalyticsSnapshot {
  spawned: number;
  hits: number;
  reactionTimes: number[];
}
