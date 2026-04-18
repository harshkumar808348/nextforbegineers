"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NAV_LINKS = ["About", "Courses", "Features", "Faculty", "Pricing"];

const STATS = [
  { value: "50K+", label: "Students Enrolled" },
  { value: "200+", label: "Expert Teachers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "15+", label: "Subjects Covered" },
];

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Live Classes",
    desc: "Attend real-time sessions with teachers from IITs, NITs, and top private colleges — not recorded lectures.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Live Doubt Sessions",
    desc: "Clear your doubts instantly during class. No waiting, no tickets — direct conversation with your teacher.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "1-on-1 Interaction",
    desc: "Personalized guidance from subject experts. Because every student learns differently.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Pay Only If You Understand",
    desc: "Our unique promise — if the concept doesn't click, you don't pay. Learning first, payment second.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z" />
      </svg>
    ),
    title: "Study Materials",
    desc: "All resources — notes, practice sheets, previous years' papers — included with every course.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Topic-wise Expert Faculty",
    desc: "Each topic has a dedicated specialist. No generalists — only masters of their domain teach here.",
  },
];

const COURSES = [
  {
    tag: "Engineering",
    title: "IIT-JEE Preparation",
    sub: "Physics · Chemistry · Mathematics",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    accent: "bg-amber-500",
  },
  {
    tag: "Medical",
    title: "NEET Preparation",
    sub: "Physics · Chemistry · Biology",
    color: "bg-teal-50 text-teal-700 border-teal-200",
    accent: "bg-teal-500",
  },
  {
    tag: "Government",
    title: "UPSC & Civil Services",
    sub: "GS · CSAT · Optional Subjects",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    accent: "bg-rose-500",
  },
  {
    tag: "Technology",
    title: "Coding & Programming",
    sub: "DSA · Web Dev · System Design",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    accent: "bg-indigo-500",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "IIT-JEE 2024 Qualifier",
    text: "The live doubt sessions changed everything. I could ask questions instantly and my teacher never made me feel rushed. Cleared JEE Advanced in my first attempt.",
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    role: "NEET Aspirant, Delhi",
    text: "I was skeptical about online coaching, but the 1-on-1 interactions here are genuinely better than my offline tutor. The pay-only-if-you-understand policy gave me confidence.",
    avatar: "RV",
  },
  {
    name: "Ananya Iyer",
    role: "UPSC Prelims Cleared",
    text: "Topic-wise expert teachers make a real difference. My GS teacher was from IIT and my optional subject teacher had 12 years of field experience. That quality doesn't come cheap — except here it does.",
    avatar: "AI",
  },
];

const AVATARS = ["PS", "RV", "AI"];
const AVATAR_COLORS = ["bg-indigo-100 text-indigo-700", "bg-teal-100 text-teal-700", "bg-amber-100 text-amber-700"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function ClassroomConnect() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&display=swap');
        .fraunces { font-family: 'Fraunces', Georgia, serif; }
        .hero-grid { background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px); background-size: 28px 28px; }
        .card-hover { transition: box-shadow 0.22s ease, transform 0.22s ease; }
        .card-hover:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.09); transform: translateY(-2px); }
        ::selection { background: #c7d2fe; }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1.5px; background: currentColor; transition: width 0.2s ease; }
        .nav-link:hover::after { width: 100%; }
        .badge-pill { letter-spacing: 0.06em; }
      `}</style>

      {/* NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm border-b border-stone-100 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-stone-900 rounded flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                <rect x="1" y="1" width="5" height="5" rx="1" />
                <rect x="8" y="1" width="5" height="5" rx="1" />
                <rect x="1" y="8" width="5" height="5" rx="1" />
                <rect x="8" y="8" width="5" height="5" rx="1" opacity="0.4" />
              </svg>
            </div>
            <span className="font-semibold text-stone-900 tracking-tight text-[15px]">Classroom Connect</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link text-[14px] text-stone-600 hover:text-stone-900 transition-colors">{l}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
           <Link href="/login" className="text-[14px] text-stone-600 hover:text-stone-900 transition-colors">
  Sign in
</Link>
            <Link href="/signup" className="text-[14px] bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors font-medium">Get started</Link>
          </div>

          <button className="md:hidden p-2 rounded-md hover:bg-stone-100" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[15px] text-stone-700" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
            <Link href="/signup" className="text-[14px] bg-stone-900 text-white px-4 py-2.5 rounded-lg text-center font-medium" onClick={() => setMenuOpen(false)}>Get started</Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="about" className="hero-grid pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 border border-stone-200 bg-white rounded-full px-3.5 py-1.5 mb-8 badge-pill text-[11px] font-medium text-stone-600 uppercase tracking-widest"
              style={{ opacity: 1, animation: "none" }}
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
              Live classes now open · IIT, NIT & top faculty
            </div>

            <h1 className="fraunces text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-[1.08] tracking-tight mb-6">
              Learn from the best.
              <br />
              <em className="not-italic text-stone-400">Pay only when</em>
              <br />
              you understand.
            </h1>

            <p className="text-stone-500 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light">
              Live classes, instant doubt sessions, and 1-on-1 guidance from teachers at IITs, NITs, and top colleges. Education that is accessible, interactive, and results-driven.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#courses" className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-3.5 rounded-xl font-medium text-[15px] hover:bg-stone-700 transition-colors">
                Explore courses
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a href="#features" className="inline-flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-700 px-6 py-3.5 rounded-xl font-medium text-[15px] hover:border-stone-400 transition-colors">
                How it works
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-stone-100">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 80}>
                <div>
                  <div className="fraunces text-3xl md:text-4xl font-light text-stone-900">{s.value}</div>
                  <div className="text-[13px] text-stone-500 mt-1">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-14">
              <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400 badge-pill mb-3">What we teach</p>
              <h2 className="fraunces text-4xl md:text-5xl font-light text-stone-900 leading-tight">Expert faculty for<br />every ambition.</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {COURSES.map((c, i) => (
              <FadeIn key={c.title} delay={i * 90}>
                <div className={`card-hover bg-white rounded-2xl border border-stone-100 p-7 flex flex-col gap-5 cursor-pointer group`}>
                  <div className="flex items-start justify-between">
                    <span className={`text-[11px] font-medium uppercase tracking-widest badge-pill border px-2.5 py-1 rounded-full ${c.color}`}>{c.tag}</span>
                    <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 transition-colors">
                      <svg className="group-hover:stroke-white stroke-stone-400 transition-colors" width="14" height="14" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  <div>
                    <div className={`w-1 h-5 ${c.accent} rounded-full mb-3`} />
                    <h3 className="text-xl font-medium text-stone-900 mb-1.5">{c.title}</h3>
                    <p className="text-[13px] text-stone-400">{c.sub}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-stone-500">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    Live classes · Study materials included
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-14">
              <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400 badge-pill mb-3">Why it works</p>
              <h2 className="fraunces text-4xl md:text-5xl font-light text-stone-900 leading-tight max-w-xl">
                Built differently,<br />for a reason.
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 70}>
                <div className="card-hover rounded-2xl border border-stone-100 p-7 h-full flex flex-col gap-4 bg-white">
                  <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-600 border border-stone-100">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-2 text-[16px]">{f.title}</h3>
                    <p className="text-[14px] text-stone-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-14">
              <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400 badge-pill mb-3">Student stories</p>
              <h2 className="fraunces text-4xl md:text-5xl font-light text-stone-900 leading-tight">Real results.<br />Real students.</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 90}>
                <div className="card-hover bg-white rounded-2xl border border-stone-100 p-7 flex flex-col gap-5 h-full">
                  <p className="text-[15px] text-stone-600 leading-relaxed font-light flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-stone-50">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold ${AVATAR_COLORS[i]}`}>{t.avatar}</div>
                    <div>
                      <div className="text-[14px] font-medium text-stone-900">{t.name}</div>
                      <div className="text-[12px] text-stone-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PROMISE */}
      <section id="pricing" className="py-20 md:py-28 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400 badge-pill mb-4">Our promise</p>
              <h2 className="fraunces text-4xl md:text-5xl font-light text-white leading-tight mb-6">
                Understand first.<br /><em className="not-italic text-stone-400">Pay after.</em>
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-10 font-light">
                We believe payment should follow understanding, not precede it. If a concept doesn't click after your session, you don't owe us anything. That's not a marketing line — it's our model.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-6 py-3.5 rounded-xl font-medium text-[15px] hover:bg-stone-100 transition-colors">
                  Start learning free
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <a href="#" className="inline-flex items-center justify-center gap-2 border border-stone-700 text-stone-300 px-6 py-3.5 rounded-xl font-medium text-[15px] hover:border-stone-500 transition-colors">
                  Talk to a counselor
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Attend a live class", desc: "Join a session in your subject of choice — no commitment required." },
              { n: "02", title: "Ask freely, learn deeply", desc: "Doubt sessions, 1-on-1 time, and study materials are all included." },
              { n: "03", title: "Pay if it clicks", desc: "Only after you understand the concept do we ask for payment." },
            ].map((step, i) => (
              <FadeIn key={step.n} delay={i * 100}>
                <div className="border border-stone-800 rounded-2xl p-6">
                  <div className="fraunces text-3xl font-light text-stone-700 mb-4">{step.n}</div>
                  <h3 className="text-white font-medium mb-2 text-[15px]">{step.title}</h3>
                  <p className="text-stone-400 text-[13px] leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400 badge-pill mb-3">The people teaching</p>
                <h2 className="fraunces text-4xl md:text-5xl font-light text-stone-900 leading-tight">Not teachers.<br />Domain experts.</h2>
              </div>
              <p className="text-stone-500 text-[15px] leading-relaxed max-w-xs font-light">
                Every teacher on Classroom Connect comes with deep subject expertise — not a generalist coaching background.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { institution: "IIT Bombay", subject: "Physics & Mathematics", name: "Dr. Arvind Mehta", exp: "11 yrs experience" },
              { institution: "NIT Trichy", subject: "Organic Chemistry", name: "Prof. Sunita Rao", exp: "9 yrs experience" },
              { institution: "IIT Delhi", subject: "Data Structures & Algorithms", name: "Karan Sinha", exp: "7 yrs experience" },
            ].map((f, i) => (
              <FadeIn key={f.name} delay={i * 90}>
                <div className="card-hover border border-stone-100 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-stone-100 flex items-center justify-center text-[13px] font-medium text-stone-600">
                      {f.name.split(" ").slice(-1)[0][0]}{f.name.split(" ")[0][0]}
                    </div>
                    <div>
                      <div className="font-medium text-stone-900 text-[15px]">{f.name}</div>
                      <div className="text-[12px] text-stone-400">{f.exp}</div>
                    </div>
                  </div>
                  <div className="border-t border-stone-50 pt-4">
                    <div className="text-[13px] font-medium text-stone-700 mb-1">{f.subject}</div>
                    <div className="inline-flex items-center gap-1.5 text-[12px] text-stone-400 border border-stone-100 rounded-full px-2.5 py-1">
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                      {f.institution}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="fraunces text-3xl md:text-4xl font-light text-stone-900 mb-2">Ready to start learning?</h2>
                <p className="text-stone-500 text-[15px]">Join 50,000+ students already learning on Classroom Connect.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-3.5 rounded-xl font-medium text-[15px] hover:bg-stone-700 transition-colors">
                  Join for free
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <a href="#" className="inline-flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-700 px-6 py-3.5 rounded-xl font-medium text-[15px] hover:border-stone-400 transition-colors">
                  View all courses
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-stone-900 rounded flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="white">
                  <rect x="1" y="1" width="5" height="5" rx="1" />
                  <rect x="8" y="1" width="5" height="5" rx="1" />
                  <rect x="1" y="8" width="5" height="5" rx="1" />
                  <rect x="8" y="8" width="5" height="5" rx="1" opacity="0.4" />
                </svg>
              </div>
              <span className="font-medium text-stone-900 text-[14px]">Classroom Connect</span>
            </div>

            <div className="flex flex-wrap gap-6 text-[13px] text-stone-400">
              {["About", "Courses", "Faculty", "Privacy", "Terms", "Contact"].map((l) => (
                <a key={l} href="#" className="hover:text-stone-700 transition-colors">{l}</a>
              ))}
            </div>

            <p className="text-[12px] text-stone-400">© 2025 Classroom Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}