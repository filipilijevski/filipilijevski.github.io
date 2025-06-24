interface Props {
  hits: number;
  clicks: number;
  totalTargets: number;
  onEndGame: () => void;
}

export default function HUD({ hits, clicks, totalTargets, onEndGame }: Props) {
  return (
    <div
      className="d-flex gap-4 align-items-center justify-content-center text-white"
      style={{
        position: 'absolute',        /* scoped to wrapper so it stays in view of game */
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <span className="fw-bold pointer-events-auto">
        Hits {hits}/{clicks}
      </span>
      <span className="fw-bold pointer-events-auto">
        Targets {totalTargets}
      </span>

      <button
        className="btn btn-sm btn-danger pointer-events-auto"
        onClick={onEndGame}
        style={{ pointerEvents: 'auto' }}
      >
        End Game
      </button>
    </div>
  );
}
