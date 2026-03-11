import { useState, useEffect, useRef } from 'react'
import img from './assets/photo.png'
const ROLES = ['Full-Stack Developer', 'React Engineer', 'Open Source Contributor', 'Problem Solver', 'Tech Enthusiast']

function useTypewriter(words) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const cur = words[wordIndex]
    const delay = deleting ? 60 : charIndex === cur.length ? 1800 : 100
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(cur.slice(0, charIndex + 1))
        if (charIndex + 1 === cur.length) setDeleting(true)
        else setCharIndex(c => c + 1)
      } else {
        setText(cur.slice(0, charIndex - 1))
        if (charIndex - 1 === 0) { setDeleting(false); setWordIndex(i => (i + 1) % words.length); setCharIndex(0) }
        else setCharIndex(c => c - 1)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [charIndex, deleting, wordIndex, words])
  return text
}

function useFadeIn() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
function Navbar({ darkMode, setDarkMode }) {
  const links = ['home','about','skills','projects','experience','education','contact me']
  return (
    <nav>
      <div className="nav-logo">
        <img src={img} alt="Yashasvi Dixit" />
      </div>

      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`}>{l}</a>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setDarkMode(d => !d)}
        style={{
          background: 'none',
          border: '1px solid var(--muted)',
          borderRadius: '20px',
          padding: '6px 14px',
          cursor: 'pointer',
          color: 'var(--text)',
          fontSize: '16px',
        }}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}

function Hero({ role }) {
  const symbols = [
    { sym: '</>', cls: 'teal', style: { top:'15%', left:'8%', animationDelay:'0s' } },
    { sym: '{ }', cls: 'yellow', style: { top:'25%', left:'25%', animationDelay:'1.5s' } },
    { sym: '==', cls: '', style: { top:'60%', left:'5%', animationDelay:'2s' } },
    { sym: '%', cls: 'purple', style: { top:'78%', left:'15%', animationDelay:'3s' } },
    { sym: 'Java', cls: 'teal', style: { top:'10%', right:'12%', animationDelay:'0.8s' } },
    { sym: '&', cls: 'yellow', style: { top:'40%', left:'42%', animationDelay:'4s' } },
    { sym: '=>', cls: '', style: { top:'70%', left:'50%', animationDelay:'2.5s' } },
    { sym: '!=', cls: 'purple', style: { top:'82%', right:'20%', animationDelay:'1s' } },
    { sym: 'Python', cls: 'teal', style: { top:'55%', right:'8%', animationDelay:'3.5s' } },
    { sym: 'CSS', cls: 'yellow', style: { top:'88%', left:'8%', animationDelay:'1.2s' } },
    { sym: 'C++', cls: 'green', style: { top:'30%', right:'25%', animationDelay:'2.2s' } },
    { sym: 'HTML', cls: 'pink', style: { top:'48%', left:'18%', animationDelay:'4.5s' } },
  ]
  return (
    <section id="home">
      <div className="float-symbols">
        {symbols.map((s, i) => (
          <span key={i} className={`sym ${s.cls}`} style={s.style}>{s.sym}</span>
        ))}
        <div className="geo-dot-grid" style={{ bottom:'15%', left:'4%' }} />
        <div className="geo-dot-grid" style={{ top:'20%', right:'5%' }} />
        
      </div>

      <div className="hero-left">
        <p className="hero-hello">Hello 👋</p>
        <h1 className="hero-name">I am Yashasvi Dixit</h1>
        <p className="hero-role">{role}</p>
        <p className="hero-desc">
         Computer Science undergraduate passionate about building responsive web applications and modern user interfaces using JavaScript and React. GSSoC 2025 contributor and former Web Development Intern at SCL, MeitY.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
          <a
            href="https://yashasvis-portfolio.onrender.com/api/cv"
             target="_blank"
             rel="noopener noreferrer"
             className="btn-outline"
             style={{display:'inline-flex',alignItems:'center',gap:6}}
          >
            📄 Download CV
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="profile-ring">
          <div className="profile-inner"><div className="profile-inner">
  <img src={img} alt="Profile" />
</div></div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <div className="geo-dot-grid" style={{ top:30, right:60, opacity:0.3 }} />
      <p className="section-label">01 : About</p>
      <h2 className="section-title">Who I Am</h2>
      <div className="about-grid">
        <div className="about-text">
          <p>I'm a <span>Computer Science undergraduate </span> with a deep passion for building things that live on the internet. I love crafting full-stack web applications that are fast, scalable, and genuinely useful.</p>
          <p>My experience spans from building real-time chat platforms with <span>Next.js + Convex</span> to AI-powered UI generators, all the way to developing systems during my internship at a government R&amp;D lab under <span>MeitY, Govt. of India</span>.</p>
          <p>I'm an active open-source contributor (<span>GSSoC 2025</span>) and continuously exploring the intersection of full-stack development and AI tooling.</p>
          <div style={{ marginTop: 32 }}>
            <a href="#contact" className="btn-primary">💼 Hire Me</a>
          </div>
        </div>
        <div className="about-stats">
          {[['4+','Projects Shipped'],['1','Gov. Internship'],['5+','Languages Learned']].map(([n, l]) => (
            <div key={l} className="stat-card fade-in">
              <span className="num">{n}</span>
              <span className="label">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const skillsData = [
  { icon: '💻', cat: 'Languages', skills: ['C','C++','Java','Python','JavaScript','TypeScript'] },
  { icon: '🌐', cat: 'Frontend', skills: ['HTML','CSS','React.js','Next.js','Tailwind CSS'] },
  { icon: '⚙️', cat: 'Backend', skills: ['Node.js','Express.js','Convex','REST APIs'] },
  { icon: '🛠', cat: 'Tools & CS', skills: ['Git / GitHub','SQL','DSA','OOPs'] },
]

function Skills() {
  return (
    <section id="skills">
      <p className="section-label">02 : Skills</p>
      <h2 className="section-title">What I Work With</h2>
      <div className="skills-grid">
        {skillsData.map(c => (
          <div key={c.cat} className="skill-cat fade-in">
            <p className="skill-cat-title">{c.icon} {c.cat}</p>
            <div className="skill-tags">
              {c.skills.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


const projects = [
  {
  num: '01',
  name: 'UrbanScout',
  tagline: 'Live events finder for Sydney, Australia',
  desc: 'Aggregates live events across Sydney from multiple sources — Ticketek, Eventbrite, and What\'s On Sydney into one clean discovery interface with category filtering and live search.',
  details: 'Built with Next.js 14 App Router. Uses HTML scraping across 3 public event sources with a Ticketmaster API fallback. Features debounced live search, category filters (Music, Festival, Sport, Arts, Food, Film...), auto-refresh every 30 mins via ISR, and Google OAuth via NextAuth. Falls back to 12 rich mock events if scrapers are blocked.',
  stack: ['Next.js', 'NextAuth', 'Google OAuth', 'Ticketmaster API'],
  links: [
    { label: 'GitHub', url: 'https://github.com/Yashasviid/UrbanScout' },
    { label: 'Live Demo', url: 'https://urban-scout.vercel.app' },
  ],
  accent: '#00c9a7',
},
  {
    num: '02',
    name: 'SpillText',
    tagline: 'Real-time messaging with a backend-first approach',
    desc: 'Full-stack chat platform with live messaging, presence indicators, typing indicators, and auth : all driven by a reactive backend state engine instead of client polling.',
    details: 'Architected around Convex\'s reactive database : no REST calls, no WebSocket boilerplate. Messages, read receipts, and presence all sync automatically across clients. Clerk handles auth. Deployed on Vercel with sub-100ms latency.',
    stack: ['Next.js', 'TypeScript', 'Convex', 'Clerk', 'Tailwind CSS'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Yashasviid/SpillText-Real-Time-Chat-App' },
      { label: 'Live Demo', url: 'https://spill-text-real-time-chat-app.vercel.app' },
    ],
    accent: '#a855f7',
  },
  {
    num: '03',
    name: 'InstantUI',
    tagline: 'Describe it. See it. Ship it.',
    desc: 'AI-powered UI generator that converts natural language prompts into live React components with version history and one-click rollback.',
    details: 'The frontend sends a prompt to an Express backend which calls the Hugging Face inference API. The returned JSX is sandboxed and rendered live. Version history is stored in localStorage; users can diff and rollback any generation. Supports Tailwind and inline styles.',
    stack: ['React', 'Node.js', 'Express', 'Hugging Face'],
    links: [{ label: 'GitHub', url: 'https://github.com/Yashasviid/instantUI' }],
    accent: '#f5d800',
  },
  {
    num: '04',
    name: 'AI Video Summariser',
    tagline: 'Hours of video → 30-second read',
    desc: 'Paste a YouTube URL and get a structured, chapter-aware summary generated by NLP transformers with smart chunking for long-form content.',
    details: 'Uses the YouTube Transcript API to extract captions, splits them into semantic chunks, and passes each through a HuggingFace summarisation pipeline. Results are merged and formatted with timestamps. Handles videos up to 3 hours long without hitting token limits.',
    stack: ['Python', 'Flask', 'HuggingFace Transformers', 'YouTube API', 'NLTK'],
    links: [{ label: 'GitHub', url: 'https://github.com/Yashasviid/AI-powered-video-summariser' }],
    accent: '#f97316',
  },
  {
    num: '05',
    name: 'EcoMart',
    tagline: 'Second-hand shopping, reimagined',
    desc: 'Responsive e-commerce landing page for a sustainable marketplace promoting second-hand goods with a clean, modern UI built entirely in React.',
    details: 'Component-driven architecture with reusable product cards, category filters, and a newsletter section. Pure CSS animations, mobile-first responsive grid, and accessible markup. No framework dependencies beyond React : zero runtime CSS-in-JS.',
    stack: ['React.js', 'CSS Modules', 'JavaScript', 'HTML5'],
    links: [{ label: 'GitHub', url: 'https://github.com/Yashasviid/EcoMart' }],
    accent: '#00c9a7',
  },
]



function Projects() {
  const [active, setActive]     = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [animDir, setAnimDir]   = useState('right') // 'left' | 'right'
  const [visible, setVisible]   = useState(true)

  const go = (dir) => {
    setAnimDir(dir > 0 ? 'right' : 'left')
    setVisible(false)
    setExpanded(false)
    setTimeout(() => {
      setActive(i => (i + dir + projects.length) % projects.length)
      setVisible(true)
    }, 220)
  }

  const p = projects[active]

  return (
    <section id="projects">
      <p className="section-label">03 : Projects</p>
      <h2 className="section-title">Things I've Built</h2>

      {/* ── Dot nav ── */}
      <div style={{ display:'flex', gap:10, marginBottom:36 }}>
        {projects.map((proj, i) => (
          <button
            key={i}
            onClick={() => { setAnimDir(i > active ? 'right' : 'left'); setVisible(false); setExpanded(false); setTimeout(() => { setActive(i); setVisible(true) }, 220) }}
            style={{
              width: i === active ? 28 : 10,
              height: 10,
              borderRadius: 5,
              background: i === active ? p.accent : 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/*  Card */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : `translateX(${animDir === 'right' ? 40 : -40}px)`,
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
      >
        <div className="project-card-new" style={{ borderColor: p.accent + '55' }}>

          {/* Top bar */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
            <div>
              <p className="project-num">PROJECT : {p.num} / {String(projects.length).padStart(2,'0')}</p>
              <h3 className="project-name" style={{ color: p.accent }}>{p.name}</h3>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:'var(--muted)', marginTop:4 }}>{p.tagline}</p>
            </div>
            {/* Prev / Next */}
            <div style={{ display:'flex', gap:10, flexShrink:0 }}>
              <button onClick={() => go(-1)} style={navBtnStyle}>←</button>
              <button onClick={() => go(1)}  style={navBtnStyle}>→</button>
            </div>
          </div>

          {/* Description */}
          <p className="project-desc">{p.desc}</p>

          {/* Expandable details */}
          <div style={{
            maxHeight: expanded ? 200 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
          }}>
            <p style={{ fontSize:14, color:'var(--muted)', lineHeight:1.75, marginTop:12, paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
              {p.details}
            </p>
          </div>

          {/* Stack + links row */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, margin:'20px 0 16px' }}>
            {p.stack.map(s => (
              <span key={s} className="stack-tag" style={{ borderColor: p.accent + '55', color: p.accent }}>{s}</span>
            ))}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
            {p.links.map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="proj-link" style={{ color: p.accent }}>
                ↗ {l.label}
              </a>
            ))}
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                marginLeft:'auto', background:'none', border:`1px solid ${p.accent}55`,
                borderRadius:4, padding:'6px 14px', cursor:'pointer',
                color: p.accent, fontFamily:"'Space Mono',monospace",
                fontSize:11, letterSpacing:'0.05em', transition:'all 0.2s',
              }}
            >
              {expanded ? '▲ Less' : '▼ How it works'}
            </button>
          </div>
        </div>
      </div>

      {/*  Mini list below  */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginTop:32 }}>
        {projects.map((proj, i) => (
          <button
            key={i}
            onClick={() => { setAnimDir(i > active ? 'right' : 'left'); setVisible(false); setExpanded(false); setTimeout(() => { setActive(i); setVisible(true) }, 220) }}
            style={{
              background: i === active ? proj.accent + '22' : 'var(--bg3)',
              border: `1px solid ${i === active ? proj.accent : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 8, padding:'8px 16px', cursor:'pointer',
              color: i === active ? proj.accent : 'var(--muted)',
              fontFamily:"'Space Mono',monospace", fontSize:11,
              transition:'all 0.2s', letterSpacing:'0.05em',
            }}
          >
            {proj.name}
          </button>
        ))}
      </div>
    </section>
  )
}

const navBtnStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 6,
  width: 36, height: 36,
  cursor: 'pointer',
  color: 'var(--text)',
  fontSize: 16,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all 0.2s',
}


function Experience() {
  return (
    <section id="experience">
      <p className="section-label">04 : Experience</p>
      <h2 className="section-title">Where I've Worked</h2>
      <div className="exp-card fade-in">
        <div className="exp-icon">🏛️</div>
        <div>
          <h3 className="exp-role">Web Development Intern</h3>
          <p className="exp-company">Semi-Conductor Laboratory (SCL), MeitY, Govt. of India</p>
          <p className="exp-date">May 2025 – June 2025</p>
          <p className="exp-desc">Developed a web-based Library Management System within a high-security government R&amp;D environment. Gained experience navigating enterprise-level development workflows and delivering functional software under real institutional constraints.</p>
        </div>
      </div>
    </section>
  )
}

function Education() {
  const edu = [
    { dot: 'B.T', University: 'Banasthali Vidyapith, Rajasthan', degree: 'B.Tech in Computer Science', date: '2023 – Present', grade: null },
    { dot: 'XII', school: 'Aklank Public School, Kota', degree: 'Class XII : CBSE', date: '2022 – 2023', grade: 'Score: 74.4%' },
    { dot: 'X', school: 'Kendriya Vidyalaya, Tenga Valley', degree: 'Class X : CBSE', date: '2020 – 2021', grade: 'Score: 93.2% 🌟' },
  ]
  return (
    <section id="education" style={{ background: 'var(--bg2)' }}>
      <p className="section-label">05 : Education</p>
      <h2 className="section-title">My Academic Path</h2>
      <div className="edu-timeline">
        {edu.map(e => (
          <div key={e.dot} className="edu-item fade-in">
            <div className="edu-dot">{e.dot}</div>
            <div>
              <h3 className="edu-school">{e.school}</h3>
              <p className="edu-degree">{e.degree}</p>
              <p className="edu-date">{e.date}</p>
              {e.grade && <p className="edu-grade">{e.grade}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Achievements() {
  return (
    <section id="achievements">
      <p className="section-label">06 : Achievements</p>
      <h2 className="section-title">Milestones</h2>
      <div className="ach-grid">
        <div className="ach-card fade-in">
          <span className="ach-icon">🌸</span>
          <h3 className="ach-title">GSSoC 2025 Contributor</h3>
          <p className="ach-desc">Active open-source contributor at GirlScript Summer of Code 2025, contributing to real-world projects alongside a global developer community.</p>
        </div>
        <div className="ach-card fade-in">
          <span className="ach-icon">💎</span>
          <h3 className="ach-title">SheFi Scholar : Cohort 15</h3>
          <p className="ach-desc">Selected as a SheFi Scholar, a program empowering women in the Web3 and finance space through education and community.</p>
        </div>
        <div className="ach-card fade-in">
          <span className="ach-icon">🤖</span>
          <h3 className="ach-title">IBM SkillsBuild: AI</h3>
          <p className="ach-desc">IBM certification in "Getting Started with Artificial Intelligence" : issued February 2026 via IBM SkillsBuild & Credly.</p>
          <a href="https://www.credly.com/badges/861ea602-a0fe-43e2-ab66-a36dc857107a" target="_blank" rel="noopener noreferrer" className="ach-verify">↗ Verify Badge</a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [feedback, setFeedback] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    const { name, email, message } = form
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback('Please fill in all fields.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setFeedback('')
    try {
      const res  = await fetch('https://yashasvis-portfolio.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFeedback(data.message)
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setFeedback(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setFeedback('Network error. Please try emailing directly.')
    }
  }

  return (
    <section id="contact">
      <p className="section-label">07 : Contact</p>
      <h2 className="section-title">Let's Talk</h2>
      <div className="contact-wrap">
        <div className="contact-info">
          <p>I'm actively looking for new opportunities  whether it's a full-time role, internship, or an exciting collaboration. The inbox is always open!</p>
          <div className="contact-links">
            <a href="mailto:yashasvidixitg.05@gmail.com" className="contact-link">
              <div className="contact-link-icon">📧</div>
              <div><div style={{fontWeight:500,marginBottom:2}}>Email</div><div style={{fontSize:12,color:'var(--muted)'}}>yashasvidixitg.05@gmail.com</div></div>
            </a>
            <a href="https://github.com/Yashasviid" target="_blank" rel="noopener noreferrer" className="contact-link">
              <div className="contact-link-icon">🐙</div>
              <div><div style={{fontWeight:500,marginBottom:2}}>GitHub</div><div style={{fontSize:12,color:'var(--muted)'}}>github.com/Yashasviid</div></div>
            </a>
            <a href="tel:+916376404734" className="contact-link">
              <div className="contact-link-icon">📱</div>
              <div><div style={{fontWeight:500,marginBottom:2}}>Phone</div><div style={{fontSize:12,color:'var(--muted)'}}>+91 6376404734</div></div>
            </a>
          </div>
        </div>
        <div className="contact-form">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text" name="name" placeholder="Your Name"
              value={form.name} onChange={handleChange}
              disabled={status === 'loading'}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email" name="email" placeholder="YourEmail@gmail.com"
              value={form.email} onChange={handleChange}
              disabled={status === 'loading'}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message" placeholder="Tell me about the opportunity..."
              value={form.message} onChange={handleChange}
              disabled={status === 'loading'}
            />
          </div>

          {feedback && (
            <p style={{
              fontSize: 13,
              color: status === 'success' ? '#4ade80' : '#f87171',
              marginBottom: 8,
            }}>
              {status === 'success' ? '✅ ' : '❌ '}{feedback}
            </p>
          )}

          <button
            className="btn-primary"
            style={{ width: 'fit-content', opacity: status === 'loading' ? 0.6 : 1 }}
            onClick={handleSubmit}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message ✉️'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const role = useTypewriter(ROLES)
  const [darkMode, setDarkMode] = useState(true)
  
  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode)
  }, [darkMode])
  
  useFadeIn()
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero role={role} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <Contact />
      <footer>
        <p>© {new Date().getFullYear()} · Yashasvi Dixit · All rights reserved</p>
      </footer>
    </>
  )
}



