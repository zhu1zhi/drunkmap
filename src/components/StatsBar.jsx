export default function StatsBar({ records }) {
  const stats = getStats(records);

  return (
    <section className="stats-grid" aria-label="数据统计">
      <Stat label="This month" value={stats.monthlyCount} suffix="次" />
      <Stat label="Top bar" value={stats.favoriteBar} />
      <Stat label="Mood loop" value={stats.commonMood} />
    </section>
  );
}

function Stat({ label, value, suffix = "" }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>
        {value}
        {suffix}
      </strong>
    </article>
  );
}

function getStats(records) {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const currentMonthRecords = records.filter((record) => {
    const date = new Date(`${record.date}T12:00:00`);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  return {
    monthlyCount: currentMonthRecords.length,
    favoriteBar: mostFrequent(records, "barName"),
    commonMood: mostFrequent(records, "mood"),
  };
}

function mostFrequent(records, key) {
  if (!records.length) return "暂无";

  const counts = records.reduce((acc, record) => {
    const value = String(record[key] || "").trim() || "未记录";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}
