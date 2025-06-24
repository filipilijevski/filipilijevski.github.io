import { useMemo, useState } from 'react';
import { useGameConfig } from './context/GameConfigContext';
import SniperStage from './components/SniperStage';
import HUD from './components/HUD';
import ResultsModal from './components/ResultsModal';
import { useGameLoop } from './hooks/useGameLoop';
import { useAnalytics } from './hooks/useAnalytics';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';

export default function GamePage() {
  const { level, targetCount, sfxVolume } = useGameConfig();
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');

  /* play music only while user is playing */
  useBackgroundMusic(phase === 'playing', sfxVolume);

  /* stable stage size */
  const stageSize = useMemo(
    () => ({ width: 1000, height: window.innerHeight * 0.6 }),
    [],
  );

  const analytics = useAnalytics(targetCount);
  const { start, finish, targets, registerHit } = useGameLoop({
    level,
    targetCount,
    stageSize,
    onFinish: () => {
      analytics.persist();
      setPhase('done');
    },
  });

  const begin = () => {
    analytics.reset();
    start();
    setPhase('playing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const endManually = () => finish();

  /* linear-gradient backgrounds */
  const playBg = {
    background:
      'linear-gradient(270deg,rgba(141, 65, 90, 1) 10%,rgba(54, 7, 92, 1) 90%)',
  };


  const setupBg = {
    background:
      'linear-gradient(270deg,rgba(141, 65, 90, 1) 10%,rgba(54, 7, 92, 1) 90%)',
  };

  if (phase === 'idle')
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-start"
        style={{
          ...setupBg,
          minHeight: '10vh',
          paddingTop: '6rem',
          paddingBottom: '6rem',
        }}
      >
        <h2 className="text-white mb-4">Click the Button Below to Start!</h2>
        <button className="btn btn-primary mb-5" onClick={begin}>
          Start Game
        </button>
      </div>
    );

  /* Results screen */
  if (phase === 'done')
    return (
      <div
        style={{ ...playBg, minHeight: '10vh' }}
        className="d-flex align-items-start justify-content-center pt-5"
      >
        <ResultsModal
          stats={analytics.data}
          onReplay={() => setPhase('idle')}
        />
      </div>
    );

  /* Playing screen */
  return (
    <div style={playBg} className="py-4 d-flex justify-content-center">
      <div
        style={{
          maxWidth: 1000,
          width: '100%',
          paddingInline: '1rem',
          position: 'relative',
        }}
      >
        <SniperStage
          targets={targets}
          onHit={(id, rt) => {
            registerHit(id);
            analytics.recordClick(true, rt);
          }}
          onMiss={() => analytics.recordClick(false)}
          disabled={false}
        />

        <HUD
          hits={analytics.data.hits}
          clicks={analytics.data.clicks}
          totalTargets={targetCount}
          onEndGame={endManually}
        />
      </div>
    </div>
  );
}
