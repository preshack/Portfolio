import { useState, useEffect, useRef } from 'react'
import { MessageCircleMore, Terminal, User, Home, Mail, Code, Briefcase, GraduationCap, Github, ArrowLeft, Instagram, Facebook, ExternalLink, Copy, Check, Minimize2, Maximize2, Send, Bot, MapPin, Flag } from 'lucide-react'
import { useMediaQuery } from 'react-responsive';

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

const sections = {
  home: {
    command: "cat ~/home.txt",
    icon: <Home className="w-5 h-5" />,
    content: (
      <div className="flex flex-col items-center space-y-6">
        <img src={require('./assets/profile.jpeg')} alt="Preshak" className="rounded-full w-36 h-36 border-4 border-green-500 shadow-lg" />
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Preshak Bhattarai</h2>
          <p className="text-xl mb-2 text-green-400">Hacker Extraordinaire | Cybersecurity Enthusiast</p>
          <div className="flex items-center justify-center gap-4 mb-3 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Flag className="w-4 h-4" /> From Nepal
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Based in USA
            </span>
          </div>
          <p className="text-lg mb-4">Welcome to my Portfolio!</p>
          <p className="text-md mb-2">I'm a 19-year-old programming enthusiast with a passion for cybersecurity.</p>
          <p className="text-md mb-2">Currently pursuing Computer Science at the University of Wisconsin-Green Bay (Class of '29).</p>
          <p className="text-md">My life revolves around coding, learning new technologies, and pushing the boundaries of what's possible in the digital world.</p>
        </div>
      </div>
    )
  },
  about: {
    command: "cat ~/about.txt",
    icon: <User className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-3 flex items-center text-green-400">
            <GraduationCap className="w-6 h-6 mr-2" /> Education
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li className="font-semibold text-green-300">University of Wisconsin-Green Bay (UWGB) - Class of 2029
              <ul className="list-circle list-inside ml-6 mt-1 font-normal text-gray-300">
                <li>Bachelor of Science in Computer Science</li>
                <li>Focus on Cybersecurity and Software Development</li>
              </ul>
            </li>
            <li>Higher Secondary Degree with Computer Science Major</li>
            <li>SEE (Secondary Education Examination) - Nepal</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-3 flex items-center text-green-400">
            <Briefcase className="w-6 h-6 mr-2" /> Certifications
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Amazon AWS Certification</li>
            <li>Google Hackathon Certification</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-3 flex items-center text-green-400">
            <User className="w-6 h-6 mr-2" /> About Me
          </h3>
          <p>I'm a 19-year-old Computer Science student from Nepal, currently based in the USA and studying at the University of Wisconsin-Green Bay. My journey in tech started with a fascination for how things work under the hood, which evolved into a deep passion for cybersecurity and software development.</p>
          <p className="mt-3">My days are filled with exploring new programming languages, diving deep into cybersecurity concepts, and working on innovative projects. I believe in the power of technology to change the world and I'm determined to be at the forefront of that change.</p>
        </div>
      </div>
    )
  },
  projects: {
    command: "ls ~/projects",
    icon: <Code className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold mb-3 text-green-400">My Projects</h3>
        <ul className="space-y-4">
          <li>
            <h4 className="text-xl font-semibold flex items-center">
              <Code className="w-5 h-5 mr-2" /> PROXLOAD
            </h4>
            <p>A web application for easy file uploading and downloading. Streamlines the process of sharing files across devices and users.</p>
            <a href="https://github.com/PROX-GOD/PROXLOAD" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub Repository</a>
          </li>
          <li>
            <h4 className="text-xl font-semibold flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" /> PROXEDU
            </h4>
            <p>An educational platform providing handwritten notes to students. Aims to make quality study materials accessible to all.</p>
            <a href="https://github.com/PROX-GOD/PROXEDU" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub Repository</a>
          </li>
          <li>
            <h4 className="text-xl font-semibold flex items-center">
              <Terminal className="w-5 h-5 mr-2" /> Python Module
            </h4>
            <p>A custom Python module designed to simplify common programming tasks and boost productivity.</p>
            <a href="https://github.com/PROX-GOD/PythonModule" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub Repository</a>
          </li>
        </ul>
      </div>
    )
  },
  skills: {
    command: "cat ~/skills.txt",
    icon: <Terminal className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold mb-3 text-green-400">Technical Skills</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-green-300">Programming Languages</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Python', icon: '🐍', level: 90 },
                { name: 'JavaScript', icon: '🌐', level: 85 },
                { name: 'C++', icon: '🖥️', level: 75 },
                { name: 'HTML/CSS', icon: '🎨', level: 95 },
              ].map((skill) => (
                <button
                  key={skill.name}
                  className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-green-500 group"
                  onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: skill.name }))}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="mr-2 text-xl">{skill.icon}</span>
                      <span className="font-semibold">{skill.name}</span>
                    </div>
                    <span className="text-xs text-green-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all duration-300 group-hover:from-green-400 group-hover:to-green-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-green-300">Frameworks & Libraries</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'React', icon: '⚛️', level: 88 },
                { name: 'Next.js', icon: '▲', level: 80 },
              ].map((skill) => (
                <button
                  key={skill.name}
                  className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-green-500 group"
                  onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: skill.name }))}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="mr-2 text-xl">{skill.icon}</span>
                      <span className="font-semibold">{skill.name}</span>
                    </div>
                    <span className="text-xs text-green-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all duration-300 group-hover:from-green-400 group-hover:to-green-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-green-300">Security & Tools</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Burp Suite', icon: '🐞', level: 70 },
                { name: 'Wireshark', icon: '🦈', level: 75 },
                { name: 'Metasploit', icon: '🛠️', level: 65 },
                { name: 'Nmap', icon: '🗺️', level: 80 },
              ].map((skill) => (
                <button
                  key={skill.name}
                  className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-green-500 group"
                  onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: skill.name }))}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="mr-2 text-xl">{skill.icon}</span>
                      <span className="font-semibold">{skill.name}</span>
                    </div>
                    <span className="text-xs text-green-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all duration-300 group-hover:from-green-400 group-hover:to-green-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-green-300">Other Skills</h4>
            <div className="flex gap-3">
              <button
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-green-500 group flex-1"
                onClick={() => document.dispatchEvent(new CustomEvent('showSkill', { detail: 'Video Editing' }))}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">🎬</span>
                    <span className="font-semibold">Video Editing</span>
                  </div>
                  <span className="text-xs text-green-400">85%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-1.5 rounded-full transition-all duration-300 group-hover:from-green-400 group-hover:to-green-300"
                    style={{ width: '85%' }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  contact: {
    command: "cat ~/contact.txt",
    icon: <Mail className="w-5 h-5" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold mb-4 text-green-400">Get In Touch</h3>
        <div className="grid gap-3">
          <a
            href="mailto:proxjodd@gmail.com"
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-green-500 group"
          >
            <div className="flex items-center">
              <div className="p-2 bg-gray-800 rounded-lg mr-3 group-hover:bg-gray-900 transition-colors">
                <Mail className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Email</div>
                <div className="font-semibold">proxjodd@gmail.com</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
          </a>
          <a
            href="https://github.com/PROX-GOD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-green-500 group"
          >
            <div className="flex items-center">
              <div className="p-2 bg-gray-800 rounded-lg mr-3 group-hover:bg-gray-900 transition-colors">
                <Github className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400">GitHub</div>
                <div className="font-semibold">github.com/PROX-GOD</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
          </a>
          <a
            href="https://instagram.com/preshakdjodd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-green-500 group"
          >
            <div className="flex items-center">
              <div className="p-2 bg-gray-800 rounded-lg mr-3 group-hover:bg-gray-900 transition-colors">
                <Instagram className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Instagram</div>
                <div className="font-semibold">@preshakdjodd</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
          </a>
          <a
            href="https://facebook.com/PreshakBhattarai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-green-500 group"
          >
            <div className="flex items-center">
              <div className="p-2 bg-gray-800 rounded-lg mr-3 group-hover:bg-gray-900 transition-colors">
                <Facebook className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Facebook</div>
                <div className="font-semibold">PreshakBhattarai</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
          </a>
        </div>
        <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex items-start">
            <MessageCircleMore className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold mb-1 text-green-300">Available for Projects</div>
              <div className="text-sm text-gray-300">Open to freelance opportunities and collaborations. Let's build something amazing together!</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  proxai: {
    command: "cat ~/proxai.py",
    icon: <Bot className="w-5 h-5" />,
    content: null
  }
}

const skillExamples: Record<string, string> = {
  Python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(fibonacci(i), end=" ")`,
  JavaScript: `const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x <= pivot && i < arr.length - 1);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};`,
  React: `import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
  'HTML/CSS': `<!DOCTYPE html>
<html>
<head>
  <style>
    .card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
  </style>
</head>
<body>
  <div class="card">Beautiful Card</div>
</body>
</html>`,
  'Next.js': `import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch('/api/data');
    const json = await res.json();
    setData(json);
  };

  return <button onClick={fetchData}>Fetch Data</button>;
}`,
  'C++': `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
  'Video Editing': `Professional video editing using CapCut:
- Color grading & correction
- Smooth transitions & effects
- Audio mixing & synchronization
- Motion graphics & animations
- Multi-layer compositing`,
  'Burp Suite': `Web Application Security Testing:
- Intercepting & modifying HTTP requests
- SQL injection detection
- XSS vulnerability scanning
- Session token analysis
- API security testing`,
  'Wireshark': `Network Protocol Analysis:
- Packet capture & inspection
- Traffic flow analysis
- Protocol debugging
- Network troubleshooting
- Security monitoring`,
  'Metasploit': `Penetration Testing Framework:
- Exploit development & testing
- Vulnerability assessment
- Payload generation
- Post-exploitation modules
- Security auditing`,
  'Nmap': `Network Discovery & Scanning:
- Port scanning & enumeration
- Service version detection
- OS fingerprinting
- Network mapping
- Vulnerability detection scripts`
}

export default function Component() {
  const [currentSection, setCurrentSection] = useState<keyof typeof sections>("home")
  const [command, setCommand] = useState("")
  const [skillExample, setSkillExample] = useState("")
  const [isMaximized, setIsMaximized] = useState(false)
  const [copied, setCopied] = useState(false)
  const [proxAIInput, setProxAIInput] = useState("")
  const [proxAIHistory, setProxAIHistory] = useState<Array<{type: 'input' | 'output', text: string}>>([])
  const terminalRef = useRef<HTMLDivElement>(null)
  const proxAIRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleSectionChange = (section: keyof typeof sections) => {
    setCurrentSection(section)
    setCommand(sections[section].command)
    setSkillExample("")
    if (section === 'proxai') {
      setProxAIHistory([{
        type: 'output',
        text: 'PROX AI Terminal v1.0\nType "help" for available commands or ask questions about Preshak.\n'
      }]);
    }
  }

  const handleCopy = () => {
    if (skillExample) {
      navigator.clipboard.writeText(skillExample)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleProxAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proxAIInput.trim()) return;

    const input = proxAIInput.trim();
    const newHistory = [...proxAIHistory, { type: 'input' as const, text: input }];

    let output = '';

    if (input.toLowerCase() === 'help') {
      output = `Available Commands:
- Linux commands: whoami, pwd, date, ls, uname, hostname, uptime, etc.
- Questions: Ask anything about Preshak (e.g., "who is preshak", "what does he do")
- clear: Clear terminal history`;
    } else if (input.toLowerCase() === 'clear') {
      setProxAIHistory([]);
      setProxAIInput('');
      return;
    } else if (linuxCommands[input.toLowerCase()]) {
      output = linuxCommands[input.toLowerCase()]();
    } else {
      const lowerInput = input.toLowerCase();
      let found = false;

      for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowerInput.includes(key) || key.includes(lowerInput)) {
          output = value;
          found = true;
          break;
        }
      }

      if (!found) {
        output = `Command or query not recognized. Type "help" for available options.`;
      }
    }

    newHistory.push({ type: 'output' as const, text: output });
    setProxAIHistory(newHistory);
    setProxAIInput('');
  };

  useEffect(() => {
    if (isMobile) {
      alert('This website is optimized for desktop screens. Please switch to a desktop mode for the best experience.');
    }
  }, [isMobile]);

  useEffect(() => {
    handleSectionChange("home")

    const handleShowSkill = (e: CustomEvent<string>) => {
      setSkillExample(skillExamples[e.detail as keyof typeof skillExamples])
    }

    document.addEventListener('showSkill', handleShowSkill as EventListener)

    return () => {
      document.removeEventListener('showSkill', handleShowSkill as EventListener)
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [command, currentSection, skillExample])

  useEffect(() => {
    if (proxAIRef.current) {
      proxAIRef.current.scrollTop = proxAIRef.current.scrollHeight
    }
  }, [proxAIHistory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-green-300 p-8 font-mono flex flex-col items-center justify-center">
      <div className={`w-full bg-gray-800 rounded-lg overflow-hidden shadow-2xl mb-8 transition-all duration-300 ${
        isMaximized ? 'max-w-7xl' : 'max-w-4xl'
      }`}>
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-700 to-gray-600 border-b border-gray-600">
          <div className="flex space-x-2">
            <button
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
              onClick={() => window.location.reload()}
            />
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"
              onClick={() => setIsMaximized(!isMaximized)}
            />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <div className="text-sm text-gray-300 font-semibold">Preshak's Terminal</div>
          </div>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
        <div ref={terminalRef} className={`p-6 overflow-auto transition-all duration-300 custom-scrollbar ${
          isMaximized ? 'h-[75vh]' : 'h-[60vh]'
        }`}>
          {currentSection === 'proxai' ? (
            <div className="space-y-4 h-full flex flex-col">
              <div ref={proxAIRef} className="space-y-3 flex-1 overflow-auto custom-scrollbar">
                {proxAIHistory.map((entry, index) => (
                  <div key={index}>
                    {entry.type === 'input' ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-bold">preshak@hackbox</span>
                        <span className="text-gray-400">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-gray-400">$</span>
                        <span className="text-gray-300 ml-2">{entry.text}</span>
                      </div>
                    ) : (
                      <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{entry.text}</pre>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handleProxAISubmit} className="flex items-center space-x-2 border-t border-gray-700 pt-4">
                <span className="text-green-400 font-bold">preshak@hackbox</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <input
                  type="text"
                  value={proxAIInput}
                  onChange={(e) => setProxAIInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-300 ml-2"
                  placeholder="Type a command or ask about me..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-2 bg-green-600 hover:bg-green-500 rounded transition-colors"
                  title="Execute"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center space-x-2">
                <span className="text-green-400 font-bold">preshak@hackbox</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="text-gray-300 ml-2">{command}</span>
                <span className="animate-pulse">_</span>
              </div>
              {skillExample ? (
                <div className="space-y-4">
                  <div className="relative">
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto shadow-inner border border-gray-700 text-sm leading-relaxed custom-scrollbar">
                      {skillExample}
                    </pre>
                    <button
                      onClick={handleCopy}
                      className="absolute top-2 right-2 p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors border border-gray-600"
                      title="Copy code"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-300" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => setSkillExample("")}
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Skills
                  </button>
                </div>
              ) : (
                sections[currentSection].content
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        {Object.entries(sections).map(([key, { icon }]) => (
          <button
            key={key}
            onClick={() => handleSectionChange(key as keyof typeof sections)}
            className={`p-3 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center ${
              currentSection === key
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-700 hover:bg-gray-600 hover:shadow-md'
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  )
}
