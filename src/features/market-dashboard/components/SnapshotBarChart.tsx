import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { type StockDatum } from "../types";
import { TICKER_PALETTE } from "../constants";
import { useTranslation } from "react-i18next";

type Props = {
  data?: StockDatum[];
  tickers: string[];
  metric: "close" | "volume";
  cardBg: string;
  cardText: string;
};

export default function SnapshotBarChart({
  data = [],
  tickers,
  metric,
  cardBg,
  cardText,
}: Props) {
  const { t, i18n } = useTranslation();
  if (data.length === 0) {
    return (
      <div
        className="card h-100 shadow-sm d-flex align-items-center justify-content-center"
        style={{ background: cardBg, color: cardText }}
      >
        <p className="text-muted mb-0">{t("noData")}</p>
      </div>
    );
  }

  const lastMonth = [...data]
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0]
    .date.toISOString()
    .slice(0, 7);

  const monthData = tickers.map((tkr) => {
    const row = data
      .filter((d) => d.date.toISOString().slice(0, 7) === lastMonth)
      .find((d) => d.ticker === tkr);
    return { ticker: tkr, value: row ? row[metric] : 0 };
  });

  const fmtVal = (n: number) =>
    metric === "close"
      ? new Intl.NumberFormat(i18n.language, {
          style: "currency",
          currency: "CAD",
        }).format(n)
      : new Intl.NumberFormat(i18n.language).format(n);

  return (
    <div className="card h-100 shadow-sm" style={{ background: cardBg, color: cardText }}>
      <div className="card-body">
        <h5 className="card-title fw-bold mb-3">
          {metric === "close" ? t("volumeTrend") : t("priceTrend")} — {lastMonth}
        </h5>

        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={monthData}
            margin={{ top: 40, right: 60, bottom: 45, left: 80 }} /* extra padding */
          >
            <XAxis dataKey="ticker" />
            <YAxis tickFormatter={fmtVal} />
            <Tooltip formatter={(v: number) => fmtVal(v)} />
            <Legend />
            {tickers.map((tkr) => (
              <Bar
                key={tkr}
                dataKey={(d: any) => (d.ticker === tkr ? d.value : null)}
                name={tkr}
                fill={TICKER_PALETTE[tkr]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
