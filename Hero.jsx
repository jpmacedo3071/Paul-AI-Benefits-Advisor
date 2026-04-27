/* global React */
const { useState } = React;

function Header() {
  return (
    <header style={headerStyles.bar}>
      <a href="#" style={headerStyles.brand}>
        <img src="../../assets/logo-advicehr-full.png" alt="AdviceHR" style={headerStyles.logo} />
      </a>
      <nav style={headerStyles.nav}>
        <a href="#how" style={headerStyles.link}>How it works</a>
        <a href="#faq" style={headerStyles.link}>FAQ</a>
      </nav>
    </header>
  );
}

const headerStyles = {
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 40px 20px",
    maxWidth: 1120,
    margin: "0 auto",
    width: "100%",
  },
  brand: { display: "inline-flex", alignItems: "center", textDecoration: "none" },
  logo: { height: 84, width: "auto", display: "block" },
  nav: { display: "flex", alignItems: "center", gap: 28 },
  link: {
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--fg-1)",
    textDecoration: "none",
    transition: "color .15s",
  },
  contact: {
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--brand-blue)",
    textDecoration: "none",
    padding: "10px 18px",
    border: "1.5px solid var(--border-default)",
    borderRadius: 999,
    transition: "all .15s",
  },
};

window.Header = Header;
