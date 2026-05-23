export default function Toast({ visible, children }) {
  return (
    <div className={`toast ${visible ? "show" : ""}`} role="status" aria-live="polite">
      <span aria-hidden="true" />
      {children}
    </div>
  );
}
