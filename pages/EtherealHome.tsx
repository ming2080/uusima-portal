import React, { useState, useEffect } from 'react';
import { ArrowRight, Monitor, BookOpen, Award, Cpu, ChevronRight, Star, Zap, Activity, Cloud, FileCode, PlayCircle, Clock, CheckCircle2, Shield, BrainCircuit, Plus, Mic, Camera, Sparkles, FileText, Image, ArrowUp, FileBadge, Menu, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const EtherealHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const capabilitiesTab = [
    { id: 'multimodal', label: '沉浸式教学实训' },
    { id: 'analysis', label: 'AI 全过程技能分析' },
    { id: 'companion', label: 'AI 学伴' },
    { id: 'agent', label: '智能体引擎' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % capabilitiesTab.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [capabilitiesTab.length]);

  return (
    <div className="min-h-screen bg-[#fafcff] text-[#1e293b] font-sans overflow-x-hidden selection:bg-blue-200">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 md:pt-36 md:pb-40 overflow-hidden bg-gradient-to-b from-[#e6f0fa] to-[#f2f7fc]">
        {/* Background Gradients & Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-30"></div>
        
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 blur-[120px] -z-10"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-sky-200/40 blur-[140px] -z-10"></div>
        
        {/* Floating Graphics (Left and Right) based on design */}
        <div className="absolute left-[2%] xl:left-[8%] top-[40%] hidden lg:flex flex-col gap-6 animate-[bounce_8s_ease-in-out_infinite]">
          {/* Top Left Connection Line graphic */}
          <div className="relative h-16 ml-10">
             <div className="absolute top-0 left-0 w-32 h-[1px] bg-cyan-300 -rotate-12 translate-x-12 translate-y-8"></div>
             <div className="absolute top-0 left-0 w-4 h-4 rounded-full border-[3px] border-cyan-400 bg-white translate-x-8 translate-y-4"></div>
             <div className="w-24 bg-white/80 backdrop-blur-sm rounded-xl py-2 px-3 shadow-sm border border-cyan-100 flex items-center justify-center relative translate-x-28">
               <div className="w-10 h-2 bg-blue-300 rounded-full mb-1"></div>
               <div className="w-8 h-2 bg-yellow-400 rounded-full absolute bottom-2 left-3"></div>
             </div>
          </div>
          
          <div className="w-[160px] bg-white/80 backdrop-blur-sm rounded-full py-2.5 px-4 shadow-sm border border-slate-100 flex items-center gap-3 relative z-10 xl:translate-x-10">
             <div className="w-2.5 h-2.5 rounded-full bg-[#00C2A8]"></div>
             <span className="text-sm font-medium text-slate-600">机器人实训</span>
          </div>
          
          <div className="relative mt-8 group xl:translate-x-12">
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none" className="absolute -top-12 left-4 -z-10 opacity-40">
              <path d="M90 20 L40 70 L20 120" stroke="#00C2A8" strokeWidth="1.5" />
              <path d="M90 20 L150 50" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="90" cy="20" r="10" stroke="#00C2A8" strokeWidth="3" fill="transparent" />
              <circle cx="90" cy="20" r="4" fill="#00C2A8" />
              <circle cx="40" cy="70" r="14" fill="#2563eb" />
              <circle cx="150" cy="50" r="8" fill="#94a3b8" />
            </svg>
            <div className="w-36 h-6 mt-12 bg-[#2563eb] rounded-full drop-shadow-md"></div>
            <div className="w-28 h-6 mt-1 bg-[#F59E0B] rounded-full drop-shadow-sm"></div>
            <div className="w-32 h-8 mt-1 bg-[#2C3A5A] rounded-full drop-shadow-sm"></div>
          </div>
        </div>
        
        <div className="absolute right-[2%] xl:right-[5%] top-[35%] hidden lg:flex flex-col items-end gap-3 animate-[bounce_9s_ease-in-out_infinite_alternate]">
           <div className="flex flex-col items-center gap-4 relative">
             <div className="absolute -top-16 right-10">
                 <div className="w-[140px] bg-white/80 rounded-full py-2 px-3 flex items-center gap-2 border border-slate-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                    <span className="text-sm font-medium text-slate-600">PLC 云实验</span>
                 </div>
             </div>
             <div className="flex items-center gap-8 relative xl:-translate-x-10 mt-10">
                 <div className="w-16 h-16 rounded-full border-2 border-cyan-200/50 flex items-center justify-center text-cyan-200/50">
                    <Plus className="w-8 h-8"/>
                 </div>
             </div>
             
             <div className="relative mt-8 xl:-translate-x-8">
               <div className="w-[280px] bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100">
                  <div className="w-full h-32 bg-[#2C3A5A] rounded-xl mb-4 overflow-hidden flex relative">
                    <div className="flex-1 bg-gradient-to-br from-[#4b8af5] to-[#2563eb] m-2 rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.2)_50%,rgba(255,255,255,.2)_75%,transparent_75%,transparent)] bg-[length:14px_14px]"></div>
                    <div className="w-12 h-full flex flex-col items-center justify-center gap-3 p-1">
                       <div className="w-5 h-1.5 bg-cyan-400 rounded-full"></div>
                       <div className="w-4 h-4 bg-[#F59E0B] rounded-full"></div>
                       <div className="w-5 h-1.5 bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-full h-10 bg-[#e2e8f0] rounded-xl"></div>
               </div>
             </div>
           </div>
        </div>
        
        {/* Main Hero Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#2563eb] shadow-sm mb-12 animate-fade-in-up transition-colors cursor-pointer">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2A8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C2A8]"></span>
            </span>
            <span className="text-sm font-medium text-[#2563eb] tracking-wide">UUSIMA 平台全新大版本上线</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up animation-delay-100 text-[#2C3A5A]">
            UUSIMA 智慧教学验平台
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2563eb] to-[#12B2E8] mb-8 animate-fade-in-up animation-delay-150">
            AI 赋能职业实训
          </h2>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-500 mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            以云端实验环境、智能导学、课程资源与考试任务为一体，面向应用型本科与高水平职业院校打造下一代教学引擎。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animation-delay-300">
            <Link to="/courses" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#12B2E8] hover:opacity-90 text-white font-medium shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg">
              探索精选课程 <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/labs" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#2C3A5A] font-medium border border-[#2C3A5A] shadow-sm hover:bg-slate-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg">
              进入虚拟实训室
            </Link>
          </div>
          
          {/* AI Input Search Bar */}
          <div className="mt-16 max-w-4xl mx-auto w-full animate-fade-in-up animation-delay-400 px-4">
            <div className="relative group">
               {/* Enhanced Glowing Border */}
               <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[30px] opacity-20 group-hover:opacity-60 blur-md transition duration-500"></div>
               <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-[30px] opacity-50 group-hover:opacity-100 transition duration-500"></div>
               
               <div className="relative bg-white/95 backdrop-blur-xl rounded-[29px] p-2 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
               
               <div className="px-4 pt-3 pb-1">
                 <textarea 
                   placeholder="向灵云助手提问，可通过指令直达课程和实训环境..." 
                   className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-lg resize-none min-h-[44px] max-h-[160px]"
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault();
                       window.location.href = '/ai-interaction';
                     }
                   }}
                 />
               </div>
               
               <div className="flex items-center justify-between px-2 pb-1 relative">
                 {/* Left Actions & Tags */}
                 <div className="flex items-center gap-1.5 flex-wrap">
                   {/* Upload/Plus Button */}
                   <div className="relative flex-shrink-0">
                     <button 
                       className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors bg-slate-50 border border-slate-200"
                       onClick={() => setIsUploadMenuOpen(!isUploadMenuOpen)}
                     >
                       <Plus className={`w-5 h-5 transition-transform duration-300 ${isUploadMenuOpen ? 'rotate-45 text-blue-600' : ''}`} />
                     </button>
                     {/* Dropdown menu */}
                     <div className={`absolute top-full left-0 mt-2 w-36 bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-50 overflow-hidden transition-all duration-200 origin-top-left ${isUploadMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
                        <button className="w-full flex items-center gap-2.5 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-sm transition-colors text-left" onClick={() => setIsUploadMenuOpen(false)}>
                           <FileText className="w-4 h-4" /> 上传文档
                        </button>
                        <button className="w-full flex items-center gap-2.5 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-sm transition-colors text-left" onClick={() => setIsUploadMenuOpen(false)}>
                           <Image className="w-4 h-4" /> 上传图片
                        </button>
                     </div>
                   </div>

                   <div className="w-px h-5 bg-slate-200 mx-1 flex-shrink-0"></div>

                   {/* Tags */}
                   <button 
                     onClick={() => setSelectedTag(selectedTag === 'course' ? null : 'course')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${selectedTag === 'course' ? 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-sm' : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'}`}
                   >
                     <BookOpen className="w-4 h-4" /> 课程
                   </button>
                   <button 
                     onClick={() => setSelectedTag(selectedTag === 'lab' ? null : 'lab')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${selectedTag === 'lab' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm' : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'}`}
                   >
                     <Monitor className="w-4 h-4" /> 实验环境
                   </button>
                   <button 
                     onClick={() => setSelectedTag(selectedTag === 'exam' ? null : 'exam')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${selectedTag === 'exam' ? 'bg-purple-50 text-purple-600 border-purple-200 shadow-sm' : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'}`}
                   >
                     <FileBadge className="w-4 h-4" /> 考试任务
                   </button>
                 </div>

                 {/* Right Actions */}
                 <div className="flex items-center gap-2 pl-2">
                    <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors flex-shrink-0">
                      <Mic className="w-5 h-5" />
                    </button>
                    <button 
                      className="w-9 h-9 rounded-full bg-slate-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-pointer group flex-shrink-0 shadow-sm"
                      onClick={() => window.location.href = '/ai-interaction'}
                    >
                      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.5} />
                    </button>
                 </div>
               </div>

             </div>
            </div>
          </div>
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute left-[10%] top-[30%] animate-float-slow hidden lg:block opacity-50">
           <Cpu className="w-16 h-16 text-blue-300" />
        </div>
        <div className="absolute right-[15%] top-[40%] animate-float hidden lg:block opacity-50">
           <BrainCircuit className="w-20 h-20 text-purple-300" />
        </div>
      </section>

      {/* --- CORE CAPABILITIES --- */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-4">核心平台能力</h2>
            <p className="text-slate-500">AI 多模态融合驱动，构建下一代职业教育基底座</p>
          </div>
          
          <div className="flex justify-center mb-10 overflow-x-auto pb-4 hide-scrollbar">
             <div className="inline-flex bg-slate-100/80 backdrop-blur border border-slate-200 p-1.5 rounded-xl gap-1">
               {capabilitiesTab.map((tab, idx) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(idx)}
                   className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === idx ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
                 >
                   {tab.label}
                 </button>
               ))}
             </div>
          </div>

          {/* Capabilities Showcase Area */}
          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-3xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] p-8 md:p-12 min-h-[400px] flex items-center">
             {activeTab === 0 && (
               <div className="grid md:grid-cols-2 gap-12 w-full">
                 <div className="flex flex-col justify-center">
                   <h3 className="text-2xl font-bold text-slate-800 mb-4 animate-slide-in-right" style={{ animationFillMode: 'both' }}>软硬件结合的智能实验</h3>
                   <p className="text-slate-600 leading-relaxed mb-8 animate-slide-in-right" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                     提供沉浸式的设备实物接线与物联网虚拟仿真体验，将真实的物理硬件数字孪生，在云端即可完成复杂线路的组装与调试。
                   </p>
                   <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                     <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-[10px] bg-blue-50 border border-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600"><Layers className="w-5 h-5"/></div>
                       <div>
                         <h4 className="font-bold text-slate-800">虚实结合仿真环境</h4>
                         <p className="text-sm text-slate-500 mt-1">内置丰富的电源、传感器、执行器模块库，支持自由拖拽连线接驳。</p>
                       </div>
                     </div>
                     <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-[10px] bg-indigo-50 border border-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600"><Activity className="w-5 h-5"/></div>
                       <div>
                         <h4 className="font-bold text-slate-800">实时健康度与参数监控</h4>
                         <p className="text-sm text-slate-500 mt-1">同步透视设备的温度、光照等关键数据流，AI 动态判断运行状态与网络延迟。</p>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="relative h-64 md:h-[400px] xl:h-[480px] flex items-center justify-center group animate-slide-in-right" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
                    <img src="/1.png?t=1" alt="Hardware Simulation" className="max-w-full max-h-full object-contain drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-700 ease-out"/>
                 </div>
               </div>
             )}
             {activeTab === 1 && (
               <div className="grid md:grid-cols-2 gap-12 w-full">
                 <div className="flex flex-col justify-center">
                   <h3 className="text-2xl font-bold text-slate-800 mb-4 animate-slide-in-right" style={{ animationFillMode: 'both' }}>全过程技能分析系统</h3>
                   <p className="text-slate-600 leading-relaxed mb-6 animate-slide-in-right" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                     打通学习行为与硬件操作数据，让实训评价从传统的“结果打分”全面走向“全过程诊断”，构建教评闭环。
                   </p>
                   <ul className="space-y-4 mb-6 animate-slide-in-right" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                     <li className="flex items-start gap-3">
                        <div className="mt-1 bg-green-50 text-green-600 p-1.5 rounded-[8px] border border-green-100"><Activity className="w-4 h-4"/></div>
                        <div>
                           <div className="text-sm font-bold text-slate-800">全场景数据采集与学情诊断</div>
                           <div className="text-xs text-slate-500 mt-0.5">多维采集 AI互动、测量数据，自动生成软硬件实验综合防作弊评分。</div>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <div className="mt-1 bg-green-50 text-green-600 p-1.5 rounded-[8px] border border-green-100"><BrainCircuit className="w-4 h-4"/></div>
                        <div>
                           <div className="text-sm font-bold text-slate-800">动态技能图谱引擎</div>
                           <div className="text-xs text-slate-500 mt-0.5">将知识点、实操技能与岗位映射，生成可视化关联网络图。</div>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <div className="mt-1 bg-green-50 text-green-600 p-1.5 rounded-[8px] border border-green-100"><Award className="w-4 h-4"/></div>
                        <div>
                           <div className="text-sm font-bold text-slate-800">智能岗位推荐适配</div>
                           <div className="text-xs text-slate-500 mt-0.5">通过能力雷达图识别技能短板，基于目标岗位精准推荐进阶课程与路径。</div>
                        </div>
                     </li>
                   </ul>
                 </div>
                 <div className="relative h-64 md:h-[400px] xl:h-[480px] flex items-center justify-center group animate-slide-in-right" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
                    <img src="/2.png?t=1" alt="Skill Analysis Dashboard" className="max-w-full max-h-full object-contain drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-700 ease-out"/>
                 </div>
               </div>
             )}
             {activeTab === 2 && (
               <div className="grid md:grid-cols-2 gap-12 w-full">
                 <div className="flex flex-col justify-center">
                   <h3 className="text-2xl font-bold text-slate-800 mb-4 animate-slide-in-right" style={{ animationFillMode: 'both' }}>场景任务驱动的AI助手</h3>
                   <p className="text-slate-600 leading-relaxed mb-6 animate-slide-in-right" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                     基于具体的行业应用案例（如智慧园区），将知识点拆解成按步执行的任务节点，配合随时唤醒的专属智能导师。
                   </p>
                   <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                     <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-[10px] bg-pink-50 border border-pink-100 flex-shrink-0 flex items-center justify-center text-pink-600"><FileText className="w-5 h-5"/></div>
                       <div>
                         <h4 className="font-bold text-slate-800">结构化任务视图</h4>
                         <p className="text-sm text-slate-500 mt-1">层层递进的任务清单指引（如：设备安装、规则链自动化应用），清晰实训目标。</p>
                       </div>
                     </div>
                     <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-[10px] bg-orange-50 border border-orange-100 flex-shrink-0 flex items-center justify-center text-orange-600"><Star className="w-5 h-5"/></div>
                       <div>
                         <h4 className="font-bold text-slate-800">沉浸式上下文问答</h4>
                         <p className="text-sm text-slate-500 mt-1">AI助手深度理解当前课程与实验场景，提供架构解惑、代码助手与智能实验诊断排障。</p>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="relative h-64 md:h-[400px] xl:h-[480px] flex items-center justify-center group animate-slide-in-right" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
                    <img src="/3.png?t=1" alt="Students with AI Guidance" className="max-w-full max-h-full object-contain drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-700 ease-out"/>
                 </div>
               </div>
             )}
             {activeTab === 3 && (
               <div className="grid md:grid-cols-2 gap-12 w-full">
                 <div className="flex flex-col justify-center">
                   <h3 className="text-2xl font-bold text-slate-800 mb-4 animate-slide-in-right" style={{ animationFillMode: 'both' }}>物理硬件智能交互引擎</h3>
                   <p className="text-slate-600 leading-relaxed mb-6 animate-slide-in-right" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                     打通大语言模型与物理生产环境的界限。以对话为入口，通过传感器指令直连下发，实现复杂机械组线的全周期控制。
                   </p>
                   <ul className="space-y-4 mb-6 animate-slide-in-right" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                     <li className="flex items-start gap-3">
                        <div className="mt-1 bg-violet-50 text-violet-600 p-1.5 rounded-[8px] border border-violet-100"><Mic className="w-4 h-4"/></div>
                        <div>
                           <div className="text-sm font-bold text-slate-800">语音流自然交互操控</div>
                           <div className="text-xs text-slate-500 mt-0.5">通过自然“诉说“需求，即可下发驱动指令至底层 PLC 控制器，实现电机运动控制。</div>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <div className="mt-1 bg-violet-50 text-violet-600 p-1.5 rounded-[8px] border border-violet-100"><Camera className="w-4 h-4"/></div>
                        <div>
                           <div className="text-sm font-bold text-slate-800">深度视觉状态识别</div>
                           <div className="text-xs text-slate-500 mt-0.5">对接工业高清摄像头，AI 自动校验诸如“气缸状态”等机械物理行为是否达标。</div>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <div className="mt-1 bg-violet-50 text-violet-600 p-1.5 rounded-[8px] border border-violet-100"><Activity className="w-4 h-4"/></div>
                        <div>
                           <div className="text-sm font-bold text-slate-800">实时遥测流云端渲染</div>
                           <div className="text-xs text-slate-500 mt-0.5">在界面上精确渲染毫秒级的气缸伸缩状态、电压波动和运行速度曲线图表。</div>
                        </div>
                     </li>
                   </ul>
                 </div>
                 <div className="relative h-64 md:h-[400px] xl:h-[480px] flex items-center justify-center group animate-slide-in-right" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
                    <img src="/4.png?t=1" alt="Hardware AI Agent" className="max-w-full max-h-full object-contain drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-700 ease-out"/>
                 </div>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* --- FEATURED LIBRARY (MOCK "Nova Models" Style) --- */}
      <section className="py-20 bg-slate-50/50 relative border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">精品实训资源库</h2>
            <p className="text-slate-500">针对不同岗位方向优化的专业项目实战</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Card 1 */}
            <Link to="/courses" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider text-slate-500 bg-slate-100 rounded-md">人工智能</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">AIGC与大模型核心应用</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                提供业界领先的生成式AI大模型应用实践流程，涵盖从环境部署、提示词工程到微调（Fine-Tuning）的全套实训内容。
              </p>
              <div className="text-blue-600 text-sm font-medium flex items-center mt-auto">了解更多 <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/></div>
            </Link>

            {/* Card 2 */}
            <Link to="/labs" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Cloud className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider text-slate-500 bg-slate-100 rounded-md">物联网</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">智能物联网全栈开发</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                提供从设备端数据采集、边缘计算处理到云端管理平台的物联网全栈实战，支持海量设备的接入与高并发应用设计。
              </p>
              <div className="text-blue-600 text-sm font-medium flex items-center mt-auto">了解更多 <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/></div>
            </Link>

            {/* Card 3 */}
            <Link to="/exams" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider text-slate-500 bg-slate-100 rounded-md">工业互联网</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">工业互联网智慧平台实战</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                深入实施工业装备数据采集与边缘控制，结合智能制造、数字孪生与工业大数据分析，打造现代工业平台应用。
              </p>
              <div className="text-blue-600 text-sm font-medium flex items-center mt-auto">了解更多 <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/></div>
            </Link>

            {/* Card 4 */}
            <Link to="/courses" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <DatabaseIcon />
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider text-slate-500 bg-slate-100 rounded-md">大数据</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">大数据流式处理与分析</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                包含 Hadoop / Spark / Flink 等生态组件的大型集群模拟，助你在实战中掌握 TB 级数据实时处理与分析挖掘能力。
              </p>
              <div className="text-blue-600 text-sm font-medium flex items-center mt-auto">了解更多 <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/></div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- EXPERIMENTAL ENVIRONMENTS SECTION --- */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">丰富多样的实验环境基建</h2>
              <p className="text-slate-500">数十种环境赋能智能实训教学，全面覆盖各个专业领域</p>
           </div>
           
           <div className="flex flex-col lg:flex-row gap-8">
              {/* Left sticky description */}
              <div className="lg:w-1/3 flex flex-col justify-start">
                 <div className="sticky top-24 pt-4">
                    <div className="flex items-center gap-2 text-blue-600 font-bold mb-4">
                      <Monitor className="w-5 h-5"/> 实训生态
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-snug">
                      平台不仅提供单一的实验环境，更构建了丰富多样的实训生态。支持平台型、容器型与组合型架构，满足从基础编程到复杂工程的全场景需求。
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-2 font-medium text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs"><CheckCircle2 className="w-3.5 h-3.5"/></div>
                        开箱即用的平台与容器环境
                      </li>
                      <li className="flex items-center gap-2 font-medium text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs"><CheckCircle2 className="w-3.5 h-3.5"/></div>
                        覆盖物联网、AI、大数据等7大方向
                      </li>
                      <li className="flex items-center gap-2 font-medium text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs"><CheckCircle2 className="w-3.5 h-3.5"/></div>
                        支持复杂场景的组合型一键启动环境
                      </li>
                    </ul>
                    <div className="mt-8 flex gap-4">
                       <Link to="/labs" className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors shadow-md">探索实验环境</Link>
                    </div>
                 </div>
              </div>
              
              {/* Right Bento Grid */}
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { title: '平台型环境', desc: '涵盖区块链基础仿真、3D应用设计器、行业云平台等，提供高度仿真的业务流程与系统级操作体验。', icon: Cloud, color: 'text-blue-500' },
                   { title: '容器型环境', desc: '内置 Jupyter、VSCode、Linux、MySQL 等标准化开发容器，秒级分配资源，确保每个学生拥有独立工作区。', icon: Cpu, color: 'text-purple-500' },
                   { title: '组合型环境', desc: '支持嵌入式（仿真+Renode）等复杂架构环境，实现软硬件协同与多组件联动，满足高阶岗位实战的严格要求。', icon: Layers, color: 'text-emerald-500' },
                   { title: '全专业领域覆盖', desc: '资源跨越物联网、人工智能、工业互联网、大数据、区块链等多个前沿领域，深度契合实际岗位技能需求。', icon: BookOpen, color: 'text-orange-500' }
                 ].map((item, i) => (
                   <div key={i} className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-bold text-slate-400">{item.title}</div>
                        <item.icon className={`w-10 h-10 ${item.color} opacity-80`} strokeWidth={1.5}/>
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* --- PARTNERS LOGOS --- */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <h2 className="text-3xl md:text-[32px] font-bold text-[#2C3A5A] tracking-wide mb-3">与全国 500+ 顶尖职业院校共同构建未来</h2>
           <p className="text-[#64748B] text-lg font-light mb-20">Local Deployment of UUSIMA Smart Education Platforms</p>
           
           <div className="flex flex-col gap-16 items-center justify-center">
              {/* Row 1 - Top Vocational */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
                 {[
                   {name: '深圳职业技术大学', abbr: 'SZPT', color: 'text-emerald-700'}, 
                   {name: '南京工业职业技术大学', abbr: 'NIIT', color: 'text-red-700'}, 
                   {name: '广东轻工职业技术学院', abbr: 'GDIP', color: 'text-blue-800'}, 
                   {name: '北京电子科技职业学院', abbr: 'BPI', color: 'text-indigo-800'}, 
                   {name: '金华职业技术学院', abbr: 'JHC', color: 'text-cyan-700'},
                   {name: '陕西工业职业技术学院', abbr: 'SXPI', color: 'text-sky-700'},
                   {name: '浙江机电职业技术学院', abbr: 'ZIME', color: 'text-blue-600'},
                   {name: '常州信息职业技术学院', abbr: 'CCIT', color: 'text-red-600'},
                   {name: '武汉职业技术学院', abbr: 'WTCC', color: 'text-teal-700'},
                   {name: '顺德职业技术学院', abbr: 'SDPT', color: 'text-orange-700'},
                   {name: '重庆电子工程职业学院', abbr: 'CQCET', color: 'text-blue-700'},
                   {name: '芜湖职业技术学院', abbr: 'WHPT', color: 'text-sky-600'},
                   {name: '天津职业大学', abbr: 'TJVU', color: 'text-red-800'},
                   {name: '四川建筑职业技术学院', abbr: 'SCATC', color: 'text-emerald-600'},
                   {name: '重庆工业职业技术学院', abbr: 'CQIPC', color: 'text-cyan-800'},
                   {name: '长沙民政职业技术学院', abbr: 'CMI', color: 'text-teal-600'},
                   {name: '无锡职业技术学院', abbr: 'WXIT', color: 'text-blue-800'},
                   {name: '山东商业职业技术学院', abbr: 'SDCIC', color: 'text-orange-600'},
                   {name: '九江职业技术学院', abbr: 'JJVT', color: 'text-blue-500'},
                   {name: '承德石油高等专科学校', abbr: 'CDPC', color: 'text-indigo-700'}
                 ].map((school, i) => (
                   <SchoolBadge key={`r1-${i}`} name={school.name} abbr={school.abbr} color={school.color} />
                 ))}
              </div>

              {/* Row 2 - Enterprise Partners (Simulated) */}
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 md:gap-x-16 mt-4 border-t border-slate-50 pt-16 w-full opacity-80">
                 <div className="text-2xl font-black text-blue-600 tracking-tighter mix-blend-multiply flex items-center gap-1"><Cloud className="w-8 h-8"/> CHINA MOBILE</div>
                 <div className="text-2xl font-bold text-red-600 tracking-tight flex items-center gap-1"><Cpu className="w-7 h-7"/> HUAWEI</div>
                 <div className="text-2xl font-black text-blue-500 italic">inspur</div>
                 <div className="text-2xl font-bold text-slate-800 tracking-tighter">amazon<span className="text-orange-500">.cn</span></div>
                 <div className="text-2xl font-black text-orange-600">Alibaba<span className="text-sm font-normal text-slate-500 ml-1">.com</span></div>
                 <div className="text-2xl font-black text-blue-400">U<span className="text-slate-800">CLOUD</span></div>
                 <div className="text-2xl font-bold text-red-500 tracking-wider">Lenovo</div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const SchoolBadge = ({ name, abbr, color }: { name: string, abbr: string, color: string }) => {
  return (
    <div className={`flex flex-row items-center justify-start gap-3 md:gap-4 group hover:scale-105 transition-transform duration-300 cursor-pointer ${color}`}>
       <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
         <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' }}>
           {/* Outer and Inner Rings */}
           <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="3" />
           <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" />
           <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1" />
           
           {/* Center Abstract Logo or Abbr */}
           <text x="50" y="58" fontSize="22" textAnchor="middle" fontWeight="900" fontFamily="serif">
              {abbr}
           </text>
           {/* Small decorative inner star */}
           <path d="M 50 12 L 53 18 L 59 18 L 54.5 22.5 L 56 28 L 50 25 L 44 28 L 45.5 22.5 L 41 18 L 47 18 Z" fill="currentColor" opacity="0.9" />
           
           {/* Horizontal bottom text */}
           <text x="50" y="85" fontSize="10" textAnchor="middle" letterSpacing="2" fontFamily="sans-serif" opacity="0.85">
              1999
           </text>
         </svg>
       </div>
       <span className="text-xl md:text-[22px] font-bold text-slate-700 group-hover:text-current tracking-wide transition-colors">
         {name}
       </span>
    </div>
  );
};

const DatabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

export default EtherealHome;
