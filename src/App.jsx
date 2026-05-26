import { useMemo, useState } from "react";
import DrinkForm from "./components/DrinkForm.jsx";
import HistoryList from "./components/HistoryList.jsx";
import StatsBar from "./components/StatsBar.jsx";
import Toast from "./components/Toast.jsx";
import { createDrinkRecord, saveDrinkRecords, useStoredDrinkRecords } from "./lib/storage.js";

export default function App() {
  const [records, setRecords] = useStoredDrinkRecords();
  const [toastVisible, setToastVisible] = useState(false);

  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [records]);

  function handleSave(formData) {
    const nextRecords = [createDrinkRecord(formData), ...records];
    setRecords(nextRecords);
    saveDrinkRecords(nextRecords);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1700);
  }

  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="app-title">
        <div className="hero-copy">
          <p className="eyebrow">No login. Just tonight.</p>
          <h1 id="app-title">Drunk Map</h1>
          <p className="subtitle">记录你的每一杯微醺</p>
          <div className="vibe-strip" aria-label="产品特点">
            <span>Local-only</span>
            <span>3 sec log</span>
            <span>Aftertaste</span>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span>DM</span>
        </div>
      </section>

      <DrinkForm onSave={handleSave} />
      <HistoryList records={sortedRecords} />
      <StatsBar records={records} />
      <Toast visible={toastVisible}>Saved</Toast>
    </main>
  );
}
