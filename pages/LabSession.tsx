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
  const [leftWidth, setLeftWidth] = useState(320); // Initial width for Guide
  const [rightWidth, setRightWidth] = useState(320); // Initial width for AI
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isLeftMaximized, setIsLeftMaximized] = useState(false);
  const [isRightMaximized, setIsRightMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'toc'>('guide');

  // --- State: Lab Logic ---
  const [activeStep, setActiveStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [inputCmd, setInputCmd] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['Welcome to UUSIMA Cloud Shell 2.0', 'Initializing environment...', 'root@lab-instance:~# ']);

  // --- State: Modals & Feedback ---
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [showGradeModal, setShowGradeModal] = useState(false);
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
      <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 flex-shrink-0 z-20">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/labs')} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-gray-600 mx-2"></div>
          <div>
            <h1 className="font-bold text-sm md:text-base tracking-tight text-white">{guide.title}</h1>
            <div className="flex items-center text-[10px] text-gray-400 mt-0.5 space-x-2">
               <span className="flex items-center text-green-400"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div> 运行中</span>
               <span>|</span>
               <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {formatTime(elapsedTime)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
           {/* Toolbar */}
           <div className="hidden md:flex items-center space-x-1 mr-2">
             <button onClick={handleScreenshot} className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded tooltip-trigger" title="截图">
               <Camera className="w-5 h-5" />
             </button>
             <button onClick={() => setShowReportModal(true)} className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded" title="填写报告">
               <ClipboardList className="w-5 h-5" />
             </button>
             <button onClick={() => setShowGradeModal(true)} className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded" title="查看成绩">
               <Award className="w-5 h-5" />
             </button>
           </div>

           {/* User Profile */}
           <div className="h-8 w-px bg-gray-600 hidden md:block"></div>
           <div className="flex items-center space-x-2 pl-2">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold shadow-sm border border-blue-400">
                {user?.avatar ? <img src={user.avatar} className="w-full h-full rounded-full" alt="avatar"/> : <UserIcon className="w-4 h-4 text-white" />}
             </div>
             <span className="text-sm font-medium hidden md:block">{user?.name || '游客'}</span>
           </div>
           
           <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors ml-2 shadow-sm">
             提交结果
           </button>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* --- LEFT PANEL: GUIDE --- */}
        {isLeftOpen && (
          <div 
            style={{ width: isLeftMaximized ? '100%' : leftWidth }} 
            className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-75 relative z-10 ${isLeftMaximized ? 'absolute inset-0' : ''}`}
          >
            {/* Guide Header */}
            <div className="h-10 border-b border-gray-200 bg-gray-50 flex items-center justify-between px-3 flex-shrink-0">
               <div className="flex items-center space-x-1">
                 <button 
                    onClick={() => setActiveTab('guide')}
                    className={`px-3 py-1 text-xs font-medium rounded-t-lg transition-colors ${activeTab === 'guide' ? 'bg-white text-blue-600 border-t border-l border-r border-gray-200 shadow-sm relative top-[1px]' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                    <BookOpen className="w-3 h-3 inline mr-1" /> 内容
                 </button>
                 <button 
                    onClick={() => setActiveTab('toc')}
                    className={`px-3 py-1 text-xs font-medium rounded-t-lg transition-colors ${activeTab === 'toc' ? 'bg-white text-blue-600 border-t border-l border-r border-gray-200 shadow-sm relative top-[1px]' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                    <List className="w-3 h-3 inline mr-1" /> 目录
                 </button>
               </div>
               <div className="flex items-center text-gray-400 space-x-1">
                  <button onClick={() => setIsLeftMaximized(!isLeftMaximized)} className="p-1 hover:text-gray-600 hover:bg-gray-200 rounded">
                    {isLeftMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setIsLeftOpen(false)} className="p-1 hover:text-gray-600 hover:bg-gray-200 rounded">
                    <PanelLeftClose className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>

            {/* Guide Content */}
            <div className="flex-1 overflow-y-auto text-gray-900 bg-white">
              {activeTab === 'guide' ? (
                <div className="p-5">
                   <h2 className="text-xl font-bold text-gray-900 mb-2">步骤 {activeStep + 1}: {guide.steps[activeStep].title}</h2>
                   <div className="w-full h-px bg-gray-100 mb-4"></div>
                   <div className="prose prose-sm prose-blue max-w-none">
                     <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                        {renderContent(guide.steps[activeStep].content)}
                     </div>
                   </div>
                </div>
              ) : (
                <div className="p-2">
                   {guide.steps.map((s, i) => (
                     <div 
                        key={i} 
                        onClick={() => { setActiveStep(i); setActiveTab('guide'); }}
                        className={`p-3 rounded-lg cursor-pointer mb-1 text-sm flex items-center ${activeStep === i ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                     >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 border ${activeStep === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 text-gray-500'}`}>
                          {i + 1}
                        </span>
                        {s.title}
                     </div>
                   ))}
                </div>
              )}
            </div>

            {/* Guide Footer Navigation */}
            {activeTab === 'guide' && (
              <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center flex-shrink-0">
                 <button 
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    className="px-3 py-1.5 text-xs font-medium border border-gray-300 bg-white rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                 >
                   上一页
                 </button>
                 <span className="text-xs text-gray-500">
                    {activeStep + 1} / {guide.steps.length}
                 </span>
                 <button 
                    disabled={activeStep === guide.steps.length - 1}
                    onClick={() => setActiveStep(prev => prev + 1)}
                    className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
             className="w-1 hover:w-1.5 bg-gray-800 hover:bg-blue-500 cursor-col-resize transition-all z-20 flex flex-col justify-center items-center group select-none"
             onMouseDown={startResizingLeft}
           >
             <div className="h-8 w-0.5 bg-gray-600 group-hover:bg-white rounded"></div>
           </div>
        )}

        {/* Collapsed Left Panel Placeholder */}
        {!isLeftOpen && (
          <div className="w-10 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-4">
             <button onClick={() => setIsLeftOpen(true)} className="p-2 bg-gray-700 rounded text-gray-300 hover:text-white hover:bg-blue-600 transition">
                <PanelLeftOpen className="w-5 h-5" />
             </button>
             <div className="h-px w-6 bg-gray-700"></div>
             <button onClick={() => { setIsLeftOpen(true); setActiveTab('toc'); }} className="p-2 text-gray-400 hover:text-white" title="目录">
                <List className="w-5 h-5" />
             </button>
          </div>
        )}

        {/* --- CENTER PANEL: TERMINAL --- */}
        <div className="flex-1 bg-[#1e1e1e] flex flex-col relative min-w-0">
           {/* Terminal Tab Bar */}
           <div className="h-9 bg-[#252526] flex items-center px-2 space-x-1 border-b border-[#333]">
              <div className="px-3 py-1.5 bg-[#1e1e1e] text-gray-300 text-xs rounded-t border-t border-blue-500 flex items-center min-w-[100px]">
                 <Terminal className="w-3 h-3 mr-2 text-blue-400" />
                 root@lab-instance
              </div>
              <button className="p-1 hover:bg-[#333] rounded text-gray-500">
                 <RefreshCw className="w-3 h-3" />
              </button>
           </div>
           
           {/* Terminal Output */}
           <div 
             className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar" 
             onClick={() => document.getElementById('term-input')?.focus()}
             style={{ fontFamily: "'Fira Code', 'Courier New', monospace" }}
           >
              {terminalOutput.map((line, i) => (
                 <div key={i} className="text-[#cccccc] min-h-[1.5em] whitespace-pre-wrap break-all leading-snug">{line}</div>
              ))}
              <form onSubmit={handleTerminalSubmit} className="flex mt-1">
                 <span className="text-[#cccccc] mr-2">root@lab-instance:~#</span>
                 <div className="flex-1 relative">
                    <input 
                      id="term-input"
                      type="text" 
                      value={inputCmd}
                      onChange={(e) => setInputCmd(e.target.value)}
                      className="bg-transparent border-none outline-none text-[#cccccc] w-full h-full p-0 m-0 font-inherit" 
                      autoFocus
                      autoComplete="off"
                    />
                 </div>
              </form>
           </div>
        </div>

        {/* Resizer Handle (Right) */}
        {isRightOpen && !isRightMaximized && (
           <div 
             className="w-1 hover:w-1.5 bg-gray-800 hover:bg-blue-500 cursor-col-resize transition-all z-20 flex flex-col justify-center items-center group select-none"
             onMouseDown={startResizingRight}
           >
             <div className="h-8 w-0.5 bg-gray-600 group-hover:bg-white rounded"></div>
           </div>
        )}

        {/* Collapsed Right Panel Placeholder */}
        {!isRightOpen && (
          <div className="w-10 bg-gray-800 border-l border-gray-700 flex flex-col items-center py-4 space-y-4">
             <button onClick={() => setIsRightOpen(true)} className="p-2 bg-gray-700 rounded text-gray-300 hover:text-white hover:bg-blue-600 transition">
                <PanelRightOpen className="w-5 h-5" />
             </button>
             <div className="h-px w-6 bg-gray-700"></div>
             <button className="p-2 text-gray-400 hover:text-white" title="AI 助手">
                <Bot className="w-5 h-5" />
             </button>
          </div>
        )}

        {/* --- RIGHT PANEL: AI ASSISTANT --- */}
        {isRightOpen && (
          <div 
            style={{ width: isRightMaximized ? '100%' : rightWidth }} 
            className={`bg-white border-l border-gray-200 flex flex-col transition-all duration-75 relative z-10 ${isRightMaximized ? 'absolute inset-0' : ''}`}
          >
             {/* AI Header */}
             <div className="h-10 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50 flex items-center justify-between px-3 flex-shrink-0">
               <div className="flex items-center space-x-2">
                 <Bot className="w-4 h-4 text-indigo-600" />
                 <span className="font-bold text-gray-800 text-xs">AI 教学助手</span>
               </div>
               <div className="flex items-center text-gray-400 space-x-1">
                  <button onClick={() => setIsRightMaximized(!isRightMaximized)} className="p-1 hover:text-gray-600 hover:bg-gray-200 rounded">
                    {isRightMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setIsRightOpen(false)} className="p-1 hover:text-gray-600 hover:bg-gray-200 rounded">
                    <PanelRightClose className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>
            
            {/* AI Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
               {chatMessages.map((msg) => (
                 <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-3 rounded-xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-800 shadow-sm rounded-bl-none'
                    }`}>
                       {msg.text}
                    </div>
                 </div>
               ))}
               {isChatLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-2.5 rounded-xl rounded-bl-none shadow-sm flex items-center space-x-2">
                       <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                       <span className="text-xs text-gray-500">正在思考...</span>
                    </div>
                 </div>
               )}
               <div ref={chatEndRef}></div>
            </div>

            {/* AI Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
               <div className="flex items-center space-x-2">
                 <input
                   type="text"
                   value={chatInput}
                   onChange={(e) => setChatInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                   placeholder="有问题随时问我..."
                   className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-400"
                 />
                 <button 
                   onClick={handleChatSend}
                   disabled={!chatInput.trim() || isChatLoading}
                   className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
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

    </div>
  );
};

export default LabSession;