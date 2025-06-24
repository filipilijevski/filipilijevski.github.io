import { type AnalyticsData } from '../hooks/useAnalytics';

interface Props {
  stats: AnalyticsData;
  onReplay: () => void;
}

export default function ResultsModal({ stats, onReplay }: Props) {
  const accuracy =
    stats.clicks > 0 ? ((stats.hits / stats.clicks) * 100).toFixed(1) : '0';
  const avgRT =
    stats.reactionTimes.length > 0
      ? (
          stats.reactionTimes.reduce((s, v) => s + v, 0) /
          stats.reactionTimes.length
        ).toFixed(0)
      : '--';
  const bestRT =
    stats.reactionTimes.length > 0
      ? Math.min(...stats.reactionTimes).toFixed(0)
      : '--';

  return (
    <div className="text-center my-4">
      <h2 className="fw-bold">Session Results</h2>
      <p className="lead mb-1">
        Hits {stats.hits}/{stats.clicks}
      </p>
      <p className="mb-1">Accuracy {accuracy}%</p>
      <p className="mb-4">
        Avg RT {avgRT} ms | Best {bestRT} ms
      </p>
      <button className="btn btn-primary" onClick={onReplay}>
        Play Again
      </button>
    </div>
  );
}
