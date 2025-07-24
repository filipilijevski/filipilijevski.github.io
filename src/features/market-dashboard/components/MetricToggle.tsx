import { useTranslation } from "react-i18next";

type Props = {
  metric: "close" | "volume";
  setMetric: (m: "close" | "volume") => void;
};

export default function MetricToggle({ metric, setMetric }: Props) {
  const { t } = useTranslation();
  return (
    <div className="btn-group w-100">
      <button
        className={`btn ${metric === "close" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setMetric("close")}
      >
        {t("metricPrice")}
      </button>
      <button
        className={`btn ${metric === "volume" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setMetric("volume")}
      >
        {t("metricVolume")}
      </button>
    </div>
  );
}
