/* global React */
function Footer() {
  return (
    <footer style={footerStyles.wrap}>
      <div style={footerStyles.inner}>
        <div style={footerStyles.col}>
          <img src="assets/logo-advicehr-full.png" alt="AdviceHR" style={footerStyles.logo} />
          <p style={footerStyles.tagline}>
            Paul is an educational tool provided alongside the benefits your employer offers through AdviceHR.
          </p>
        </div>
        <div style={footerStyles.col}>
          <div style={footerStyles.colTitle}>Need your access code?</div>
          <p style={footerStyles.body}>
            Access codes come from your employer, usually by email. Reach out to your HR contact if you can't find yours.
          </p>
          <div style={{ ...footerStyles.colTitle, marginTop: 18 }}>Want to talk to a human?</div>
          <p style={footerStyles.body}>
            If you'd prefer a 1-on-1 consultation, or want to discuss a recommendation Paul helped you make,{" "}
            <a
              href="https://outlook.office.com/bookwithme/user/6b2a9de988c44438b526fa0c3ed79930@advicehr.net/meetingtype/o66_yH99c0GhK_p_ad1WaA2?anonymous&ep=mlink"
              target="_blank"
              rel="noopener noreferrer"
              style={footerStyles.link}
            >
              book time with a benefits advisor
            </a>.
          </p>
        </div>
      </div>
      <div style={footerStyles.disclaimer}>
        <strong style={{ color: "var(--navy-900)", fontWeight: 600 }}>Disclaimer.</strong>{" "}
        This tool provides educational guidance to help you understand your benefit options. It does not provide medical,
        legal, or financial advice. For personal decisions, consult your HR department or AdviceHR for assistance.
      </div>
      <div style={footerStyles.meta}>
        <span>© {new Date().getFullYear()} AdviceHR</span>
        <span>·</span>
        <a href="#" style={footerStyles.metaLink}>Privacy</a>
        <span>·</span>
        <a href="#" style={footerStyles.metaLink}>Terms</a>
      </div>
    </footer>
  );
}

const footerStyles = {
  wrap: { maxWidth: 1120, margin: "40px auto 0", padding: "32px 40px 40px", borderTop: "1px solid var(--border-default)" },
  inner: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 28 },
  col: { display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" },
  logo: { height: 76, width: "auto", display: "block", objectFit: "contain", marginLeft: -6 },
  tagline: { fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)", lineHeight: 1.55, margin: 0, maxWidth: 340 },
  colTitle: { fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--navy-900)", textTransform: "uppercase", letterSpacing: "0.08em" },
  body: { fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6, margin: 0, maxWidth: 380 },
  link: { color: "var(--brand-blue)", textDecoration: "underline", textUnderlineOffset: 3 },
  disclaimer: { fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-2)", lineHeight: 1.6, padding: "16px 20px", background: "var(--bg-200)", borderRadius: 14, border: "1px solid var(--border-default)" },
  meta: { marginTop: 20, display: "flex", gap: 10, alignItems: "center", fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-2)" },
  metaLink: { color: "var(--fg-2)", textDecoration: "none" },
};

window.Footer = Footer;
