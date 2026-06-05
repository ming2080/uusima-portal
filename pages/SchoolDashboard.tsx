import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { 
  ArrowLeft, BookOpen, Wrench, Clock, Activity, Monitor,
  TrendingUp, Award, Zap, Server, Shield, BrainCircuit, Users, User, Layers, ActivitySquare, School
} from 'lucide-react';

const COLORS = ['#00f3ff', '#10b981', '#8b5cf6', '#ff8f50', '#ec4899', '#34d399'];

const SchoolDashboard: React.FC = () => {
  const { schoolName } = useParams<{ schoolName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'labs'>('overview');
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % realtimeEvents.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const decodedName = schoolName ? decodeURIComponent(schoolName) : '未知院校';

  // Mock data specifically tailored to sound like it belongs to the selected school
  const usageTrend = [
    { name: '1 月', 实训时长: 4000, 课程学习: 2400 },
    { name: '2 月', 实训时长: 3000, 课程学习: 1398 },
    { name: '3 月', 实训时长: 7800, 课程学习: 5800 },
    { name: '4 月', 实训时长: 8900, 课程学习: 6908 },
    { name: '5 月', 实训时长: 9800, 课程学习: 8800 },
    { name: '6 月', 实训时长: 12500, 课程学习: 11000 },
  ];

  const popularCourses = [
    { name: 'Python 程序设计', students: 480, duration: 12500 },
    { name: '人工智能基础', students: 420, duration: 11200 },
    { name: '机器学习与数学基础', students: 350, duration: 9800 },
    { name: '物联网导论', students: 310, duration: 8600 },
    { name: '大数据开发', students: 280, duration: 7500 },
  ];

  const popularLabs = [
    { name: 'AI 面部识别实验', usageCount: 1250, hours: 2500 },
    { name: 'YOLO 目标检测实验', usageCount: 980, hours: 1960 },
    { name: 'CNN 图像分类实验', usageCount: 850, hours: 1700 },
    { name: 'STM32 嵌入式开发实验', usageCount: 650, hours: 1300 },
    { name: 'Hadoop 集群搭建实验', usageCount: 520, hours: 1040 },
  ];

  const aiTutorCourses = [
    { name: 'Python 程序设计 (AI 辅导版)', students: 320, interactions: 15400, hours: 8500 },
    { name: '数据结构与算法 (AI 伴学版)', students: 280, interactions: 12200, hours: 7600 },
    { name: '人工智能基础 (智能实训)', students: 240, interactions: 9800, hours: 6200 },
  ];

  const departmentUsage = [
    { name: '人工智能学院', value: 45 },
    { name: '计算机与软件学院', value: 30 },
    { name: '电子与通信工程学院', value: 15 },
    { name: '物联网工程学院', value: 10 },
  ];

  const realtimeEvents = [
    "学生 李* 正在进行 [Python 程序设计] 课程学习",
    "学生 张* 启动了 [AI 面部识别实验] 实验环境",
    "[机器学习与数学基础] 当前并发学习人数突破 100 人",
    "学生 王* 通过 AI 学伴解决了代码 Bug (1 分钟前)",
    "教师 赵* 发布了新的实训环境 [自动驾驶仿真实验]",
    "平台调度 10 张 GPU 为 [人工智能学院] 课程分配算力",
    "学生 刘* 累计实训时长突破 100 小时",
  ];

  const StatCard = ({ title, value, icon: Icon, trend, glowColor, bgGradient }: any) => (
    <div className="bg-gradient-to-br from-[#0c142b] to-[#040815] border-t border-t-cyan-400/20 border border-cyan-500/10 hover:border-cyan-400/30 rounded-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-all blur-xl bg-${glowColor}`}></div>
      <div className="flex justify-between items-start mb-2 relative z-10">
        <h3 className="text-[13px] font-bold tracking-wider text-cyan-400/85 group-hover:text-cyan-300 transition-colors">{title}</h3>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-cyan-950/40 border border-cyan-500/15 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/30 transition-all`}>
          <Icon className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_4px_rgba(0,243,255,0.4)]" />
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-50 to-cyan-300 drop-shadow-[0_2px_8px_rgba(6,182,212,0.35)] mb-1 font-din tracking-tight truncate">
          {value}
        </div>
        {trend && (
          <div className="text-[10px] text-cyan-600/80 font-medium truncate">
            较上月 <span className={`font-bold drop-shadow-[0_0_4px_rgba(16,185,129,0.3)] ml-0.5 ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] bg-gradient-to-b from-[#080f26] via-[#030713] to-[#01040a] font-sans text-cyan-200 overflow-y-auto pb-12">
      {/* Header */}
      <header className="bg-[#050b1a]/95 backdrop-blur-md border-b border-cyan-500/20 px-8 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/platform-operations-dashboard')}
            className="p-2 rounded-full hover:bg-cyan-950/60 border border-transparent hover:border-cyan-500/30 text-cyan-400 hover:text-cyan-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-cyan-100 to-white drop-shadow-[0_2px_10px_rgba(6,182,212,0.35)] flex items-center gap-2">
              <School className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]" size={20} />
              {decodedName}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 shadow-inner ml-2">院校画像</span>
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex bg-cyan-950/20 ring-1 ring-cyan-500/10 border border-cyan-500/25 p-1 rounded-2xl shadow-inner">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`px-5 py-1.5 rounded-xl text-xs font-bold tracking-widest transition-all ${activeTab === 'overview' ? 'bg-gradient-to-r from-cyan-900/90 to-cyan-800/50 ring-1 ring-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'text-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-500/5'}`}
            >
              总览视角
            </button>
            <button 
              onClick={() => setActiveTab('courses')} 
              className={`px-5 py-1.5 rounded-xl text-xs font-bold tracking-widest transition-all ${activeTab === 'courses' ? 'bg-gradient-to-r from-cyan-900/90 to-cyan-800/50 ring-1 ring-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'text-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-500/5'}`}
            >
              课程分析
            </button>
            <button 
              onClick={() => setActiveTab('labs')} 
              className={`px-5 py-1.5 rounded-xl text-xs font-bold tracking-widest transition-all ${activeTab === 'labs' ? 'bg-gradient-to-r from-cyan-900/90 to-cyan-800/50 ring-1 ring-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'text-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-500/5'}`}
            >
              实训洞察
            </button>
          </div>
          <div className="text-xs text-cyan-500/90 flex items-center gap-1.5 border-l border-cyan-500/20 pl-4">
            最后更新: <span className="font-din font-semibold text-[#00f3ff] drop-shadow-[0_0_6px_rgba(0,243,255,0.4)]">{new Date().toLocaleTimeString('zh-CN', { hour12: false })}</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 mt-6 space-y-8 relative">
        {/* Background micro grid aura */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

        {/* Top Stats - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <StatCard 
            title="累计实训时长 (分钟)" 
            value="142,500" 
            trend="+12.5%" 
            icon={Wrench} 
            glowColor="cyan-500"
          />
          <StatCard 
            title="累计课程学习时长 (分钟)" 
            value="89,200" 
            trend="+8.2%" 
            icon={BookOpen} 
            glowColor="emerald-500"
          />
          <StatCard 
            title="AI 算力消耗量 (Tokens)" 
            value="1,208k" 
            trend="+24.8%" 
            icon={BrainCircuit} 
            glowColor="purple-500"
          />
          <StatCard 
            title="活跃师生人数" 
            value="3,420" 
            trend="+5.1%" 
            icon={Users} 
            glowColor="amber-500"
          />
        </div>

        {/* Real-time ticker banner */}
        <div className="bg-gradient-to-r from-[#0c142b]/60 to-[#040815]/80 border border-cyan-500/15 rounded-xl px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center overflow-hidden relative z-10">
          <div className="flex-shrink-0 flex items-center gap-2 mr-4 text-[#00f3ff] font-bold border-r border-cyan-500/15 pr-4 text-xs tracking-widest">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse shadow-[0_0_8px_rgba(0,243,255,0.8)]"></div>
             实时动态
          </div>
          <div className="flex-1 overflow-hidden relative h-5">
             <div 
                className="transition-transform duration-500 ease-in-out flex flex-col"
                style={{ transform: `translateY(-${tickerIndex * 20}px)` }}
             >
               {realtimeEvents.map((event, i) => (
                 <div key={i} className="h-5 flex items-center text-xs text-cyan-200/80 truncate font-semibold">
                   {event}
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8 relative z-10">
            {/* Main Interactive Row - Bento Grid Design */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Segment: usage trends */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border-t border-t-cyan-500/20 border border-cyan-500/10 rounded-2xl p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6)] flex flex-col group hover:border-cyan-400/25 transition-all duration-300">
                <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-300 tracking-wider relative flex items-center gap-2 mb-6">
                  <TrendingUp className="text-cyan-400" size={18} />
                  学习与实训时长趋势 (近半年)
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
                </h2>
                <div className="h-[260px] w-full mt-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLab" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCourse" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b/40" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#0ea5e9', fontSize: 10, opacity: 0.8}} dy={5} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#0ea5e9', fontSize: 10, opacity: 0.8}} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#091026', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)', fontSize: '12px' }}
                        labelStyle={{ fontWeight: 'bold', color: '#00f3ff', marginBottom: '4px' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px', fontSize: '11px', color: '#38bdf8' }} />
                      <Area type="monotone" dataKey="实训时长" stroke="#00f3ff" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLab)" />
                      <Area type="monotone" dataKey="课程学习" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCourse)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Center Segment: Profile Persona & Counter Dashboard */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#09112a] to-[#030612] border border-cyan-500/15 rounded-2xl p-6 shadow-[0_12px_45px_rgba(0,0,0,0.65)] flex flex-col relative overflow-hidden group">
                {/* Visual Radar Rings Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-dashed border-cyan-500/5 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-cyan-500/10 bg-gradient-to-b from-cyan-900/5 to-transparent pointer-events-none"></div>
                
                {/* Header Subtext decoration */}
                <div className="w-full flex justify-center text-xs text-cyan-400 font-bold tracking-widest mb-4">
                  <span>✦ 院校实训画像雷达 ✦</span>
                </div>

                {/* Cyber Number Plate */}
                <div className="flex justify-center flex-wrap px-2 relative z-10 mb-4 scale-95 md:scale-100">
                  {String(14893677).split('').map((char, i) => (
                     <React.Fragment key={i}>
                       {i === 2 || i === 5 ? (
                          <div className="flex items-end justify-center text-[#00f3ff] text-2xl md:text-3.5xl font-black px-0.5 pb-1 drop-shadow-[0_0_6px_rgba(0,243,255,0.6)]">,</div>
                       ) : null}
                       <div className="mx-0.5 w-6 md:w-8 h-10 md:h-12 bg-gradient-to-b from-[#0a1b3d] to-[#040817] rounded-md shadow-lg flex items-center justify-center border border-cyan-500/30">
                          <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-300 font-din drop-shadow-[0_2px_4px_rgba(0,243,255,0.4)]">{char}</span>
                       </div>
                     </React.Fragment>
                  ))}
                  <div className="flex items-end text-xs font-bold text-cyan-400 ml-2 mb-1 tracking-wider">人次</div>
                </div>

                {/* Animated Floating Labels Character Portrait */}
                <div className="flex-1 relative flex items-center justify-center min-h-[220px]">
                  {/* Central Concept Glow Image */}
                  <div className="w-40 h-52 z-10 flex items-center justify-center relative rounded-full overflow-hidden border border-cyan-400/20 bg-gradient-to-b from-cyan-950/20 to-transparent p-1">
                    <img 
                      src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=400" 
                      alt="Center Tech Character" 
                      className="w-full h-full object-cover opacity-60 rounded-full mix-blend-screen grayscale contrast-125" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-transparent to-transparent"></div>
                  </div>

                  {/* Floating Tags - Absolute positions */}
                  <div className="absolute left-[3%] top-[10%] bg-[#08132d]/90 ring-1 ring-cyan-500/20 backdrop-blur-md shadow-lg px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-cyan-400/10 z-20 hover:-translate-y-0.5 transition-transform duration-300">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,243,255,0.8)]"></div>
                     <span className="text-[10px] md:text-xs font-bold text-cyan-200">本科生 73%</span>
                  </div>
                  <div className="absolute left-[0%] top-[45%] bg-[#08132d]/90 ring-1 ring-amber-500/20 backdrop-blur-md shadow-lg px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-400/10 z-20 hover:-translate-y-0.5 transition-transform duration-300">
                     <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                     <span className="text-[10px] md:text-xs font-bold text-amber-300">20-25岁活跃</span>
                  </div>
                  <div className="absolute left-[3%] top-[78%] bg-[#08132d]/90 ring-1 ring-purple-500/20 backdrop-blur-md shadow-lg px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-purple-400/10 z-20 hover:-translate-y-0.5 transition-transform duration-300">
                     <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                     <span className="text-[10px] md:text-xs font-bold text-purple-300">实训高频次</span>
                  </div>

                  <div className="absolute right-[3%] top-[10%] bg-[#08132d]/90 ring-1 ring-cyan-500/20 backdrop-blur-md shadow-lg px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-cyan-400/10 z-20 hover:-translate-y-0.5 transition-transform duration-300">
                     <span className="text-[10px] md:text-xs font-bold text-cyan-200">计算机大类</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,243,255,0.8)]"></div>
                  </div>
                  <div className="absolute right-[0%] top-[45%] bg-[#08132d]/90 ring-1 ring-emerald-500/20 backdrop-blur-md shadow-lg px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-400/10 z-20 hover:-translate-y-0.5 transition-transform duration-300">
                     <span className="text-[10px] md:text-xs font-bold text-emerald-300">40% 深度活跃</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  </div>
                  <div className="absolute right-[3%] top-[78%] bg-[#08132d]/90 ring-1 ring-cyan-500/20 backdrop-blur-md shadow-lg px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-cyan-400/10 z-20 hover:-translate-y-0.5 transition-transform duration-300">
                     <span className="text-[10px] md:text-xs font-bold text-cyan-200">高并发编码</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,243,255,0.8)]"></div>
                  </div>
                </div>

                {/* 4 Steps Circle Progress footer */}
                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-cyan-500/10 text-center relative z-10 scale-95">
                  {[
                    { label: '课程学习', val: '25%', color: 'border-b-[#00f3ff]' },
                    { label: '任务实战', val: '44%', color: 'border-l-[#10b981]' },
                    { label: 'AI学伴', val: '15%', color: 'border-t-[#8b5cf6]' },
                    { label: '测评总结', val: '6%', color: 'border-r-[#ff8f50]' }
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#04091a] border border-cyan-500/10 flex items-center justify-center shadow-lg">
                        <span className="text-[11px] font-black font-din text-white">{s.val}</span>
                      </div>
                      <span className="text-[9px] text-cyan-500/90 font-bold mt-1.5 truncate w-full">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Segment: Pie chart resources distribution */}
              <div className="lg:col-span-3 bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border-t border-t-cyan-500/20 border border-cyan-500/10 rounded-2xl p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6)] flex flex-col group hover:border-cyan-400/25 transition-all duration-300">
                <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-300 tracking-wider relative flex items-center gap-2 mb-4">
                  <Layers className="text-cyan-400" size={18} />
                  院系资源使用占比
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
                </h2>
                <div className="flex-1 flex flex-col items-center justify-center relative min-h-[180px]">
                  <div className="h-[180px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentUsage}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {departmentUsage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(12,20,43,0.8)" strokeWidth={2} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value) => [`${value}%`, '占比']}
                          contentStyle={{ backgroundColor: '#091026', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-[10px] text-cyan-500 font-bold">活跃分院</span>
                    <span className="text-xl font-black text-white font-din drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">4</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-2.5 mt-2 pt-3 border-t border-cyan-500/10">
                  {departmentUsage.map((dept, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 min-w-0">
                      <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                      <span className="text-[10px] text-cyan-400/80 truncate font-semibold" title={dept.name}>{dept.name} ({dept.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Row Bento: Age & Degree and AI preferences */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Age and degrees stack bar */}
              <div className="bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border-t border-t-cyan-500/20 border border-cyan-500/10 rounded-2xl p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6)] flex flex-col group hover:border-cyan-400/25 transition-all duration-300">
                <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-300 tracking-wider relative flex items-center gap-2 mb-6">
                  <User className="text-cyan-400" size={18} />
                  学生实训画卷 (年龄与学位分布)
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
                </h3>
                <div className="flex justify-around mb-4 bg-cyan-950/20 rounded-xl p-3 border border-cyan-500/10">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#10b981]/20 flex items-center justify-center text-[#10b981]"><User size={13}/></div>
                      <span className="text-base font-black text-white font-din drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">73%</span>
                    </div>
                    <span className="text-[10px] text-cyan-500/90 font-bold mt-1">本科生占比</span>
                  </div>
                  <div className="flex flex-col items-center border-l border-cyan-500/15 pl-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#00f3ff]/20 flex items-center justify-center text-[#00f3ff]"><User size={13}/></div>
                      <span className="text-base font-black text-white font-din drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">27%</span>
                    </div>
                    <span className="text-[10px] text-cyan-500/90 font-bold mt-1">研究生占比</span>
                  </div>
                </div>
                <div className="h-[150px] w-full mt-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      {name: '18-20', uv: 10, pv: 5}, {name: '21-22', uv: 15, pv: 8}, {name: '23-24', uv: 25, pv: 15},
                      {name: '25-26', uv: 12, pv: 20}, {name: '27-28', uv: 18, pv: 14}, {name: '29-30', uv: 22, pv: 10},
                      {name: '30+', uv: 15, pv: 8}
                    ]} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b/30" />
                      <XAxis dataKey="name" tick={{fontSize: 9, fill: '#0ea5e9', opacity: 0.8}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize: 9, fill: '#0ea5e9', opacity: 0.8}} axisLine={false} tickLine={false} />
                      <RechartsTooltip cursor={{fill: 'rgba(6,182,212,0.05)'}} contentStyle={{ backgroundColor: '#091026', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '12px', fontSize: '11px' }}/>
                      <Bar dataKey="uv" stackId="a" fill="#10b981" barSize={8} radius={[0, 0, 2, 2]} />
                      <Bar dataKey="pv" stackId="a" fill="#00f3ff" barSize={8} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#10b981] rounded-sm"></div><span className="text-[10px] text-cyan-500 font-bold">本科阶段 (18-24)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#00f3ff] rounded-sm"></div><span className="text-[10px] text-cyan-500 font-bold">高阶技能实训 (25+)</span></div>
                </div>
              </div>

              {/* AI abilities preferences energy wheel */}
              <div className="bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border-t border-t-cyan-500/20 border border-cyan-500/10 rounded-2xl p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6)] flex flex-col group hover:border-cyan-400/25 transition-all duration-300">
                <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-300 tracking-wider relative flex items-center gap-2 mb-5">
                  <BrainCircuit className="text-cyan-400" size={18} />
                  AI 智能学伴能力偏好特征
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
                </h3>
                <div className="flex justify-between h-full relative pl-2 items-center">
                  <div className="flex flex-col gap-2.5 justify-center z-10 w-3/5">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></div><span className="text-xs text-cyan-200/90 font-semibold">代码纠错</span><span className="text-xs font-bold text-[#10b981] font-din bg-[#10b981]/10 px-1.5 rounded">28%</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#ff8f50] rounded-full"></div><span className="text-xs text-cyan-200/90 font-semibold">大纲生成</span><span className="text-xs font-bold text-[#ff8f50] font-din bg-[#ff8f50]/10 px-1.5 rounded">24%</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full"></div><span className="text-xs text-cyan-200/90 font-semibold">智能问答</span><span className="text-xs font-bold text-[#00f3ff] font-din bg-[#00f3ff]/10 px-1.5 rounded">18%</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full"></div><span className="text-xs text-cyan-200/90 font-semibold">代码补全</span><span className="text-xs font-bold text-[#8b5cf6] font-din bg-[#8b5cf6]/10 px-1.5 rounded">15%</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div><span className="text-xs text-cyan-200/90 font-semibold">错误解析</span><span className="text-xs font-bold text-cyan-400 font-din bg-cyan-600/10 px-1.5 rounded">10%</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#ec4899] rounded-full"></div><span className="text-xs text-cyan-200/90 font-semibold">性能优化</span><span className="text-xs font-bold text-[#ec4899] font-din bg-[#ec4899]/10 px-1.5 rounded">5%</span></div>
                  </div>
                  
                  <div className="w-2/5 flex items-center justify-center relative">
                    <div className="w-32 h-32 relative flex items-center justify-center">
                      {/* Inner glowing circle */}
                      <div className="absolute inset-2.5 rounded-full border border-cyan-500/20 flex flex-col items-center justify-center bg-[#040817] shadow-[inset_0_0_15px_rgba(6,182,212,0.15)] z-10 text-center">
                         <span className="text-[10px] text-cyan-400 font-bold scale-90">核心偏好</span>
                         <span className="text-xs font-black text-white font-din">代码纠错</span>
                      </div>
                      {/* Outer circular chart segments using SVG */}
                      <svg width="128" height="128" viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                         {/* 28% code correction */}
                         <circle cx="50" cy="50" r="44" fill="transparent" stroke="#10b981" strokeWidth="5.5" strokeDasharray="276.4" strokeDashoffset="199" strokeLinecap="round" />
                         {/* 24% outline gen */}
                         <circle cx="50" cy="50" r="44" fill="transparent" stroke="#ff8f50" strokeWidth="5.5" strokeDasharray="276.4" strokeDashoffset="210" strokeLinecap="round" transform="rotate(100.8 50 50)" />
                         {/* 18% chatbot */}
                         <circle cx="50" cy="50" r="44" fill="transparent" stroke="#00f3ff" strokeWidth="5.5" strokeDasharray="276.4" strokeDashoffset="226.6" strokeLinecap="round" transform="rotate(187.2 50 50)" />
                         {/* 15% autocomplete */}
                         <circle cx="50" cy="50" r="44" fill="transparent" stroke="#8b5cf6" strokeWidth="5.5" strokeDasharray="276.4" strokeDashoffset="234.9" strokeLinecap="round" transform="rotate(252 50 50)" />
                      </svg>
                      <div className="absolute -top-1.5 -right-2 text-[9px] font-bold bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] px-1.5 rounded shadow-[0_0_4px_rgba(16,185,129,0.3)] z-20">高频型</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* AI Tutor Data Sub-tab (Visible in overview or courses) */}
        {(activeTab === 'overview' || activeTab === 'courses') && (
          <div className="bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border-t border-t-cyan-500/20 border border-cyan-500/10 rounded-2xl p-6 relative overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.55)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex justify-between items-end mb-6 relative z-10">
              <div>
                <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-300 tracking-wider relative flex items-center gap-2 mb-1">
                  <BrainCircuit className="text-cyan-400" size={18} />
                  AI 智能辅导专栏 (课程学习数据)
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
                </h2>
                <p className="text-xs text-cyan-500/90 font-medium">深度跟踪 AI 助教参与全景实训的课堂行为辅导表现</p>
              </div>
              <div className="px-3 py-1.5 bg-cyan-950/40 border border-cyan-500/20 rounded-lg shrink-0">
                <span className="text-[10px] font-bold text-[#00f3ff] flex items-center gap-1.5">
                  <Zap className="animate-pulse shadow-sm" size={12} /> AI 极客赋能
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
              {aiTutorCourses.map((course, idx) => (
                <div key={idx} className="bg-[#050b1a]/90 rounded-xl p-4 border border-cyan-500/10 hover:border-cyan-400/35 hover:shadow-[0_8px_20px_rgba(6,182,212,0.15)] hover:bg-cyan-950/10 transition-all duration-300 group">
                  <div className="text-[10px] font-bold text-cyan-500 font-din mb-2">{String(idx + 1).padStart(2, '0')}</div>
                  <h3 className="font-bold text-cyan-100 text-sm mb-3 group-hover:text-cyan-300 transition-colors line-clamp-1" title={course.name}>{course.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-[#0c142b]/30 px-3 py-2 rounded-lg border border-cyan-500/5">
                      <span className="text-[10px] flex items-center gap-1.5 text-cyan-500/90 font-bold"><Users size={11}/> 研习人数</span>
                      <span className="text-xs font-black text-white font-din">{course.students}</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#0c142b]/30 px-3 py-2 rounded-lg border border-cyan-500/5">
                      <span className="text-[10px] flex items-center gap-1.5 text-cyan-500/90 font-bold"><Zap className="text-amber-400" size={11}/> 互动行为</span>
                      <span className="text-xs font-black text-[#00f3ff] font-din drop-shadow-[0_0_4px_rgba(0,243,255,0.4)]">{course.interactions.toLocaleString()} 次</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#0c142b]/30 px-3 py-2 rounded-lg border border-cyan-500/5">
                      <span className="text-[10px] flex items-center gap-1.5 text-cyan-500/90 font-bold"><Clock size={11}/> 算力分钟</span>
                      <span className="text-xs font-bold text-cyan-300 font-din">{course.hours.toLocaleString()} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab-driven rankings listings */}
        <div className={`grid grid-cols-1 gap-8 ${activeTab === 'overview' ? 'lg:grid-cols-2' : ''}`}>
          
          {/* Courses analysis lists */}
          {(activeTab === 'overview' || activeTab === 'courses') && (
            <div className="bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border-t border-t-cyan-500/20 border border-cyan-500/10 rounded-2xl p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6)] flex flex-col group hover:border-cyan-400/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-300 tracking-wider relative flex items-center gap-2">
                  <Award className="text-[#10b981]" size={18} />
                  核心研习课程热度榜
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
                </h2>
                <span className="px-2.5 py-0.5 bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 rounded-md text-[10px] font-bold">综合热度指数</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-cyan-500/10 text-[10px] text-cyan-500/80 font-semibold tracking-wider">
                      <th className="py-3 px-3">排名</th>
                      <th className="py-3 px-3">课程名称</th>
                      <th className="py-3 px-3 text-right">学习人数</th>
                      <th className="py-3 px-3 text-right">累计学时</th>
                      <th className="py-3 px-3">热度比</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularCourses.map((course, idx) => (
                      <tr key={idx} className="border-b border-cyan-500/5 last:border-0 hover:bg-cyan-950/20 transition-colors">
                        <td className="py-3 px-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                            idx === 0 ? 'bg-gradient-to-br from-amber-400/30 to-yellow-500/20 text-yellow-300 ring-1 ring-yellow-400/30 shadow-[0_0_8px_rgba(245,158,11,0.25)]' :
                            idx === 1 ? 'bg-gradient-to-br from-cyan-400/30 to-blue-500/20 text-cyan-200 ring-1 ring-cyan-400/30' :
                            idx === 2 ? 'bg-gradient-to-br from-orange-400/30 to-amber-500/20 text-orange-300 ring-1 ring-orange-400/30' :
                            'bg-[#040815]/90 text-cyan-600/80 ring-1 ring-cyan-950'
                          }`}>
                            {idx + 1}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-cyan-100 text-xs">{course.name}</td>
                        <td className="py-3 px-3 text-right text-cyan-300 font-din text-xs">{course.students.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-bold text-white font-din text-xs">{course.duration.toLocaleString()}</td>
                        <td className="py-3 px-3">
                           <div className="w-full bg-[#040815] rounded-full h-1 w-[60px] ml-auto overflow-hidden">
                              <div className="bg-emerald-400 h-1 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: `${(course.duration / popularCourses[0].duration) * 100}%` }}></div>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Labs analysis list */}
          {(activeTab === 'overview' || activeTab === 'labs') && (
            <div className="bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border-t border-t-cyan-500/20 border border-cyan-500/10 rounded-2xl p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6)] flex flex-col group hover:border-cyan-400/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-300 tracking-wider relative flex items-center gap-2">
                  <ActivitySquare className="text-cyan-400" size={18} />
                  高频实训实验排行榜
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></span>
                </h2>
                <span className="px-2.5 py-0.5 bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 rounded-md text-[10px] font-bold">运行调用频次</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-cyan-500/10 text-[10px] text-cyan-500/80 font-semibold tracking-wider">
                      <th className="py-3 px-3">排名</th>
                      <th className="py-3 px-3">实验环境名称</th>
                      <th className="py-3 px-3 text-right">调用频次</th>
                      <th className="py-3 px-3 text-right">运行时长</th>
                      <th className="py-3 px-3">利用率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularLabs.map((lab, idx) => (
                      <tr key={idx} className="border-b border-cyan-500/5 last:border-0 hover:bg-cyan-950/20 transition-colors">
                        <td className="py-3 px-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                            idx === 0 ? 'bg-gradient-to-br from-amber-400/30 to-yellow-500/20 text-yellow-300 ring-1 ring-yellow-400/30 shadow-[0_0_8px_rgba(245,158,11,0.25)]' :
                            idx === 1 ? 'bg-gradient-to-br from-cyan-400/30 to-blue-500/20 text-cyan-200 ring-1 ring-cyan-400/30' :
                            idx === 2 ? 'bg-gradient-to-br from-orange-400/30 to-amber-500/20 text-orange-300 ring-1 ring-orange-400/30' :
                            'bg-[#040815]/90 text-cyan-600/80 ring-1 ring-cyan-950'
                          }`}>
                            {idx + 1}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-cyan-100 text-xs flex items-center gap-1.5 truncate max-w-[150px]">
                          <Monitor size={12} className="text-cyan-500 shrink-0" />
                          {lab.name}
                        </td>
                        <td className="py-3 px-3 text-right text-cyan-300 font-din text-xs">{lab.usageCount.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-bold text-[#00f3ff] font-din text-xs">{lab.hours.toLocaleString()} h</td>
                        <td className="py-3 px-3">
                           <div className="w-full bg-[#040815] rounded-full h-1 w-[60px] ml-auto overflow-hidden">
                              <div className="bg-[#00f3ff] h-1 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,243,255,0.5)]" style={{ width: `${(lab.usageCount / popularLabs[0].usageCount) * 100}%` }}></div>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default SchoolDashboard;
