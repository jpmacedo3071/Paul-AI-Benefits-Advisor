/* global React */
const { useState: useFAQState } = React;

function FAQ() {
  const [open, setOpen] = useFAQState(0);
  const items = [
    { q: "What is Paul?", a: "Paul is an AI-powered benefits coach available through your employer. He answers questions about your health plans, deductibles, and enrollment choices in plain English." },
    { q: "Is what I ask shared with my employer?", a: "No. Your conversation is private and confidential. We don't collect your name, and nothing you ask is shared with your HR team or employer." },
    { q: "Can Paul tell me what plan to pick?", a: "Paul provides educational guidance to help you understand your options. He does not provide medical, legal, or financial advice. For personal decisions, consult your HR department or AdviceHR." },
    { q: "Where do I get my access code?", a: "Access codes are only available through your employer, usually shared by email. If you can't find yours, reach out to your HR contact and they'll send it over." },
    { q: "Does Paul know my company's specific plans?", a: "Yes. Paul knows your medical plans and your ancillary benefits too, including dental, vision, life, disability, and anything else your employer offers. Your employer loads the exact plan details (carriers, networks, deductibles, copays, covered prescriptions) so Paul's answers match the benefits actually available to you." },
  ];
  return (
    <section id="faq" style={faqStyles.wrap}>
      <div style={faqStyles.eyebrow}>Common questions</div>
      <h2 style={faqStyles.title}>Quick answers before you start</h2>
      <div style={faqStyles.list}>
        {items.map((it, i) => (
          <div key={i} style={{ ...faqStyles.item, borderColor: open === i ? "var(--accent-500)" : "var(--border-default)" }}>
            <button style={faqStyles.q} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{it.q}</span>
              <span style={{ ...faqStyles.chev, transform: open === i ? "rotate(180deg)" : "none" }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </button>
            {open === i && <div style={faqStyles.a}>{it.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

const faqStyles = {
  wrap: { maxWidth: 760, margin: "64px auto 32px", padding: "0 24px" },
  eyebrow: { fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--brand-blue)", textAlign: "center", marginBottom: 10 },
  title: { fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--navy-900)", textAlign: "center", margin: "0 0 28px", fontWeight: 400, letterSpacing: "-0.01em" },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  item: { background: "#fff", border: "1.5px solid", borderRadius: 14, transition: "border-color .15s", boxShadow: "0 1px 2px rgba(10,61,98,0.04)" },
  q: { width: "100%", padding: "16px 20px", background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, color: "var(--navy-900)", cursor: "pointer", textAlign: "left" },
  chev: { color: "var(--fg-2)", display: "inline-flex", transition: "transform .18s" },
  a: { padding: "0 20px 18px", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, color: "var(--fg-2)" },
};

window.FAQ = FAQ;
