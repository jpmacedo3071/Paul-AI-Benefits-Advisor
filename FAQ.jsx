/* global React */
const { useState, useRef, useEffect } = React;

/**
 * ChatWidget: a visual-only recreation of the live Paul widget.
 * The REAL widget at benefitscoach.advicehr.net is owned by
 * jpmacedo3071/Paul-AI-Benefits-Advisor and must not be modified.
 * This stand-in mirrors its styling exactly so designs compose correctly.
 */
function ChatWidget() {
  const [stage, setStage] = useState("gate"); // "gate" | "chat"
  const [code, setCode] = useState("");
  const [checking, setChecking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  function validate() {
    if (!code.trim()) return;
    setChecking(true);
    setTimeout(() => { setChecking(false); setStage("chat"); }, 650);
  }

  function send(text) {
    const t = (text ?? draft).trim();
    if (!t) return;
    setMessages(m => [...m, { role: "user", content: t }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        role: "assistant",
        content: "Great question, I can walk you through that. Your Basic plan has a $1,500 deductible and a $5,000 out-of-pocket max. Your Premium plan has a $500 deductible and a $3,000 out-of-pocket max. Want me to compare them side-by-side?"
      }]);
    }, 900);
  }

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  return (
    <div style={widgetStyles.shell}>
      <div style={widgetStyles.header}>
        <div style={widgetStyles.headerIcon}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={widgetStyles.headerTitle}>Benefits Advisor</div>
          <div style={widgetStyles.headerSub}>Powered by AI · Ask anything about your health plans</div>
        </div>
        <div style={widgetStyles.statusDot} />
      </div>

      {stage === "gate" && (
        <div style={widgetStyles.gate}>
          <div style={widgetStyles.lock}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--navy-900)">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>
          <h2 style={widgetStyles.gateTitle}>Enter your access code</h2>
          <p style={widgetStyles.gateBody}>Your employer provided a code to access this benefits advisor. Enter it below to get started.</p>
          <input
            style={widgetStyles.codeInput}
            value={code}
            placeholder="e.g. 1234"
            maxLength={6}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === "Enter" && validate()}
          />
          <button
            style={{ ...widgetStyles.primary, opacity: checking || !code ? 0.5 : 1, cursor: checking || !code ? "not-allowed" : "pointer" }}
            disabled={checking || !code}
            onClick={validate}
          >
            {checking ? "Checking…" : "Continue"}
          </button>
        </div>
      )}

      {stage === "chat" && (
        <>
          <div style={widgetStyles.clientBar}><span style={{ opacity: 0.6 }}>Client:</span>&nbsp;Acme Co.</div>
          <div ref={chatRef} style={widgetStyles.chat}>
            {messages.length === 0 && (
              <div style={widgetStyles.welcome}>
                <h3 style={widgetStyles.welcomeTitle}>Hello, how can I help?</h3>
                <p style={widgetStyles.welcomeBody}>I can help you understand your health insurance options and choose the right plan during open enrollment.</p>
                <div style={widgetStyles.chips}>
                  {["What plans are available?", "Compare Basic vs Premium", "What does my plan cover?", "How do deductibles work?"].map(c => (
                    <button key={c} style={widgetStyles.chip} onClick={() => send(c)}>{c}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ ...widgetStyles.row, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                <div style={{ ...widgetStyles.avatar, background: m.role === "user" ? "var(--accent-100)" : "var(--navy-900)", color: m.role === "user" ? "var(--navy-900)" : "#fff" }}>
                  {m.role === "user" ? "You" : "AI"}
                </div>
                <div style={{
                  ...widgetStyles.bubble,
                  background: m.role === "user" ? "var(--navy-900)" : "var(--bg-200)",
                  color: m.role === "user" ? "#fff" : "var(--fg-1)",
                  border: m.role === "user" ? "none" : "1px solid var(--border-default)",
                  borderBottomLeftRadius: m.role === "user" ? 14 : 4,
                  borderBottomRightRadius: m.role === "user" ? 4 : 14,
                }}>{m.content}</div>
              </div>
            ))}
            {typing && (
              <div style={widgetStyles.row}>
                <div style={{ ...widgetStyles.avatar, background: "var(--navy-900)", color: "#fff" }}>AI</div>
                <div style={widgetStyles.typing}>
                  <span style={widgetStyles.dot} />
                  <span style={{ ...widgetStyles.dot, animationDelay: "0.15s" }} />
                  <span style={{ ...widgetStyles.dot, animationDelay: "0.30s" }} />
                </div>
              </div>
            )}
          </div>
          <div style={widgetStyles.inputArea}>
            <div style={widgetStyles.inputRow}>
              <textarea
                style={widgetStyles.textarea}
                rows={1}
                placeholder="Ask about your benefits…"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              />
              <button style={widgetStyles.sendBtn} onClick={() => send()} disabled={!draft.trim()}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
            <div style={widgetStyles.hint}>Press Enter to send · Shift+Enter for new line</div>
          </div>
        </>
      )}
      <style>{`
        @keyframes pulseDot { 0%,80%,100% { transform: translateY(0); opacity:.4 } 40% { transform: translateY(-6px); opacity:1 } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}

const widgetStyles = {
  shell: {
    width: "100%",
    maxWidth: 680,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 18px 48px rgba(10,61,98,0.14)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: 640,
  },
  header: { background: "var(--navy-900)", padding: "18px 22px", display: "flex", alignItems: "center", gap: 12 },
  headerIcon: { width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center" },
  headerTitle: { fontFamily: "var(--font-serif)", color: "#fff", fontSize: 18 },
  headerSub: { fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 },
  statusDot: { width: 8, height: 8, borderRadius: "50%", background: "#2ECC71", boxShadow: "0 0 0 3px rgba(46,204,113,0.25)" },
  gate: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "36px 32px", gap: 14, textAlign: "center" },
  lock: { width: 60, height: 60, borderRadius: 18, background: "var(--accent-100)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 4 },
  gateTitle: { fontFamily: "var(--font-serif)", fontSize: 22, color: "var(--navy-900)", margin: 0 },
  gateBody: { fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)", maxWidth: 320, lineHeight: 1.55, margin: 0 },
  codeInput: { width: "100%", maxWidth: 280, padding: "14px 16px", border: "1.5px solid var(--border-default)", borderRadius: 14, fontFamily: "var(--font-sans)", fontSize: 18, letterSpacing: "0.2em", textAlign: "center", color: "var(--navy-900)", outline: "none", marginTop: 6 },
  primary: { width: "100%", maxWidth: 280, padding: 13, background: "var(--navy-900)", color: "#fff", border: "none", borderRadius: 14, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500 },
  clientBar: { background: "var(--accent-100)", borderBottom: "1px solid var(--border-default)", padding: "8px 22px", fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--navy-900)", fontWeight: 500 },
  chat: { flex: 1, overflowY: "auto", padding: "22px 18px", display: "flex", flexDirection: "column", gap: 16 },
  welcome: { textAlign: "center", padding: "20px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
  welcomeTitle: { fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--navy-900)", margin: 0 },
  welcomeBody: { fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-2)", maxWidth: 340, lineHeight: 1.55, margin: 0 },
  chips: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 6 },
  chip: { background: "#fff", border: "1.5px solid var(--border-default)", borderRadius: 999, padding: "7px 14px", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--brand-blue)", cursor: "pointer" },
  row: { display: "flex", gap: 10, alignItems: "flex-end", animation: "fadeUp .25s ease" },
  avatar: { width: 32, height: 32, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, flexShrink: 0 },
  bubble: { maxWidth: "72%", padding: "12px 16px", borderRadius: 14, fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6 },
  typing: { background: "var(--bg-200)", border: "1px solid var(--border-default)", borderRadius: 14, borderBottomLeftRadius: 4, padding: "14px 18px", display: "inline-flex", gap: 5 },
  dot: { width: 7, height: 7, borderRadius: "50%", background: "var(--fg-2)", display: "inline-block", animation: "pulseDot 1.2s infinite ease-in-out" },
  inputArea: { padding: "14px 18px 18px", borderTop: "1px solid var(--border-default)", background: "#fff" },
  inputRow: { display: "flex", gap: 10, alignItems: "flex-end", background: "var(--bg-200)", border: "1.5px solid var(--border-default)", borderRadius: 14, padding: "10px 10px 10px 16px" },
  textarea: { flex: 1, border: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-1)", resize: "none", outline: "none", lineHeight: 1.5 },
  sendBtn: { width: 36, height: 36, background: "var(--navy-900)", border: "none", borderRadius: 10, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  hint: { fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fg-2)", marginTop: 8, textAlign: "center" },
};

window.ChatWidget = ChatWidget;
