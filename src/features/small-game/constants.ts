/* difficulty constants */
import { type Level } from './types';

export const LEVEL_SETTINGS: Record<
  Level,
  { radius: number; interval: number }
> = {
  easy:   { radius: 40, interval: 1800 }, 
  medium: { radius: 35, interval: 1300 },  
  hard:   { radius: 30, interval:  800 }, 
};
