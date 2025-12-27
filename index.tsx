
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
    name: "Kothapally Akash",
    tagline: "Driving product outcomes by translating ambiguous user and business problems into scalable, data-backed solutions.",
    bio: "I am a Product Manager with experience building and scaling internal and B2B products across fintech, Generate AI, and SaaS. I specialize in owning ambiguous problem spaces end-to-end—combining user research, data analysis, and technical judgment to deliver measurable business impact. Across roles, I’ve led 0→1 and 1→N initiatives, improved operational efficiency, and driven growth by staying deeply grounded in the underlying ‘why’ behind every product decision.",
    photoUrl: "images/profile/facepic.jpeg"
  },
  social: {
    linkedin: "https://www.linkedin.com/in/kothapally-akash-37ba501a6/",
    twitter: "https://twitter.com",
    email: "mailto:kda10@iitbbs.ac.in"
  },
  education: [
    {
      school: "IIT Bhubaneswar",
      years: "2018 - 2022",
      major: "B.Tech in Computer Science and Engineering",
      description: "Graduated with a strong foundation in computer science, data structures, and systems thinking. Actively involved in entrepreneurship initiatives and led large-scale student-driven programs focused on innovation and execution."
    }
  ],
  experience: [
    {
      company: "Arka Group",
      role: "Senior Product and Tech Consultant",
      dates: "Aug 2024 - Present",
      summary: [
      "Reduced customer acquisition cycle time by 65% and eliminated 90% of physical site visits by identifying offline sales friction and owning the end-to-end development of a self-serve solar cost estimation and savings platform.",
      "Drove a 9× increase in qualified lead volume, 120% growth in active users, and 3× revenue growth by designing and launching a referral-driven growth loop aligned with user incentives and unit economics.",
      "Enabled rapid execution in a zero-to-one startup environment by prioritizing initiatives based on impact vs. effort trade-offs and aligning founders, sales, and engineering teams on clear success metrics."
      ]
    },
    {
      company: "DBS Bank",
      role: "Product Associate",
      dates: "Aug 2022 - Jul 2024",
      summary: [
      "Improved trader and analyst workflow efficiency by 45% and increased NPS by 25% by owning high-impact feature enhancements for an internal trading and analytics platform used by 1,000+ users.",
      "Cut average ticket resolution time by 50% by defining problem statements, evaluation metrics, and rollout strategy for a generative-AI-powered internal support assistant, achieving ~70% model precision in the first production release.",
      "Maintained 100% SLA compliance and influenced roadmap decisions for an enterprise observability platform by translating usage analytics, incident data, and stakeholder feedback into prioritized product initiatives, contributing to a fast-tracked promotion."
      ]
    },
    {
      company: "Upraised",
      role: "Product Fellow",
      dates: "March 2023 - Dec 2023",
      summary: [
      "Ranked in the top 1% of the cohort by applying structured problem discovery and design thinking frameworks to produce 10+ PRDs and wireframes across e-commerce, ed-tech, and gaming domains.",
      "Identified usability bottlenecks through user research, product teardowns, and journey mapping, and proposed data-backed solutions balancing user needs with business constraints."
      ]
    }
  ],
  caseStudies: [
    {
      title: "WinZO | Serving Underserved Women Gamers in Tier-2/3 India",
      tag: "Case Study with user Research & Product Strategy",
      summary: "Explored why women users in Tier-2/3 markets were underserved on WinZO by identifying distinct female gamer personas, isolating key participation barriers, and evaluating product directions to improve inclusion, comfort, and sustained engagement.",
      docUrl: "https://docs.google.com/presentation/d/1Uhp2UGy5LcsFocd70WW-6pF8jtGkbnX9iVJR7QrhZcU/edit",
      previewUrl: "images/casestudies/Winzopreview.png"
    },
    {
      title: "MakeMyTrip | Cracking the Intercity Cab Opportunity in India",
      tag: "Case Study with marketplace Strategy & Digitization",
      summary: "Product-led growth strategy for entering the EMEA market, including localization and compliance roadmaps.",
      docUrl: "https://docs.google.com/presentation/d/1wSHlYKI0Q5ccrCsG_2N6FC-yrtstDDwjMUZ6k79m3eQ/edit",
      previewUrl: "images/casestudies/mmtpreview.png"
    },
    {
      title: "The Netflix Redesign PRD | Social Discovery–Led Retention PRD",
      tag: "PRD & UX",
      summary: "Addressed content discovery fatigue impacting user retention by proposing a social-driven recommendation layer leveraging friend preferences and viewing signals to reduce choice overload and increase viewing confidence.",
      docUrl: "https://docs.google.com/presentation/d/1bzPeJ7_rFbplswbXh72caWGmMd6VNuGRxgxDOvRmOhA/edit",
      previewUrl: "images/casestudies/netflixpreview.png"
    },
    {
      title: "Swiggy | Increasing Average Order Value Through Rewards",
      tag: "PRD on increasing average ticket size with focus on Growth & Monetization",
      summary: "Investigated drivers behind low average ticket sizes on Swiggy and designed a rewards-linked incentive framework that nudges users toward higher-value baskets without compromising order frequency..",
      docUrl: "https://docs.google.com/document/d/1reSmvzq9DYMZyT2b9xGe3AXuw8sKpuVhEbqz4nu3oVk/edit",
      previewUrl: "images/casestudies/Swiggypreview.png"
    },
    {
      title: "Marvel Strike Force | Gameplay Loop & Reward System Teardown",
      tag: "Product Teardown on game Economy & Engagement",
      summary: "Conducted a structured teardown of Marvel Strike Force to understand core gameplay loops, reward mechanics, and progression systems, identifying why players remain engaged long-term and where reward pacing could be optimized.",
      docUrl: "https://docs.google.com/presentation/d/1jIdVuljuNHYU5B-prwnJlcbAwOXuNfhgWQyWdrn3Jm0/edit",
      previewUrl: "images/casestudies/MSFpreview.jpg"
    },
    {
      title: "Agrimart | Eliminating Middlemen in Agricultural Marketplaces",
      tag: "Case Study with 0→1 marketplace Design",
      summary: "Studied inefficiencies in agricultural supply chains where middlemen captured disproportionate value, and proposed a direct-to-consumer marketplace model enabling farmers to sell produce transparently to end customers.",
      docUrl: "https://docs.google.com/presentation/d/1tbmnIltbmQi-6FkEVCpJlnYHLxocVdAy/edit",
      previewUrl: "images/casestudies/Agrimartpreview.png"
    }
  ],
  observations: [
    {
      id: "obs1",
      title: "Spotify's seamless Device Control Across Contexts",
      imageUrl: "images/casestudies/Spotifypreview.png",
      description: "Observed how Spotify’s device-switching experience reduces friction across multi-device usage by clearly surfacing the active playback context and allowing users to control music seamlessly across environments."
    },
    {
      id: "obs2",
      title: "MMT's inspiration Over Intent in Travel Discovery",
      imageUrl: "images/casestudies/netflixobpreview.png",
      description: "Noticed how MakeMyTrip’s 'Where to Go' feature caters to users without a fixed destination by shifting discovery from intent-based search to inspiration-driven exploration."
    },
    {
      id: "obs3",
      title: "Netflix's explicit Feedback as a Recommendation Signal",
      imageUrl: "images/casestudies/mmtobpreview.png",
      description: "Analyzed how Netflix’s introduction of explicit feedback signals (like/dislike) improves recommendation quality by capturing user intent more accurately than passive consumption alone."
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
          <SectionHeader title="Experience" subtitle="Strategic leadership in the trenches of product management and development." />
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
          <SectionHeader title="Case Studies and PRDs" subtitle="Deep dives into strategy, design, and outcome." />
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
          <SectionHeader title="Product Observations" subtitle="Occasional product observations in different applications." light />
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
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-lg mx-auto italic">"Contact me directly on my mobile +918018087510"</p>
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
              <span>Based in India</span>
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
