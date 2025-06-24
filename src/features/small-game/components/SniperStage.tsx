import {
  useEffect,
  useRef,
  type MouseEvent,
  useState,
} from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useGameConfig } from '../context/GameConfigContext';
import { type Target } from '../types';
import Crosshair from './Crosshair';

interface Props {
  targets: Target[];
  onHit: (id: string, rt: number) => void;
  onMiss: () => void;
  disabled?: boolean;
}

const BG_MAP: Record<'night' | 'day' | 'jungle', string> = {
  night: '/assets/citynight.png',
  day: '/assets/cityday.png',
  jungle: '/assets/jungle.jpg',
};

export default function SniperStage({
  targets,
  onHit,
  onMiss,
  disabled,
}: Props) {
  const { theme } = useGameConfig();
  const bgUrl = BG_MAP[theme];

  const stageRef = useRef<HTMLDivElement | null>(null);
  const crossRef = useRef<HTMLDivElement | null>(null);

  /* zoom spring */
  const [zoom, setZoom] = useState(1);
  const spring = useSpring({ transform: `scale(${zoom})`, config: { tension: 260, friction: 28 }});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'z') setZoom((z) => (z === 1 ? 1.5 : 1));
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) setZoom(1.5);
      if (e.deltaY > 0) setZoom(1);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  /* crosshair follow */
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || !crossRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    crossRef.current.style.transform = `translate(${e.clientX - rect.left - 16}px, ${
      e.clientY - rect.top - 16
    }px)`;
  };

  /* click hit-test */
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    for (const t of targets) {
      if (Math.hypot(x - t.x, y - t.y) <= t.radius + 2) {
        onHit(t.id, performance.now() - t.spawnAt);
        return;
      }
    }
    onMiss();
  };

  return (
    <animated.div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="position-relative overflow-hidden user-select-none"
      style={{
        ...spring,
        width: '100%',
        height: '60vh',
        borderRadius: 12,                        
        background: `url("${bgUrl}") center/cover no-repeat`,
        cursor: 'none',
        transformOrigin: '50% 50%',
      }}
    >
      {/* just continue */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.65) 60%)',
        }}
      />

      {/* targets */}
      {targets.map((t) => (
        <div
          key={t.id}
          style={{
            position: 'absolute',
            left: t.x - t.radius,
            top: t.y - t.radius,
            width: t.radius * 2,
            height: t.radius * 2,
            borderRadius: '50%',
            border: '2px solid #39ff14',
            boxShadow: '0 0 8px 2px #39ff14',
            pointerEvents: 'none',
          }}
        />
      ))}

      <Crosshair ref={crossRef} />
    </animated.div>
  );
}
