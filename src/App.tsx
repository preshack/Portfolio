import { useState, useEffect, useRef } from 'react'
import {
  Terminal, User, Home, Mail, Code, GraduationCap,
  Github, Instagram, Facebook, ExternalLink, Copy, Check,
  Minimize2, Maximize2, Send, Bot, MapPin, Flag,
  Folder, Cpu, Server, Database,
  Shield, Command, X, Phone, Linkedin
} from 'lucide-react'

// --- Data & Content ---

const knowledgeBase: Record<string, string> = {
  "who is preshak": "Preshak Bhattarai is a B.S. Computer Science student with a cybersecurity specialization at the University of Wisconsin-Green Bay (UWGB), Class of Dec 2029. Former Database Management Intern for a non-profit supporting 30,000+ users. From Nepal, now in Wisconsin, USA.",
  "what does he do": "Preshak builds secure database systems and AI-powered applications. He has experience in database management, RBAC, secure data workflows, IT systems administration, and network security. He works with Python, APIs, and LLMs.",
  "education": "B.S. Computer Science - Cyber Security at University of Wisconsin-Green Bay (UW-Green Bay), graduating Dec 2029. High school: Computer Science major in Nepal.",
  "skills": "Languages: Python, Java, SQL, Bash. Cybersecurity: Network Security, Threat Detection, Incident Response, SOC Operations. Development: API Integration, AI/LLMs, GUI, Linux Administration. Cloud & Tools: AWS (Cloud Practitioner), Google Cloud, Git.",
  "contact": "Email: preshak07@gmail.com | Phone: (920) 489-5575 | LinkedIn: linkedin.com/in/preshak-bhattarai | GitHub: github.com/PROX-GOD | Instagram: @preshakdjodd | Facebook: PreshakBhattarai.",
  "projects": "MockDeu (AI Visa Interview Simulator — Python, LLMs, Speech-to-Text). FBPROX (Facebook Automation Tool — Python, GraphQL). PROXLOAD (secure file sharing). PROXEDU (educational platform). Python Modules (productivity scripts).",
  "location": "Originally from Nepal; currently in Green Bay, Wisconsin, USA. Studying at UW-Green Bay.",
  "age": "19 years old",
  "certifications": "AWS Cloud Practitioner; Google Hackathon participant.",
  "internship": "Database Management Intern (Aug 2024–Dec 2025): secure DB for international student records, SEVIS/visa docs, RBAC, automated data validation. Summer IT Intern at BKVM, Biratnagar, NP (Mar–May 2024): academic databases, IT security, SQL, school website.",
  "leadership": "GDG (Google Developer Group) Member, Green Bay, WI — Sept 2025–Present. School Captain at BKVM, Biratnagar, NP — June–Dec 2023. Volunteer at Shree Pokhariya School — taught 100+ students Python and Java (June–Aug 2024)."
};

const linuxCommands: Record<string, () => string> = {
  "whoami": () => "preshak",
  "pwd": () => "/home/preshak",
  "date": () => new Date().toLocaleString(),
  "uname": () => "Linux hackbox 5.15.0-kali x86_64 GNU/Linux",
  "ls": () => "about.txt  contact.txt  home.txt  projects/  proxai.py  skills.txt",
  "cat /etc/os-release": () => 'NAME="Kali Linux"\nVERSION="2024.1"\nID=kali',
  "uptime": () => `${Math.floor(Math.random() * 100)} days, ${Math.floor(Math.random() * 24)} hours`,
  "echo $SHELL": () => "/bin/bash",
  "hostname": () => "hackbox"
};

// --- Simple RAG: chunk store + keyword retrieval ---
const RAG_CHUNKS: Array<{ key: string; text: string }> = Object.entries(knowledgeBase).map(([key, text]) => ({ key, text }));

function tokenize(s: string): string[] {
  return s.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);
}

function scoreChunk(queryWords: string[], chunk: { key: string; text: string }): number {
  const keyLower = chunk.key.toLowerCase();
  const textLower = chunk.text.toLowerCase();
  let score = 0;
  for (const w of queryWords) {
    if (w.length < 2) continue;
    if (keyLower.includes(w)) score += 3;
    if (textLower.includes(w)) score += 1;
  }
  return score;
}

function ragRetrieve(query: string, topK = 3): Array<{ key: string; text: string }> {
  const words = tokenize(query);
  if (words.length === 0) return [];
  const scored = RAG_CHUNKS.map(chunk => ({ chunk, score: scoreChunk(words, chunk) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(x => x.chunk);
}

function toFirstPerson(text: string): string {
  return text
    .replace(/\bPreshak Bhattarai is\b/gi, "I'm")
    .replace(/\bPreshak is\b/gi, "I'm")
    .replace(/\bHe's\b/gi, "I'm")
    .replace(/\bHe\b/g, "I")
    .replace(/\bhis\b/gi, "my")
    .replace(/\bhim\b/gi, "me")
    .replace(/\bPreshak\b/g, "I")
    .replace(/\bhe\b/g, "I")
    .replace(/\bhimself\b/gi, "myself");
}

// Fix verb agreement after converting to first person (e.g. "I builds" -> "I build")
function fixFirstPersonGrammar(text: string): string {
  return text
    .replace(/\bI builds\b/gi, "I build")
    .replace(/\bI build\b/gi, "I build")
    .replace(/\bI has\b/gi, "I have")
    .replace(/\bI have\b/gi, "I have")
    .replace(/\bI works\b/gi, "I work")
    .replace(/\bI work\b/gi, "I work")
    .replace(/\bI does\b/gi, "I do")
    .replace(/\bI do\b/gi, "I do")
    .replace(/\bI makes\b/gi, "I make")
    .replace(/\bI make\b/gi, "I make")
    .replace(/\bI is\b/gi, "I am")
    .replace(/\bI am\b/gi, "I am")
    .replace(/\bI was\b/gi, "I was")
    .replace(/\bI were\b/gi, "I was")
    .replace(/\bI had\b/gi, "I had")
    .replace(/\bI experience\b/gi, "I have experience")
    .replace(/\bI has experience\b/gi, "I have experience");
}

const CHATBOT_OPENERS = ["Sure! ", "Great question! ", "Here's what I can share: ", "I'd be happy to tell you — ", "Sure thing! ", ""];

function ragAnswer(query: string): string {
  const lower = query.toLowerCase().trim();

  if (/^(hi|hey|hello|howdy|yo|sup|what'?s up)\s*!?\.?$/i.test(lower)) {
    return "Hi! I'm Preshak. Ask me anything about my background — education, skills, projects, experience, or how to get in touch. What would you like to know?";
  }
  if (/^(thanks|thank you|ty|thx)/i.test(lower)) {
    return "You're welcome! Anything else you'd like to know about me?";
  }
  if (/^(who are you|what is this|what can you do)/i.test(lower)) {
    return "I'm a chatbot that answers questions about Preshak using only his resume. Ask me about his education, skills, projects, internships, contact info, or anything else on his profile.";
  }
  if (lower === 'help') {
    return "I can answer questions about Preshak based on his resume. Try asking:\n\n• \"What's your education?\" or \"Where do you study?\"\n• \"What skills do you have?\" or \"Tell me about your projects\"\n• \"How can I contact you?\" or \"What's your email?\"\n• \"Tell me about your internship\" or \"Do you have certifications?\"\n\nJust ask in your own words!";
  }
  if (lower === 'clear') return "";

  const exact = Object.entries(knowledgeBase).find(([k]) => lower.includes(k) || k.includes(lower));
  if (exact) {
    const friendly = fixFirstPersonGrammar(toFirstPerson(exact[1]));
    return CHATBOT_OPENERS[Math.floor(Math.random() * CHATBOT_OPENERS.length)] + friendly;
  }

  const retrieved = ragRetrieve(query, 3);
  if (retrieved.length === 0) {
    return "I don't have that specific detail on my resume. You can ask about my education, skills, projects, internships, contact info, or leadership experience — I'm happy to share those!";
  }

  const combined = fixFirstPersonGrammar(retrieved.map(r => toFirstPerson(r.text)).join(" "));
  return CHATBOT_OPENERS[Math.floor(Math.random() * CHATBOT_OPENERS.length)] + combined;
}

// --- Components ---

const SkillRow = ({ name, level, category, onClick }: { name: string; level: number; category: string; onClick: () => void }) => {
  const barWidth = Math.round((level / 100) * 20);
  const bar = '█'.repeat(barWidth) + '░'.repeat(20 - barWidth);
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 md:gap-4 py-2 px-2 rounded border border-transparent hover:border-green-500/40 hover:bg-white/5 text-left font-mono text-sm group"
    >
      <span className="text-green-400 w-28 md:w-36 shrink-0 truncate">{name}</span>
      <span className="text-gray-500 shrink-0 hidden sm:inline">{bar}</span>
      <span className="text-green-500/80 w-10 shrink-0">{level}%</span>
      <span className="text-gray-600 text-xs shrink-0">[{category}]</span>
    </button>
  );
};

const ProjectCard = ({ name, description, link, tech }: any) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block group bg-black/40 border border-white/10 hover:border-green-500/50 p-4 rounded-lg transition-all duration-300"
  >
    <div className="flex items-start gap-3">
      <Folder className="text-blue-400 fill-blue-400/20 w-8 h-8 shrink-0 group-hover:text-green-400 group-hover:fill-green-400/20 transition-colors" />
      <div>
        <div className="font-bold text-gray-200 group-hover:text-green-300 flex items-center gap-2">
          {name}
          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="text-sm text-gray-400 mt-1 leading-relaxed">{description}</div>
        <div className="flex gap-2 mt-3">
          {tech.map((t: string) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
              {t}
            </span>
          ))}
        </div>
        <div className="text-[10px] text-gray-600 mt-2 font-mono">drwxr-xr-x preshak:users 4.0K {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  </a>
);

const ContactRow = ({ label, value, icon: Icon, href, copyable = false }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={href}
      target={href.startsWith('http') ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-500/30 rounded-lg group transition-all"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="p-2 bg-black/30 rounded-md text-green-400 group-hover:text-white transition-colors">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
          <div className="text-sm text-gray-300 font-mono truncate">{value}</div>
        </div>
      </div>
      {copyable ? (
        <button
          onClick={handleCopy}
          className="p-2 text-gray-500 hover:text-green-400 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      ) : (
        <ExternalLink size={14} className="text-gray-500 group-hover:text-green-400 transition-colors" />
      )}
    </a>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [command, setCommand] = useState("cat ~/home.txt");
  const [skillExample, setSkillExample] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [proxAIInput, setProxAIInput] = useState("");
  const [proxAIHistory, setProxAIHistory] = useState<Array<{type: 'input' | 'output', text: string}>>([
    { type: 'output', text: "Hi! I'm Preshak. I can answer questions about my background using my resume — education, skills, projects, experience, or contact. What would you like to know? (Type help for ideas.)" }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const proxAIRef = useRef<HTMLDivElement>(null);

  // Type definition for sections to avoid implicit any errors if needed,
  // though typically inference works.
  // The issue in the previous error was likely due to how 'key' was being accessed or inferred in the map callback
  // or a temporary build artifact issue.
  // Explicitly typing 'sections' or ensuring the map callback is clean helps.

  const sections: Record<string, { command: string, icon: JSX.Element, content: JSX.Element | null }> = {
    home: {
      command: "cat ~/home.txt",
      icon: <Home className="w-5 h-5" />,
      content: (
        <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
          <div className="relative mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur opacity-30 animate-pulse"></div>
            <img
              src={require('./assets/profile.jpeg')}
              alt="Preshak"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-green-500/50 object-cover shadow-2xl"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full" title="Online"></div>
          </div>

          <div className="text-center space-y-4 max-w-2xl px-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Preshak <span className="text-green-500">Bhattarai</span>
            </h1>

            <div className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs md:text-sm font-mono mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping mr-2"></span>
              System Status: ONLINE
            </div>

            <p className="text-lg md:text-xl text-gray-300 font-light">
              Cybersecurity Analyst <span className="text-gray-600 mx-2">|</span> Full Stack Developer
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 font-mono mt-6">
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded border border-gray-800">
                <MapPin size={14} className="text-blue-400" />
                <span>Wisconsin, USA</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded border border-gray-800">
                <Flag size={14} className="text-red-400" />
                <span>Nepal Origin</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded border border-gray-800">
                <GraduationCap size={14} className="text-yellow-400" />
                <span>UWGB '29</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    about: {
      command: "cat ~/about.txt",
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <User size={100} />
            </div>
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <Command size={20} /> Identity Verification
            </h3>
            <p className="text-gray-300 leading-relaxed">
              B.S. Computer Science student with a cybersecurity specialization at UW-Green Bay. Former Database Management Intern for a non-profit platform supporting 30,000+ users—managing web infrastructure, databases, and secure data workflows. Background in IT systems administration and network security; experience building AI-powered applications using Python, APIs, and large language models.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/20 border border-gray-800 rounded-lg p-5">
              <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <GraduationCap size={18} /> Education Log
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="relative pl-4 border-l-2 border-blue-500/30">
                  <div className="font-bold text-gray-200">University of Wisconsin-Green Bay</div>
                  <div className="text-gray-400">B.S. Computer Science — Cyber Security</div>
                  <div className="text-xs text-blue-400/80 mt-1">Dec 2029 • Current</div>
                </li>
                <li className="relative pl-4 border-l-2 border-gray-700">
                  <div className="font-bold text-gray-200">High School</div>
                  <div className="text-gray-400">Computer Science Major</div>
                  <div className="text-xs text-gray-500 mt-1">Nepal</div>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 border border-gray-800 rounded-lg p-5">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <Shield size={18} /> Certifications
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/5">
                  <div className="bg-yellow-500/20 p-2 rounded text-yellow-500"><Server size={16} /></div>
                  <div>
                    <div className="font-medium text-gray-200">Amazon AWS</div>
                    <div className="text-xs text-gray-500">Cloud Practitioner</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/5">
                  <div className="bg-blue-500/20 p-2 rounded text-blue-500"><Code size={16} /></div>
                  <div>
                    <div className="font-medium text-gray-200">Google Hackathon</div>
                    <div className="text-xs text-gray-500">Participant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/20 border border-gray-800 rounded-lg p-5">
            <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Database size={18} /> Internship Experience
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="relative pl-4 border-l-2 border-green-500/30">
                <div className="font-bold text-gray-200">Database Management Intern</div>
                <div className="text-gray-400">Non-profit (30,000+ users) | Remote | Aug 2024 – Dec 2025</div>
                <div className="text-xs text-gray-500 mt-1">Secure DB for international student records (SEVIS, visa docs); RBAC; automated data validation; security compliance.</div>
              </li>
              <li className="relative pl-4 border-l-2 border-gray-700">
                <div className="font-bold text-gray-200">Summer IT Intern</div>
                <div className="text-gray-400">BKVM | Biratnagar, NP | Mar – May 2024</div>
                <div className="text-xs text-gray-500 mt-1">Academic databases, IT security, SQL; school website (HTML, CSS, JavaScript); classroom tech deployment.</div>
              </li>
            </ul>
          </div>

          <div className="bg-black/20 border border-gray-800 rounded-lg p-5">
            <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Terminal size={18} /> Leadership & Volunteer
            </h4>
            <ul className="space-y-3 text-sm">
              <li><span className="font-bold text-gray-200">GDG Member</span> — Google Developer Group, Green Bay, WI | Sept 2025 – Present</li>
              <li><span className="font-bold text-gray-200">School Captain</span> — BKVM, Biratnagar, NP | June – Dec 2023</li>
              <li><span className="font-bold text-gray-200">Volunteer</span> — Shree Pokhariya School, Biratnagar | June – Aug 2024 (taught 100+ students Python & Java)</li>
            </ul>
          </div>
        </div>
      )
    },
    skills: {
      command: "./list_skills.sh --verbose",
      icon: <Cpu className="w-5 h-5" />,
      content: (
        <div className="animate-fade-in font-mono">
          <div className="text-gray-500 text-xs mb-4 border-b border-gray-800 pb-2"># Languages & Core</div>
          <div className="space-y-0 divide-y divide-gray-800/80">
            <SkillRow name="Python" level={90} category="Scripting" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Python' }))} />
            <SkillRow name="JavaScript" level={85} category="Web" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'JavaScript' }))} />
            <SkillRow name="Java" level={78} category="Language" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Java' }))} />
            <SkillRow name="SQL" level={82} category="Data" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'SQL' }))} />
            <SkillRow name="Bash" level={75} category="Shell" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Bash' }))} />
            <SkillRow name="C++" level={75} category="System" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'C++' }))} />
            <SkillRow name="HTML/CSS" level={95} category="Frontend" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'HTML/CSS' }))} />
          </div>
          <div className="text-gray-500 text-xs mt-6 mb-4 border-b border-gray-800 pb-2"># Security Arsenal</div>
          <div className="space-y-0 divide-y divide-gray-800/80">
            <SkillRow name="Burp Suite" level={70} category="Web Sec" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Burp Suite' }))} />
            <SkillRow name="Wireshark" level={75} category="Network" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Wireshark' }))} />
            <SkillRow name="Metasploit" level={65} category="Exploit" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Metasploit' }))} />
            <SkillRow name="Nmap" level={80} category="Recon" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Nmap' }))} />
          </div>
          <div className="text-gray-500 text-xs mt-6 mb-4 border-b border-gray-800 pb-2"># Frameworks & Tools</div>
          <div className="space-y-0 divide-y divide-gray-800/80">
            <SkillRow name="React" level={88} category="Library" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'React' }))} />
            <SkillRow name="Next.js" level={80} category="Framework" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Next.js' }))} />
          </div>
        </div>
      )
    },
    projects: {
      command: "ls -la ~/projects/",
      icon: <Folder className="w-5 h-5" />,
      content: (
        <div className="animate-fade-in">
          <div className="grid md:grid-cols-2 gap-4">
            <ProjectCard
              name="MockDeu — AI Visa Interview Simulator"
              description="AI-driven visa interview simulator using LLMs for dynamic questions and realistic scenarios. Speech-to-text and text-to-speech for real-time voice interaction; automated feedback and performance insights."
              link="https://github.com/PROX-GOD"
              tech={['Python', 'LLMs', 'Speech-to-Text']}
            />
            <ProjectCard
              name="FBPROX — Facebook Automation Tool"
              description="Modular Python automation tool leveraging GraphQL APIs for workflow automation. Secure authentication and scalable architecture for multi-task automation."
              link="https://github.com/PROX-GOD"
              tech={['Python', 'GraphQL', 'Automation']}
            />
            <ProjectCard
              name="PROXLOAD"
              description="Secure file sharing platform enabling seamless encrypted transfers across devices."
              link="https://github.com/PROX-GOD/PROXLOAD"
              tech={['React', 'Node.js', 'Encryption']}
            />
            <ProjectCard
              name="PROXEDU"
              description="Open-source educational resource hub distributing handwritten notes and study materials."
              link="https://github.com/PROX-GOD/PROXEDU"
              tech={['Next.js', 'PostgreSQL', 'Tailwind']}
            />
            <ProjectCard
              name="Python Modules"
              description="Collection of custom productivity scripts and automation tools for developer workflows."
              link="https://github.com/PROX-GOD/PythonModule"
              tech={['Python', 'Automation', 'CLI']}
            />
          </div>
        </div>
      )
    },
    contact: {
      command: "cat ~/contact_info.json",
      icon: <Mail className="w-5 h-5" />,
      content: (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="bg-black/30 border border-gray-800 rounded-xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-green-400">Establish Connection</h3>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
            </div>

            <div className="space-y-3">
              <ContactRow label="Email Protocol" value="preshak07@gmail.com" icon={Mail} href="mailto:preshak07@gmail.com" copyable />
              <ContactRow label="Phone" value="(920) 489-5575" icon={Phone} href="tel:+19204895575" copyable />
              <ContactRow label="LinkedIn" value="linkedin.com/in/preshak-bhattarai" icon={Linkedin} href="https://linkedin.com/in/preshak-bhattarai" />
              <ContactRow label="GitHub Repository" value="github.com/PROX-GOD" icon={Github} href="https://github.com/PROX-GOD" />
              <ContactRow label="Instagram Feed" value="@preshakdjodd" icon={Instagram} href="https://instagram.com/preshakdjodd" />
              <ContactRow label="Facebook Net" value="PreshakBhattarai" icon={Facebook} href="https://facebook.com/PreshakBhattarai" />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
                <Bot className="text-green-400 shrink-0 mt-1" size={20} />
                <div className="text-sm">
                  <div className="font-bold text-green-300 mb-1">Status: AVAILABLE</div>
                  <div className="text-gray-400">
                    Open for freelance security audits, penetration testing, and full-stack development contracts. Initiate handshake via email.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    proxai: {
      command: "./run_proxai_v2.sh",
      icon: <Bot className="w-5 h-5" />,
      content: null
    }
  };

  const handleSectionChange = (section: any) => {
    setCurrentSection(section);
    setCommand(sections[section as keyof typeof sections].command);
    setSkillExample("");
  };

  const handleProxAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proxAIInput.trim()) return;

    const input = proxAIInput.trim();
    const newHistory = [...proxAIHistory, { type: 'input' as const, text: input }];
    setProxAIHistory(newHistory);
    setProxAIInput('');

    const lowerInput = input.toLowerCase();
    let output: string;

    if (lowerInput === 'clear') {
      setProxAIHistory([{ type: 'output', text: "Chat cleared. Hi again — I'm Preshak. Ask me anything about my background!" }]);
      return;
    }
    if (linuxCommands[lowerInput]) {
      output = linuxCommands[lowerInput]();
    } else {
      output = ragAnswer(input);
    }

    setTimeout(() => {
      setProxAIHistory(prev => [...prev, { type: 'output', text: output }]);
    }, 200);
  };

  // Event listener for skill clicks from the new SkillCards
  useEffect(() => {
    const handleShowSkill = (e: CustomEvent<string>) => {
      // Find the skill example key
      const skillName = e.detail;
      // Map the skill name to the example key if needed
      // For now, assuming direct match or simple mapping
      // The original code had specific keys in 'skillExamples'
      // We need to ensure we have those.
      // Importing 'skillExamples' logic
      const examples: Record<string, string> = {
         'Python': `def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)

# Neural Network implementation pending...`,
         'JavaScript': `const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};`,
         'React': `const HackerTerminal = () => {
  const [hacked, setHacked] = useState(false);
  return (
    <div className={hacked ? 'bg-green-900' : 'bg-black'}>
      <button onClick={() => setHacked(true)}>
        Inject Payload
      </button>
    </div>
  );
};`,
         'HTML/CSS': `.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`,
         'Next.js': `export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/users/PROX-GOD')
  const profile = await res.json()
  return { props: { profile } }
}`,
         'C++': `#include <iostream>
using namespace std;

int main() {
    int *ptr = new int(10);
    cout << "Memory Address: " << ptr << endl;
    cout << "Value: " << *ptr << endl;
    delete ptr; // Prevent memory leak
    return 0;
}`,
         'Video Editing': `[Timeline Sequence 01]
> Color Grade: Teal & Orange LUT
> Audio: De-noise & EQ
> FX: Glitch transition at 00:02:15
> Export: 4K 60fps H.264`,
         'Burp Suite': `POST /login HTTP/1.1
Host: target-site.com
Content-Type: application/x-www-form-urlencoded

username=admin' OR '1'='1&password=password`,
         'Wireshark': `Frame 1: 66 bytes on wire (528 bits), 66 bytes captured
Ethernet II, Src: Apple_xx:xx:xx, Dst: Router_xx:xx:xx
Internet Protocol Version 4, Src: 192.168.1.5, Dst: 8.8.8.8
Transmission Control Protocol, Src Port: 54321, Dst Port: 443`,
         'Metasploit': `msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 exploit(ms17_010_eternalblue) > set RHOSTS 192.168.1.105
msf6 exploit(ms17_010_eternalblue) > exploit

[*] Started reverse TCP handler on 192.168.1.5:4444
[+] Target is vulnerable: Windows 7 Ultimate 7601 Service Pack 1`,
         'Nmap': `$ nmap -sC -sV -O 192.168.1.105
Starting Nmap 7.92...
PORT     STATE SERVICE       VERSION
22/tcp   open  ssh           OpenSSH 7.6p1
80/tcp   open  http          Apache httpd 2.4.29
Device type: general purpose
Running: Linux 4.X`,
         'Java': `public class SecureConnection {
  public static void main(String[] args) {
    try (Connection conn = DriverManager.getConnection(url, user, pass)) {
      PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
      stmt.setInt(1, userId);
      ResultSet rs = stmt.executeQuery();
    }
  }
}`,
         'SQL': `-- RBAC: role-based access control
CREATE ROLE student_access;
GRANT SELECT ON student_records TO student_access;
REVOKE DELETE ON confidential_data FROM public;

-- Secure data validation
SELECT * FROM sevis_docs WHERE status = 'verified' AND expiry_date > CURRENT_DATE;`,
         'Bash': `#!/bin/bash
# Automated validation pipeline
for f in "\${DATA_DIR}"/*.csv; do
  if validate_sevis "$f"; then
    import_to_db "$f"
  else
    log_error "Validation failed: $f"
  fi
done`
      };

      if (examples[skillName]) {
        setSkillExample(examples[skillName]);
      }
    };

    document.addEventListener('showSkill', handleShowSkill as EventListener);
    return () => document.removeEventListener('showSkill', handleShowSkill as EventListener);
  }, []);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [command, currentSection, skillExample]);

  useEffect(() => {
    if (proxAIRef.current) proxAIRef.current.scrollTop = proxAIRef.current.scrollHeight;
  }, [proxAIHistory]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#c0c0c0] font-mono flex flex-col items-center justify-center p-2 md:p-6 overflow-hidden relative selection:bg-green-500/30 selection:text-green-200" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace" }}>
      {/* Background - terminal CRT feel */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#0a0a0a]" />

      {/* Main Terminal Window - xterm/gnome-terminal style */}
      <div className={`relative z-10 w-full flex flex-col overflow-hidden rounded-sm transition-all duration-500 ${isMaximized ? 'h-[90vh] max-w-7xl' : 'h-[85vh] md:h-[700px] max-w-5xl'}`}
           style={{ background: '#0d1117', border: '1px solid #30363d', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>

        {/* Title Bar - classic terminal */}
        <div className="flex items-center justify-between px-3 py-2 shrink-0 border-b border-gray-800" style={{ background: '#161b22' }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-3">
              <button onClick={() => window.location.reload()} className="w-2.5 h-2.5 rounded-sm hover:opacity-90" style={{ background: '#e51400' }} />
              <button onClick={() => setIsMaximized(!isMaximized)} className="w-2.5 h-2.5 rounded-sm hover:opacity-90" style={{ background: '#e5a500' }} />
              <button className="w-2.5 h-2.5 rounded-sm hover:opacity-90" style={{ background: '#339933' }} />
            </div>
            <span className="text-[11px] text-gray-500" style={{ fontFamily: "inherit" }}>preshak@hackbox — bash</span>
          </div>
          <button onClick={() => setIsMaximized(!isMaximized)} className="text-gray-500 hover:text-gray-300 p-1">
            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>

        {/* Content Area - scrollbar hidden */}
        <div ref={terminalRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 scrollbar-hide scroll-smooth" style={{ background: '#0d1117' }}>
          {currentSection === 'proxai' ? (
            <div className="h-full flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-hide" ref={proxAIRef}>
                {proxAIHistory.map((entry, idx) => (
                  <div key={idx} className={`flex ${entry.type === 'input' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] ${entry.type === 'input' ? 'order-2' : ''}`}>
                      {entry.type === 'output' && (
                        <>
                          <div className="text-[10px] text-green-500/90 font-mono mb-0.5">Preshak</div>
                          <div className="font-mono text-sm whitespace-pre-wrap text-gray-300 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5">
                            {entry.text}
                          </div>
                        </>
                      )}
                      {entry.type === 'input' && (
                        <div className="font-mono text-sm text-amber-200/90 bg-white/5 border border-amber-500/20 rounded-lg px-3 py-2.5 inline-block">
                          {entry.text}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleProxAISubmit} className="mt-auto flex items-center gap-2 shrink-0 pt-2 border-t border-white/10">
                <span className="text-amber-400/90 font-mono text-xs shrink-0">You</span>
                <input
                  type="text"
                  value={proxAIInput}
                  onChange={(e) => setProxAIInput(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-500/50 font-mono text-sm"
                  placeholder="Ask about education, skills, projects, contact..."
                  autoFocus
                  spellCheck={false}
                />
                <button type="submit" className="p-2 text-gray-500 hover:text-green-400 shrink-0 rounded hover:bg-white/5">
                  <Send size={18} />
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Command Prompt Line - bash style */}
              <div className="flex items-center gap-1 mb-6 text-sm font-mono flex-wrap">
                <span className="text-green-500">preshak@hackbox</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-500">$</span>
                <span className="text-gray-300 typing-effect ml-1">{command}</span>
                <span className="inline-block w-2 h-4 ml-0.5 bg-green-500 animate-pulse" style={{ animationDuration: '1s' }} />
              </div>

              {/* Dynamic Content */}
              {skillExample ? (
                <div className="animate-fade-in relative group">
                  <div className="absolute top-0 right-0 p-2 z-10">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(skillExample);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="p-2 bg-gray-800 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors border border-gray-700"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={() => setSkillExample("")}
                      className="ml-2 p-2 bg-gray-800 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors border border-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <pre className="bg-[#1e1e1e] p-4 md:p-6 rounded-lg overflow-x-auto text-sm md:text-base border-l-4 border-green-500 shadow-xl font-mono leading-relaxed text-gray-300">
                    <code>{skillExample}</code>
                  </pre>
                  <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    Snippet loaded from memory block 0x84F2
                  </div>
                </div>
              ) : (
                sections[currentSection as keyof typeof sections].content
              )}
            </>
          )}
        </div>
      </div>

      {/* Dock / Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 md:gap-4 p-2 md:p-3 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl ring-1 ring-black/50">
          {Object.entries(sections).map(([sectionKey, section]) => (
            <button
              key={sectionKey}
              onClick={() => handleSectionChange(sectionKey)}
              aria-label={`Navigate to ${sectionKey} section`}
              className={`relative p-3 rounded-xl transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                currentSection === sectionKey
                  ? 'bg-gray-800 text-green-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-110 -translate-y-1'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:-translate-y-1'
              }`}
            >
              {section.icon}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity border border-gray-700 whitespace-nowrap pointer-events-none uppercase tracking-widest font-bold">
                {sectionKey}
              </span>
              {currentSection === sectionKey && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
