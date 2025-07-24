export type StockDatum = {
  date: Date;
  ticker: "AAPL" | "MSFT" | "NVDA";
  close: number;
  volume: number;
};
