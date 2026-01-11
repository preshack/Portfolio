import { useState, useEffect, useRef } from 'react'
import {
  Terminal, User, Home, Mail, Code, GraduationCap,
  Github, Instagram, Facebook, ExternalLink, Copy, Check,
  Minimize2, Maximize2, Send, Bot, MapPin, Flag,
  Folder, FileText, Cpu, Globe, Server, Database,
  Layout, Shield, Wifi, Command, X, Minus, Plus
} from 'lucide-react'

// --- Data & Content ---

const knowledgeBase: Record<string, string> = {
  "who is preshak": "Preshak Bhattarai is a 19-year-old Computer Science student from Nepal, currently studying at the University of Wisconsin-Green Bay (UWGB), Class of 2029. He's passionate about cybersecurity and software development.",
  "what does he do": "Preshak is a programming enthusiast and cybersecurity specialist. He works on various projects including PROXLOAD (file sharing platform), PROXEDU (educational platform), and custom Python modules. He's also skilled in penetration testing and security analysis.",
  "education": "Preshak is pursuing a Bachelor of Science in Computer Science at the University of Wisconsin-Green Bay (UWGB), Class of 2029, with a focus on Cybersecurity and Software Development. He completed his Higher Secondary with Computer Science major and SEE in Nepal.",
  "skills": "Preshak is proficient in Python (90%), JavaScript (85%), React (88%), C++ (75%), HTML/CSS (95%), Next.js (80%), and security tools like Burp Suite, Wireshark, Metasploit, and Nmap. He's also skilled in video editing.",
  "contact": "You can reach Preshak at proxjodd@gmail.com or connect on GitHub (github.com/PROX-GOD), Instagram (@preshakdjodd), or Facebook (PreshakBhattarai).",
  "projects": "Main projects include: PROXLOAD (web app for file uploading/downloading), PROXEDU (educational platform with handwritten notes), and a custom Python Module for productivity.",
  "location": "Originally from Nepal, currently based in the USA, studying at University of Wisconsin-Green Bay.",
  "age": "19 years old",
  "certifications": "Amazon AWS Certification and Google Hackathon Certification"
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

// --- Components ---

const SkillCard = ({ name, icon: Icon, level, category, onClick }: any) => (
  <button
    onClick={onClick}
    className="group relative bg-black/40 border border-green-500/20 p-4 rounded-lg hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] text-left w-full overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={40} />
    </div>
    <div className="flex items-center gap-2 mb-2">
      <Icon className="text-green-400 group-hover:text-green-300" size={18} />
      <span className="font-bold text-gray-200 group-hover:text-white text-sm md:text-base">{name}</span>
    </div>
    <div className="text-xs text-gray-500 font-mono mb-2">{category}</div>
    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-600 to-green-400 group-hover:animate-pulse"
        style={{ width: `${level}%` }}
      />
    </div>
    <div className="mt-1 text-right text-[10px] text-green-500/70 font-mono">{level}% LOADED</div>
  </button>
);

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
    { type: 'output', text: 'ProxAI Neural Interface v2.0.4 initialized...\nConnected to preshak@hackbox.\nAwaiting input.' }
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
              I'm a 19-year-old Computer Science student at UWGB, originally from Nepal. My digital existence is defined by a relentless curiosity for how systems work—and how they can be broken. I bridge the gap between building secure software and testing its defenses.
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
                  <div className="text-gray-400">B.S. Computer Science</div>
                  <div className="text-xs text-blue-400/80 mt-1">Class of 2029 • Current</div>
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
        </div>
      )
    },
    skills: {
      command: "./list_skills.sh --verbose",
      icon: <Cpu className="w-5 h-5" />,
      content: (
        <div className="space-y-8 animate-fade-in">
          <div>
            <h3 className="text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Terminal size={14} /> Languages & Core
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SkillCard name="Python" level={90} icon={FileText} category="Scripting" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Python' }))} />
              <SkillCard name="JavaScript" level={85} icon={Globe} category="Web" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'JavaScript' }))} />
              <SkillCard name="C++" level={75} icon={Cpu} category="System" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'C++' }))} />
              <SkillCard name="HTML/CSS" level={95} icon={Layout} category="Frontend" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'HTML/CSS' }))} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Shield size={14} /> Security Arsenal
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SkillCard name="Burp Suite" level={70} icon={Shield} category="Web Sec" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Burp Suite' }))} />
              <SkillCard name="Wireshark" level={75} icon={Wifi} category="Network" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Wireshark' }))} />
              <SkillCard name="Metasploit" level={65} icon={Terminal} category="Exploit" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Metasploit' }))} />
              <SkillCard name="Nmap" level={80} icon={MapPin} category="Recon" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Nmap' }))} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Database size={14} /> Frameworks & Tools
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SkillCard name="React" level={88} icon={Code} category="Library" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'React' }))} />
              <SkillCard name="Next.js" level={80} icon={Globe} category="Framework" onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Next.js' }))} />
            </div>
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
              <ContactRow label="Email Protocol" value="proxjodd@gmail.com" icon={Mail} href="mailto:proxjodd@gmail.com" copyable />
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
    // Use functional update to ensure we have the latest history if needed, though mostly okay here.
    // However, the issue might be related to how newHistory was constructed or type inference.
    // But the error log was about 'key' in the Dock map. Let's fix that first.

    const newHistory = [...proxAIHistory, { type: 'input' as const, text: input }];

    let output = '';
    const lowerInput = input.toLowerCase();

    if (lowerInput === 'help') {
      output = "Available commands: help, clear, whoami, skills, projects, contact, [question]";
    } else if (lowerInput === 'clear') {
      setProxAIHistory([]);
      setProxAIInput('');
      return;
    } else if (linuxCommands[lowerInput]) {
      output = linuxCommands[lowerInput]();
    } else {
      let found = false;
      for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowerInput.includes(key) || key.includes(lowerInput)) {
          output = value;
          found = true;
          break;
        }
      }
      if (!found) output = "Query not recognized. Access denied or data missing. Try 'help'.";
    }

    // Simulate network delay
    setTimeout(() => {
      setProxAIHistory(prev => [...prev, { type: 'output', text: output }]);
    }, 300);

    setProxAIHistory(newHistory);
    setProxAIInput('');
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
Running: Linux 4.X`
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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-mono flex flex-col items-center justify-center p-2 md:p-6 overflow-hidden relative selection:bg-green-500/30 selection:text-green-200">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
           style={{
             backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Main Terminal Window */}
      <div className={`relative z-10 w-full bg-[#0c0c0c]/90 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col ${isMaximized ? 'h-[90vh] max-w-7xl' : 'h-[85vh] md:h-[700px] max-w-5xl'}`}>

        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-gray-800 shrink-0 cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 mr-4 group">
              <button
                onClick={() => window.location.reload()}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group/btn"
                aria-label="Reload terminal"
                title="Reload terminal"
              >
                <X size={8} className="opacity-0 group-hover/btn:opacity-100 text-black/50" />
              </button>
              <button
                onClick={() => setIsMaximized(false)}
                className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center group/btn"
                aria-label="Minimize terminal"
                title="Minimize terminal"
              >
                <Minus size={8} className="opacity-0 group-hover/btn:opacity-100 text-black/50" />
              </button>
              <button
                onClick={() => setIsMaximized(true)}
                className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex items-center justify-center group/btn"
                aria-label="Fullscreen terminal"
                title="Fullscreen terminal"
              >
                <Plus size={8} className="opacity-0 group-hover/btn:opacity-100 text-black/50" />
              </button>
            </div>
            <div className="flex items-center text-xs md:text-sm text-gray-500 font-semibold gap-2">
              <Terminal size={14} className="text-green-500" />
              <span className="hidden md:inline">preshak@hackbox: ~</span>
              <span className="md:hidden">Terminal</span>
            </div>
          </div>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label={isMaximized ? "Minimize terminal" : "Maximize terminal"}
            title={isMaximized ? "Minimize terminal" : "Maximize terminal"}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        {/* Content Area */}
        <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar scroll-smooth">
          {currentSection === 'proxai' ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 space-y-4 mb-4" ref={proxAIRef}>
                {proxAIHistory.map((entry, idx) => (
                  <div key={idx} className={`flex ${entry.type === 'input' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-lg p-3 ${
                      entry.type === 'input'
                        ? 'bg-green-500/10 border border-green-500/20 text-green-100 rounded-br-none'
                        : 'bg-gray-800/50 border border-gray-700 text-gray-300 rounded-bl-none font-mono whitespace-pre-wrap'
                    }`}>
                      {entry.type === 'output' && <div className="text-[10px] text-green-500 mb-1 opacity-70">PROX_AI_CORE</div>}
                      {entry.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleProxAISubmit} className="mt-auto relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse">❯</div>
                <input
                  type="text"
                  value={proxAIInput}
                  onChange={(e) => setProxAIInput(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg py-3 pl-10 pr-12 text-green-400 placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all font-mono"
                  placeholder="Enter command or query..."
                  autoFocus
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-400 transition-colors">
                  <Send size={18} />
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Command Prompt Line */}
              <div className="flex items-center gap-2 mb-6 text-sm md:text-base font-mono opacity-80">
                <span className="text-green-500 font-bold">➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="text-gray-200 typing-effect">{command}</span>
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
              aria-label={sectionKey}
              className={`relative p-3 rounded-xl transition-all duration-300 group ${
                currentSection === sectionKey
                  ? 'bg-gray-800 text-green-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-110 -translate-y-1'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:-translate-y-1'
              }`}
            >
              {section.icon}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700 whitespace-nowrap pointer-events-none uppercase tracking-widest font-bold">
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
