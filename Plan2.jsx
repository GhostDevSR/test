root@vps-a07248be:/var/www/Shieldflare/frontend# cat src/pages/Plan.jsx
import { useState, useEffect } from 'react'

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


function FinanceRow({ label, y1, y2, y3, highlight=false, green=false }) {
  const accent = green ? S.greenLight : S.blueLight
  const getColor = (value, isGreen=false) => {
    if (typeof value === 'string' && value.trim().startsWith('-€')) return '#f87171'
    if (value === '—') return S.dim
    if (isGreen) return S.greenLight
    return highlight ? S.blueLight : S.text
  }

  return (
    <tr>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, fontWeight:500, color: highlight ? S.blueLight : S.text }}>
        {label}
      </td>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, color:getColor(y1, false), textAlign:'right', fontWeight:(highlight || green) ? 700 : 500 }}>
        {y1}
      </td>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, color:getColor(y2, green), textAlign:'right', fontWeight:(highlight || green) ? 700 : 500 }}>
        {y2}
      </td>
      <td style={{ padding:'11px 16px', borderBottom:`1px solid ${S.border}`, color:getColor(y3, green), textAlign:'right', fontWeight:(highlight || green) ? 700 : 500 }}>
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
          <img src="https://shieldflare.nl/logo.png" alt="ShieldFlare" style={{ width:48, height:48, borderRadius:12, objectFit:'contain', boxShadow:'0 0 24px rgba(37,99,235,0.4)' }}/>
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

  useEffect(() => {
    const ids = ['samenvatting','ondernemer','onderneming','markt','marketing','swot','levensvatbaarheid','juridisch','risico','ontwikkeling','financieel']
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    }).filter(Boolean)
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const navItems = [
    ['samenvatting','📋 Samenvatting'],['ondernemer','👤 Ondernemer'],['onderneming','🏢 Onderneming'],
    ['markt','📊 Markt'],['marketing','📣 Marketing'],['swot','⚖️ SWOT'],
    ['levensvatbaarheid','✅ Levensvatbaar'],['juridisch','⚖️ Juridisch'],['risico','⚠️ Risico'],['ontwikkeling','📚 Ontwikkeling'],['financieel','💰 Financieel'],
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
          <img src="https://shieldflare.nl/logo.png" alt="ShieldFlare" style={{ width:30, height:30, borderRadius:7, objectFit:'contain' }}/>
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
              Mijn naam is Albert Robijn en ik ben bezig met het opzetten van ShieldFlare, een cyberbeveiligingsbedrijf dat ik volledig zelf heb ontwikkeld. ShieldFlare biedt DDoS-bescherming op Layer 3, 4 en 7, een reverse proxy vergelijkbaar met Cloudflare, gameserver-bescherming via TCP/UDP, IP Guard via WireGuard-tunnels, DNS-beheer, e-mailhosting en een volledig resellerplatform — allemaal binnen één platform, voor een prijs die ook kleine bedrijven, gamers en hobbyisten kunnen betalen.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:16 }}>
              Ik heb het volledige platform zelfstandig gebouwd, zonder externe ontwikkelaars. Van de backend in Node.js en het dashboard in React tot de eigen DNS-bridge, de WireGuard-integratie voor IP Guard, de WAF-proxy met bot protection en een Discord bot met meer dan 22 slash commands. Ook heb ik een WHMCS-module ontwikkeld zodat hostingbedrijven ShieldFlare kunnen integreren in hun eigen omgeving. Het platform is technisch volledig operationeel en bevindt zich momenteel in de afrondende fase voor de officiële lancering.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:16 }}>
              Klanten kunnen kiezen uit vier abonnementen — van een gratis instapplan tot een Enterprise-abonnement van €80 per maand. Aanvullend betalen klanten €0,10 per GB aan verbruikt proxy-verkeer. Resellers kunnen ShieldFlare doorverkopen onder eigen naam via het ingebouwde resellerplatform, inclusief automatische facturering en commissiebeheer.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9 }}>
              Wat ShieldFlare onderscheidt van partijen als Cloudflare is de combinatie van diensten die nergens anders samen beschikbaar is voor deze prijs. Cloudflare biedt geen TCP/UDP-proxy voor gameservers. Path.net doet dat wel, maar heeft geen resellerplatform en kost tot $500 per maand. ShieldFlare vult precies deze leemte — en doet dat met een platform dat volledig in het Engels is, zodat ik zowel Nederlandse als internationale klanten kan bedienen.
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
                  Werkzaamheden in een autogarage. Hier heb ik werkdiscipline opgedaan, leren samenwerken in een team en klanten professioneel te woord gestaan.
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
              Ik heb mezelf alles zelf aangeleerd. Geen opleiding, geen cursus — gewoon doen, uitproberen en doorzetten. Ik ben al jaren bezig met servers, netwerken en beveiliging, en op een gegeven moment besloot ik dat ik daar iets mee wilde doen. Niet als hobby, maar als echt bedrijf.
            </p>
            <p style={{ marginBottom:12 }}>
              De inspiratie voor ShieldFlare komt deels van Cloudflare en van FluxCDN, een platform dat zich richtte op DDoS-bescherming maar inmiddels gestopt is. Ik zag dat er voor kleine bedrijven, gamers en hostingbedrijven eigenlijk geen goede betaalbare oplossing is die alles combineert. Cloudflare beschermt geen gameservers via TCP/UDP. Path.net doet dat wel maar kost honderden euro's per maand. En niemand biedt dit alles in het Engels aan voor de internationale markt.
            </p>
            <p>
              Dat is precies de ruimte die ik zie voor ShieldFlare. Ik wil een platform bouwen waar iemand met een kleine website of een gameserver gewoon terecht kan, zonder dat hij daarvoor een enterprise-contract hoeft af te sluiten of duizenden euro's per maand hoeft te betalen.
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
              Goede DDoS-bescherming betaalbaar maken voor iedereen — of je nu een kleine website hebt, een gameserver draait of een hostingbedrijf runt.<br/><br/>
              <strong style={{ color:S.text }}>Visie:</strong><br/>
              Uitgroeien tot een betrouwbare internationale aanbieder van betaalbare cyberbeveiligingsdiensten, met Nederland als thuisbasis en Europa als groeimarkt.
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
            <p style={{ marginBottom:16, fontSize:14, lineHeight:1.8 }}>
              ShieldFlare is niet zomaar een alternatief voor Cloudflare. Het platform is gebouwd vanuit een specifieke behoefte die grote aanbieders onvoldoende invullen: betaalbare, flexibele bescherming voor kleine ondernemers, gameservers en resellers — alles onder één dak.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:14, marginBottom:16 }}>
              {[
                ['🎮','Gameserver Protection','Cloudflare biedt geen TCP/UDP-proxy voor gameservers. ShieldFlare wel — specifiek voor Minecraft, FiveM, CS2 en meer. Spelers merken geen verschil, aanvallen worden onzichtbaar afgeweerd.'],
                ['🔒','IP Guard via WireGuard','Klanten met een dedicated server of VPS kunnen hun echte IP-adres volledig verbergen achter een ShieldFlare-tunnel. Aanvallers zien nooit het echte serveradres.'],
                ['🏷️','Volledig reseller platform','Hostingbedrijven kunnen ShieldFlare-diensten onder eigen naam doorverkopen. Cloudflare biedt dit alleen in dure enterprise-contracten. ShieldFlare maakt het toegankelijk vanaf €80/mnd Enterprise.'],
                ['🌐','Alles-in-één platform','Waar klanten bij Cloudflare nog aparte diensten nodig hebben voor e-mail, DNS en monitoring, biedt ShieldFlare dit alles geïntegreerd op één plek.'],
                ['🌍','Internationaal en toegankelijk','ShieldFlare is volledig in het Engels — het dashboard, de communicatie en de documentatie. Zo kunnen zowel Nederlandse als internationale klanten direct aan de slag, zonder taalbarrière.'],
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
                ShieldFlare combineert wat grote aanbieders apart verkopen — en maakt dit betaalbaar voor een markt die tot nu toe tussen wal en schip valt. Cloudflare is te beperkt voor gameservers en biedt geen dedicated IP-bescherming. Path.net is uitstekend voor gameservers maar heeft geen reseller-platform en kost tot $500 per maand. OVHcloud biedt infrastructuur maar geen volledig beheerd beveiligingsplatform. ShieldFlare vult precies deze leemte: een volledig beheerd en betaalbaar platform, volledig in het Engels, geschikt voor zowel Nederlandse als internationale klanten.
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
                    ['ShieldFlare','€0–€120/mnd','✅ Ja','✅ Ja','✅ Ja','✅ Ja'],
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
                <strong style={{ color:S.text }}>Starter</strong> — €15/mnd · 2 domeinen, IP Guard, e-mail<br/>
                <strong style={{ color:S.text }}>Pro</strong> — €45/mnd · 5 domeinen, WAF, analytics<br/>
                <strong style={{ color:S.text }}>Enterprise</strong> — €120/mnd · Onbeperkt, white-label, SLA
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
          <Card title="💡 Prijsstrategie onderbouwing" style={{ marginTop:16 }}>
            <p style={{ marginBottom:12 }}>
              De abonnementsprijzen zijn bepaald op basis van drie factoren: de infrastructuurkosten per klant, de marktprijzen van concurrenten en de betalingsbereidheid van de doelgroep.
            </p>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['Plan','Prijs/mnd','Infra/klant','Bruto marge','Doelgroep'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign:'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Free','€0','€2','—','Lead-generatie, gratis instap'],
                    ['Starter','€15','€3','~70%','Hobbyisten, kleine sites'],
                    ['Pro','€45','€5','~80%','MKB, developers'],
                    ['Enterprise','€120','€10','~87%','Bedrijven, resellers'],
                  ].map(([plan,prijs,infra,marge,doel]) => (
                    <tr key={plan}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, fontWeight:600, color:S.text }}>{plan}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.dim }}>{prijs}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.dim }}>{infra}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.greenLight, fontWeight:600 }}>{marge}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.dim, fontSize:12 }}>{doel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop:12, fontSize:12, color:S.dim }}>
              De marges zijn gebaseerd op directe infrastructuurkosten per klant. Vaste kosten (server, marketing, verzekering) worden gedeeld over alle klanten en verbeteren de totale marge naarmate het klantenbestand groeit. Het gratis plan genereert geen omzet maar trekt klanten aan die doorstromen naar betaalde plannen.
            </p>
          </Card>
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
                'Engelstalig platform maakt internationale groei direct mogelijk',
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
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:16 }}>
              Voor de Bbz moet mijn bedrijf binnen 3 jaar genoeg verdienen om van te leven én de kosten te dekken. Hieronder laat ik zien dat ShieldFlare aan deze eis voldoet.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:14, marginBottom:20 }}>
              {[
                ['🏠 Privébehoefte/mnd','€ 320','Vaste persoonlijke lasten (thuis wonend)'],
                ['🖥️ Bedrijfskosten/mnd','€ 1.116','Inclusief infrastructuur, marketing, admin'],
                ['💰 Break-even omzet/mnd','~€ 1.200','Bedrijfskosten + kleine privébuffer'],
                ['👥 Benodigde klanten','~27–33','Bij gem. €35–€45/klant/mnd'],
                ['📅 Eerste winstjaar','Jaar 2','Positief resultaat van +€19.214'],
                ['📈 Resultaat jaar 3','+€ 96.114','Ruim boven levensvatbaarheidsnorm'],
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
                Op basis van de exploitatiebegroting wordt ShieldFlare al in jaar 2 winstgevend met een positief bedrijfsresultaat van ruim €19.000. In jaar 3 groeit dit door naar ruim €96.000. Dit is ruimschoots voldoende om in het levensonderhoud te voorzien (privébehoefte €320/mnd = €3.840/jaar) en de bedrijfskosten te dekken.
                <br/><br/>
                Doordat ik thuis woon en geen huurlasten heb, ligt de levensvatbaarheidsdrempel relatief laag. ShieldFlare hoeft slechts circa 50 betalende klanten te bereiken om volledig zelfvoorzienend te zijn — een realistisch doel binnen de gestelde 3 jaar.
              </div>
            </div>

            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['','Jaar 1','Jaar 2','Jaar 3'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign: h==='' ? 'left' : 'right', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Bedrijfsresultaat (voor belasting)','-€ 6.936','+€ 19.214','+€ 96.114'],
                    ['Inkomstenbelasting','—','-€ 5.800','-€ 30.000'],
                    ['Netto na belasting','-€ 6.936','+€ 13.414','+€ 66.114'],
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
              Voor de Bbz moet ik minimaal <strong style={{ color:S.text }}>1.225 uur per jaar</strong> aan mijn bedrijf besteden. Dat is gemiddeld zo'n 23–24 uur per week. Hieronder laat ik zien dat ik daar ruimschoots aan voldoe.
            </p>

            <div style={{ overflowX:'auto', marginBottom:16 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['Activiteit','Uren/week','Uren/jaar'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign: h==='Uren/jaar' ? 'right' : 'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Productontwikkeling & technisch beheer','16 uur','832 uur'],
                    ['Klantenondersteuning & tickets beantwoorden (dagelijks)','8 uur','416 uur'],
                    ['Servermonitoring & incidentbeheer','5 uur','260 uur'],
                    ['Marketing & sales','6 uur','312 uur'],
                    ['Netwerk & communities (Discord, Reddit, LinkedIn)','3 uur','156 uur'],
                    ['Overleg met accountant & zakelijke administratie','2 uur','104 uur'],
                  ].map(([act, pw, py]) => (
                    <tr key={act}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.text }}>{act}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.dim }}>{pw}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', fontWeight:600, color:S.text }}>{py}</td>
                    </tr>
                  ))}
                  <tr style={{ background:'rgba(37,99,235,0.08)' }}>
                    <td style={{ padding:'9px 14px', fontWeight:800, color:S.blueLight }}>Totaal</td>
                    <td style={{ padding:'9px 14px', fontWeight:800, color:S.blueLight }}>40 uur/week</td>
                    <td style={{ padding:'9px 14px', textAlign:'right', fontWeight:800, color:S.blueLight }}>2.080 uur/jaar</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background:S.greenBg, border:`1px solid ${S.greenBorder}`, borderRadius:10, padding:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:S.greenLight, marginBottom:4 }}>✅ Conclusie urenverantwoording</div>
              <div style={{ fontSize:12, color:S.dim, lineHeight:1.7 }}>
                Ik besteed naar verwachting gemiddeld <strong style={{ color:S.text }}>40 uur per week</strong> aan ShieldFlare, wat neerkomt op circa <strong style={{ color:S.text }}>2.080 uur per jaar</strong>. Dit is ruim boven de Bbz-minimumeis van 1.225 uur per jaar. Klantenondersteuning en monitoring doe ik dagelijks. De financiële administratie besteed ik uit aan een accountant. Doordat ik thuis woon en geen andere fulltime werkzaamheden heb, is deze tijdsinvestering realistisch en haalbaar.
              </div>
            </div>
          </Card>

        </Section></div>

        {/* Juridisch & administratief */}
        <div id="juridisch"><Section num="8" title="Juridische & administratieve zaken">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            <Card title="🏛️ KvK-inschrijving">
              <p style={{ marginBottom:10 }}>
                Als onderdeel van het opstartproces schrijf ik ShieldFlare in bij de Kamer van Koophandel als eenmanszaak. De inschrijving vindt plaats zodra de Bbz-aanvraag is goedgekeurd en de officiële lancering van het platform plaatsvindt.
              </p>
              <p>Na inschrijving ontvang ik een KvK-nummer en BTW-identificatienummer, die worden gebruikt op facturen en in de algemene voorwaarden van ShieldFlare.</p>
            </Card>
            <Card title="💶 BTW">
              <p style={{ marginBottom:10 }}>
                ShieldFlare draait als reguliere BTW-plichtige onderneming. Ik breng <strong style={{ color:S.text }}>21% BTW</strong> in rekening op alle diensten en doe per kwartaal BTW-aangifte bij de Belastingdienst.
              </p>
              <p>De BTW-bedragen in de exploitatie- en financieringsbegroting zijn exclusief BTW weergegeven. De accountant begeleidt mij bij de BTW-administratie en kwartaalaangiften.</p>
            </Card>
            <Card title="📋 Algemene voorwaarden & AVG">
              <p style={{ marginBottom:10 }}>
                ShieldFlare stelt algemene voorwaarden op voor alle klanten, inclusief bepalingen over aansprakelijkheid, serviceniveaus en beëindiging van de overeenkomst.
              </p>
              <p style={{ marginBottom:10 }}>
                Onder de AVG registreer ik mij als verwerkingsverantwoordelijke. ShieldFlare verwerkt minimale persoonsgegevens — alleen wat noodzakelijk is voor de dienstverlening. Er wordt een privacybeleid opgesteld en gepubliceerd op de website.
              </p>
              <p>Bij een eventueel datalek wordt dit binnen 72 uur gemeld bij de Autoriteit Persoonsgegevens.</p>
            </Card>
            <Card title="🛡️ Verzekering">
              <p style={{ marginBottom:10 }}>
                Als cyberbeveiligingsbedrijf is het verstandig om een <strong style={{ color:S.text }}>beroepsaansprakelijkheids&shy;verzekering</strong> af te sluiten. Deze dekt claims van klanten als gevolg van fouten of tekortkomingen in de dienstverlening.
              </p>
              <p>Daarnaast overweeg ik een <strong style={{ color:S.text }}>cyberverzekering</strong> die schade door datalekken of aanvallen op eigen infrastructuur dekt. De kosten hiervoor zijn begroot op circa €50 per maand en zijn opgenomen in de exploitatiebegroting.</p>
            </Card>
            <Card title="📊 Boekhouding & accountant">
              <p style={{ marginBottom:10 }}>
                De financiële administratie besteed ik uit aan een accountant. Dit omvat de jaarrekening, BTW-aangifte (indien van toepassing) en inkomstenbelastingaangifte.
              </p>
              <p>De kosten voor boekhoudsoftware en accountant zijn begroot op circa <strong style={{ color:S.text }}>€13 per maand</strong> voor software en aanvullend accountantskosten op jaarbasis. Dit is opgenomen in de exploitatiebegroting.</p>
            </Card>
            <Card title="📜 Intellectueel eigendom">
              <p>
                De volledige broncode van ShieldFlare is eigendom van Albert Robijn. Er worden geen open-source licenties gebruikt die eigendomsrechten beperken. Bij eventuele toekomstige samenwerking of verkoop van het bedrijf blijft het intellectueel eigendom bij de oprichter, tenzij contractueel anders overeengekomen.
              </p>
            </Card>
          </div>
        </Section></div>

        {/* 9. Risicoanalyse */}
        <div id="risico"><Section num="9" title="Risicoanalyse">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            {[
              ['🖥️','Serveruitval','Als de primaire server uitvalt, kunnen klanten tijdelijk geen gebruik maken van de diensten. ShieldFlare mitigeert dit risico door gebruik te maken van twee aparte VPS-providers (OVH en Hetzner) en automatische health checks die uitval direct detecteren. Bij groei wordt een tweede dedicated server toegevoegd voor redundantie.','Kans: Laag · Impact: Hoog'],
              ['👥','Onvoldoende klanten in jaar 1','Het risico bestaat dat de klantengroei in het eerste jaar achterblijft bij de prognose. Dit wordt opgevangen door de werkkapitaalbuffer van €12.400 in de financieringsaanvraag, waardoor het bedrijf ook bij tegenvallende omzet minimaal twee jaar kan doordraaien.','Kans: Gemiddeld · Impact: Gemiddeld'],
              ['🛡️','DDoS-aanval op eigen infrastructuur','Als cybercriminelen ShieldFlare zelf aanvallen, kan dit de dienstverlening verstoren. ShieldFlare gebruikt OVH Anti-DDoS als eerste verdedigingslinie en monitort het eigen netwerk continu via eigen monitoring tools.','Kans: Gemiddeld · Impact: Hoog'],
              ['🔑','Gegevensverlies of beveiligingsincident','Een beveiligingslek bij klantdata kan reputatieschade veroorzaken. ShieldFlare slaat minimale persoonsgegevens op, gebruikt versleutelde verbindingen en maakt dagelijks backups. Bij een incident wordt direct gecommuniceerd conform de AVG-meldplicht.','Kans: Laag · Impact: Hoog'],
              ['📉','Concurrentie van grote spelers','Cloudflare of een andere grote partij kan gameserverbescherming toevoegen aan hun platform. ShieldFlare reageert hierop door de nichefocus te behouden, het reseller-platform verder uit te bouwen en persoonlijke ondersteuning via Discord en het klantenportaal als onderscheidend voordeel te benutten.','Kans: Laag · Impact: Gemiddeld'],
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
        <div id="ontwikkeling"><Section num="10" title="Persoonlijke ontwikkeling">
          <Card style={{ marginBottom:16 }}>
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:0 }}>
              Ik heb alles tot nu toe zelf geleerd, maar ik wil dat ook blijven doen. Om ShieldFlare verder te professionaliseren en het vertrouwen bij zakelijke klanten te vergroten, ben ik van plan om gerichte certificeringen te behalen op het gebied van netwerken en cybersecurity.
            </p>
          </Card>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:16 }}>
            {[
              ['🌐','CompTIA Network+','Fundamentele netwerkcertificering die kennis van TCP/IP, routing, switching en netwerkbeveiliging valideert. Relevant voor de verdere ontwikkeling van ShieldFlare netwerkinfrastructuur.','Prioriteit: Hoog'],
              ['🛡️','CompTIA Security+','Breed erkende cybersecuritycertificering die aantoont dat Albert de benodigde kennis heeft om beveiligingsdiensten professioneel aan te bieden. Vergroot vertrouwen bij zakelijke klanten.','Prioriteit: Hoog'],
              ['🔒','Certified Ethical Hacker (CEH)','Certificering gericht op offensieve beveiligingstechnieken. Helpt bij het beter begrijpen van aanvalsmethoden en het verder verbeteren van ShieldFlare detectie- en mitigatiecapaciteiten.','Prioriteit: Gemiddeld'],
              ['☁️','AWS / Azure Cloud Fundamentals','Basiskennis van cloudplatforms. Relevant voor toekomstige uitbreiding van ShieldFlare naar meerdere locaties en cloudgebaseerde infrastructuur.','Prioriteit: Gemiddeld'],

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
              De certificeringen worden gefaseerd behaald. In het eerste jaar ligt de focus op CompTIA Network+ en CompTIA Security+. Deze twee vormen de basis voor professionele dienstverlening en vergroot het vertrouwen bij zakelijke klanten. In jaar 2 en 3 worden aanvullende certificeringen behaald naarmate het bedrijf groeit.
            </p>
          </Card>
        </Section></div>

        {/* 9. Financieel */}
        <div id="financieel"><Section num="11" title="Financieel plan">

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

            <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
              <table style={{ width:'100%', minWidth:620, borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>
                    <th style={{ padding:'10px 16px', textAlign:'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', width:'35%' }}>Post</th>
                    {['Berekening','Per maand','Per jaar'].map(h => <th key={h} style={{ padding:'10px 16px', textAlign:'right', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', whiteSpace:'nowrap' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <FinanceRow label="250 IPv4-adressen" y1="250 × €2" y2="€ 500" y3="€ 6.000" highlight />
                  <FinanceRow label="1 dedicated server" y1="1 × €200*" y2="€ 200" y3="€ 2.400" highlight />
                  <FinanceRow label="2 VPS'en" y1="2 × €45" y2="€ 90" y3="€ 1.080" />
                  <FinanceRow label="vRack / netwerk" y1="Begroot" y2="€ 25" y3="€ 300" />
                  <FinanceRow label="Bankrekening" y1="€10/mnd" y2="€ 10" y3="€ 120" />
                  <FinanceRow label="Boekhoudsoftware" y1="€13/mnd" y2="€ 13" y3="€ 156" />
                  <FinanceRow label="WHMCS" y1="€15/mnd" y2="€ 15" y3="€ 180" />
                  <FinanceRow label="Verzekering" y1="Begroot" y2="€ 50" y3="€ 600" />
                  <FinanceRow label="Backup & monitoring" y1="Begroot" y2="€ 25" y3="€ 300" />
                  <FinanceRow label="Domeinen" y1="—" y2="—" y3="€ 50" />
                  <FinanceRow label="Marketing" y1="Gemiddeld" y2="€ 125" y3="€ 1.500" />
                  <FinanceRow label="Overige/onvoorzien" y1="—" y2="€ 63" y3="€ 750" />
                  <FinanceRow label="Totale exploitatiekosten" y1="—" y2="€ 1.116" y3="€ 13.436" highlight />
                </tbody>
              </table>
            </div>

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
              <Row label="Totale financieringsbehoefte" sub="" value="€ 25.000" highlight />
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

            <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
              <table style={{ width:'100%', minWidth:620, borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>
                    <th style={{ padding:'10px 16px', textAlign:'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', width:'45%' }}>Post</th>
                    {['Jaar 1','Jaar 2','Jaar 3'].map(h => <th key={h} style={{ padding:'10px 16px', textAlign:'right', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', whiteSpace:'nowrap' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <FinanceRow label="Klanten einde jaar" y1="30" y2="100" y3="250" />
                  <FinanceRow label="Gem. betalende klanten" y1="15" y2="60" y3="175" />
                  <FinanceRow label="Gem. omzet/klant/mnd" y1="€30" y2="€40" y3="€50" />
                  <FinanceRow label="Omzet abonnementen" y1="€5.400" y2="€28.800" y3="€105.000" />
                  <FinanceRow label="Omzet bandwidth credits" y1="€500" y2="€2.000" y3="€7.000" />
                  <FinanceRow label="Reseller / overige omzet" y1="€600" y2="€3.000" y3="€10.000" />
                  <FinanceRow label="Totale omzet" y1="€6.500" y2="€33.800" y3="€122.000" highlight />
                  <FinanceRow label="Infrastructuur" y1="€9.780" y2="€9.780" y3="€18.180" />
                  <FinanceRow label="Bankrekening" y1="€120" y2="€120" y3="€120" />
                  <FinanceRow label="Boekhoudsoftware" y1="€156" y2="€156" y3="€156" />
                  <FinanceRow label="Accountantskosten" y1="€600" y2="€600" y3="€600" />
                  <FinanceRow label="WHMCS" y1="€180" y2="€180" y3="€180" />
                  <FinanceRow label="Verzekering" y1="€600" y2="€600" y3="€600" />
                  <FinanceRow label="Backup & monitoring" y1="€300" y2="€300" y3="€300" />
                  <FinanceRow label="Domeinen" y1="€50" y2="€50" y3="€50" />
                  <FinanceRow label="Marketing" y1="€1.500" y2="€2.400" y3="€4.800" />
                  <FinanceRow label="Onvoorzien" y1="€750" y2="€1.000" y3="€1.500" />
                  <FinanceRow label="Totale kosten" y1="€13.436" y2="€14.586" y3="€25.886" highlight />
                  <FinanceRow label="Bedrijfsresultaat (winst)" y1="-€6.936" y2="€19.214" y3="€96.114" highlight />
                  <FinanceRow label="Zelfstandigenaftrek (2026)" y1="Geen (verlies)" y2="-€3.750" y3="-€3.750" />
                  <FinanceRow label="Winst na zelfstandigenaftrek" y1="—" y2="€3.144" y3="€38.464" />
                  <FinanceRow label="MKB-winstvrijstelling (13,31%)" y1="—" y2="-€418" y3="-€5.119" />
                  <FinanceRow label="Belastbaar inkomen" y1="—" y2="€2.726" y3="€33.345" green />
                  <FinanceRow label="IB schijf 1 (tot €38.883 → 35,75%)" y1="—" y2="-€974" y3="-€11.921" />
                  <FinanceRow label="IB schijf 2 (€38.883–€78.426 → 37,56%)" y1="—" y2="—" y3="—" />
                  <FinanceRow label="Totale inkomstenbelasting" y1="—" y2="-€974" y3="-€11.921" />
                  <FinanceRow label="Netto-inkomen na belasting" y1="-€6.936" y2="€14.200" y3="€65.000" highlight />
                </tbody>
              </table>
            </div>

            <div style={{ background:S.orangeBg, border:`1px solid ${S.orangeBorder}`, borderRadius:10, padding:14, marginTop:16 }}>
              <div style={{ fontSize:12, fontWeight:700, color:S.orangeLight, marginBottom:4 }}>
                📌 Interpretatie van de prognose
              </div>
              <div style={{ fontSize:12, color:S.dim, lineHeight:1.7 }}>
                Jaar 1 is bewust verliesgevend doordat ik direct investeer in een grote IPv4-capaciteit en dedicated infrastructuur, nog voordat de volledige klantenbasis is opgebouwd. Dit is een bewuste keuze om vanaf dag één voldoende capaciteit te hebben voor groei. Al in jaar 2 verwacht ik een positief bedrijfsresultaat van ruim €19.000. Vanaf jaar 3 groeit dit door naar ruim €96.000 bij verdere klantgroei.
              </div>
            </div>

            <p style={{ marginTop:12, fontSize:11, color:S.dim, fontStyle:'italic' }}>
              Alle bedragen zijn begrotingen en afgerond. Werkelijke omzet, klantenaantallen en infrastructuurkosten
              kunnen afwijken. Btw is niet als bedrijfskosten meegenomen.
            </p>
          </Card>

          {/* Kwartaalplanning */}
          <Card title="📊 4. Kwartaalplanning jaar 1" style={{ marginBottom:16 }}>

            <div style={{ width:'100%', overflowX:'auto', WebkitOverflowScrolling:'touch', marginTop:14 }}>
              <table style={{ width:'100%', minWidth:560, borderCollapse:'collapse', fontSize:13 }}>
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
          <Section num="12" title="Opschaling richting jaar 3">

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

          {/* Belastingdruk */}
          <Card title="📑 6. Belastingdruk & netto-inkomen" style={{ marginBottom:16 }}>
            <p style={{ marginBottom:14, fontSize:13 }}>
              Als eenmanszaak betaal ik inkomstenbelasting (IB) over de winst. Nederland heeft een progressief belastingstelsel met drie schijven in box 1.
            </p>
            <div style={{ overflowX:'auto', marginBottom:16 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['Schijf','Belastbaar inkomen','Tarief 2026'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign:'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Schijf 1','Tot € 38.883','35,75%'],
                    ['Schijf 2','€ 38.883 – € 78.426','37,56%'],
                    ['Schijf 3','Boven € 78.426','49,50%'],
                  ].map(([schijf,inkomen,tarief]) => (
                    <tr key={schijf}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, fontWeight:600, color:S.text }}>{schijf}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.dim }}>{inkomen}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, fontWeight:700, color:S.blueLight }}>{tarief}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginBottom:14, fontSize:13 }}>
              Als ondernemer heb ik recht op de <strong style={{ color:S.text }}>zelfstandigenaftrek</strong> (€3.750 in 2026, mits ik voldoe aan het urencriterium van 1.225 uur) en de <strong style={{ color:S.text }}>MKB-winstvrijstelling</strong> (13,31% van de winst na aftrek). Hieronder de berekening per jaar:
            </p>
            <div style={{ overflowX:'auto', marginBottom:16 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['','Jaar 1','Jaar 2','Jaar 3'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign: h==='' ? 'left' : 'right', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Bedrijfsresultaat (winst)','-€8.576','+€6.894','+€42.214'],
                    ['Zelfstandigenaftrek (2026)','Geen (verlies)','- €3.750','-€3.750'],
                    ['MKB-winstvrijstelling (13,31%)','—','-€425','-€5.128'],
                    ['Belastbaar inkomen','—','€2.719','€33.336'],
                    ['Inkomstenbelasting (box 1, ~36%)','—','-€979','-€12.001'],
                    ['Netto-inkomen na belasting','-€8.576','+€5.915','+€30.213'],
                    ['Privébehoefte (jaar)','-€3.840','-€3.840','-€3.840'],
                    ['Netto vrij beschikbaar','-€12.416','+€2.075','+€26.373'],
                  ].map(([label,y1,y2,y3]) => (
                    <tr key={label}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, fontWeight:500, color:S.text }}>{label}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color: y1.startsWith('-') ? '#f87171' : y1.startsWith('+') ? S.greenLight : S.dim }}>{y1}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color: y2.startsWith('-') ? '#f87171' : y2.startsWith('+') ? S.greenLight : S.dim }}>{y2}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color: y3.startsWith('-') ? '#f87171' : y3.startsWith('+') ? S.greenLight : S.dim }}>{y3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize:11, color:S.dim, fontStyle:'italic' }}>
              * Belastingberekening is indicatief. Exacte bedragen worden bepaald door de accountant op basis van werkelijke cijfers en aftrekposten. In jaar 1 is er geen belastbaar inkomen door het aanloopverlies.
            </p>
          </Card>

          {/* Eigen vermogen & lening */}
          <Card title="💳 7. Eigen vermogen & terugbetaling Bbz-lening" style={{ marginBottom:16 }}>
            <p style={{ marginBottom:14, fontSize:13 }}>
              Ik start ShieldFlare zonder eigen vermogen. De gevraagde Bbz-financiering van €25.000 is een bedrijfskapitaallening die terugbetaald wordt zodra het bedrijf voldoende omzet genereert.
            </p>
            <div style={{ overflowX:'auto', marginBottom:16 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['Post','Bedrag'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign: h==='Bedrag' ? 'right' : 'left', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Gevraagde Bbz-lening','€ 25.000'],
                    ['Eigen inbreng','€ 0'],
                    ['Rente (Bbz-tarief, indicatief ~2%)','€ 500 / jaar'],
                    ['Uitstel van betaling','1 jaar (jaar 1)'],
                    ['Looptijd terugbetaling','10 jaar (vanaf jaar 2)'],
                    ['Maandelijkse aflossing (indicatief)','€ 208 / mnd'],
                    ['Totale aflossingsperiode','Jaar 2 t/m jaar 11'],
                  ].map(([label,value]) => (
                    <tr key={label}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.text }}>{label}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', fontWeight:600, color:S.blueLight }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ background:S.orangeBg, border:`1px solid ${S.orangeBorder}`, borderRadius:10, padding:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:S.orangeLight, marginBottom:4 }}>📌 Terugbetalingsstrategie</div>
              <div style={{ fontSize:12, color:S.dim, lineHeight:1.7 }}>
                In jaar 1 wordt geen aflossing betaald — dit is het uitsteljaar. Vanaf jaar 2 los ik de lening af in 10 jaar. Bij een lening van €25.000 over 10 jaar komt dit neer op circa €208 per maand (exclusief rente). In jaar 2 is het verwachte netto-inkomen na belasting circa €13.414, wat ruimschoots voldoende is voor de aflossing van €2.496 per jaar naast de privébehoefte van €3.840. De exacte aflossings- en rentevoorwaarden worden bepaald door de Bbz-verstrekker.
              </div>
            </div>
          </Card>

          {/* Conservatief scenario */}
          <Card title="📉 8. Conservatief scenario — wat als de groei tegenvalt?" style={{ marginBottom:16 }}>
            <p style={{ marginBottom:14, fontSize:13 }}>
              Wat als ik in jaar 1 slechts 10 betalende klanten haal in plaats van de begrote 30? Onderstaande tabel toont het conservatieve scenario en de impact op de financiën.
            </p>
            <div style={{ overflowX:'auto', marginBottom:16 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr>{['','Basisscenario','Conservatief scenario'].map(h => <th key={h} style={{ padding:'9px 14px', textAlign: h==='' ? 'left' : 'right', background:'rgba(37,99,235,0.08)', color:S.blueLight, fontSize:11, fontWeight:700 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[
                    ['Klanten einde jaar 1','30','10'],
                    ['Omzet jaar 1','€6.500','€2.250'],
                    ['Kosten jaar 1','€13.436','€13.436'],
                    ['Resultaat jaar 1','-€6.936','-€11.186'],
                    ['Buffer Bbz-lening','€25.000','€25.000'],
                    ['Resterende buffer na jaar 1','€18.064','€13.814'],
                    ['Overleving jaar 2?','✅ Ja','✅ Ja — buffer voldoende'],
                  ].map(([label,basis,cons]) => (
                    <tr key={label}>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, color:S.text, fontWeight:500 }}>{label}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color: basis.startsWith('-') ? '#f87171' : basis.startsWith('+') || basis.includes('✅') ? S.greenLight : S.dim }}>{basis}</td>
                      <td style={{ padding:'9px 14px', borderBottom:`1px solid ${S.border}`, textAlign:'right', color: cons.startsWith('-') ? '#f87171' : cons.startsWith('+') || cons.includes('✅') ? S.greenLight : S.dim }}>{cons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ background:S.greenBg, border:`1px solid ${S.greenBorder}`, borderRadius:10, padding:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:S.greenLight, marginBottom:4 }}>✅ Conclusie conservatief scenario</div>
              <div style={{ fontSize:12, color:S.dim, lineHeight:1.7 }}>
                Zelfs in het conservatieve scenario — waarbij ik in jaar 1 slechts 10 betalende klanten haal — blijft de Bbz-buffer voldoende om het bedrijf voort te zetten. De werkkapitaalbuffer van €25.000 is bewust groot genoeg om ook tegenvallende groei op te vangen. Dit geeft ShieldFlare de tijd om de klantenbasis organisch op te bouwen zonder financiële druk.
              </div>
            </div>
          </Card>

          {/* Break-even */}

          <Card title="⚖️ Break-even analyse">

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginTop:8 }}>

              {[
                ['Infrastructuur per maand','€815','250 IPs + 1 dedicated server + 2 VPS'],
                ['Totale bedrijfskosten/mnd','~€1.120','Inclusief overige vaste lasten'],
                ['Break-even omzet','~€1.200/mnd','Met beperkte transactiekosten'],
                ['Break-even klanten','~27–33','Bij gemiddeld €35–€45 per klant'],
                ['Jaar 1 resultaat','-€6.936','Investering in capaciteit en groei'],
                ['Jaar 2 resultaat','+€19.214','Eerste positieve bedrijfsresultaat'],
                ['Jaar 3 resultaat','+€96.114','Structureel winstgevend bij verdere groei'],
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

        {/* Conclusie */}
        <div style={{ marginBottom:64 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28, paddingBottom:16, borderBottom:`1px solid ${S.border}` }}>
            <div style={{ width:34, height:34, background:'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:'white', flexShrink:0 }}>✦</div>
            <h2 style={{ fontSize:21, fontWeight:800, color:'white', margin:0 }}>Conclusie</h2>
          </div>

          <div style={{ background:S.surface, border:`1px solid ${S.border}`, borderRadius:14, padding:28 }}>
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:16}}>
              ShieldFlare is een technisch volledig operationeel cyberbeveiligingsplatform dat ik volledig zelf heb gebouwd. Het richt zich op een markt die door grote partijen onvoldoende wordt bediend: kleine bedrijven, gamers, hostingbedrijven en resellers die professionele DDoS-bescherming nodig hebben, maar geen enterprise-budget hebben.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:16}}>
              Ik heb aangetoond dat het bedrijf al in jaar 2 winstgevend is met een resultaat van ruim €19.000. De privébehoefte is laag doordat ik thuis woon, de infrastructuur wordt gefaseerd opgebouwd, en de gevraagde Bbz-financiering van €25.000 biedt voldoende buffer voor het eerste aanloopjaar. Vanaf jaar 3 verwacht ik een bedrijfsresultaat van ruim €96.000.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9, marginBottom:28 }}>
              Ik ben ervan overtuigd dat ShieldFlare een reële kans heeft op de markt. Het platform is uniek in zijn combinatie van diensten, het is volledig in het Engels voor internationale groei, en de drempel voor klanten is laag dankzij het gratis instapplan. Met de juiste financiële ondersteuning kan ik ShieldFlare officieel lanceren en uitgroeien tot een betrouwbare aanbieder van cyberbeveiligingsdiensten.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14 }}>
              {[
                ['🛡️','Platform klaar','Technisch volledig operationeel'],
                ['🌍','Internationaal','Volledig Engelstalig platform'],
                ['💰','€25.000','Gevraagde Bbz-financiering'],
                ['📈','Jaar 2','Verwacht break-even'],
                ['🎯','50 klanten','Break-even bereikt'],
                ['🚀','Jaar 3','+€96.000 bedrijfsresultaat'],
              ].map(([icon, label, sub]) => (
                <div key={label} style={{ background:'rgba(37,99,235,0.06)', border:`1px solid ${S.border}`, borderRadius:10, padding:16, textAlign:'center' }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{icon}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:S.blueLight }}>{label}</div>
                  <div style={{ fontSize:11, color:S.dim, marginTop:3 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:24, padding:'16px 20px', background:'rgba(37,99,235,0.06)', border:`1px solid rgba(37,99,235,0.2)`, borderRadius:10, textAlign:'center' }}>
              <div style={{ fontSize:13, color:S.dim, lineHeight:1.8 }}>
                <strong style={{ color:S.text }}>Albert Robijn</strong> · Oprichter ShieldFlare · 2026<br/>
                <a href="https://shieldflare.nl" style={{ color:S.blueLight, textDecoration:'none' }}>shieldflare.nl</a>
              </div>
            </div>
          </div>
        </div>

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
root@vps-a07248be:/var/www/Shieldflare/frontend# 
