export default function AdminSection({ title, children }) {
  return (
    <section style={{
      background: "#0a0a0a",
      color: "white",
      padding: "2rem",
      border: "1px solid white",
      margin: "2rem auto",
      maxWidth: "1000px",
      borderRadius: "12px"
    }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1.5rem" }}>{title}</h1>
      {children}
    </section>
  );
}
