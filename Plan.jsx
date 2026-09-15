import { useState } from 'react'

const S = {
  bg: '#0a0f1e', surface: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)',
  text: '#e2e8f0', dim: '#64748b', xs: '#475569',
  blue: '#2563eb', blueLight: '#93c5fd', blueBg: 'rgba(37,99,235,0.12)', blueBorder: 'rgba(37,99,235,0.25)',
  green: '#16a34a', greenLight: '#86efac', greenBg: 'rgba(22,163,74,0.12)', greenBorder: 'rgba(22,163,74,0.25)',
  orange: '#d97706', orangeLight: '#fcd34d', orangeBg: 'rgba(217,119,6,0.12)', orangeBorder: 'rgba(217,119,6,0.25)',
  purple: '#7c3aed', purpleLight: '#c4b5fd', purpleBg: 'rgba(124,58,237,0.12)', purpleBorder: 'rgba(124,58,237,0.25)',
  red: '#dc2626',
}


const responsiveCSS = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; overflow-x: hidden; }

  /* hamburger: verborgen op desktop */
  .sf-plan-hamburger { display: none !important; }
  .sf-plan-nav-links { display: flex !important; }

  @media (max-width: 768px) {
    .sf-plan-nav-links { display: none !important; }
    .sf-plan-hamburger {
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 42px !important;
      height: 42px !important;
      font-size: 22px !important;
      background: rgba(37,99,235,0.12) !important;
      border: 1px solid rgba(37,99,235,0.25) !important;
      border-radius: 10px !important;
      color: #93c5fd !important;
      padding: 0 !important;
    }

    /* Hero */
    div[style*="padding:72px 40px 56px"] {
      padding: 40px 16px 32px !important;
    }
    div[style*="padding:72px 40px 56px"] h1 {
      font-size: clamp(1.6rem, 8vw, 2.4rem) !important;
      line-height: 1.2 !important;
    }
    div[style*="padding:72px 40px 56px"] p {
      font-size: 14px !important;
    }

    /* Content container */
    div[style*="max-width:940px"] {
      padding-left: 12px !important;
      padding-right: 12px !important;
      padding-bottom: 48px !important;
      max-width: 100% !important;
    }

    /* Grid: altijd 1 kolom op mobiel */
    div[style*="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))"],
    div[style*="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))"],
    div[style*="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))"] {
      grid-template-columns: 1fr !important;
    }

    /* Cards */
    div[style*="border-radius:14px"][style*="padding:24px"] {
      padding: 16px !important;
      border-radius: 12px !important;
    }

    /* Section headers */
    h2[style*="font-size:21px"] {
      font-size: 17px !important;
    }

    /* Tabellen */
    table {
      font-size: 12px !important;
    }
    th, td {
      padding: 8px 10px !important;
      font-size: 12px !important;
    }

    /* Brede tabellen: horizontaal scrollbaar */
    div[style*="overflowX:'auto'"],
    div[style*="overflow-x:auto"] {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
    }

    /* Break-even kaartjes: 2 kolommen op mobiel */
    div[style*="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))"] {
      grid-template-columns: 1fr 1fr !important;
    }

    /* Pricing grid */
    div[style*="repeat(4,1fr)"] {
      grid-template-columns: 1fr 1fr !important;
    }

    /* Diensten grid */
    div[style*="repeat(auto-fit,minmax(200px,1fr))"] {
      grid-template-columns: 1fr 1fr !important;
    }

    /* Footer */
    div[style*="padding:24px 32px"] {
      padding: 16px !important;
      font-size: 11px !important;
    }

    p {
      overflow-wrap: anywhere;
      word-break: break-word;
    }
  }

  @media (max-width: 480px) {
    div[style*="padding:72px 40px 56px"] h1 {
      font-size: 1.5rem !important;
    }

    /* Alle grids op 480px: 1 kolom */
    div[style*="grid-template-columns:1fr 1fr"],
    div[style*="repeat(4,1fr)"],
    div[style*="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))"] {
      grid-template-columns: 1fr !important;
    }

    div[style*="max-width:940px"] {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }
  }
`

function Badge({ children, color='blue' }) {
  const map = { blue: [S.blueBg, S.blueLight, S.blueBorder], green: [S.greenBg, S.greenLight, S.greenBorder], orange: [S.orangeBg, S.orangeLight, S.orangeBorder], purple: [S.purpleBg, S.purpleLight, S.purpleBorder] }
  const [bg, col, border] = map[color] || map.blue
  return <span style={{ fontSize:10, fontWeight:600, padding:'2px 10px', borderRadius:20, background:bg, color:col, border:`1px solid ${border}`, display:'inline-block' }}>{children}</span>
}

function Card({ title, children, style={} }) {
  return (
    <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, padding:24, ...style }}>
      {title && <h3 style={{ fontSize:15, fontWeight:700, color:S.blueLight, marginBottom:14 }}>{title}</h3>}
      <div style={{ fontSize:14, color:S.dim, lineHeight:1.8 }}>{children}</div>
    </div>
  )
}

function Section({ num, title, children }) {
  return (
    <div style={{ marginBottom:64 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28, paddingBottom:16, borderBottom:`1px solid ${S.border}` }}>
        <div style={{ width:34, height:34, background:'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:'white', flexShrink:0 }}>{num}</div>
        <h2 style={{ fontSize:21, fontWeight:800, color:'white', margin:0 }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Row({ label, value, sub, highlight }) {
  return (
    <tr>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, fontWeight:500, color: highlight ? S.blueLight : S.text }}>{label}</td>
      {sub !== undefined && <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, color:S.dim, fontSize:12 }}>{sub}</td>}
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', fontWeight:700, color: highlight ? S.blueLight : S.text }}>{value}</td>
    </tr>
  )
}

function Table({ headers, children, style={} }) {
  return (
    <div style={{ overflowX:'auto', marginTop:14 }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, ...style }}>
        <thead>
          <tr>{headers.map(h => <th key={h} style={{ padding:'10px 16px', textAlign: h===headers[headers.length-1] ? 'right' : 'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em' }}>{h}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}


function FinanceRow({ label, y1, y2, y3, highlight=false }) {
  const getColor = (value) => {
    if (typeof value === 'string' && value.trim().startsWith('-€')) return '#f87171'
    return highlight ? S.blueLight : S.text
  }

  return (
    <tr>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, fontWeight:500, color:highlight ? S.blueLight : S.text }}>
        {label}
      </td>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, color:getColor(y1), textAlign:'right', fontWeight:highlight ? 700 : 500 }}>
        {y1}
      </td>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, color:getColor(y2), textAlign:'right', fontWeight:highlight ? 700 : 500 }}>
        {y2}
      </td>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, color:getColor(y3), textAlign:'right', fontWeight:highlight ? 700 : 500 }}>
        {y3}
      </td>
    </tr>
  )
}
function Lock({ onUnlock }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function unlock() {
    if (!pw.trim()) return
    setLoading(true)
    setError('')
    try {
      const r = await fetch('/api/plan/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw })
      })
      const d = await r.json()
      if (d.valid) {
        sessionStorage.setItem('plan_unlocked', '1')
        onUnlock()
      } else {
        setError('Onjuist wachtwoord. Probeer het opnieuw.')
        setPw('')
      }
    } catch {
      setError('Verbindingsfout. Probeer het opnieuw.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:`linear-gradient(135deg, #050d1a, ${S.bg})`, display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      <div style={{ position:'fixed', top:'-20%', left:'-10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(37,99,235,0.1) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'fixed', bottom:'-20%', right:'-10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${S.border}`, borderRadius:20, padding:'48px 40px', maxWidth:420, width:'100%', textAlign:'center', backdropFilter:'blur(20px)', boxShadow:'0 25px 60px rgba(0,0,0,0.5)', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:32 }}>
          <div style={{ width:48, height:48, background:'linear-gradient(135deg,#2563eb,#1d4ed8)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:'0 0 24px rgba(37,99,235,0.4)' }}>🛡️</div>
          <span style={{ fontSize:22, fontWeight:800, color:'white' }}>ShieldFlare</span>
        </div>
        <h2 style={{ fontSize:18, fontWeight:700, color:'white', marginBottom:8 }}>🔐 Vertrouwelijk document</h2>
        <p style={{ fontSize:13, color:S.dim, marginBottom:28, lineHeight:1.7 }}>Dit ondernemingsplan is beveiligd. Voer het wachtwoord in om verder te gaan.</p>
        <input
          type="password" value={pw}
          onChange={e => { setPw(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && unlock()}
          placeholder="Wachtwoord"
          style={{ width:'100%', padding:'13px 16px', borderRadius:10, border:`1px solid ${error ? S.red : 'rgba(255,255,255,0.1)'}`, background:'rgba(255,255,255,0.05)', color:'white', fontSize:15, letterSpacing:'0.08em', textAlign:'center', marginBottom:12, outline:'none', boxSizing:'border-box' }}
        />
        {error && <div style={{ color:'#f87171', fontSize:13, marginBottom:12 }}>❌ {error}</div>}
        <button onClick={unlock} disabled={loading || !pw.trim()} style={{ width:'100%', padding:13, borderRadius:10, background:'linear-gradient(135deg,#2563eb,#1d4ed8)', color:'white', border:'none', fontSize:15, fontWeight:700, cursor:'pointer', opacity: loading || !pw.trim() ? 0.7 : 1, boxShadow:'0 0 20px rgba(37,99,235,0.3)' }}>
          {loading ? 'Controleren...' : 'Toegang verkrijgen →'}
        </button>
        <div style={{ marginTop:20, fontSize:12, color:'#334155' }}>ShieldFlare · Ondernemingsplan 2026</div>
      </div>
    </div>
  )
}

function PlanContent() {
  const [activeSection, setActiveSection] = useState(null)

  const navItems = [
    ['samenvatting','📋 Samenvatting'],['ondernemer','👤 Ondernemer'],['onderneming','🏢 Onderneming'],
    ['markt','📊 Markt'],['marketing','📣 Marketing'],['swot','⚖️ SWOT'],
    ['levensvatbaarheid','✅ Levensvatbaar'],['risico','⚠️ Risico'],['ontwikkeling','📚 Ontwikkeling'],['financieel','💰 Financieel'],
  ]

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })
    setActiveSection(id)
  }

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{responsiveCSS}</style>
      <div style={{ minHeight:'100vh', background:S.bg, color:S.text, fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* Nav */}
      <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(10,15,30,0.96)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${S.border}`, padding:'0 20px', display:'flex', alignItems:'center', height:58, gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
          <div style={{ width:30, height:30, background:'linear-gradient(135deg,#2563eb,#1d4ed8)', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>🛡️</div>
          <span style={{ fontSize:15, fontWeight:800 }}>ShieldFlare</span>
        </div>
        <span style={{ fontSize:10, background:S.blueBg, border:`1px solid ${S.blueBorder}`, color:S.blueLight, padding:'2px 8px', borderRadius:20, fontWeight:600, flexShrink:0, display:'var(--badge-display, inline-block)' }}>Ondernemingsplan 2026</span>

        {/* Desktop links */}
        <div className="sf-plan-nav-links" style={{ display:'flex', gap:2, marginLeft:'auto', flexShrink:0 }}>
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false) }}
              style={{ padding:'5px 10px', fontSize:11, color: activeSection===id ? S.blueLight : S.dim, background: activeSection===id ? S.blueBg : 'none', border:'none', borderRadius:6, cursor:'pointer', whiteSpace:'nowrap', fontWeight: activeSection===id ? 600 : 400 }}>
              {label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="sf-plan-hamburger" onClick={() => setMenuOpen(o => !o)}
          style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', padding:8, color:S.text, fontSize:20, display:'none', flexShrink:0 }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sf-plan-mobile-menu" style={{ position:'fixed', top:58, left:0, right:0, zIndex:99, background:'rgba(10,15,30,0.98)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${S.border}`, padding:16, display:'flex', flexDirection:'column', gap:4 }}>
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false) }}
              style={{ padding:'12px 16px', fontSize:14, color: activeSection===id ? S.blueLight : S.text, background: activeSection===id ? S.blueBg : 'none', border:'none', borderRadius:8, cursor:'pointer', textAlign:'left', fontWeight: activeSection===id ? 600 : 400 }}>
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .sf-plan-nav-links { display: none !important; }
          .sf-plan-hamburger { display: flex !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ padding:'72px 40px 56px', textAlign:'center', maxWidth:860, margin:'0 auto' }}>
        <Badge color="blue">Vertrouwelijk ondernemingsplan — 2026</Badge>
        <h1 style={{ fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, letterSpacing:'-0.03em', margin:'20px 0 16px', color:'white', lineHeight:1.15 }}>
          ShieldFlare<br/>
          <span style={{ background:'linear-gradient(135deg,#2563eb,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Next-Generation DDoS Protection</span>
        </h1>
        <p style={{ fontSize:16, color:S.dim, maxWidth:580, margin:'0 auto 36px', lineHeight:1.8 }}>
          Ondernemingsplan voor een cyberbeveiligingsbedrijf dat enterprise-grade DDoS-bescherming toegankelijk maakt voor het MKB, gamers en ontwikkelaars.
        </p>
        <div style={{ display:'flex', gap:28, justifyContent:'center', flexWrap:'wrap' }}>
          {[['Albert Robijn','Oprichter & ontwikkelaar'],['Eenmanszaak','Rechtsvorm'],['(Nog onbekend)','Startjaar'],['2026','Ontwikkelingsjaar'],['Nederland','Vestigingsland']].map(([v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:15, fontWeight:800, color:S.blueLight }}>{v}</div>
              <div style={{ fontSize:11, color:S.dim, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:940, margin:'0 auto', padding:'0 28px 80px' }}>

        {/* 1. Samenvatting */}
        <div id="samenvatting"><Section num="1" title="Samenvatting">
          <Card>
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:16 }}>
              ShieldFlare is een Nederlandse eenmanszaak die gespecialiseerde DDoS-beschermingsdiensten aanbiedt aan kleine en middelgrote bedrijven, gamers en webontwikkelaars. Het platform is volledig zelfgebouwd door oprichter Albert Robijn en biedt functionaliteiten die normaliter alleen beschikbaar zijn voor grote ondernemingen met substantiële IT-budgetten.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:16 }}>
              De dienstverlening omvat DDoS-bescherming op Layer 3, 4 en 7, een geavanceerde reverse proxy, IP Guard via WireGuard-tunnels, gameserver-bescherming, DNS-beheer, e-mailhosting en een volledig resellerplatform. Klanten kunnen kiezen uit vier abonnementen, variërend van gratis tot €80 per maand.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9 }}>
              ShieldFlare onderscheidt zich van concurrenten door dedicated IP-adressen per klant, gameserver-bescherming via TCP/UDP, en een toegankelijke prijs voor Nederlandse MKB-ondernemers. Het platform bevindt zich momenteel in de ontwikkelingsfase. De benodigde startinvestering blijft beheersbaar doordat de kern van het platform al is ontwikkeld en de infrastructuur gefaseerd kan worden opgebouwd.
            </p>
          </Card>
        </Section></div>

        {/* 2. Ondernemer */}
        <div id="ondernemer"><Section num="2" title="Jij als ondernemer">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            <Card title="👤 Persoonlijke gegevens">
              <strong style={{ color:S.text }}>Naam:</strong> Albert Robijn<br/>
              <strong style={{ color:S.text }}>Leeftijd:</strong> 24 jaar<br/>
              <strong style={{ color:S.text }}>Woonplaats:</strong> Nederland<br/>
              <strong style={{ color:S.text }}>Rechtsvorm:</strong> Eenmanszaak<br/>
              <strong style={{ color:S.text }}>Branche:</strong> ICT / Cybersecurity
            </Card>
            <Card title="💪 Sterke eigenschappen">
              <div style={{ lineHeight:2.2 }}>
                ✅ Zelfgeleerde full-stack ontwikkelaar<br/>
                ✅ Brede technische kennis (netwerk, security, servers)<br/>
                ✅ Praktijkgericht en probleemoplossend<br/>
                ✅ Hoge mate van zelfdiscipline<br/>
                ✅ Volledig platform zelfstandig gebouwd
              </div>
            </Card>
          </div>
          <Card title="📄 Curriculum Vitae">
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:S.text, marginBottom:4 }}>Persoonlijke gegevens</div>
              <div style={{ fontSize:13, color:S.dim, lineHeight:2 }}>
                <strong style={{ color:S.text }}>Naam:</strong> Albert Robijn<br/>
                <strong style={{ color:S.text }}>Leeftijd:</strong> 24 jaar<br/>
                <strong style={{ color:S.text }}>Woonplaats:</strong> Nederland<br/>
                <strong style={{ color:S.text }}>Opleiding:</strong> Zelfgeleerd (IT / Webontwikkeling / Cybersecurity)
              </div>
            </div>

            <div style={{ position:'relative', paddingLeft:24 }}>
              <div style={{ position:'absolute', left:8, top:6, bottom:6, width:2, background:`1px solid ${S.border}`, borderLeft:`2px solid rgba(37,99,235,0.3)` }}/>

              {/* GhostDevelopment */}
              <div style={{ marginBottom:24, position:'relative' }}>
                <div style={{ position:'absolute', left:-20, top:4, width:10, height:10, borderRadius:'50%', background:S.blue, boxShadow:`0 0 8px rgba(37,99,235,0.5)` }}/>
                <div style={{ fontSize:11, color:S.blueLight, fontWeight:600, marginBottom:3 }}>nov 2022 – apr 2024 · ca. 1,5 jaar</div>
                <div style={{ fontSize:14, fontWeight:700, color:S.text, marginBottom:2 }}>Freelance Ontwikkelaar — GhostDevelopment</div>
                <div style={{ fontSize:12, color:S.dim, marginBottom:6 }}>Zelfstandig · Nederland</div>
                <div style={{ fontSize:13, color:S.dim, lineHeight:1.8 }}>
                  Ontwikkeling van websites en applicaties voor klanten als zelfstandige onder de naam GhostDevelopment. Werkzaamheden omvatten frontend- en backend-ontwikkeling, klantcommunicatie, projectbeheer en oplevering van maatwerksoftware.
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10 }}>
                  {['Web Development','App Development','Klantcommunicatie','Projectbeheer','Maatwerk software'].map(t => (
                    <span key={t} style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, background:S.blueBg, color:S.blueLight, border:`1px solid ${S.blueBorder}` }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Autogarage */}
              <div style={{ marginBottom:24, position:'relative' }}>
                <div style={{ position:'absolute', left:-20, top:4, width:10, height:10, borderRadius:'50%', background:'#475569', boxShadow:'0 0 6px rgba(71,85,105,0.4)' }}/>
                <div style={{ fontSize:11, color:S.dim, fontWeight:600, marginBottom:3 }}>2025 · ca. 6 maanden</div>
                <div style={{ fontSize:14, fontWeight:700, color:S.text, marginBottom:2 }}>Medewerker — Autogarage</div>
                <div style={{ fontSize:12, color:S.dim, marginBottom:6 }}>Loondienst · Nederland</div>
                <div style={{ fontSize:13, color:S.dim, lineHeight:1.8 }}>
                  Werkzaamheden in een autogarage. Heeft bijgedragen aan de ontwikkeling van werkdiscipline, samenwerken in een team en het omgaan met klanten in een professionele omgeving.
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10 }}>
                  {['Teamwork','Klantgerichtheid','Werkdiscipline'].map(t => (
                    <span key={t} style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, background:'rgba(71,85,105,0.12)', color:'#94a3b8', border:'1px solid rgba(71,85,105,0.2)' }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* ShieldFlare */}
              <div style={{ position:'relative' }}>
                <div style={{ position:'absolute', left:-20, top:4, width:10, height:10, borderRadius:'50%', background:S.green, boxShadow:`0 0 8px rgba(22,163,74,0.5)` }}/>
                <div style={{ fontSize:11, color:S.greenLight, fontWeight:600, marginBottom:3 }}>2026 – heden · in ontwikkeling</div>
                <div style={{ fontSize:14, fontWeight:700, color:S.text, marginBottom:2 }}>Oprichter & Ontwikkelaar — ShieldFlare</div>
                <div style={{ fontSize:12, color:S.dim, marginBottom:6 }}>Zelfstandig · Nederland</div>
                <div style={{ fontSize:13, color:S.dim, lineHeight:1.8 }}>
                  Volledige ontwikkeling van een cyberbeveiligingsplatform inclusief backend (Node.js), frontend (React), database (MariaDB), DNS-systeem, WireGuard-integratie, WAF-proxy, Discord bot en WHMCS-module. Alles zelfstandig gebouwd zonder externe ontwikkelaars.
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10 }}>
                  {['Node.js','React','MariaDB','WireGuard','Cybersecurity','DNS','Linux','Apache'].map(t => (
                    <span key={t} style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, background:S.greenBg, color:S.greenLight, border:`1px solid ${S.greenBorder}` }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card title="🎯 Motivatie & achtergrond" style={{ marginTop:16 }}>
            <p style={{ marginBottom:12 }}>
              Albert Robijn is een zelfgeleerde ontwikkelaar die vanuit eigen interesse en ervaring met servers, netwerken en cybersecurity een volledig cyberbeveiligingsplatform heeft ontwikkeld. Zonder formele opleiding heeft hij zelfstandig de kennis opgebouwd die nodig is om een uitgebreid en professioneel platform te ontwikkelen, van backend-logica en databaseontwerp tot netwerkbeveiliging, DDoS-mitigatie en integraties met externe diensten.
            </p>
            <p>
              De inspiratie voor ShieldFlare komt onder andere voort uit bestaande platforms zoals Cloudflare en het voormalige FluxCDN. FluxCDN was een platform dat zich onder andere richtte op netwerk- en DDoS-bescherming, maar is inmiddels al enige tijd gestopt. Deze platforms hebben laten zien welke mogelijkheden er zijn op het gebied van internetbeveiliging en traffic protection, maar Albert zag daarnaast ruimte voor een oplossing die zich sterker richt op kleinere bedrijven, hobbyisten, hostingbedrijven en gamingcommunities.

              Met ShieldFlare wordt daarom gewerkt aan een betaalbaar en toegankelijk Nederlands alternatief, waarbij functies zoals DDoS-bescherming, gameserver protection, reverse proxy, DNS, WAF en dedicated IP-bescherming via IP Guard binnen één platform worden aangeboden. Het doel is om professionele beveiligingsmogelijkheden toegankelijk te maken voor klanten die niet direct behoefte hebben aan of het budget hebben voor grote enterprise-oplossingen.
            </p>
          </Card>
        </Section></div>

        {/* 3. Onderneming */}
        <div id="onderneming"><Section num="3" title="De onderneming">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            <Card title="🏢 Bedrijfsprofiel">
              <strong style={{ color:S.text }}>Handelsnaam:</strong> ShieldFlare<br/>
              <strong style={{ color:S.text }}>Website:</strong> shieldflare.nl<br/>
              <strong style={{ color:S.text }}>Rechtsvorm:</strong> Eenmanszaak<br/>
              <strong style={{ color:S.text }}>Sector:</strong> ICT-dienstverlening / Cybersecurity<br/>
              <strong style={{ color:S.text }}>Startjaar:</strong> (Nog onbekend)<br/>
              <strong style={{ color:S.text }}>Ontwikkelingsjaar:</strong> 2026
            </Card>
            <Card title="🎯 Missie & visie">
              <strong style={{ color:S.text }}>Missie:</strong><br/>
              Enterprise-grade DDoS-bescherming toegankelijk maken voor iedereen — van hobbyisten tot groeiende bedrijven — zonder het enterprise-prijskaartje.<br/><br/>
              <strong style={{ color:S.text }}>Visie:</strong><br/>
              De toonaangevende Nederlandse aanbieder worden van betaalbare en betrouwbare cyberbeveiligingsdiensten voor het MKB.
            </Card>
          </div>
          <Card title="🛡️ Diensten">
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginTop:8 }}>
              {[
                ['🛡️','DDoS Protection','Layer 3/4/7 mitigatie, automatische detectie, 33.000+ geblokkeerde IP-reputaties'],
                ['🔀','Reverse Proxy','Geavanceerde proxyfunctionaliteit per DNS-record, gecombineerd met ingebouwde WAF- en botbescherming'],
                ['🔒','IP Guard','WireGuard VPN-tunnel per server voor dedicated bescherming'],
                ['🎮','Game Server Protection','TCP/UDP proxy voor Minecraft, FiveM, CS2 en meer'],
                ['🌐','DNS-beheer','Eigen nameservers met volledig recordbeheer'],
                ['📧','E-mailhosting','Volledig geconfigureerde e-mail per domein inclusief DKIM/SPF/DMARC'],
                ['🤖','WAF & Bot Protection','Aanvalspatroondetectie en JavaScript challenge-pagina'],
                ['🏢','Reseller Platform','White-label doorverkoop met commissiesysteem en automatische facturatie'],
                ['📊','Analytics & Monitoring','Uptime-monitoring, SSL-controle en verkeersinzichten'],
              ].map(([icon,name,desc]) => (
                <div key={name} style={{ background:'rgba(37,99,235,0.05)', border:`1px solid ${S.border}`, borderRadius:10, padding:14 }}>
                  <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:S.text, marginBottom:4 }}>{name}</div>
                  <div style={{ fontSize:11, color:S.dim, lineHeight:1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </Section></div>

        {/* 4. Markt */}
        <div id="markt"><Section num="4" title="Marktanalyse">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            <Card title="👥 Doelgroep">
              <div style={{ lineHeight:2.2 }}>
                🏢 <strong style={{ color:S.text }}>MKB-ondernemers</strong> met website of webapplicatie<br/>
                🎮 <strong style={{ color:S.text }}>Gamers en gamingcommunities</strong> (Minecraft, FiveM, CS2)<br/>
                🏷️ <strong style={{ color:S.text }}>Resellers</strong> en hostingbedrijven<br/>
                💻 <strong style={{ color:S.text }}>Ontwikkelaars</strong> met eigen servers<br/>
                🖥️ <strong style={{ color:S.text }}>VPS/dedicated server</strong> eigenaren<br/>
                🌍 <strong style={{ color:S.text }}>Internationale klanten</strong> — platform volledig in het Engels
              </div>
            </Card>
            <Card title="📈 Marktomvang & trends">
              <p style={{ marginBottom:10 }}>De wereldwijde DDoS-beschermingsmarkt groeit jaarlijks met 14–16%. Aanvallen nemen toe in frequentie en omvang, ook gericht op kleinere doelwitten. In Nederland groeit de vraag naar betaalbare cyberbeveiligingsdiensten sterk, met name in het MKB-segment.</p>
              <p>De gameserver-markt is een specifieke niche waar Cloudflare geen TCP/UDP-proxy biedt — een directe kans voor ShieldFlare.</p>
            </Card>
          </div>
          <Card title="🏆 Wat doet ShieldFlare anders?" style={{ marginBottom:16 }}>
            <p style={{ marginBottom:16, fontSize:14, color:S.text, lineHeight:1.8 }}>
              ShieldFlare is niet zomaar een alternatief voor Cloudflare. Het platform is gebouwd vanuit een specifieke behoefte die grote aanbieders onvoldoende invullen: betaalbare, flexibele bescherming voor kleine ondernemers, gameservers en resellers — alles onder één dak.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:14, marginBottom:16 }}>
              {[
                ['🎮','Gameserver Protection','Cloudflare biedt geen TCP/UDP-proxy voor gameservers. ShieldFlare wel — specifiek voor Minecraft, FiveM, CS2 en meer. Spelers merken geen verschil, aanvallen worden onzichtbaar afgeweerd.'],
                ['🔒','IP Guard via WireGuard','Klanten met een dedicated server of VPS kunnen hun echte IP-adres volledig verbergen achter een ShieldFlare-tunnel. Aanvallers zien nooit het echte serveradres.'],
                ['🏷️','Volledig reseller platform','Hostingbedrijven kunnen ShieldFlare-diensten onder eigen naam doorverkopen. Cloudflare biedt dit alleen in dure enterprise-contracten. ShieldFlare maakt het toegankelijk vanaf €80/mnd Enterprise.'],
                ['🌐','Alles-in-één platform','Waar klanten bij Cloudflare nog aparte diensten nodig hebben voor e-mail, DNS en monitoring, biedt ShieldFlare dit alles geïntegreerd op één plek.'],
                ['🇳🇱','Nederlands en toegankelijk','ShieldFlare is volledig Nederlandstalig, richt zich specifiek op de Nederlandse markt en biedt persoonlijke ondersteuning via Discord.'],
                ['💰','Betaalbaar voor klein MKB','Met een gratis instapplan en abonnementen vanaf €10 per maand is ShieldFlare bereikbaar voor iedereen — van hobbyisten tot groeiende webshops.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ background:'rgba(37,99,235,0.05)', border:`1px solid ${S.border}`, borderRadius:12, padding:18 }}>
                  <div style={{ fontSize:24, marginBottom:10 }}>{icon}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:S.text, marginBottom:8 }}>{title}</div>
                  <div style={{ fontSize:12, color:S.dim, lineHeight:1.7 }}>{desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background:S.blueBg, border:`1px solid ${S.blueBorder}`, borderRadius:12, padding:18 }}>
              <div style={{ fontSize:13, fontWeight:700, color:S.blueLight, marginBottom:10 }}>📌 Kernboodschap</div>
              <div style={{ fontSize:13, color:S.dim, lineHeight:1.8 }}>
                ShieldFlare combineert wat grote aanbieders apart verkopen — en maakt dit betaalbaar voor een markt die tot nu toe tussen wal en schip valt. Cloudflare is te beperkt voor gameservers en biedt geen dedicated IP-bescherming. Path.net is uitstekend voor gameservers maar heeft geen reseller-platform en kost tot $500 per maand. OVHcloud biedt infrastructuur maar geen volledig beheerd beveiligingsplatform. ShieldFlare vult precies deze leemte: een volledig beheerd, betaalbaar en Nederlands platform waarbij klanten zelf kunnen kiezen hoeveel bescherming ze nodig hebben.
              </div>
            </div>
          </Card>

          <Card title="⚔️ Concurrentieanalyse">
            <p style={{ marginBottom:12, fontSize:13 }}>ShieldFlare opereert zowel op de Nederlandse als internationale markt. Het platform is volledig in het Engels, waardoor internationale klanten direct geholpen kunnen worden.</p>
            <div style={{ overflowX:'auto', marginTop:8 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
                <thead>
                  <tr>{['Aanbieder','Prijs','Game servers','Dedicated IP','Reseller','Engels platform'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign:'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['ShieldFlare','€0–€80/mnd','✅ Ja','✅ Ja','✅ Ja','✅ Ja'],
                    ['Cloudflare','$0–€200+/mnd','❌ Nee','❌ Nee','⚠️ Beperkt','✅ Ja'],
                    ['OVHcloud','€5–€50/mnd','⚠️ Beperkt','✅ Ja','❌ Nee','✅ Ja'],
                    ['Path.net','$20–$500/mnd','✅ Ja','✅ Ja','❌ Nee','✅ Ja'],
                  ].map(([name,...cells]) => (
                    <tr key={name}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, fontWeight:700, color:name==='ShieldFlare'?S.blueLight:S.text }}>{name}</td>
                      {cells.map((c,i) => <td key={i} style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.dim }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section></div>

        {/* 5. Marketing */}
        <div id="marketing"><Section num="5" title="Marketingplan">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            <Card title="🛡️ Product">
              <p>ShieldFlare biedt een SaaS-platform met vier abonnementsniveaus (Free, Starter, Pro, Enterprise) en een pay-per-use component via bandwidth-credits (€0,10/GB). Het Free-abonnement fungeert als lead-generator; gebruikers upgraden naarmate hun beschermingsbehoefte groeit.</p>
            </Card>
            <Card title="💰 Prijs">
              <div style={{ lineHeight:2 }}>
                <strong style={{ color:S.text }}>Free</strong> — €0/mnd · 1 domein, basisbeveiliging<br/>
                <strong style={{ color:S.text }}>Starter</strong> — €10/mnd · 2 domeinen, IP Guard, e-mail<br/>
                <strong style={{ color:S.text }}>Pro</strong> — €25/mnd · 5 domeinen, WAF, analytics<br/>
                <strong style={{ color:S.text }}>Enterprise</strong> — €80/mnd · Onbeperkt, white-label, SLA
              </div>
            </Card>
            <Card title="📍 Kanalen">
              <div style={{ lineHeight:2.2 }}>
                🎮 <strong style={{ color:S.text }}>Discord</strong> — Nederlandse en internationale gaming communities<br/>
                🔍 <strong style={{ color:S.text }}>SEO</strong> — organisch verkeer via Google (NL + EN)<br/>
                💬 <strong style={{ color:S.text }}>Mond-tot-mond</strong> — gratis tier als vliegwiel<br/>
                🏷️ <strong style={{ color:S.text }}>Resellers</strong> — via WHMCS module, ook internationaal<br/>
                🌍 <strong style={{ color:S.text }}>Engelstalig platform</strong> — direct geschikt voor internationale klanten<br/>
                📣 <strong style={{ color:S.text }}>Social media</strong> — LinkedIn, Reddit, TikTok, Discord, Instagram, X
              </div>
            </Card>
            <Card title="📣 Promotie">
              <p style={{ marginBottom:10 }}>De primaire groeistrategie is een freemium-model: het gratis abonnement trekt gebruikers aan die vervolgens upgraden. Dit vermindert de marketingkosten aanzienlijk.</p>
              <p>Aanvullend: gerichte Google Ads-campagnes op zoektermen als "DDoS bescherming Nederland", content marketing via een kennisbank, en actieve aanwezigheid in gaming Discord-servers.</p>
            </Card>
          </div>
        </Section></div>

        {/* 6. SWOT */}
        <div id="swot"><Section num="6" title="SWOT-analyse">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16 }}>
            {[
              ['💪 Sterktes','green',[
                'Volledig zelfgebouwd platform — geen licentiekosten',
                'Unieke combinatie: gameserver + IP Guard + reseller',
                'Lage operationele kosten door eigen ontwikkeling',
                'Snelle doorlooptijd van idee naar implementatie',
                'Technische diepgang en flexibiliteit',
              ]],
              ['⚠️ Zwaktes','orange',[
                'Nog geen betalende klanten (ontwikkelingsfase)',
                'Eén persoon — beperkte capaciteit bij groei',
                'Geen formele opleiding of certificeringen',
                'Beperkt marketingbudget in de beginfase',
                'Afhankelijkheid van externe VPS-providers',
              ]],
              ['🚀 Kansen','blue',[
                'Groeiende vraag naar cybersecurity door toenemende aanvallen',
                'Cloudflare dekt geen TCP/UDP voor gameservers',
                'Reseller-markt: hostingbedrijven zoeken white-label oplossingen',
                'WHMCS-module opent de bestaande hosting-markt',
                'Nederlandstalige markt is onderbedeeld door internationale spelers',
              ]],
              ['⚡ Bedreigingen','purple',[
                'Cloudflare kan markt betreden met gameserver-oplossing',
                'DDoS-aanvallen op eigen infrastructuur',
                'IPv4-schaarste drijft kosten voor dedicated IPs omhoog',
                'Kwaliteitseisen groeien naarmate klantbase groeit',
                'Wet- en regelgeving rondom gegevensverwerking (AVG)',
              ]],
            ].map(([title, color, items]) => (
              <Card key={title} title={title}>
                <ul style={{ paddingLeft:16, lineHeight:2 }}>
                  {items.map(item => <li key={item} style={{ fontSize:13 }}>{item}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        </Section></div>

        {/* 7. Levensvatbaarheid & urenverantwoording */}
        <div id="levensvatbaarheid"><Section num="7" title="Levensvatbaarheid & urenverantwoording">

          <Card title="✅ Levensvatbaarheid — conclusie" style={{ marginBottom:16 }}>
            <p style={{ fontSize:15, color:S.text, lineHeight:1.9, marginBottom:16 }}>
              Het Bbz vereist dat een onderneming binnen 3 jaar levensvatbaar is: het bedrijf moet voldoende inkomen genereren om in het levensonderhoud van de ondernemer te voorzien én de bedrijfskosten te dekken. Hieronder wordt aangetoond dat ShieldFlare aan deze eis voldoet.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:14, marginBottom:20 }}>
              {[
                ['🏠 Privébehoefte/mnd','€ 320','Vaste persoonlijke lasten (thuis wonend)'],
                ['🖥️ Bedrijfskosten/mnd','€ 1.116','Inclusief infrastructuur, marketing, admin'],
                ['💰 Break-even omzet/mnd','~€ 1.200','Bedrijfskosten + kleine privébuffer'],
                ['👥 Benodigde klanten','~47–51','Bij gem. €24/klant/mnd'],
                ['📅 Verwacht break-even','Jaar 2','Op basis van groeiprognose'],
                ['📈 Resultaat jaar 3','+€ 42.214','Ruim boven levensvatbaarheidsnorm'],
              ].map(([label, value, sub]) => (
                <div key={label} style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:12, padding:16, textAlign:'center' }}>
                  <div style={{ fontSize:11, color:S.dim, marginBottom:6 }}>{label}</div>
                  <div style={{ fontSize:20, fontWeight:800, color:S.blueLight }}>{value}</div>
                  <div style={{ fontSize:11, color:S.dim, marginTop:4 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background:S.greenBg, border:`1px solid ${S.greenBorder}`, borderRadius:12, padding:18, marginBottom:16 }}>
              <div style={{ fontSize:13, fontWeight:700, color:S.greenLight, marginBottom:8 }}>🎯 Conclusie levensvatbaarheid</div>
              <div style={{ fontSize:13, color:S.dim, lineHeight:1.8 }}>
                Op basis van de exploitatiebegroting wordt ShieldFlare in jaar 2 operationeel winstgevend en in jaar 3 structureel levensvatbaar met een positief bedrijfsresultaat van ruim €42.000. Dit is ruimschoots voldoende om in het levensonderhoud te voorzien (privébehoefte €320/mnd = €3.840/jaar) en de bedrijfskosten te dekken.
                <br/><br/>
                De lage privébehoefte van Albert Robijn (thuis wonend, geen huur) maakt dat de levensvatbaarheidsdrempel relatief laag ligt. Het bedrijf hoeft slechts circa 50 betalende klanten te bereiken om volledig zelfvoorzienend te zijn — een realistisch doel binnen de gestelde 3 jaar.
              </div>
            </div>

            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['','Jaar 1','Jaar 2','Jaar 3'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign: h==='' ? 'left' : 'right', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Bedrijfsresultaat','-€ 8.576','+€ 6.894','+€ 42.214'],
                    ['Privébehoefte (jaar)','-€ 3.840','-€ 3.840','-€ 3.840'],
                    ['Netto beschikbaar','-€ 12.416','+€ 3.054','+€ 38.374'],
                    ['Levensvatbaar?','❌ Nee (aanloopverlies)','✅ Ja','✅ Ja — ruimschoots'],
                  ].map(([label, y1, y2, y3]) => (
                    <tr key={label}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, fontWeight:500, color:S.text }}>{label}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color: y1.startsWith('-') ? '#f87171' : y1.startsWith('+') ? S.greenLight : S.dim }}>{y1}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color: y2.startsWith('-') ? '#f87171' : y2.startsWith('+') || y2.includes('✅') ? S.greenLight : S.dim }}>{y2}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color: y3.startsWith('-') ? '#f87171' : y3.startsWith('+') || y3.includes('✅') ? S.greenLight : S.dim }}>{y3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop:10, fontSize:11, color:S.dim, fontStyle:'italic' }}>
              Het aanloopverlies in jaar 1 wordt gedekt door de gevraagde Bbz-financiering van €25.000. Vanaf jaar 2 is het bedrijf in staat zichzelf te bedruipen.
            </p>
          </Card>

          <Card title="⏱️ Urenverantwoording">
            <p style={{ marginBottom:16, fontSize:13, lineHeight:1.8 }}>
              Het Bbz vereist dat een ondernemer minimaal <strong style={{ color:S.text }}>1.225 uur per jaar</strong> aan het bedrijf besteedt. Dit komt neer op gemiddeld circa 23–24 uur per week. Hieronder wordt aangetoond dat Albert Robijn ruimschoots aan deze eis voldoet.
            </p>

            <div style={{ overflowX:'auto', marginBottom:16 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['Activiteit','Uren/week','Uren/jaar'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign: h==='Uren/jaar' ? 'right' : 'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Productontwikkeling & technisch beheer','12 uur','624 uur'],
                    ['Klantenondersteuning & tickets beantwoorden (dagelijks)','7 uur','364 uur'],
                    ['Servermonitoring & incidentbeheer','4 uur','208 uur'],
                    ['Marketing & sales','4 uur','208 uur'],
                    ['Netwerk & communities (Discord, Reddit, LinkedIn)','2 uur','104 uur'],
                    ['Overleg met accountant & zakelijke administratie','1 uur','52 uur'],
                  ].map(([act, pw, py]) => (
                    <tr key={act}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.text }}>{act}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.dim }}>{pw}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', fontWeight:600, color:S.text }}>{py}</td>
                    </tr>
                  ))}
                  <tr style={{ background:'rgba(37,99,235,0.08)' }}>
                    <td style={{ padding:'9px 14px', fontWeight:800, color:S.blueLight }}>Totaal</td>
                    <td style={{ padding:'9px 14px', fontWeight:800, color:S.blueLight }}>30 uur/week</td>
                    <td style={{ padding:'9px 14px', textAlign:'right', fontWeight:800, color:S.blueLight }}>1.560 uur/jaar</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background:S.greenBg, border:`1px solid ${S.greenBorder}`, borderRadius:10, padding:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:S.greenLight, marginBottom:4 }}>✅ Conclusie urenverantwoording</div>
              <div style={{ fontSize:12, color:S.dim, lineHeight:1.7 }}>
                Albert Robijn besteedt naar verwachting gemiddeld <strong style={{ color:S.text }}>30 uur per week</strong> aan ShieldFlare, wat neerkomt op circa <strong style={{ color:S.text }}>1.560 uur per jaar</strong>. Dit is ruim boven de Bbz-minimumeis van 1.225 uur per jaar. Klantenondersteuning en monitoring vinden dagelijks plaats. De financiële administratie wordt uitbesteed aan een accountant. Doordat Albert thuis woont en geen andere fulltime werkzaamheden heeft, is deze tijdsinvestering realistisch en haalbaar.
              </div>
            </div>
          </Card>

        </Section></div>

        {/* 8. Risicoanalyse */}
        <div id="risico"><Section num="8" title="Risicoanalyse">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            {[
              ['🖥️','Serveruitval','Als de primaire server uitvalt, kunnen klanten tijdelijk geen gebruik maken van de diensten. ShieldFlare mitigeert dit risico door gebruik te maken van twee aparte VPS-providers (OVH en Hetzner) en automatische health checks die uitval direct detecteren. Bij groei wordt een tweede dedicated server toegevoegd voor redundantie.','Kans: Laag · Impact: Hoog'],
              ['👥','Onvoldoende klanten in jaar 1','Het risico bestaat dat de klantengroei in het eerste jaar achterblijft bij de prognose. Dit wordt opgevangen door de werkkapitaalbuffer van €12.400 in de financieringsaanvraag, waardoor het bedrijf ook bij tegenvallende omzet minimaal twee jaar kan doordraaien.','Kans: Gemiddeld · Impact: Gemiddeld'],
              ['🛡️','DDoS-aanval op eigen infrastructuur','Als cybercriminelen ShieldFlare zelf aanvallen, kan dit de dienstverlening verstoren. ShieldFlare gebruikt OVH Anti-DDoS als eerste verdedigingslinie en monitort het eigen netwerk continu via eigen monitoring tools.','Kans: Gemiddeld · Impact: Hoog'],
              ['🔑','Gegevensverlies of beveiligingsincident','Een beveiligingslek bij klantdata kan reputatieschade veroorzaken. ShieldFlare slaat minimale persoonsgegevens op, gebruikt versleutelde verbindingen en maakt dagelijks backups. Bij een incident wordt direct gecommuniceerd conform de AVG-meldplicht.','Kans: Laag · Impact: Hoog'],
              ['📉','Concurrentie van grote spelers','Cloudflare of een andere grote partij kan gameserverbescherming toevoegen aan hun platform. ShieldFlare reageert hierop door de nichefocus te behouden, het reseller-platform verder uit te bouwen en Nederlandse klantenservice als onderscheidend voordeel te benutten.','Kans: Laag · Impact: Gemiddeld'],
              ['⚖️','Wet- en regelgeving (AVG)','ShieldFlare verwerkt persoonsgegevens van klanten. Dit brengt verplichtingen mee onder de AVG. ShieldFlare registreert zich als verwerkingsverantwoordelijke, stelt een privacybeleid op en verwerkt alleen noodzakelijke gegevens.','Kans: Laag · Impact: Gemiddeld'],
            ].map(([icon, title, desc, kans]) => (
              <div key={title} style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, padding:20 }}>
                <div style={{ fontSize:24, marginBottom:10 }}>{icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:S.text, marginBottom:6 }}>{title}</div>
                <div style={{ fontSize:12, color:S.dim, lineHeight:1.7, marginBottom:10 }}>{desc}</div>
                <span style={{ fontSize:10, fontWeight:600, padding:'2px 9px', borderRadius:20, background:S.orangeBg, color:S.orangeLight, border:`1px solid ${S.orangeBorder}` }}>{kans}</span>
              </div>
            ))}
          </div>
          <Card title="📋 Risicomatrix samenvatting">
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['Risico','Kans','Impact','Maatregel'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign:'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Serveruitval','Laag','Hoog','Redundante infrastructuur, health checks'],
                    ['Onvoldoende klanten','Gemiddeld','Gemiddeld','Werkkapitaalbuffer 2 jaar'],
                    ['DDoS op eigen infra','Gemiddeld','Hoog','OVH Anti-DDoS + eigen monitoring'],
                    ['Beveiligingsincident','Laag','Hoog','Backups, encryptie, AVG-meldplicht'],
                    ['Grote concurrent','Laag','Gemiddeld','Nichefocus + reseller-platform'],
                    ['AVG/regelgeving','Laag','Gemiddeld','Privacybeleid + minimale dataopslag'],
                  ].map(([r,k,i,m]) => (
                    <tr key={r}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, fontWeight:500, color:S.text }}>{r}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color: k==='Hoog'?'#f87171':k==='Gemiddeld'?S.orangeLight:S.greenLight }}>{k}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color: i==='Hoog'?'#f87171':i==='Gemiddeld'?S.orangeLight:S.greenLight }}>{i}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.dim, fontSize:12 }}>{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section></div>

        {/* 8. Persoonlijke ontwikkeling */}
        <div id="ontwikkeling"><Section num="9" title="Persoonlijke ontwikkeling">
          <Card style={{ marginBottom:16 }}>
            <p style={{ fontSize:15, color:S.text, lineHeight:1.9, marginBottom:0 }}>
              Albert Robijn heeft als zelfgeleerde ontwikkelaar al een breed technisch fundament opgebouwd. Om ShieldFlare verder te professionaliseren en de geloofwaardigheid richting zakelijke klanten te vergroten, is het de bedoeling om de komende jaren gerichte certificeringen te behalen en kennis verder te verdiepen op het gebied van netwerken, cybersecurity en cloudinfrastructuur.
            </p>
          </Card>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            {[
              ['🌐','CompTIA Network+','Fundamentele netwerkcertificering die kennis van TCP/IP, routing, switching en netwerkbeveiliging valideert. Relevant voor de verdere ontwikkeling van ShieldFlare netwerkinfrastructuur.','Prioriteit: Hoog'],
              ['🛡️','CompTIA Security+','Breed erkende cybersecuritycertificering die aantoont dat Albert de benodigde kennis heeft om beveiligingsdiensten professioneel aan te bieden. Vergroot vertrouwen bij zakelijke klanten.','Prioriteit: Hoog'],
              ['🔒','Certified Ethical Hacker (CEH)','Certificering gericht op offensieve beveiligingstechnieken. Helpt bij het beter begrijpen van aanvalsmethoden en het verder verbeteren van ShieldFlare detectie- en mitigatiecapaciteiten.','Prioriteit: Gemiddeld'],
              ['☁️','AWS / Azure Cloud Fundamentals','Basiskennis van cloudplatforms. Relevant voor toekomstige uitbreiding van ShieldFlare naar meerdere locaties en cloudgebaseerde infrastructuur.','Prioriteit: Gemiddeld'],
              ['📊','Boekhouden voor ondernemers','Praktische kennis van financiële administratie, BTW-aangifte en ondernemersfiscaliteit. Noodzakelijk voor het zelfstandig bijhouden van de administratie in de beginfase.','Prioriteit: Hoog'],
              ['🤝','Ondernemersvaardigheden','Cursussen op het gebied van klantcommunicatie, onderhandelen en marketing. Helpt bij het professioneel benaderen van potentiële klanten en resellers.','Prioriteit: Gemiddeld'],
            ].map(([icon, title, desc, prio]) => (
              <div key={title} style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, padding:20 }}>
                <div style={{ fontSize:24, marginBottom:10 }}>{icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:S.text, marginBottom:6 }}>{title}</div>
                <div style={{ fontSize:12, color:S.dim, lineHeight:1.7, marginBottom:10 }}>{desc}</div>
                <span style={{ fontSize:10, fontWeight:600, padding:'2px 9px', borderRadius:20, background: prio.includes('Hoog') ? S.greenBg : S.blueBg, color: prio.includes('Hoog') ? S.greenLight : S.blueLight, border:`1px solid ${prio.includes('Hoog') ? S.greenBorder : S.blueBorder}` }}>{prio}</span>
              </div>
            ))}
          </div>
          <Card title="🎯 Doelstelling persoonlijke ontwikkeling">
            <p style={{ fontSize:13, lineHeight:1.8 }}>
              De certificeringen worden gefaseerd behaald. In het eerste jaar ligt de focus op CompTIA Network+, CompTIA Security+ en basiskennis boekhouden. Deze drie vormen de basis voor professionele dienstverlening en correcte administratie. In jaar 2 en 3 worden aanvullende certificeringen behaald naarmate het bedrijf groeit en de behoefte aan gespecialiseerde kennis toeneemt.
            </p>
          </Card>
        </Section></div>

        {/* 9. Financieel */}
        <div id="financieel"><Section num="7" title="Financieel plan">

          {/* Investeringsbegroting */}

          <Card title="📊 1. Investerings- en startbegroting" style={{ marginBottom:16 }}>
            <p style={{ marginBottom:14, fontSize:13 }}>
              Voor de start van ShieldFlare is een aanzienlijk groter werkkapitaal nodig dan bij een reguliere kleine SaaS-startup.
              De belangrijkste kostenpost is de capaciteit voor dedicated IPv4-adressen. ShieldFlare wil starten met 250 IPv4-adressen
              voor IP Guard en dedicated IP-diensten. Daarnaast is één dedicated OVH-server en een vRack-netwerkvoorziening nodig.
            </p>

            <div style={{ background:S.blueBg, border:`1px solid ${S.blueBorder}`, borderRadius:12, padding:16, marginBottom:18 }}>
              <div style={{ fontSize:11, color:S.dim, marginBottom:4 }}>Belangrijkste infrastructuurbehoefte</div>
              <div style={{ fontSize:24, fontWeight:900, color:S.blueLight }}>€ 815 / maand</div>
              <div style={{ fontSize:12, color:S.dim, marginTop:4 }}>
                exclusief btw en exclusief overige zakelijke kosten
              </div>
            </div>

            <Table headers={['Post','Berekening','Per maand','Per jaar']}>
              <FinanceRow
                label="250 IPv4-adressen"
                y1="250 × €2"
                y2="€ 500"
                y3="€ 6.000"
                highlight
              />
              <FinanceRow
                label="1 dedicated OVH-server"
                y1="1 × €200*"
                y2="€ 200"
                y3="€ 2.400"
                highlight
              />
              <FinanceRow
                label="2 bestaande VPS'en"
                y1="2 × €45"
                y2="€ 90"
                y3="€ 1.080"
              />
              <FinanceRow
                label="vRack / netwerkreserve"
                y1="Begroot"
                y2="€ 25"
                y3="€ 300"
              />
              <FinanceRow
                label="Zakelijke bankrekening"
                y1="€10/mnd"
                y2="€ 10"
                y3="€ 120"
              />
              <FinanceRow
                label="Boekhoudsoftware"
                y1="€13/mnd"
                y2="€ 13"
                y3="€ 156"
              />
              <FinanceRow
                label="WHMCS"
                y1="€15/mnd"
                y2="€ 15"
                y3="€ 180"
              />
              <FinanceRow
                label="Verzekering"
                y1="Begroot"
                y2="€ 50"
                y3="€ 600"
              />
              <FinanceRow
                label="Backup & monitoring"
                y1="Begroot"
                y2="€ 25"
                y3="€ 300"
              />
              <FinanceRow
                label="Domeinen"
                y1="—"
                y2="—"
                y3="€ 50"
              />
              <FinanceRow
                label="Marketing"
                y1="Gemiddeld"
                y2="€ 125"
                y3="€ 1.500"
              />
              <FinanceRow
                label="Overige/onvoorzien"
                y1="—"
                y2="€ 63"
                y3="€ 750"
              />
              <FinanceRow
                label="Totale geraamde exploitatiekosten"
                y1="—"
                y2="€ 1.116"
                y3="€ 13.436"
                highlight
              />
            </Table>

            <p style={{ marginTop:12, fontSize:11, color:S.dim }}>
              * €200 per dedicated server is momenteel een begrotingsaanname voor het ondernemingsplan.
              Zodra de definitieve OVH-configuratie is gekozen, kan dit bedrag worden aangepast.
              De €2 per IPv4-adres is de opgegeven prijs excl. btw.
            </p>
          </Card>

          {/* Financieringsbegroting */}

          <Card title="💳 2. Financieringsbegroting & benodigd startkapitaal" style={{ marginBottom:16 }}>
            <p style={{ marginBottom:14, fontSize:13 }}>
              Omdat ShieldFlare direct met 250 IPv4-adressen en één dedicated server wil starten,
              is naast de directe opstartkosten ook voldoende liquiditeitsruimte nodig voor de eerste twee jaar.
              In het eerste jaar is nog onzeker hoeveel klanten daadwerkelijk worden behaald. Daarnaast wordt
              verwacht dat het bedrijf in jaar 2 nog niet volledig winstgevend is en het eerder opgebouwde
              tekort eerst moet worden ingelopen. Het gevraagde bedrag bestaat daarom uit de benodigde
              opstartkosten, marketing, werkkapitaal en een extra buffer om ook jaar 2 financieel te kunnen overbruggen.
            </p>

            <div style={{ background:S.greenBg, border:`1px solid ${S.greenBorder}`, borderRadius:12, padding:18, marginBottom:18 }}>
              <div style={{ fontSize:11, color:S.dim, marginBottom:4 }}>Aanbevolen financieringsaanvraag</div>
              <div style={{ fontSize:30, fontWeight:900, color:S.greenLight }}>€ 25.000</div>
              <div style={{ fontSize:12, color:S.dim, marginTop:4 }}>
                Bbz-bedrijfskapitaal / startslening — aanvraagbedrag
              </div>
            </div>

            <Table headers={['Financieringsbehoefte','Berekening','Bedrag']}>
              <Row label="250 IPv4-adressen — eerste 12 maanden" sub="250 × €2 × 12 maanden" value="€ 6.000" />
              <Row label="1 dedicated OVH-server — eerste 12 maanden" sub="1 × €200 × 12 maanden" value="€ 2.400" />
              <Row label="2 bestaande VPS'en — eerste 12 maanden" sub="2 × €45 × 12 maanden" value="€ 1.080" />
              <Row label="vRack / netwerkreserve" sub="Begrote reservering" value="€ 300" />
              <Row label="Zakelijke opstart & software" sub="KvK, domeinen, bank, boekhouding, WHMCS" value="€ 500" />
              <Row label="Launch marketing" sub="Google Ads, social media, content en promotie" value="€ 1.500" />
              <Row label="Verzekering, backup, monitoring & overige kosten" sub="Reserve eerste jaar" value="€ 820" />
              <Row label="Werkkapitaalbuffer" sub="Liquiditeitsreserve voor jaar 1 en jaar 2" value="€ 12.400" />
              <Row label="Totale financieringsbehoefte" value="€ 25.000" highlight />
            </Table>

            <Table headers={['Financieringsbron','Bedrag']}>
              <Row label="Eigen vermogen" value="€ 0" />
              <Row label="Bbz-bedrijfskapitaal / startslening (aanvraag)" value="€ 25.000" />
              <Row label="Qredits / alternatief krediet" value="€ 0 — alternatief" />
              <Row label="Totale financiering" value="€ 25.000" highlight />
            </Table>

            <p style={{ marginTop:12, fontSize:12, color:S.dim }}>
              Het bedrag van €25.000 is een ondernemingsplan-begroting en geen garantie op toekenning.
              Het uiteindelijke financieringsbedrag wordt bepaald door de financieringsverstrekker en de
              beoordeling van het ondernemingsplan.
            </p>
          </Card>

          {/* Exploitatiebegroting */}

          <Card title="📈 3. Exploitatiebegroting — jaar 1 t/m 3" style={{ marginBottom:16 }}>
            <p style={{ marginBottom:14, fontSize:13 }}>
              Onderstaande prognose gaat uit van een geleidelijke groei vanuit de huidige bètafase.
              De omzet bestaat uit abonnementen, bandwidth credits en aanvullende omzet via het resellerkanaal.
              De prognose is bewust voorzichtig gehouden in jaar 1 omdat ShieldFlare nog geen grote betalende klantenbasis heeft.
            </p>

            <Table headers={['Post','Jaar 1','Jaar 2','Jaar 3']}>
              <FinanceRow label="Betalende klanten einde jaar" y1="30" y2="100" y3="250" />
              <FinanceRow label="Gemiddeld betalende klanten" y1="15" y2="60" y3="175" />
              <FinanceRow label="Gemiddelde omzet per klant/mnd" y1="€22" y2="€24" y3="€26" />

              <FinanceRow label="Omzet abonnementen" y1="€3.960" y2="€17.280" y3="€54.600" />
              <FinanceRow label="Omzet bandwidth credits" y1="€400" y2="€1.700" y3="€5.500" />
              <FinanceRow label="Resellerkanaal / aanvullende omzet" y1="€500" y2="€2.500" y3="€8.000" />
              <FinanceRow label="Totale omzet" y1="€4.860" y2="€21.480" y3="€68.100" highlight />

              <FinanceRow label="Infrastructuur" y1="€9.780" y2="€9.780" y3="€18.180" />
              <FinanceRow label="Bankrekening" y1="€120" y2="€120" y3="€120" />
              <FinanceRow label="Boekhouding" y1="€156" y2="€156" y3="€156" />
              <FinanceRow label="WHMCS" y1="€180" y2="€180" y3="€180" />
              <FinanceRow label="Verzekering" y1="€600" y2="€600" y3="€600" />
              <FinanceRow label="Backup & monitoring" y1="€300" y2="€300" y3="€300" />
              <FinanceRow label="Domeinen" y1="€50" y2="€50" y3="€50" />
              <FinanceRow label="Marketing" y1="€1.500" y2="€2.400" y3="€4.800" />
              <FinanceRow label="Onvoorzien" y1="€750" y2="€1.000" y3="€1.500" />

              <FinanceRow label="Totale kosten" y1="€13.436" y2="€14.586" y3="€25.886" highlight />
              <FinanceRow label="Bedrijfsresultaat" y1="-€8.576" y2="€6.894" y3="€42.214" highlight />
            </Table>

            <div style={{ background:S.orangeBg, border:`1px solid ${S.orangeBorder}`, borderRadius:10, padding:14, marginTop:16 }}>
              <div style={{ fontSize:12, fontWeight:700, color:S.orangeLight, marginBottom:4 }}>
                📌 Interpretatie van de prognose
              </div>
              <div style={{ fontSize:12, color:S.dim, lineHeight:1.7 }}>
                Jaar 1 is bewust verliesgevend doordat ShieldFlare direct een grote IPv4-capaciteit en
                dedicated infrastructuur financiert voordat de volledige klantenbasis is opgebouwd.
                In jaar 2 wordt naar verwachting operationeel break-even bereikt en ontstaat een positief bedrijfsresultaat. Vanaf jaar 3 ontstaat bij voldoende
                klantgroei een gezonde operationele marge.
              </div>
            </div>

            <p style={{ marginTop:12, fontSize:11, color:S.dim, fontStyle:'italic' }}>
              Alle bedragen zijn begrotingen en afgerond. Werkelijke omzet, klantenaantallen en infrastructuurkosten
              kunnen afwijken. Btw is niet als bedrijfskosten meegenomen.
            </p>
          </Card>

          {/* Kwartaalplanning */}
          <Card title="📊 4. Kwartaalplanning jaar 1" style={{ marginBottom:16 }}>

            <div style={{
              width:'100%',
              overflowX:'auto',
              marginTop:14
            }}>
              <table style={{
                width:'100%',
                borderCollapse:'collapse',
                tableLayout:'fixed',
                fontSize:13
              }}>
                <colgroup>
                  <col style={{ width:'40%' }} />
                  <col style={{ width:'15%' }} />
                  <col style={{ width:'15%' }} />
                  <col style={{ width:'15%' }} />
                  <col style={{ width:'15%' }} />
                </colgroup>

                <thead>
                  <tr>
                    <th style={{
                      padding:'10px 16px',
                      textAlign:'left',
                      background:'rgba(37,99,235,0.08)',
                      color:S.blueLight,
                      fontSize:11,
                      fontWeight:700,
                      textTransform:'uppercase',
                      letterSpacing:'0.06em'
                    }}>Post</th>

                    {['Q1','Q2','Q3','Q4'].map(q => (
                      <th key={q} style={{
                        padding:'10px 16px',
                        textAlign:'right',
                        background:'rgba(37,99,235,0.08)',
                        color:S.blueLight,
                        fontSize:11,
                        fontWeight:700,
                        textTransform:'uppercase',
                        letterSpacing:'0.06em'
                      }}>{q}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, fontWeight:500 }}>Omzet</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right' }}>€700</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right' }}>€1.000</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right' }}>€1.400</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', fontWeight:700 }}>€1.760</td>
                  </tr>

                  <tr>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, fontWeight:500 }}>Infrastructuur & vaste lasten</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color:S.dim }}>€3.400</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color:S.dim }}>€3.300</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color:S.dim }}>€3.300</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', fontWeight:700 }}>€3.436</td>
                  </tr>

                  <tr>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, fontWeight:700 }}>Kwartaalresultaat</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color:'#f87171', fontWeight:700 }}>-€2.700</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color:'#f87171', fontWeight:700 }}>-€2.300</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color:'#f87171', fontWeight:700 }}>-€1.900</td>
                    <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color:'#f87171', fontWeight:700 }}>-€1.676</td>
                  </tr>

                  <tr>
                    <td style={{ padding:'11px 16px', fontWeight:800, color:S.blueLight }}>Cumulatief bedrijfsresultaat</td>
                    <td style={{ padding:'11px 16px', textAlign:'right', fontWeight:800, color:'#f87171' }}>-€2.700</td>
                    <td style={{ padding:'11px 16px', textAlign:'right', fontWeight:800, color:'#f87171' }}>-€5.000</td>
                    <td style={{ padding:'11px 16px', textAlign:'right', fontWeight:800, color:'#f87171' }}>-€6.900</td>
                    <td style={{ padding:'11px 16px', textAlign:'right', fontWeight:800, color:'#f87171' }}>-€8.576</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop:12, fontSize:12, color:S.dim }}>
              De financieringsbuffer van €25.000 is bedoeld om de aanloopverliezen op te vangen en voldoende
              liquiditeit beschikbaar te houden voor de eerste twee jaar van ShieldFlare.
              
              Omdat het bedrijf in de opstartfase nog niet zeker weet of de begrote klantenaantallen in jaar 1
              daadwerkelijk worden behaald, is het verstandig om niet alleen de directe kosten te financieren.
              Ook in jaar 2 blijft financiële ruimte nodig om eventuele tegenvallende omzet op te vangen.
              De extra buffer geeft ShieldFlare de mogelijkheid om de bedrijfsvoering voort te zetten wanneer de
              groei in de eerste twee jaar langzamer verloopt dan verwacht. Op basis van de exploitatiebegroting
              wordt verwacht dat het bedrijf vanaf jaar 3 structureel winstgevend kan worden.
            </p>

            <p style={{ marginTop:12, fontSize:12, color:S.dim }}>
              De kwartaalplanning laat zien hoe de verwachte omzet en vaste lasten
              zich in het eerste jaar ontwikkelen. Het cumulatieve resultaat wordt
              gedurende het jaar geleidelijk opgebouwd en komt in Q4 uit op het
              verwachte jaarresultaat van -€8.576.
            </p>

          </Card>

          {/* Privébegroting */}

          <Card title="🏠 5. Privébegroting" style={{ marginBottom:16 }}>
            <p style={{ marginBottom:14, fontSize:13 }}>
              De privébegroting wordt afzonderlijk gehouden van de zakelijke exploitatie.
              Het ondernemingsplan rekent hieronder met een beperkte persoonlijke maandbehoefte.
            </p>

            <Table headers={['Post','Bedrag/mnd']}>
              <Row label="Zorgverzekering" value="€ 240" />
              <Row label="Spotify (streaming)" value="€ 11" />
              <Row label="Uitvaartverzekering" value="€ 10" />
              <Row label="Eigen risico (gereserveerd)" value="€ 30" />
              <Row label="Overige persoonlijke uitgaven" value="€ 29" />
              <Row label="Totaal privélasten" value="€ 320 / mnd" highlight />
            </Table>

            <p style={{ marginTop:12, fontSize:12, color:S.dim }}>
              De privébegroting staat los van de zakelijke financieringsbehoefte. De zakelijke financiering
              is primair bedoeld voor infrastructuur, IPv4-capaciteit, marketing en werkkapitaal.
            </p>
          </Card>


        {/* 8. Opschaling richting jaar 3 */}
        <div id="opschaling">
          <Section num="8" title="Opschaling richting jaar 3">

            <div
              style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
                gap:16,
                marginBottom:16
              }}
            >

              <Card title="📈 Groei van de infrastructuur">

                <p style={{ marginBottom:12 }}>
                  ShieldFlare is opgezet om de infrastructuur stapsgewijs mee
                  te laten groeien met het aantal klanten en het gebruik van
                  het platform. In de eerste twee jaren wordt gewerkt met een
                  startinfrastructuur van 250 IPv4-adressen, één dedicated
                  server en twee VPS'en.
                </p>

                <p style={{ marginBottom:12 }}>
                  Naar verwachting zijn de beschikbare 250 IPv4-adressen in
                  jaar 3 grotendeels volledig benut. Om verdere groei mogelijk
                  te maken, wordt in jaar 3 opgeschaald naar circa
                  <strong> 500 IPv4-adressen en twee dedicated servers</strong>.
                </p>

                <p style={{ marginBottom:0 }}>
                  Hierdoor ontstaat extra capaciteit voor nieuwe klanten,
                  aanvullende beschermingsdiensten en verdere groei van het
                  platform, zonder dat direct grote investeringen in eigen
                  hardware of een eigen datacenter noodzakelijk zijn.
                </p>

              </Card>


              <Card title="🖥️ Verwachte infrastructuur in jaar 3">

                <div
                  style={{
                    width:'100%',
                    overflowX:'auto',
                    WebkitOverflowScrolling:'touch'
                  }}
                >

                  <table
                    style={{
                      width:'100%',
                      minWidth:500,
                      borderCollapse:'collapse',
                      fontSize:13
                    }}
                  >

                    <thead>
                      <tr>
                        {['Onderdeel','Per maand','Per jaar'].map(h => (
                          <th
                            key={h}
                            style={{
                              padding:'10px 12px',
                              textAlign:h === 'Onderdeel' ? 'left' : 'right',
                              background:'rgba(37,99,235,0.08)',
                              color:S.blueLight,
                              fontSize:11,
                              fontWeight:700,
                              whiteSpace:'nowrap'
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>

                      {[
                        ['500 IPv4-adressen','€ 1.000','€ 12.000'],
                        ['2 dedicated servers','€ 400','€ 4.800'],
                        ['2 bestaande VPS\'en','€ 90','€ 1.080'],
                        ['vRack / netwerk','€ 25','€ 300'],
                      ].map(([name, month, year]) => (
                        <tr key={name}>

                          <td
                            style={{
                              padding:'10px 12px',
                              borderBottom:`1px solid ${S.border}`,
                              color:S.text
                            }}
                          >
                            {name}
                          </td>

                          <td
                            style={{
                              padding:'10px 12px',
                              textAlign:'right',
                              borderBottom:`1px solid ${S.border}`,
                              color:S.dim,
                              whiteSpace:'nowrap'
                            }}
                          >
                            {month}
                          </td>

                          <td
                            style={{
                              padding:'10px 12px',
                              textAlign:'right',
                              borderBottom:`1px solid ${S.border}`,
                              color:S.dim,
                              whiteSpace:'nowrap'
                            }}
                          >
                            {year}
                          </td>

                        </tr>
                      ))}

                      <tr>

                        <td
                          style={{
                            padding:'10px 12px',
                            fontWeight:800,
                            color:S.text
                          }}
                        >
                          Totale infrastructuur
                        </td>

                        <td
                          style={{
                            padding:'10px 12px',
                            textAlign:'right',
                            fontWeight:800,
                            color:S.blueLight,
                            whiteSpace:'nowrap'
                          }}
                        >
                          € 1.515
                        </td>

                        <td
                          style={{
                            padding:'10px 12px',
                            textAlign:'right',
                            fontWeight:800,
                            color:S.blueLight,
                            whiteSpace:'nowrap'
                          }}
                        >
                          € 18.180
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </Card>

            </div>


            <Card title="💡 Gefaseerde investering">

              <p style={{ marginBottom:12 }}>
                De uitbreiding wordt niet direct bij de start aangeschaft. De
                investering wordt pas gedaan wanneer de groei van het
                klantenbestand en het gebruik van de bestaande infrastructuur
                hier aanleiding toe geven. Hierdoor blijft de kapitaalbehoefte
                in de eerste jaren beperkt en wordt uitbreiding gekoppeld aan
                daadwerkelijke groei.
              </p>

              <p style={{ marginBottom:12 }}>
                De hogere infrastructuurkosten in jaar 3 zijn daarom een
                bewuste groeikost. De uitbreiding van 250 naar circa 500
                IPv4-adressen en van één naar twee dedicated servers geeft
                ShieldFlare de benodigde capaciteit om de verwachte groei te
                ondersteunen.
              </p>

              <p style={{ marginBottom:0 }}>
                De langetermijnstrategie blijft: eerst efficiënt gebruikmaken
                van gehuurde infrastructuur, vervolgens stapsgewijs uitbreiden
                en pas bij voldoende schaal onderzoeken of eigen hardware,
                colocatie en een eigen netwerk/BGP-infrastructuur financieel
                aantrekkelijk worden.
              </p>

            </Card>

          </Section>
        </div>

          {/* Break-even */}

          <Card title="⚖️ Break-even analyse">

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginTop:8 }}>

              {[
                ['Infrastructuur per maand','€815','250 IPs + 1 dedicated server + 2 VPS'],
                ['Totale bedrijfskosten/mnd','~€1.120','Inclusief overige vaste lasten'],
                ['Break-even omzet','~€1.200/mnd','Met beperkte transactiekosten'],
                ['Break-even klanten','~47–51','Bij gemiddeld €22–€24 per klant'],
                ['Jaar 1 resultaat','-€8.576','Investering in capaciteit en groei'],
                ['Jaar 2 resultaat','+€6.894','Eerste positieve bedrijfsresultaat'],
                ['Jaar 3 resultaat','+€42.214','Structureel winstgevend bij verdere groei'],
              ].map(([label,value,sub]) => (

                <div key={label} style={{ background:'rgba(37,99,235,0.06)', border:`1px solid ${S.border}`, borderRadius:10, padding:16, textAlign:'center' }}>

                  <div style={{ fontSize:11, color:S.dim, marginBottom:6 }}>{label}</div>

                  <div style={{ fontSize:18, fontWeight:800, color:S.blueLight }}>{value}</div>

                  {sub && <div style={{ fontSize:10, color:S.dim, marginTop:4 }}>{sub}</div>}

                </div>

              ))}

            </div>

            <div style={{ background:S.greenBg, border:`1px solid ${S.greenBorder}`, borderRadius:10, padding:16, marginTop:18 }}>
              <div style={{ fontSize:12, fontWeight:700, color:S.greenLight, marginBottom:5 }}>
                🎯 Financiële doelstelling
              </div>
              <div style={{ fontSize:12, color:S.dim, lineHeight:1.7 }}>
                De belangrijkste financiële doelstelling is om voldoende terugkerende klanten op te bouwen zodat de vaste
                infrastructuurkosten structureel worden gedekt. Door de infrastructuur bewust gefaseerd op te bouwen
                blijft het break-evenpunt bereikbaar. Bij circa 50 betalende klanten komt ShieldFlare naar
                verwachting in de buurt van operationeel break-even.
              </div>
            </div>

          </Card>

        </Section></div>

      </div>

      <div style={{ borderTop:`1px solid ${S.border}`, padding:'24px 32px', textAlign:'center', fontSize:12, color:S.xs }}>
        © 2026 ShieldFlare · Vertrouwelijk ondernemingsplan · Albert Robijn · shieldflare.nl
      </div>
    </div>
    </>
  )
}

export default function Plan() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('plan_unlocked') === '1')
  if (!unlocked) return <Lock onUnlock={() => setUnlocked(true)} />
  return <PlanContent />
}
