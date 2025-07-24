type Props = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
};

export default function RangeSlider({ min, max, value, onChange }: Props) {
  const [from, to] = value;
  return (
    <div className="d-flex align-items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        value={from}
        onChange={(e) => onChange([+e.target.value, to])}
        className="flex-fill"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={to}
        onChange={(e) => onChange([from, +e.target.value])}
        className="flex-fill"
      />
    </div>
  );
}
