import { useState } from "react";
import * as d3 from "d3";
import { type StockDatum } from "../types";

type Props = {
  addRows: (rows: StockDatum[], ticker: string) => void;
};

export default function AddTickerForm({ addRows }: Props) {
  const [symbol, setSymbol] = useState("");

  const fetchTicker = async (e: React.FormEvent) => {
    e.preventDefault();
    const tkr = symbol.trim().toUpperCase();
    if (!tkr) return;

    try {
      const period1 = Math.floor(new Date("2000-01-01").getTime() / 1000);
      const period2 = Math.floor(Date.now() / 1000);
      const url = `https://query1.finance.yahoo.com/v7/finance/download/${tkr}?interval=1mo&period1=${period1}&period2=${period2}&events=history&includeAdjustedClose=true`;

      const csv = await fetch(url).then((res) => {
        if (!res.ok) throw new Error("Ticker not found");
        return res.text();
      });

      const rows = d3.csvParse(csv).map((r) => ({
        date: new Date(r.Date as string),
        ticker: tkr as any,
        close: Number(r["Adj Close"] ?? r.Close),
        volume: Number(r.Volume),
      })) as StockDatum[];

      addRows(rows, tkr);
      setSymbol("");
    } catch (err) {
      alert("Unable to fetch ticker. Please check the symbol and try again.");
    }
  };

  return (
    <form className="d-flex gap-2" onSubmit={fetchTicker}>
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="form-control"
        placeholder="Add ticker (e.g., TSLA)"
      />
      <button className="btn btn-primary">Add</button>
    </form>
  );
}
