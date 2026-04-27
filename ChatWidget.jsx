/* global React */
/* global marked */
const { useState, useRef, useEffect } = React;

/* ═══════════════════════════════════════════════════════════
   ██  CONFIGURATION — ONLY UPDATE THE WEBHOOK URL         ██
   ═══════════════════════════════════════════════════════════ */
const WEBHOOK_URL = "https://default4c9bf63d82df4672b09053f103618d.d9.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/fbf6ebc05d8041b691f785527590e487/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IF2xa5Y2h0LQu5SBlPkclVZrnnY_cAIbnkave_YQ7eY";

/* ═══════════════════════════════════════════════════════════
   ██  DO NOT EDIT BELOW THIS LINE                         ██
   ═══════════════════════════════════════════════════════════ */

function ChatWidget() {
  const [stage, setStage]               = useState("gate");
  const [code, setCode]                 = useState("");
  const [codeError, setCodeError]       = useState(false);
  const [checking, setChecking]         = useState(false);
  const [clientName, setClientName]     = useState("");
  const [messages, setMessages]         = useState([]);
  const [draft, setDraft]               = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [validatedCode, setValidatedCode] = useState("");
  const [userIP, setUserIP]             = useState("unknown");
  const [history, setHistory]           = useState([]);
  const chatRef                         = useRef(null);
  const textareaRef                     = useRef(null);

  // Grab user IP on mount
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then(r => r.json())
      .then(d => setUserIP(d.ip))
      .catch(() => {});
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isLoading]);

  // ─── ACCESS CODE VALIDATION ────────────────────────────────
  async function validate() {
    if (!code.trim() || checking) return;
    setChecking(true);
    setCodeError(false);

    try {
      const res  = await fetch(WEBHOOK_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessCode:          code.trim(),
          conversationHistory: [],
          ipAddress:           userIP,
          validateOnly:        true
        })
      });
      const data = await res.json();

      if (res.ok && data.clientName) {
        setValidatedCode(code.trim());
        setClientName(data.clientName);
        setStage("chat");
      } else {
        setCodeError(true);
        setCode("");
      }
    } catch {
      setCodeError(true);
      setCode("");
    } finally {
      setChecking(false);
    }
  }

  // ─── SEND MESSAGE ──────────────────────────────────────────
  async function send(text) {
    const userText = (text ?? draft).trim();
    if (!userText || isLoading) return;

    const newHistory = [...history, { role: "user", content: userText }];
    setHistory(newHistory);
    setMessages(m => [...m, { role: "user", content: userText }]);
    setDraft("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsLoading(true);

    try {
      const res  = await fetch(WEBHOOK_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName:          clientName,
          accessCode:          validatedCode,
          conversationHistory: newHistory,
          ipAddress:           userIP,
          validateOnly:        false
        })
      });

      if (!res.ok) throw new Error("Bad response");

      const data  = await res.json();
      const reply = data.reply || data.message || data.response;
      if (!reply) throw new Error("No reply");

      setHistory(h => [...h, { role: "assistant", content: reply }]);
      setMessages(m => [...m, { role: "assistant", content: reply }]);

    } catch {
      setMessages(m => [...m, { role: "error", content: "Something went wrong. Please try again or contact your HR team." }]);
    } finally {
      setIsLoading(false);
    }
  }

  // ─── RENDER ────────────────────────────────────────────────
  return (
    <div style={ws.shell}>

      {/* HEADER */}
      <div style={ws.header}>
        <div style={ws.headerIcon}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={ws.headerTitle}>Chat with Paul</div>
          <div style={ws.headerSub}>Get smarter about employee benefits in 10 minutes</div>
        </div>
        <div style={ws.statusDot} />
      </div>

      {/* ACCESS CODE GATE */}
      {stage === "gate" && (
        <div style={ws.gate}>
          <div style={ws.lock}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--navy-900)">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>
          <h2 style={ws.gateTitle}>Enter your access code</h2>
          <p style={ws.gateBody}>Your employer provided a code to access this benefits advisor. Enter it below to get started.</p>
          {codeError && (
            <p style={ws.gateError}>Invalid code. Please check with your employer.</p>
          )}
          <input
            style={{ ...ws.codeInput, borderColor: codeError ? "#e74c3c" : "var(--border-default)" }}
            value={code}
            placeholder="e.g. 1234"
            maxLength={6}
            onChange={e => { setCode(e.target.value); setCodeError(false); }}
            onKeyDown={e => e.key === "Enter" && validate()}
          />
          <button
            style={{ ...ws.primary, opacity: checking || !code.trim() ? 0.5 : 1, cursor: checking || !code.trim() ? "not-allowed" : "pointer" }}
            disabled={checking || !code.trim()}
            onClick={validate}
          >
            {checking ? "Checking…" : "Continue"}
          </button>
        </div>
      )}

      {/* CHAT */}
      {stage === "chat" && (
        <>
          <div style={ws.clientBar}>
            <span style={{ opacity: 0.6 }}>Client:</span>&nbsp;{clientName}
          </div>

          <div ref={chatRef} style={ws.chat}>
            {messages.length === 0 && (
              <div style={ws.welcome}>
                <h3 style={ws.welcomeTitle}>Hello, how can I help?</h3>
                <p style={ws.welcomeBody}>I can help you understand your health insurance options and choose the right plan during open enrollment.</p>
                <div style={ws.chips}>
                  {["What plans are available?", "Compare Basic vs Premium", "What does my plan cover?", "How do deductibles work?"].map(c => (
                    <button key={c} style={ws.chip} onClick={() => send(c)}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              if (m.role === "error") {
                return (
                  <div key={i} style={ws.errorBubble}>{m.content}</div>
                );
              }
              return (
                <div key={i} style={{ ...ws.row, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                  <div style={{ ...ws.avatar, background: m.role === "user" ? "var(--accent-100)" : "var(--navy-900)", color: m.role === "user" ? "var(--navy-900)" : "#fff" }}>
                    {m.role === "user" ? "You" : "AI"}
                  </div>
                  {m.role === "assistant" ? (
                    <div
                      style={{ ...ws.bubble, background: "var(--bg-200)", color: "var(--fg-1)", border: "1px solid var(--border-default)", borderBottomLeftRadius: 4 }}
                      dangerouslySetInnerHTML={{ __html: typeof marked !== "undefined" ? marked.parse(m.content) : m.content }}
                    />
                  ) : (
                    <div style={{ ...ws.bubble, background: "var(--navy-900)", color: "#fff", borderBottomRightRadius: 4 }}>
                      {m.content}
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div style={ws.row}>
                <div style={{ ...ws.avatar, background: "var(--navy-900)", color: "#fff" }}>AI</div>
                <div style={ws.typing}>
                  <span style={ws.dot} />
                  <span style={{ ...ws.dot, animationDelay: "0.15s" }} />
                  <span style={{ ...ws.dot, animationDelay: "0.30s" }} />
                </div>
              </div>
            )}
          </div>

          <div style={ws.inputArea}>
            <div style={ws.inputRow}>
              <textarea
                ref={textareaRef}
                style={ws.textarea}
                rows={1}
                placeholder="Ask about your benefits…"
                value={draft}
                onChange={e => {
                  setDraft(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                }}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              />
              <button style={{ ...ws.sendBtn, opacity: !draft.trim() || isLoading ? 0.5 : 1 }} onClick={() => send()} disabled={!draft.trim() || isLoading}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
            <div style={ws.hint}>Press Enter to send · Shift+Enter for new line</div>
          </div>
        </>
      )}

      <style>{`
        @keyframes pulseDot { 0%,80%,100% { transform:translateY(0);opacity:.4 } 40% { transform:translateY(-6px);opacity:1 } }
        @keyframes fadeUp { from { opacity:0;transform:translateY(8px) } to { opacity:1;transform:translateY(0) } }
        .paul-bubble-ai h1,.paul-bubble-ai h2,.paul-bubble-ai h3 { font-size:15px;font-weight:600;color:var(--navy-900);margin:10px 0 4px; }
        .paul-bubble-ai p { margin:4px 0; }
        .paul-bubble-ai ul,.paul-bubble-ai ol { padding-left:18px;margin:4px 0; }
        .paul-bubble-ai li { margin:3px 0; }
        .paul-bubble-ai strong { font-weight:600;color:var(--navy-900); }
        .paul-bubble-ai table { width:100%;border-collapse:collapse;font-size:13px;margin:6px 0; }
        .paul-bubble-ai th { background:var(--navy-900);color:#fff;padding:5px 8px;text-align:left; }
        .paul-bubble-ai td { padding:5px 8px;border-bottom:1px solid var(--border-default); }
        .paul-bubble-ai tr:nth-child(even) td { background:rgba(10,61,98,0.04); }
      `}</style>
    </div>
  );
}

const ws = {
  shell:        { width:"100%", maxWidth:680, margin:"0 auto", background:"#fff", borderRadius:20, boxShadow:"0 18px 48px rgba(10,61,98,0.14)", display:"flex", flexDirection:"column", overflow:"hidden", height:640 },
  header:       { background:"var(--navy-900)", padding:"18px 22px", display:"flex", alignItems:"center", gap:12, flexShrink:0 },
  headerIcon:   { width:40, height:40, borderRadius:12, background:"rgba(255,255,255,0.15)", display:"inline-flex", alignItems:"center", justifyContent:"center" },
  headerTitle:  { fontFamily:"var(--font-serif)", color:"#fff", fontSize:18 },
  headerSub:    { fontFamily:"var(--font-sans)", color:"rgba(255,255,255,0.65)", fontSize:12, marginTop:2 },
  statusDot:    { width:8, height:8, borderRadius:"50%", background:"#2ECC71", boxShadow:"0 0 0 3px rgba(46,204,113,0.25)" },
  gate:         { flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"36px 32px", gap:14, textAlign:"center" },
  lock:         { width:60, height:60, borderRadius:18, background:"var(--accent-100)", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:4 },
  gateTitle:    { fontFamily:"var(--font-serif)", fontSize:22, color:"var(--navy-900)", margin:0 },
  gateBody:     { fontFamily:"var(--font-sans)", fontSize:14, color:"var(--fg-2)", maxWidth:320, lineHeight:1.55, margin:0 },
  gateError:    { fontFamily:"var(--font-sans)", fontSize:13, color:"#e74c3c", margin:0 },
  codeInput:    { width:"100%", maxWidth:280, padding:"14px 16px", border:"1.5px solid var(--border-default)", borderRadius:14, fontFamily:"var(--font-sans)", fontSize:18, letterSpacing:"0.2em", textAlign:"center", color:"var(--navy-900)", outline:"none", marginTop:6 },
  primary:      { width:"100%", maxWidth:280, padding:13, background:"var(--navy-900)", color:"#fff", border:"none", borderRadius:14, fontFamily:"var(--font-sans)", fontSize:14, fontWeight:500 },
  clientBar:    { background:"var(--accent-100)", borderBottom:"1px solid var(--border-default)", padding:"8px 22px", fontFamily:"var(--font-sans)", fontSize:12, color:"var(--navy-900)", fontWeight:500, flexShrink:0 },
  chat:         { flex:1, overflowY:"auto", padding:"22px 18px", display:"flex", flexDirection:"column", gap:16 },
  welcome:      { textAlign:"center", padding:"20px 10px", display:"flex", flexDirection:"column", alignItems:"center", gap:10 },
  welcomeTitle: { fontFamily:"var(--font-serif)", fontSize:20, color:"var(--navy-900)", margin:0 },
  welcomeBody:  { fontFamily:"var(--font-sans)", fontSize:13, color:"var(--fg-2)", maxWidth:340, lineHeight:1.55, margin:0 },
  chips:        { display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginTop:6 },
  chip:         { background:"#fff", border:"1.5px solid var(--border-default)", borderRadius:999, padding:"7px 14px", fontFamily:"var(--font-sans)", fontSize:13, fontWeight:500, color:"var(--brand-blue)", cursor:"pointer" },
  row:          { display:"flex", gap:10, alignItems:"flex-end", animation:"fadeUp .25s ease" },
  avatar:       { width:32, height:32, borderRadius:10, display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-sans)", fontSize:11, fontWeight:600, flexShrink:0 },
  bubble:       { maxWidth:"72%", padding:"12px 16px", borderRadius:14, fontFamily:"var(--font-sans)", fontSize:14, lineHeight:1.6 },
  errorBubble:  { background:"#fdf0f0", border:"1px solid #f5c6c6", color:"#c0392b", borderRadius:14, padding:"10px 14px", fontSize:13, textAlign:"center" },
  typing:       { background:"var(--bg-200)", border:"1px solid var(--border-default)", borderRadius:14, borderBottomLeftRadius:4, padding:"14px 18px", display:"inline-flex", gap:5 },
  dot:          { width:7, height:7, borderRadius:"50%", background:"var(--fg-2)", display:"inline-block", animation:"pulseDot 1.2s infinite ease-in-out" },
  inputArea:    { padding:"14px 18px 18px", borderTop:"1px solid var(--border-default)", background:"#fff", flexShrink:0 },
  inputRow:     { display:"flex", gap:10, alignItems:"flex-end", background:"var(--bg-200)", border:"1.5px solid var(--border-default)", borderRadius:14, padding:"10px 10px 10px 16px" },
  textarea:     { flex:1, border:"none", background:"transparent", fontFamily:"var(--font-sans)", fontSize:14, color:"var(--fg-1)", resize:"none", outline:"none", lineHeight:1.5, maxHeight:100 },
  sendBtn:      { width:36, height:36, background:"var(--navy-900)", border:"none", borderRadius:10, cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  hint:         { fontFamily:"var(--font-sans)", fontSize:11, color:"var(--fg-2)", marginTop:8, textAlign:"center" },
};

window.ChatWidget = ChatWidget;
