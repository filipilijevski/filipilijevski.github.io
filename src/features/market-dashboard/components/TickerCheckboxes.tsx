import { TICKER_PALETTE } from "../constants";

type Props = {
  selected: string[];
  toggle: (ticker: string) => void;
};

export default function TickerCheckboxes({ selected, toggle }: Props) {
  return (
    <div className="d-flex flex-wrap gap-3">
      {Object.keys(TICKER_PALETTE).map((tkr) => (
        <label key={tkr} className="form-check-label d-flex align-items-center gap-1">
          <input
            type="checkbox"
            checked={selected.includes(tkr)}
            onChange={() => toggle(tkr)}
            className="form-check-input"
          />
          <span
            style={{ width: 12, height: 12, background: TICKER_PALETTE[tkr] }}
            className="d-inline-block rounded-1"
          ></span>
          {tkr}
        </label>
      ))}
    </div>
  );
}
