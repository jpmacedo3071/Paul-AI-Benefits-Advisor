/* global React */
function Hero() {
  return (
    <section style={heroStyles.wrap}>
      <div style={heroStyles.eyebrow}>AdviceHR · Benefits Coach</div>
      <h1 style={heroStyles.title}>
        Say hi to <span style={heroStyles.titleAccent}>Paul</span>,
        <br />your benefits coach.
      </h1>
      <p style={heroStyles.sub}>
        Benefits can be confusing, and understanding how to get quality medical care at the lowest cost
        isn't something most of us are taught. Ask Paul anything, in plain English, on your schedule.
      </p>
      <div style={heroStyles.pills}>
        <Pill>Private &amp; confidential</Pill>
        <Pill>Knows your company's employee benefits</Pill>
        <Pill>Available 24/7</Pill>
      </div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <span style={heroStyles.pill}>
      <span style={heroStyles.pillDot} />
      {children}
    </span>
  );
}

const heroStyles = {
  wrap: { maxWidth: 760, margin: "40px auto 32px", textAlign: "center", padding: "0 24px" },
  eyebrow: { fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--brand-blue)", marginBottom: 18 },
  title: { fontFamily: "var(--font-serif)", fontSize: "clamp(40px, 6vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.015em", color: "var(--navy-900)", margin: "0 0 22px", fontWeight: 400 },
  titleAccent: { color: "var(--brand-blue)" },
  sub: { fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.6, color: "var(--fg-2)", margin: "0 auto", maxWidth: 600 },
  pills: { marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  pill: { display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "#fff", border: "1px solid var(--border-default)", borderRadius: 999, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--navy-900)", boxShadow: "0 1px 2px rgba(10,61,98,0.06)" },
  pillDot: { width: 6, height: 6, borderRadius: 999, background: "var(--success)" },
};

window.Hero = Hero;
