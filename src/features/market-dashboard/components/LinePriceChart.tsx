import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { type StockDatum } from "../types";
import { TICKER_PALETTE } from "../constants";
import { useTranslation } from "react-i18next";
import * as d3 from "d3";
import { useMemo } from "react";

type Props = {
  data: StockDatum[];
  tickers: string[];
  metric: "close" | "volume";
  cardBg: string;
  cardText: string;
};

export default function LineMetricChart({
  data,
  tickers,
  metric,
  cardBg,
  cardText,
}: Props) {
  /* Pivot rows */
  const series = useMemo(() => {
    const map = new Map<string, Record<string, unknown>>();
    data.forEach((row) => {
      const key = row.date.toISOString();
      if (!map.has(key)) map.set(key, { date: row.date });
      (map.get(key) as any)[row.ticker] = row[metric];
    });
    return [...map.values()].sort(
      (a, b) => (a.date as Date).getTime() - (b.date as Date).getTime()
    );
  }, [data, metric]);

  /* Formatting */
  const { t, i18n } = useTranslation();
  const fmtDate = d3.timeFormat("%Y-%m");
  const fmtVal = (n: number) =>
    metric === "close"
      ? new Intl.NumberFormat(i18n.language, {
          style: "currency",
          currency: "CAD",
        }).format(n)
      : new Intl.NumberFormat(i18n.language).format(n);

  /* Render */
  return (
    <div className="card h-100 shadow-sm" style={{ background: cardBg, color: cardText }}>
      <div className="card-body">
        <h5 className="card-title fw-bold mb-3">
          {metric === "close" ? t("volumeTrend") : t("priceTrend")}
        </h5>

        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={series}
            margin={{ top: 40, right: 60, bottom: 45, left: 80 }} /* extra padding */
          >
            <XAxis
              dataKey="date"
              tickFormatter={(d) => fmtDate(new Date(d))}
              minTickGap={25}
            />
            <YAxis tickFormatter={fmtVal} />
            <Tooltip labelFormatter={(d) => fmtDate(new Date(d))} formatter={fmtVal} />
            <Legend />

            {tickers.map((tkr) => (
              <Line
                key={tkr}
                dataKey={tkr}
                name={tkr}
                stroke={TICKER_PALETTE[tkr]}
                strokeWidth={2}
                dot={false}
                connectNulls
                type="monotone"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
