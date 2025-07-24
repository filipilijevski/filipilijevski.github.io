import { useMemo } from "react";
import * as d3 from "d3";

import aaplCsv from "../data/aapl.csv?raw";
import msftCsv from "../data/msft.csv?raw";
import nvdaCsv from "../data/nvda.csv?raw";
import { type StockDatum } from "../types";

/* ------------------------------------------------------------------ */
/* Helper types                                                        */
/* ------------------------------------------------------------------ */

type Ticker = "AAPL" | "MSFT" | "NVDA";

/**
 * We’ll parse with the *default* d3.csvParse signature (string => DSVRowArray<DSVRowString>)
 * and then coerce values into this strongly-typed model.
 */
interface CsvRowLoose {
  [key: string]: string | undefined;
}

/* ------------------------------------------------------------------ */
/* Parsing helpers                                                     */
/* ------------------------------------------------------------------ */

/**
 * Convert one loosely-typed CSV row into a StockDatum.
 * We cast field names explicitly, avoiding d3’s generic constraints.
 */
const rowToDatum =
  (ticker: Ticker) =>
  (row: CsvRowLoose): StockDatum => ({
    date:   new Date(row["Date"] as string),
    ticker,
    close:  Number(row["Close"]),
    volume: Number(row["Volume"]),
  });

/** Parse a CSV file (provided as raw string) synchronously */
const parseCsvFile = (csvText: string, ticker: Ticker): StockDatum[] => {
  const rows = d3.csvParse(csvText); // returns DSVRowArray<DSVRowString>
  return rows.map(rowToDatum(ticker));
};

/* ------------------------------------------------------------------ */
/* React Hook                                                          */
/* ------------------------------------------------------------------ */

export default function useStockData(): StockDatum[] {
  return useMemo<StockDatum[]>(() => {
    return [
      ...parseCsvFile(aaplCsv, "AAPL"),
      ...parseCsvFile(msftCsv, "MSFT"),
      ...parseCsvFile(nvdaCsv, "NVDA"),
    ];
  }, []);
}
