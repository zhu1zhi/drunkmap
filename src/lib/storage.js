import { useEffect, useState } from "react";

export const STORAGE_KEY = "drunk-map-records-v1";
export const moods = ["开心", "emo", "放松", "微醺", "崩溃"];

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function emptyDrinkForm() {
  return {
    drinkName: "",
    barName: "",
    location: "",
    friends: "",
    mood: "微醺",
    alcoholPercent: "",
    volumeMl: "",
    date: today(),
  };
}

export function createDrinkRecord(formData) {
  return {
    id: crypto.randomUUID(),
    drinkName: formData.drinkName.trim(),
    barName: formData.barName.trim(),
    location: formData.location.trim(),
    friends: formData.friends.trim(),
    mood: formData.mood,
    alcoholPercent: Number(formData.alcoholPercent),
    volumeMl: Number(formData.volumeMl),
    date: formData.date,
  };
}

export function loadDrinkRecords() {
  if (typeof window === "undefined") return [];

  try {
    const rawRecords = window.localStorage.getItem(STORAGE_KEY);
    const records = rawRecords ? JSON.parse(rawRecords) : [];
    return Array.isArray(records) ? records.filter(isDrinkRecord) : [];
  } catch {
    return [];
  }
}

export function saveDrinkRecords(records) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function useStoredDrinkRecords() {
  const [records, setRecords] = useState(loadDrinkRecords);

  useEffect(() => {
    saveDrinkRecords(records);
  }, [records]);

  return [records, setRecords];
}

function isDrinkRecord(record) {
  return Boolean(
    record &&
      record.id &&
      record.drinkName &&
      record.barName &&
      record.location &&
      record.mood &&
      typeof record.alcoholPercent === "number" &&
      typeof record.volumeMl === "number" &&
      record.date,
  );
}
