
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
interface Education {
  school: string;
  years: string;
  major: string;
  description: string;
}

interface Experience {
  company: string;
  role: string;
  dates: string;
  summary: string[];
}

interface CaseStudy {
  title: string;
  tag: string;
  summary: string;
  docUrl: string;
  previewUrl: string;
}

interface Observation {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

// --- DATA (EASY TO SWAP) ---
const DATA = {
  personal: {
    name: "Alex Reed",
    tagline: "Bridging human needs and technical constraints through data-driven product leadership.",
    bio: "I am a Product Manager with 6+ years of experience in high-growth SaaS environments. My specialty lies at the intersection of UX research, technical feasibility, and business viability. I've successfully scaled products from MVP to millions in ARR by maintaining a relentless focus on the 'Why' behind every feature.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  },
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:alex.reed@pm.com"
  },
  education: [
    {
      school: "Stanford University",
      years: "2014 - 2018",
      major: "B.S. in Computer Science",
      description: "Concentration in Human-Computer Interaction. Member of the Stanford Product Club and Entrepreneurship Society."
    }
  ],
  experience: [
    {
      company: "TechFlow Systems",
      role: "Senior Product Manager",
      dates: "Jan 2021 - Present",
      summary: [
        "Led cross-functional team of 15 to launch 'Flow Intelligence', an AI-first analytics suite that reached $2M ARR within 12 months.",
        "Spearheaded user research initiatives that identified key friction points, resulting in a 25% reduction in onboarding churn.",
        "Implemented a data-driven prioritization framework using RICE score to align stakeholders on the quarterly roadmap."
      ]
    },
    {
      company: "Nexus Labs",
      role: "Product Manager (Growth)",
      dates: "Aug 2018 - Dec 2020",
      summary: [
        "Optimized the core referral loop, driving a 40% increase in organic user acquisition over 6 months.",
        "Owned the A/B testing strategy for the checkout flow, improving conversion rates by 18%.",
        "Collaborated directly with the CEO to define long-term product vision and market positioning."
      ]
    }
  ],
  caseStudies: [
    {
      title: "AI Personalization Engine",
      tag: "Strategy & ML",
      summary: "A technical deep dive into replacing heuristic-based recommendations with a collaborative filtering model.",
      docUrl: "#",
      previewUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "SaaS Market Expansion",
      tag: "GTM Strategy",
      summary: "Product-led growth strategy for entering the EMEA market, including localization and compliance roadmaps.",
      docUrl: "#",
      previewUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "The 'Nexus' Redesign PRD",
      tag: "PRD & UX",
      summary: "Comprehensive requirements for a complete UI overhaul focusing on accessibility and enterprise scalability.",
      docUrl: "#",
      previewUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop"
    }
  ],
  observations: [
    {
      id: "obs1",
      title: "Frictionless Onboarding",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=800&auto=format&fit=crop",
      description: "Analyzing the psychological impact of 'progressive disclosure' in enterprise tools to reduce cognitive load."
    },
    {
      id: "obs2",
      title: "The Power of Defaults",
      imageUrl: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=800&auto=format&fit=crop",
      description: "How smart defaults drive 90% of user behavior and the importance of 'nudging' for retention."
    },
    {
      id: "obs3",
      title: "Dark Mode Accessibility",
      imageUrl: "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=800&auto=format&fit=crop",
      description: "Technical challenges of maintaining WCAG compliance across high-contrast dark themes."
    },
    {
      id: "obs4",
      title: "Mobile Micro-SaaS",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      description: "Why 'doing one thing perfectly' is the new moat for indie product managers."
    }
  ]
};

// --- COMPONENTS ---

const SectionHeader = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="mb-12">
    <h2 className={`text-3xl md:text-5xl font-black tracking-tighter ${light ? 'text-white' : 'text-slate-950'}`}>
      {title}
    </h2>
    {subtitle && <p className={`mt-4 text-lg max-w-2xl ${light ? 'text-slate-400' : 'text-slate-600'}`}>{subtitle}</p>}
    <div className={`mt-8 h-1.5 w-16 rounded-full ${light ? 'bg-indigo-500' : 'bg-indigo-600'}`}></div>
  </div>
);

const Lightbox = ({ observation, onClose }: { observation: Observation | null; onClose: () => void }) => {
  if (!observation) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white md:text-slate-950 p-2 rounded-full transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className="md:w-3/5 h-64 md:h-auto overflow-hidden">
          <img src={observation.imageUrl} alt={observation.title} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4">Observation</span>
          <h3 className="text-3xl font-black text-slate-950 mb-6 leading-tight">{observation.title}</h3>
          <p className="text-slate-600 text-lg leading-relaxed">{observation.description}</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-slate-200/50 shadow-sm' : 'py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center font-black text-lg">
              {DATA.personal.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="font-black text-xl text-slate-950 tracking-tighter">{DATA.personal.name}</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            {["Experience", "Cases", "Insights", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 pb-24 md:pt-60 md:pb-40 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                Available for New Challenges
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter leading-[0.9]">
                High Stakes.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Deep Insights.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl">
                {DATA.personal.tagline}
              </p>
              <div className="flex gap-4 pt-4">
                <a href="#cases" className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-950/10">View Work</a>
                <a href="#contact" className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-950 rounded-2xl font-bold hover:bg-slate-50 transition-all">Get in Touch</a>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square max-w-[500px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src={DATA.personal.photoUrl} alt={DATA.personal.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIO & EDUCATION */}
      <section id="about" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <SectionHeader title="The Approach" subtitle="Why I build the way I do." />
              <p className="text-xl text-slate-600 leading-relaxed font-light">{DATA.personal.bio}</p>
            </div>
            <div className="bg-slate-50 p-10 md:p-12 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">Education</h3>
              {DATA.education.map((edu, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-950">{edu.school}</h4>
                  <p className="text-indigo-600 font-bold">{edu.years}</p>
                  <p className="font-bold text-slate-700">{edu.major}</p>
                  <p className="text-slate-500 text-sm pt-2 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <SectionHeader title="Experience" subtitle="Strategic leadership in the trenches of product development." />
          <div className="max-w-4xl mx-auto space-y-12">
            {DATA.experience.map((exp, idx) => (
              <div key={idx} className="group grid md:grid-cols-3 gap-8 p-8 md:p-12 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="md:col-span-1">
                  <p className="text-indigo-600 font-black text-xs uppercase tracking-widest mb-2">{exp.dates}</p>
                  <h3 className="text-xl font-black text-slate-950">{exp.company}</h3>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-lg font-bold text-slate-800 mb-4 italic underline decoration-indigo-200 underline-offset-4">{exp.role}</h4>
                  <ul className="space-y-4">
                    {exp.summary.map((point, pIdx) => (
                      <li key={pIdx} className="flex gap-4 text-slate-600 leading-relaxed text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="Case Studies" subtitle="Deep dives into strategy, design, and outcome." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DATA.caseStudies.map((study, idx) => (
              <div key={idx} className="group bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col hover:bg-white hover:shadow-2xl transition-all">
                <div className="h-60 overflow-hidden bg-slate-200">
                  <img src={study.previewUrl} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full self-start mb-4">{study.tag}</span>
                  <h3 className="text-2xl font-black text-slate-950 mb-4">{study.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{study.summary}</p>
                  <a href={study.docUrl} className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-slate-950 group-hover:text-indigo-600 transition-colors">
                    View Document
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBSERVATIONS */}
      <section id="insights" className="py-32 bg-slate-950 text-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader title="Visual Insights" subtitle="Occasional musings on UI psychology and friction." light />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA.observations.map((obs) => (
              <div 
                key={obs.id} 
                className="group relative cursor-pointer aspect-square rounded-2xl overflow-hidden bg-slate-900"
                onClick={() => setSelectedObs(obs)}
              >
                <img src={obs.imageUrl} alt={obs.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <h4 className="font-black text-lg">{obs.title}</h4>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mt-2">View Insight</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-950 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#4f46e520,transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none">Let's build<br />what's next.</h2>
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-lg mx-auto italic">"The best way to predict the future is to create it."</p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href={DATA.social.email} className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black hover:bg-indigo-500 hover:text-white transition-all transform hover:-translate-y-1">Send Email</a>
                <a href={DATA.social.linkedin} target="_blank" className="px-10 py-5 bg-slate-900 border border-slate-800 rounded-2xl font-black hover:border-indigo-500 transition-all">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 gap-8">
            <p>&copy; {new Date().getFullYear()} {DATA.personal.name}</p>
            <div className="flex gap-8">
              <a href={DATA.social.twitter} className="hover:text-indigo-600 transition-colors">Twitter / X</a>
              <span>Based in SF</span>
            </div>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      <Lightbox observation={selectedObs} onClose={() => setSelectedObs(null)} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
