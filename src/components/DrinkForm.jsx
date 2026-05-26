import { useMemo, useState } from "react";
import { emptyDrinkForm, moods } from "../lib/storage.js";

export default function DrinkForm({ onSave }) {
  const initialForm = useMemo(() => emptyDrinkForm(), []);
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    onSave(form);
    setForm(emptyDrinkForm());
    window.setTimeout(() => setIsSaving(false), 520);
  }

  return (
    <section className={`panel form-panel ${isSaving ? "is-saving" : ""}`} aria-labelledby="new-record">
      <SectionHeading index="01" title="今晚这一杯" id="new-record" />

      <form onSubmit={handleSubmit} className="drink-form">
        <div className="quick-grid">
          <Field label="酒名">
            <input
              name="drinkName"
              value={form.drinkName}
              onChange={updateField}
              placeholder="Negroni"
              autoComplete="off"
              required
            />
          </Field>

          <Field label="酒吧">
            <input
              name="barName"
              value={form.barName}
              onChange={updateField}
              placeholder="The Quiet Bar"
              autoComplete="off"
              required
            />
          </Field>
        </div>

        <Field label="城市 / 地点">
          <input
            name="location"
            value={form.location}
            onChange={updateField}
            placeholder="Shanghai"
            autoComplete="off"
            required
          />
        </Field>

        <div className="quick-grid">
          <Field label="心情">
            <select name="mood" value={form.mood} onChange={updateField}>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </Field>

          <Field label="日期">
            <input name="date" type="date" value={form.date} onChange={updateField} required />
          </Field>
        </div>

        <div className="quick-grid">
          <Field label="酒精度">
            <UnitInput
              name="alcoholPercent"
              value={form.alcoholPercent}
              onChange={updateField}
              placeholder="13.5"
              unit="%"
              max="100"
              step="0.1"
            />
          </Field>

          <Field label="饮用量">
            <UnitInput
              name="volumeMl"
              value={form.volumeMl}
              onChange={updateField}
              placeholder="150"
              unit="ml"
              step="1"
            />
          </Field>
        </div>

        <Field label="和谁一起">
          <input
            name="friends"
            value={form.friends}
            onChange={updateField}
            placeholder="可选"
            autoComplete="off"
          />
        </Field>

        <button className="save-button" type="submit">
          <span aria-hidden="true">+</span>
          Save the sip
        </button>
      </form>
    </section>
  );
}

function UnitInput({ name, value, onChange, placeholder, unit, max, step }) {
  return (
    <div className="unit-input">
      <input
        name={name}
        type="number"
        min="0"
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode="decimal"
        required
      />
      <span>{unit}</span>
    </div>
  );
}

export function SectionHeading({ index, title, id }) {
  return (
    <div className="section-heading">
      <span>{index}</span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
