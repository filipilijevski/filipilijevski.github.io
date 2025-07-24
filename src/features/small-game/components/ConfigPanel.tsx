import { useGameConfig } from '../context/GameConfigContext';

export default function ConfigPanel() {
  const {
    level,
    theme,
    targetCount,
    sfxVolume,           // keep field name but repurpose for music volume instead of SFX
    setLevel,
    setTheme,
    setTargetCount,
    setSfxVolume,
  } = useGameConfig();

  return (
    <form className="border rounded p-3" style={{ maxWidth: 480, marginInline: 'auto' }}>
      <h5 className="fw-bold text-center mb-3">Game Settings</h5>

      {/* difficulty */}
      <label className="form-label d-block mb-1">Difficulty</label>
      <div className="d-flex gap-3 mb-3">
        {(['easy', 'medium', 'hard'] as const).map((lvl) => (
          <div key={lvl} className="form-check">
            <input
              id={`lvl-${lvl}`}
              className="form-check-input"
              type="radio"
              name="level"
              checked={level === lvl}
              onChange={() => setLevel(lvl)}
            />
            <label className="form-check-label text-capitalize" htmlFor={`lvl-${lvl}`}>
              {lvl}
            </label>
          </div>
        ))}
      </div>

      {/* theme */}
      <label className="form-label d-block mb-1">Stage theme</label>
      <div className="d-flex gap-3 mb-3">
        {([
          ['night', 'Night-city'],
          ['day', 'Day-city'],
          ['jungle', 'Jungle'],
        ] as const).map(([val, label]) => (
          <div key={val} className="form-check">
            <input
              id={`theme-${val}`}
              className="form-check-input"
              type="radio"
              name="theme"
              checked={theme === val}
              onChange={() => setTheme(val)}
            />
            <label className="form-check-label" htmlFor={`theme-${val}`}>
              {label}
            </label>
          </div>
        ))}
      </div>

      {/* session length */}
      <label className="form-label d-block mb-1">Session length</label>
      <div className="d-flex gap-3 mb-3">
        {[30, 60, 90].map((v) => (
          <div key={v} className="form-check">
            <input
              id={`len-${v}`}
              className="form-check-input"
              type="radio"
              name="length"
              checked={targetCount === v}
              onChange={() => setTargetCount(v as 30 | 60 | 90)}
            />
            <label className="form-check-label" htmlFor={`len-${v}`}>
              {v} targets
            </label>
          </div>
        ))}
      </div>

      {/* music volume */}
      <label htmlFor="music-range" className="form-label">
        Music volume ({Math.round(sfxVolume * 100)}%)
      </label>
      <input
        id="music-range"
        type="range"
        className="form-range"
        min="0"
        max="1"
        step="0.05"
        value={sfxVolume}
        onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
      />
    </form>
  );
}
