import { useEffect, useRef } from 'react';

/* plays/pauses a track, volume is controlled by 2nd argument */
export function useBackgroundMusic(active: boolean, volume: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/background.mp3');
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;
    audio.volume = volume;

    if (active) {
      void audio.play().catch(() => {/* autoplay blocked; ignore */});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [active, volume]);
}
