import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Terminal, BookOpen, Play, RefreshCw, Send, Bot, 
  User as UserIcon, Loader2, Maximize2, Minimize2, List, FileText, 
  Camera, ClipboardList, Clock, CheckCircle, Award, PanelLeftClose, PanelRightClose, PanelLeftOpen, PanelRightOpen 
} from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, User } from '../types';

// Mock Data for Lab Guides
const LAB_GUIDES: Record<string, { title: string; steps: { title: string; content: string }[] }> = {
  '1': {
    title: 'Linux 服务器管理基础',
    steps: [
      { title: '实验介绍与目标', content: '本实验旨在帮助你熟悉 Linux (CentOS/Ubuntu) 的基本命令行操作。\n\n**实验目标**：\n1. 掌握文件系统导航\n2. 学会文件创建与权限管理\n3. 理解进程查看命令' },
      { title: '环境检查', content: '欢迎来到 Linux 实验室。\n首先，我们需要检查当前系统的版本信息。\n\n请在终端输入以下命令并按回车：\n```bash\ncat /etc/os-release\n```\n\n观察输出结果中 `PRETTY_NAME` 字段的内容。' },
      { title: '文件与目录操作', content: '创建一个名为 "project_alpha" 的工作目录，并进入该目录。\n\n命令：\n```bash\nmkdir project_alpha\ncd project_alpha\n```\n\n接着创建一个空文件：\n```bash\ntouch main.py\nls -l\n```' },
      { title: '查看系统进程', content: '使用 `ps` 命令查看当前运行的进程。\n\n命令：\n```bash\nps aux | head -n 5\n```\n\n这会显示前5行进程信息。尝试使用 `top` 命令查看实时系统状态（按 `q` 退出）。' },
      { title: '实验总结', content: '恭喜！你已经完成了基础的文件操作和系统监控命令。请点击上方的“撰写报告”图标记录你的实验心得。' }
    ]
  },
  '2': {
    title: 'Cisco Packet Tracer 网络配置',
    steps: [
      { title: '实验拓扑概览', content: '本实验模拟一个小型的企业网络环境，包含一台路由器、一台交换机和两台 PC。' },
      { title: '物理连接', content: '将路由器 Router0 的 GigabitEthernet0/0 接口连接到 Switch0 的 FastEthernet0/1 接口。' },
      { title: '配置路由器 IP', content: '配置 Router0 接口 IP 地址为 192.168.1.1/24。\n\n命令序列：\n```cisco\nenable\nconfigure terminal\ninterface g0/0\nip address 192.168.1.1 255.255.255.0\nno shutdown\n```' }
    ]
  },
  '4': {
    title: 'IoT 智能家居数据流',
    steps: [
      { title: 'MQTT 协议简介', content: 'MQTT (Message Queuing Telemetry Transport) 是一种轻量级的发布/订阅消息传输协议。' },
      { title: '启动 Broker', content: '首先确保 Mosquitto 服务正在运行。\n\n输入命令：\n```bash\nservice mosquitto start\n```' },
      { title: '模拟传感器数据', content: '使用脚本模拟发送温度数据到主题 `home/livingroom/temp`。' }
    ]
  }
};

interface LabSessionProps {
  user: User | null;
}

const LabSession: React.FC<LabSessionProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const guide = LAB_GUIDES[id || '1'] || LAB_GUIDES['1'];

  // --- State: Layout & Resizing ---
  const [leftWidth, setLeftWidth] = useState(360); // Initial width for Guide
  const [rightWidth, setRightWidth] = useState(340); // Initial width for AI
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isLeftMaximized, setIsLeftMaximized] = useState(false);
  const [isRightMaximized, setIsRightMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'toc'>('guide');
  const [activeCenterTab, setActiveCenterTab] = useState<'terminal' | 'editor'>('terminal');

  // --- State: Lab Logic ---
  const [activeStep, setActiveStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [inputCmd, setInputCmd] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['Welcome to UUSIMA Cloud Shell 2.0', 'Initializing environment...', 'root@lab-instance:~# ']);

  // --- State: Modals & Feedback ---
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [screenshotFlash, setScreenshotFlash] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- State: AI Chat ---
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '同学你好！我是你的实验 AI 助教。实验过程中有任何不懂的命令或原理，都可以随时问我。',
      timestamp: Date.now()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  
  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll Chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Format Time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- Resizing Handlers ---
  const startResizingLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftWidth;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth > 200 && newWidth < 800) setLeftWidth(newWidth);
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const startResizingRight = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = rightWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth - (moveEvent.clientX - startX); // Dragging left increases width
      if (newWidth > 200 && newWidth < 800) setRightWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // --- Feature Handlers ---

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCmd.trim()) return;
    
    const newOutput = [...terminalOutput];
    newOutput.pop(); // Remove placeholder
    newOutput.push(`root@lab-instance:~# ${inputCmd}`);
    
    // Mock logic
    if (inputCmd === 'ls') {
      newOutput.push('project_alpha  downloads  config.json');
    } else if (inputCmd === 'clear') {
        setTerminalOutput(['root@lab-instance:~# ']);
        setInputCmd('');
        return;
    } else if (inputCmd.includes('mkdir')) {
      newOutput.push('');
    } else {
      newOutput.push(`bash: ${inputCmd}: command not found`);
    }
    
    newOutput.push('root@lab-instance:~# ');
    setTerminalOutput(newOutput);
    setInputCmd('');
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: chatInput,
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const contextPrompt = `
      Current Lab: ${guide.title}.
      Current Step (${activeStep + 1}/${guide.steps.length}): ${guide.steps[activeStep].title}.
      Step Content: ${guide.steps[activeStep].content}.
      User Question: ${userMsg.text}
      Answer concisely in Chinese.
      `;
      
      const responseText = await sendMessageToGemini(contextPrompt);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setChatMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleScreenshot = () => {
    setScreenshotFlash(true);
    setTimeout(() => setScreenshotFlash(false), 200);
    setToastMessage("截图成功！图片已自动添加到实验报告附件中。");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const submitReport = () => {
    setShowReportModal(false);
    setToastMessage("实验报告提交成功！");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const submitResult = () => {
    setShowSubmitModal(false);
    setToastMessage("实验结果已提交！请等待系统评分。");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Rich Content Renderer
  const renderContent = (text: string) => {
    return text.split('```').map((part, index) => {
        if (index % 2 === 1) { // Code block
            const lines = part.split('\n');
            const lang = lines[0].trim();
            const code = lines.slice(1).join('\n');
            return (
                <div key={index} className="bg-gray-800 text-gray-100 p-3 rounded-md font-mono text-xs my-3 overflow-x-auto border border-gray-700 shadow-inner">
                    <div className="text-xs text-gray-500 mb-1 select-none uppercase tracking-wider">{lang || 'CODE'}</div>
                    {code.trim()}
                </div>
            );
        }
        // Text block - simple bold parser
        return (
            <div key={index} className="inline">
                {part.split(/(\*\*.*?\*\*)/).map((subPart, subIndex) => {
                    if (subPart.startsWith('**') && subPart.endsWith('**')) {
                        return <strong key={subIndex} className="font-bold text-gray-900">{subPart.slice(2, -2)}</strong>;
                    }
                    return subPart;
                })}
            </div>
        );
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {toastMessage}
        </div>
      )}

      {/* Screenshot Flash Effect */}
      {screenshotFlash && (
        <div className="absolute inset-0 bg-white z-[100] opacity-50 animate-pulse pointer-events-none"></div>
      )}

      {/* --- TOP HEADER --- */}
      <header className="h-14 bg-[#18181b] border-b border-[#27272a] flex items-center justify-between px-4 flex-shrink-0 z-20">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/labs')} className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-[#27272a] rounded-md">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-[#27272a] mx-2"></div>
          <div>
            <h1 className="font-bold text-sm md:text-base tracking-tight text-gray-100">{guide.title}</h1>
            <div className="flex items-center text-[11px] text-gray-400 mt-0.5 space-x-2">
               <span className="flex items-center text-emerald-400"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></div> 运行中</span>
               <span>|</span>
               <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {formatTime(elapsedTime)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
           {/* Toolbar */}
           <div className="hidden md:flex items-center space-x-1 mr-2">
             <button onClick={handleScreenshot} className="p-2 text-gray-400 hover:text-white hover:bg-[#27272a] rounded-md transition-colors" title="截图">
               <Camera className="w-4 h-4" />
             </button>
             <button onClick={() => setShowReportModal(true)} className="p-2 text-gray-400 hover:text-white hover:bg-[#27272a] rounded-md transition-colors" title="填写报告">
               <ClipboardList className="w-4 h-4" />
             </button>
             <button onClick={() => setShowGradeModal(true)} className="p-2 text-gray-400 hover:text-white hover:bg-[#27272a] rounded-md transition-colors" title="查看成绩">
               <Award className="w-4 h-4" />
             </button>
           </div>

           {/* User Profile */}
           <div className="h-8 w-px bg-[#27272a] hidden md:block"></div>
           <div className="flex items-center space-x-2 pl-2">
             <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold shadow-sm border border-indigo-400 overflow-hidden">
                {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="avatar"/> : <UserIcon className="w-4 h-4 text-white" />}
             </div>
             <span className="text-sm font-medium hidden md:block text-gray-200">{user?.name || '游客'}</span>
           </div>
           
           <button 
             onClick={() => setShowSubmitModal(true)}
             className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors ml-2 shadow-sm border border-indigo-500/50"
           >
             提交结果
           </button>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden relative bg-[#09090b]">
        
        {/* --- LEFT PANEL: GUIDE --- */}
        {isLeftOpen && (
          <div 
            style={{ width: isLeftMaximized ? '100%' : leftWidth }} 
            className={`bg-[#18181b] border-r border-[#27272a] flex flex-col transition-all duration-75 relative z-10 ${isLeftMaximized ? 'absolute inset-0' : ''}`}
          >
            {/* Guide Header */}
            <div className="h-11 border-b border-[#27272a] bg-[#18181b] flex items-center justify-between px-2 flex-shrink-0">
               <div className="flex items-center space-x-1 h-full pt-2">
                 <button 
                    onClick={() => setActiveTab('guide')}
                    className={`px-4 py-1.5 text-xs font-medium rounded-t-md transition-colors h-full flex items-center ${activeTab === 'guide' ? 'bg-[#27272a] text-gray-100 border-t border-l border-r border-[#3f3f46]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#27272a]/50'}`}
                 >
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" /> 实验手册
                 </button>
                 <button 
                    onClick={() => setActiveTab('toc')}
                    className={`px-4 py-1.5 text-xs font-medium rounded-t-md transition-colors h-full flex items-center ${activeTab === 'toc' ? 'bg-[#27272a] text-gray-100 border-t border-l border-r border-[#3f3f46]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#27272a]/50'}`}
                 >
                    <List className="w-3.5 h-3.5 mr-1.5" /> 目录
                 </button>
               </div>
               <div className="flex items-center text-gray-400 space-x-1">
                  <button onClick={() => setIsLeftMaximized(!isLeftMaximized)} className="p-1.5 hover:text-gray-200 hover:bg-[#27272a] rounded-md transition-colors">
                    {isLeftMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setIsLeftOpen(false)} className="p-1.5 hover:text-gray-200 hover:bg-[#27272a] rounded-md transition-colors">
                    <PanelLeftClose className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>

            {/* Guide Content */}
            <div className="flex-1 overflow-y-auto text-gray-300 bg-[#18181b] custom-scrollbar">
              {activeTab === 'guide' ? (
                <div className="p-6">
                   <div className="flex items-center space-x-3 mb-4">
                     <div className="w-8 h-8 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                       {activeStep + 1}
                     </div>
                     <h2 className="text-lg font-bold text-gray-100">{guide.steps[activeStep].title}</h2>
                   </div>
                   <div className="w-full h-px bg-[#27272a] mb-6"></div>
                   <div className="prose prose-sm prose-invert max-w-none">
                     <div className="whitespace-pre-wrap leading-relaxed text-gray-300">
                        {renderContent(guide.steps[activeStep].content)}
                     </div>
                   </div>
                </div>
              ) : (
                <div className="p-3">
                   {guide.steps.map((s, i) => (
                     <div 
                        key={i} 
                        onClick={() => { setActiveStep(i); setActiveTab('guide'); }}
                        className={`p-3 rounded-lg cursor-pointer mb-2 text-sm flex items-center transition-colors ${activeStep === i ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-medium' : 'hover:bg-[#27272a] text-gray-400 border border-transparent'}`}
                     >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0 ${activeStep === i ? 'bg-indigo-500 text-white' : 'bg-[#27272a] text-gray-500'}`}>
                          {i + 1}
                        </span>
                        <span className="line-clamp-1">{s.title}</span>
                     </div>
                   ))}
                </div>
              )}
            </div>

            {/* Guide Footer Navigation */}
            {activeTab === 'guide' && (
              <div className="p-4 border-t border-[#27272a] bg-[#18181b] flex justify-between items-center flex-shrink-0">
                 <button 
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    className="px-4 py-2 text-xs font-medium border border-[#3f3f46] bg-[#27272a] text-gray-300 rounded-md hover:bg-[#3f3f46] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   上一页
                 </button>
                 <span className="text-xs text-gray-500 font-medium">
                    {activeStep + 1} / {guide.steps.length}
                 </span>
                 <button 
                    disabled={activeStep === guide.steps.length - 1}
                    onClick={() => setActiveStep(prev => prev + 1)}
                    className="px-4 py-2 text-xs font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                 >
                   下一页
                 </button>
              </div>
            )}
          </div>
        )}

        {/* Resizer Handle (Left) */}
        {isLeftOpen && !isLeftMaximized && (
           <div 
             className="w-1 hover:w-1.5 bg-[#27272a] hover:bg-indigo-500 cursor-col-resize transition-all z-20 flex flex-col justify-center items-center group select-none"
             onMouseDown={startResizingLeft}
           >
             <div className="h-8 w-0.5 bg-gray-500 group-hover:bg-white rounded"></div>
           </div>
        )}

        {/* Collapsed Left Panel Placeholder */}
        {!isLeftOpen && (
          <div className="w-12 bg-[#18181b] border-r border-[#27272a] flex flex-col items-center py-4 space-y-4">
             <button onClick={() => setIsLeftOpen(true)} className="p-2.5 bg-[#27272a] rounded-md text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors">
                <PanelLeftOpen className="w-4 h-4" />
             </button>
             <div className="h-px w-6 bg-[#3f3f46]"></div>
             <button onClick={() => { setIsLeftOpen(true); setActiveTab('toc'); }} className="p-2.5 text-gray-500 hover:text-gray-300 transition-colors" title="目录">
                <List className="w-4 h-4" />
             </button>
          </div>
        )}

        {/* --- CENTER PANEL: TERMINAL / EDITOR --- */}
        <div className="flex-1 bg-[#09090b] flex flex-col relative min-w-0">
           {/* Center Tab Bar */}
           <div className="h-11 bg-[#18181b] flex items-center px-2 space-x-1 border-b border-[#27272a] pt-2">
              <button 
                onClick={() => setActiveCenterTab('terminal')}
                className={`px-4 py-1.5 text-xs font-medium rounded-t-md transition-colors flex items-center ${activeCenterTab === 'terminal' ? 'bg-[#09090b] text-gray-200 border-t border-l border-r border-[#27272a]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#27272a]/50'}`}
              >
                 <Terminal className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                 Terminal
              </button>
              <button 
                onClick={() => setActiveCenterTab('editor')}
                className={`px-4 py-1.5 text-xs font-medium rounded-t-md transition-colors flex items-center ${activeCenterTab === 'editor' ? 'bg-[#09090b] text-gray-200 border-t border-l border-r border-[#27272a]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#27272a]/50'}`}
              >
                 <FileText className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                 Editor
              </button>
              <div className="flex-1"></div>
              <button 
                onClick={() => {
                  if (activeCenterTab === 'terminal') {
                    setTerminalOutput(['Welcome to UUSIMA Cloud Shell 2.0', 'Initializing environment...', 'root@lab-instance:~# ']);
                    setInputCmd('');
                  }
                }}
                className="p-1.5 hover:bg-[#27272a] rounded-md text-gray-500 transition-colors"
                title="重置环境"
              >
                 <RefreshCw className="w-3.5 h-3.5" />
              </button>
           </div>
           
           {/* Terminal Output */}
           {activeCenterTab === 'terminal' && (
             <div 
               className="flex-1 p-4 font-mono text-[13px] overflow-y-auto custom-scrollbar" 
               onClick={() => document.getElementById('term-input')?.focus()}
               style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}
             >
                {terminalOutput.map((line, i) => (
                   <div key={i} className="text-[#d4d4d8] min-h-[1.5em] whitespace-pre-wrap break-all leading-relaxed">{line}</div>
                ))}
                <form onSubmit={handleTerminalSubmit} className="flex mt-1">
                   <span className="text-emerald-400 mr-2 font-bold">root@lab-instance:~#</span>
                   <div className="flex-1 relative">
                      <input 
                        id="term-input"
                        type="text" 
                        value={inputCmd}
                        onChange={(e) => setInputCmd(e.target.value)}
                        className="bg-transparent border-none outline-none text-[#d4d4d8] w-full h-full p-0 m-0 font-inherit" 
                        autoFocus
                        autoComplete="off"
                      />
                   </div>
                </form>
             </div>
           )}

           {/* Editor Mockup */}
           {activeCenterTab === 'editor' && (
             <div className="flex-1 p-4 font-mono text-[13px] text-gray-300 overflow-y-auto custom-scrollbar" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}>
                <div className="text-gray-500 mb-4">/* 这是一个代码编辑器示例 */</div>
                <div className="text-blue-400">function <span className="text-yellow-200">helloWorld</span>() {'{'}</div>
                <div className="pl-4">console.<span className="text-blue-300">log</span>(<span className="text-green-300">"Hello from UUSIMA Lab!"</span>);</div>
                <div>{'}'}</div>
             </div>
           )}
        </div>

        {/* Resizer Handle (Right) */}
        {isRightOpen && !isRightMaximized && (
           <div 
             className="w-1 hover:w-1.5 bg-[#27272a] hover:bg-indigo-500 cursor-col-resize transition-all z-20 flex flex-col justify-center items-center group select-none"
             onMouseDown={startResizingRight}
           >
             <div className="h-8 w-0.5 bg-gray-500 group-hover:bg-white rounded"></div>
           </div>
        )}

        {/* Collapsed Right Panel Placeholder */}
        {!isRightOpen && (
          <div className="w-12 bg-[#18181b] border-l border-[#27272a] flex flex-col items-center py-4 space-y-4">
             <button onClick={() => setIsRightOpen(true)} className="p-2.5 bg-[#27272a] rounded-md text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors">
                <PanelRightOpen className="w-4 h-4" />
             </button>
             <div className="h-px w-6 bg-[#3f3f46]"></div>
             <button onClick={() => setIsRightOpen(true)} className="p-2.5 text-gray-500 hover:text-gray-300 transition-colors" title="AI 助手">
                <Bot className="w-4 h-4" />
             </button>
          </div>
        )}

        {/* --- RIGHT PANEL: AI ASSISTANT --- */}
        {isRightOpen && (
          <div 
            style={{ width: isRightMaximized ? '100%' : rightWidth }} 
            className={`bg-[#18181b] border-l border-[#27272a] flex flex-col transition-all duration-75 relative z-10 ${isRightMaximized ? 'absolute inset-0' : ''}`}
          >
             {/* AI Header */}
             <div className="h-14 border-b border-[#27272a] bg-[#18181b] flex items-center justify-between px-4 flex-shrink-0">
               <div className="flex items-center space-x-2">
                 <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                   <Bot className="w-4 h-4 text-indigo-400" />
                 </div>
                 <span className="font-bold text-gray-200 text-sm">AI 助教</span>
               </div>
               <div className="flex items-center text-gray-400 space-x-1">
                  <button onClick={() => setIsRightMaximized(!isRightMaximized)} className="p-1.5 hover:text-gray-200 hover:bg-[#27272a] rounded-md transition-colors">
                    {isRightMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setIsRightOpen(false)} className="p-1.5 hover:text-gray-200 hover:bg-[#27272a] rounded-md transition-colors">
                    <PanelRightClose className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>
            
            {/* AI Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#09090b] space-y-4 custom-scrollbar">
               {chatMessages.map((msg) => (
                 <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'model' && (
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 mr-2 flex-shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                    )}
                    <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md' 
                        : 'bg-[#18181b] border border-[#27272a] text-gray-300 shadow-sm rounded-tl-sm'
                    }`}>
                       {msg.text}
                    </div>
                 </div>
               ))}
               {isChatLoading && (
                 <div className="flex justify-start">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 mr-2 flex-shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div className="bg-[#18181b] border border-[#27272a] p-3 rounded-xl rounded-tl-sm shadow-sm flex items-center space-x-2">
                       <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                       <span className="text-sm text-gray-400">正在思考...</span>
                    </div>
                 </div>
               )}
               <div ref={chatEndRef}></div>
            </div>

            {/* AI Input */}
            <div className="p-4 border-t border-[#27272a] bg-[#18181b]">
               <div className="flex items-end space-x-2 bg-[#09090b] border border-[#27272a] rounded-xl p-1 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
                 <textarea
                   value={chatInput}
                   onChange={(e) => setChatInput(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault();
                       handleChatSend();
                     }
                   }}
                   placeholder="有问题随时问我... (Shift+Enter 换行)"
                   className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[40px] px-3 py-2.5 text-sm text-gray-200 placeholder-gray-500 custom-scrollbar"
                   rows={1}
                 />
                 <button 
                   onClick={handleChatSend}
                   disabled={!chatInput.trim() || isChatLoading}
                   className="p-2.5 m-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:bg-[#27272a] disabled:text-gray-500 transition-colors shadow-sm flex-shrink-0"
                 >
                   <Send className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>
        )}

      </div>

      {/* --- MODAL: EXPERIMENT REPORT --- */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative m-4">
             <button onClick={() => setShowReportModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
               <PanelRightClose className="w-5 h-5" />
             </button>
             <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
               <FileText className="w-5 h-5 mr-2 text-blue-600" />
               实验报告
             </h2>
             <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">实验心得与总结</label>
                <textarea 
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                  className="w-full h-48 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="请输入您的实验步骤记录、遇到的问题及解决方案...(支持 Markdown)"
                ></textarea>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" /> 系统已自动捕获 3 张终端截图至附件
                </div>
             </div>
             <div className="flex justify-end space-x-3">
                <button onClick={() => setShowReportModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">取消</button>
                <button onClick={submitReport} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">提交报告</button>
             </div>
          </div>
        </div>
      )}

      {/* --- MODAL: GRADES --- */}
      {showGradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative m-4 text-center">
             <button onClick={() => setShowGradeModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
               <PanelRightClose className="w-5 h-5" />
             </button>
             <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Award className="w-8 h-8 text-yellow-600" />
             </div>
             <h2 className="text-xl font-bold text-gray-900 mb-1">实验成绩单</h2>
             <p className="text-gray-500 text-sm mb-6">上次提交: 2023-10-24 14:30</p>
             
             <div className="text-5xl font-extrabold text-gray-900 mb-2">92<span className="text-2xl text-gray-400 font-normal">/100</span></div>
             <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-6">优秀</div>

             <div className="bg-gray-50 rounded-lg p-4 text-left border border-gray-100">
               <h4 className="text-sm font-bold text-gray-900 mb-2">教师评语:</h4>
               <p className="text-sm text-gray-600 leading-relaxed">
                 操作步骤规范，命令使用准确。特别是在文件权限配置环节，思路非常清晰。建议在后续实验中尝试使用脚本自动化部分重复操作。
               </p>
             </div>
          </div>
        </div>
      )}

      {/* --- MODAL: SUBMIT RESULT --- */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative m-4">
             <button onClick={() => setShowSubmitModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
               <PanelRightClose className="w-5 h-5" />
             </button>
             <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
               <CheckCircle className="w-6 h-6 text-indigo-600" />
             </div>
             <h2 className="text-xl font-bold text-gray-900 mb-2">确认提交实验结果？</h2>
             <p className="text-gray-500 text-sm mb-6">
               提交后，系统将自动评估您的实验环境状态和操作记录。您可以多次提交，系统将保留最高分。
             </p>
             <div className="flex justify-end space-x-3">
                <button onClick={() => setShowSubmitModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">取消</button>
                <button onClick={submitResult} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm">确认提交</button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LabSession;