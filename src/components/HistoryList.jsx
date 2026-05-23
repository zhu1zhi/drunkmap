import { SectionHeading } from "./DrinkForm.jsx";

export default function HistoryList({ records }) {
  return (
    <section className="history-section" aria-labelledby="history-title">
      <SectionHeading index="02" title="历史记录" id="history-title" />

      <div className="record-list">
        {records.length ? (
          records.map((record) => <RecordCard key={record.id} record={record} />)
        ) : (
          <div className="empty-state">
            <p>还没有记录。</p>
            <span>第一杯会出现在这里，像一条安静的地图标记。</span>
          </div>
        )}
      </div>
    </section>
  );
}

function RecordCard({ record }) {
  return (
    <article className="record-card">
      <div>
        <h3>
          {record.drinkName}
          <span>{record.barName}</span>
        </h3>
        <p>{record.location}</p>
        {record.friends && <p className="friends">和 {record.friends}</p>}
      </div>
      <div className="record-meta">
        <span className="mood-pill">{record.mood}</span>
        <span>
          {record.alcoholPercent}% · {record.volumeMl}ml
        </span>
        <time dateTime={record.date}>{formatDate(record.date)}</time>
      </div>
    </article>
  );
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
