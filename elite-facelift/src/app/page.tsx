"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] text-white selection:bg-blue-600 selection:text-white pb-32 font-sans">
      
      {/* NAVIGATION - Functional & Sharp */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 md:p-8 z-50 mix-blend-difference border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="text-xs md:text-sm tracking-widest uppercase font-semibold text-white">
          ASTITWA <span className="text-blue-500">MISHRA</span>
        </div>
        <div className="flex gap-8 text-xs md:text-sm tracking-widest uppercase font-medium items-center">
          <a href="#work" className="hover:text-blue-500 transition-colors hidden md:block">Selected Works</a>
          <a href="#expertise" className="hover:text-blue-500 transition-colors hidden md:block">Expertise</a>
          <a href="mailto:astitwa750@gmail.com" className="bg-white text-black px-4 py-2 hover:bg-blue-600 hover:text-white transition-colors font-bold">
            Hire Me
          </a>
        </div>
      </nav>

      {/* HERO SECTION - Chopped but Clear Value Prop */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex flex-col justify-center px-4 md:px-8 relative sticky top-0 overflow-hidden"
      >
        {/* Hard-hitting Abstract Graphic (Top Right) */}
        <motion.div 
          initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 4, opacity: 1, filter: "blur(20px)" }}
          animate={{ 
            top: "20%", 
            left: "75%", 
            x: "-50%", 
            y: "-50%", 
            scale: 1.5, 
            opacity: 0.25, 
            filter: "blur(0px)",
            rotate: 360 
          }}
          transition={{ 
            top: { duration: 2.5, ease: [0.76, 0, 0.24, 1] },
            left: { duration: 2.5, ease: [0.76, 0, 0.24, 1] },
            scale: { duration: 2.5, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 2.5, ease: [0.76, 0, 0.24, 1] },
            filter: { duration: 2, ease: [0.76, 0, 0.24, 1] },
            rotate: { duration: 180, repeat: Infinity, ease: "linear" } 
          }}
          className="absolute pointer-events-none mix-blend-screen z-0 text-blue-500"
        >
          <svg width="1000" height="1000" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.2">
            {/* The Seed of Life / Complexity Ring */}
            {Array.from({ length: 12 }).map((_, i) => (
              <circle 
                key={i} 
                cx={(100 + 40 * Math.cos(i * Math.PI / 6)).toFixed(4)} 
                cy={(100 + 40 * Math.sin(i * Math.PI / 6)).toFixed(4)} 
                r="40" 
                strokeWidth="0.1" 
                strokeDasharray="1 3" 
              />
            ))}
            
            {/* The Omniscient Eye / Vision */}
            <path d="M 40 100 Q 100 40 160 100 Q 100 160 40 100" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="25" strokeWidth="0.3" />
            <circle cx="100" cy="100" r="10" strokeDasharray="2 1" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="3" fill="currentColor" />

            {/* Neural Pathways piercing the eye */}
            {Array.from({ length: 24 }).map((_, i) => (
              <path 
                key={`path-${i}`} 
                d={`M 100 100 L ${(100 + 90 * Math.cos(i * Math.PI / 12)).toFixed(4)} ${(100 + 90 * Math.sin(i * Math.PI / 12)).toFixed(4)}`} 
                strokeWidth={i % 2 === 0 ? "0.2" : "0.05"}
                strokeDasharray={i % 3 === 0 ? "2 4" : "none"}
              />
            ))}

            {/* The Hexagram / Order in Chaos */}
            <polygon points="100,20 169.28,60 169.28,140 100,180 30.72,140 30.72,60" strokeWidth="0.3" />
            <polygon points="100,40 151.96,70 151.96,130 100,160 48.04,130 48.04,70" strokeWidth="0.1" transform="rotate(30 100 100)" />
          </svg>
        </motion.div>

        <div className="max-w-[1800px] mx-auto w-full relative z-10 flex flex-col justify-center h-full pt-32">
          
          <motion.div 
            initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col mb-8"
          >
            <p className="text-blue-500 tracking-[0.2em] uppercase font-bold text-sm md:text-base mb-4 flex items-center gap-4">
              <span className="w-12 h-px bg-blue-500 block"></span> 
              Developer & AI Automation Specialist
            </p>
            <h1 className="text-[12vw] md:text-[9vw] leading-[0.8] tracking-tight uppercase font-[family-name:var(--font-anton)] text-white">
              ENGINEERING <br/>
              <span className="text-zinc-500">THE IMPOSSIBLE.</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-zinc-800 pt-8"
          >
            <div className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              A developer obsessing over details that matter. My sweet spot is the intersection of AI and automation—building intelligent bots, data pipelines, and workflow automations.
            </div>
            <div className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              I treat every project like a product—clean code, clear communication, delivered on time. Fluent in MERN, Python, and enterprise-grade LLM orchestration.
            </div>
            <div className="flex justify-start md:justify-end items-start">
               <a href="#work" className="group flex items-center gap-4 text-white hover:text-blue-500 transition-colors uppercase tracking-widest font-bold text-sm">
                 View Projects
                 <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all">
                   <ArrowUpRight className="w-4 h-4" />
                 </div>
               </a>
            </div>
          </motion.div>

          {/* BULLETIN BOARD - Miscellaneous Precious Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-16 md:mt-24 border-t border-zinc-800/50 pt-8 flex flex-wrap gap-8 md:gap-16 text-xs font-mono uppercase tracking-widest text-zinc-500"
          >
            <div>
              <div className="text-white font-bold mb-2">System Status</div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                Accepting New Projects
              </div>
            </div>
            <div>
              <div className="text-white font-bold mb-2">Location</div>
              <div>Ghaziabad, UP / Remote</div>
            </div>
            <div>
              <div className="text-white font-bold mb-2">Core Arsenal</div>
              <div>MERN Stack • Python • TS</div>
            </div>
            <div>
              <div className="text-white font-bold mb-2">Architecture Focus</div>
              <div>RBAC • APIs • CI/CD</div>
            </div>
            <div>
              <div className="text-white font-bold mb-2">Currently Crushing</div>
              <div>100+ LeetCode Problems</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* EXPERTISE MARQUEE - Functional conversion element */}
      <section id="expertise" className="relative z-20 bg-blue-600 text-black py-6 overflow-hidden flex border-y border-white/20 scroll-mt-24">
        <div className="animate-marquee flex whitespace-nowrap w-max hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 text-2xl md:text-4xl font-[family-name:var(--font-anton)] uppercase tracking-wide">
              <span>Full-Stack Development</span> <span className="text-sm opacity-50">●</span>
              <span>AI & LLM Integration</span> <span className="text-sm opacity-50">●</span>
              <span>Web Scraping</span> <span className="text-sm opacity-50">●</span>
              <span>Workflow Automation</span> <span className="text-sm opacity-50">●</span>
              <span>Next.js & React</span> <span className="text-sm opacity-50">●</span>
              <span>Python Architecture</span> <span className="text-sm opacity-50">●</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID SECTION - Chopped but highly functional */}
      <section id="work" className="relative z-20 bg-[#0A0A0A] px-4 md:px-8 max-w-[1800px] mx-auto py-32">
        
        {/* ROW 1: Project 01 */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-4 mb-32 relative group">
          <div className="relative xl:absolute top-0 left-0 z-20 w-full p-0 xl:p-8 pointer-events-none flex justify-between items-start order-2 xl:order-none">
            <div>
              <h2 className="text-6xl md:text-[10rem] font-[family-name:var(--font-anton)] leading-[0.85] tracking-tight uppercase text-white mix-blend-difference mb-4">
                01. STUDY HUB
              </h2>
              <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 md:p-8 max-w-xl pointer-events-auto mt-4 xl:mt-8 shadow-2xl">
                <div className="flex flex-wrap gap-4 uppercase tracking-widest font-sans text-xs font-bold mb-6">
                  <span className="bg-white text-black px-3 py-1">CROSS-PLATFORM APP</span>
                  <span className="border border-white/30 px-3 py-1 text-white">5.86K+ SUBSCRIBERS</span>
                  <span className="border border-white/30 px-3 py-1 text-white">PWA / CAPACITOR / ONESIGNAL</span>
                </div>
                <p className="text-sm text-white/90 font-sans leading-relaxed">
                  A comprehensive learning platform delivering structured curriculum and exam prep to thousands of active students seamlessly across web and mobile.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400">
                  <div><span className="text-white font-bold block mb-1">Role</span> Full-Stack Developer</div>
                  <div><span className="text-white font-bold block mb-1">Stack</span> Tailwind, Capacitor, OneSignal</div>
                  <div><span className="text-white font-bold block mb-1">Impact</span> 5.86K+ Subs & Live APK</div>
                  <div><span className="text-white font-bold block mb-1">Domain</span> EdTech Platform</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden xl:block w-1/4 bg-transparent h-[500px] xl:h-[700px]" />
          
          <a href="https://yash-study-hub-app.vercel.app" target="_blank" rel="noreferrer" className="w-full xl:w-3/4 h-[400px] xl:h-[700px] relative overflow-hidden bg-zinc-900 grayscale-0 xl:grayscale xl:group-hover:grayscale-0 transition-all duration-700 block cursor-pointer order-1 xl:order-none">
            <Image src="/proj1.png" alt="Yash Study Hub" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-1000" />
            
            {/* Functional Hover State CTA */}
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-500 flex items-center justify-center">
              <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black px-8 py-4 uppercase tracking-widest font-bold text-sm flex items-center gap-2">
                Visit Live Site <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>

        {/* ROW 2: Split 50/50 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-32">
          
          {/* Project 02 */}
          <div className="flex flex-col xl:block relative group">
            <div className="relative xl:absolute top-0 left-0 z-20 w-full p-0 xl:p-6 pointer-events-none order-2 xl:order-none mt-6 xl:mt-0">
              <h2 className="text-5xl md:text-[7rem] font-[family-name:var(--font-anton)] leading-[0.85] tracking-tight uppercase text-white mix-blend-difference mb-4">
                02. AI SCRAPER
              </h2>
              <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 max-w-md pointer-events-auto mt-4 xl:mt-6 shadow-2xl">
                <div className="flex flex-col gap-2 uppercase tracking-widest font-sans text-xs font-bold mb-6">
                  <span className="bg-white text-black px-3 py-1 w-max">AI AUTOMATION</span>
                  <span className="text-white">PYTHON / OPENAI / SELENIUM</span>
                </div>
                <p className="text-sm text-white/90 font-sans leading-relaxed">
                  An autonomous agent that navigates complex sites to extract, structure, and synthesize raw unstructured data into actionable JSON using LLMs.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400">
                  <div><span className="text-white font-bold block mb-1">Role</span> Developer</div>
                  <div><span className="text-white font-bold block mb-1">Stack</span> Python, OpenAI LLMs, Selenium</div>
                  <div><span className="text-white font-bold block mb-1">Impact</span> 75% Faster Extraction</div>
                  <div><span className="text-white font-bold block mb-1">Domain</span> Data Intelligence</div>
                </div>
              </div>
            </div>
            
            <a href="https://github.com/Astitwa2006/AI-WEBSCRAPER" target="_blank" rel="noreferrer" className="block w-full h-[400px] xl:h-[800px] relative overflow-hidden bg-zinc-900 grayscale-0 xl:grayscale xl:group-hover:grayscale-0 transition-all duration-700 mt-0 xl:mt-32 order-1 xl:order-none">
              <Image src="/ai_scraper.png" alt="AI Web Scraper" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-500 flex items-center justify-center">
                <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black px-8 py-4 uppercase tracking-widest font-bold text-sm flex items-center gap-2">
                  View Repository <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          </div>

          {/* Project 03 */}
          <div className="flex flex-col xl:block relative group">
            <div className="relative xl:absolute bottom-0 left-0 z-20 w-full p-0 xl:p-6 pointer-events-none translate-y-0 order-2 xl:order-none mt-6 xl:mt-0">
              <h2 className="text-5xl md:text-[7rem] font-[family-name:var(--font-anton)] leading-[0.85] tracking-tight uppercase text-white mix-blend-difference mb-4">
                03. DISCORD BOT
              </h2>
              <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 max-w-md pointer-events-auto mt-4 xl:mt-6 shadow-2xl">
                <div className="flex flex-col gap-2 uppercase tracking-widest font-sans text-xs font-bold mb-6">
                  <span className="bg-white text-black px-3 py-1 w-max">AI AGENT</span>
                  <span className="text-white">LANGCHAIN / RAG / OPENAI API</span>
                </div>
                <p className="text-sm text-white/90 font-sans leading-relaxed">
                  An intelligent community assistant leveraging RAG to instantly answer user questions, moderate discussions, and maintain server health 24/7.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400">
                  <div><span className="text-white font-bold block mb-1">Role</span> Developer</div>
                  <div><span className="text-white font-bold block mb-1">Stack</span> Python, LangChain, OpenAI</div>
                  <div><span className="text-white font-bold block mb-1">Impact</span> Sub-1.5s Responses</div>
                  <div><span className="text-white font-bold block mb-1">Domain</span> Community SaaS</div>
                </div>
              </div>
            </div>
            
            <a href="https://github.com/Astitwa2006/AI-DISCORD-BOT" target="_blank" rel="noreferrer" className="block w-full h-[400px] xl:h-[800px] relative overflow-hidden bg-zinc-900 grayscale-0 xl:grayscale xl:group-hover:grayscale-0 transition-all duration-700 order-1 xl:order-none">
              <Image src="/discord_bot.png" alt="Discord AI Bot" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-500 flex items-center justify-center">
                <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black px-8 py-4 uppercase tracking-widest font-bold text-sm flex items-center gap-2">
                  View Repository <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ROW 3: Project 04 */}
        <div className="flex flex-col xl:flex-row-reverse gap-8 xl:gap-4 relative group mb-32 xl:mb-0">
          <div className="relative xl:absolute top-0 xl:top-8 left-0 z-20 w-full p-0 xl:p-8 pointer-events-none text-left xl:text-right flex flex-col items-start xl:items-end order-2 xl:order-none">
            <h2 className="text-6xl md:text-[10rem] font-[family-name:var(--font-anton)] leading-[0.85] tracking-tight uppercase text-white mix-blend-difference mb-4">
              04. DASHBOARD
            </h2>
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 md:p-8 max-w-xl pointer-events-auto mt-4 xl:mt-8 shadow-2xl text-left">
              <div className="flex flex-wrap gap-4 uppercase tracking-widest font-sans text-xs font-bold mb-6 justify-start xl:justify-end">
                <span className="bg-white text-black px-3 py-1">WORKFLOW AUTOMATION</span>
                <span className="border border-white/30 px-3 py-1 text-white">NODE.JS / N8N / CRMS</span>
              </div>
              <p className="text-sm text-white/90 font-sans leading-relaxed text-left xl:text-right">
                A centralized command center orchestrating disparate microservices and multi-step business workflows into a unified, observable interface.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 text-left xl:text-right">
                <div><span className="text-white font-bold block mb-1">Role</span> Full-Stack Developer</div>
                <div><span className="text-white font-bold block mb-1">Stack</span> React, Node.js, n8n</div>
                <div><span className="text-white font-bold block mb-1">Impact</span> Synced Slack & CRMs</div>
                <div><span className="text-white font-bold block mb-1">Domain</span> Process Automation</div>
              </div>
            </div>
          </div>

          <div className="hidden xl:block w-1/4 bg-transparent h-[500px] xl:h-[700px]" />
          
          <a href="https://github.com/Astitwa2006/Automation-Dashboard" target="_blank" rel="noreferrer" className="block w-full xl:w-[70%] h-[400px] xl:h-[800px] relative overflow-hidden bg-zinc-900 grayscale-0 xl:grayscale xl:group-hover:grayscale-0 transition-all duration-700 mt-0 xl:mt-0 xl:absolute xl:top-1/2 xl:-translate-y-1/2 xl:left-0 order-1 xl:order-none">
            <Image src="/dashboard.png" alt="Automation Dashboard" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-500 flex items-center justify-center">
              <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black px-8 py-4 uppercase tracking-widest font-bold text-sm flex items-center gap-2">
                Visit Live Site <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* BRUTALIST CTA FOOTER */}
      <footer className="relative z-30 bg-white text-black py-32 px-4 md:px-8 border-t-[20px] border-blue-600">
        <div className="max-w-[1800px] mx-auto text-center">
          <p className="uppercase tracking-[0.3em] font-bold text-sm mb-8 text-blue-600">Available for new opportunities</p>
          <h2 className="text-[12vw] md:text-[15vw] leading-[0.8] tracking-tight uppercase font-[family-name:var(--font-anton)] hover:text-blue-600 transition-colors cursor-pointer">
            <a href="mailto:astitwa750@gmail.com">LET'S BUILD.</a>
          </h2>
          <div className="mt-16 flex justify-center gap-8 uppercase font-bold text-xs tracking-widest">
            <a href="https://github.com/Astitwa2006" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/astitwa-mishra" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
