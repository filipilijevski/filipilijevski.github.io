import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import useStockData from "./hooks/useStockData";
import { type StockDatum } from "./types";

import LineMetricChart  from "./components/LinePriceChart";
import SnapshotBarChart from "./components/SnapshotBarChart";
import MetricToggle     from "./components/MetricToggle";
import TickerCheckboxes from "./components/TickerCheckboxes";
import LanguageSwitch   from "../../components/LanguageSwitch";
import ColorThemeControls from "./components/ColorThemeControls";

/* ---------- Theme ---------- */
type Theme = { pageBg: string; cardBg: string; cardText: string };

const defaultTheme: Theme = {
  pageBg:   "#547291ff",
  cardBg:   "#ffffff",
  cardText: "#212529",
};

export default function DashboardPage() {
  const { t } = useTranslation();
  const raw = useStockData();

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [tickers, setTickers] = useState<string[]>(["AAPL", "MSFT", "NVDA"]);
  const [metric,  setMetric]  = useState<"close" | "volume">("close");

  const toggleTicker = (tkr: string) =>
    setTickers((prev) =>
      prev.includes(tkr) ? prev.filter((p) => p !== tkr) : [...prev, tkr]
    );

  const filtered: StockDatum[] = useMemo(
    () => raw.filter((d) => tickers.includes(d.ticker)),
    [raw, tickers]
  );

  return (
    <>
      <Navbar />

      {/* pt-10 ≈ 192 px — enough to clear nav and leave breathing room */}
      <main
        className="container-fluid py-2 pt-10"
        style={{ background: theme.pageBg, minHeight: "100vh" }}
      >
        {/* mt-3 gives extra spacing between nav and title row */}
        <div className="d-flex align-items-center justify-content-center mb-4 mt-3">
          <h1 className="m-5 text-center flex-grow-1">{t("dashboardTitle")}</h1>
          <LanguageSwitch />
        </div>

        {/* Controls */}
        <div
          className="card p-3 mb-4 shadow-sm"
          style={{ background: theme.cardBg, color: theme.cardText }}
        >
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <TickerCheckboxes selected={tickers} toggle={toggleTicker} />
            </div>
            <div className="col-12 col-md-3">
              <MetricToggle metric={metric} setMetric={setMetric} />
            </div>
            <div className="col-12 col-md-5 d-flex justify-content-md-end">
              <ColorThemeControls theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <LineMetricChart
              data={filtered}
              tickers={tickers}
              metric={metric}
              cardBg={theme.cardBg}
              cardText={theme.cardText}
            />
          </div>
          <div className="col-12 col-lg-6">
            <SnapshotBarChart
              data={filtered}
              tickers={tickers}
              metric={metric}
              cardBg={theme.cardBg}
              cardText={theme.cardText}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
