import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { 
  ArrowLeft, BookOpen, Wrench, Clock, Activity, Monitor,
  TrendingUp, Award, Zap, Server, Shield, BrainCircuit, Users, User, Layers, ActivitySquare, School
} from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const SchoolDashboard: React.FC = () => {
  const { schoolName } = useParams<{ schoolName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'labs'>('overview');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [theme, setTheme] = useState<'standard' | 'tech'>('standard');

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
    { name: 'JavaScript 全栈开发 (AI 助手)', students: 200, interactions: 7400, hours: 4100 },
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

  const StatCard = ({ title, value, icon: Icon, trend, colorClass, gradientClass }: any) => (
    <div className={`relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm p-6 transition-all hover:shadow-md group`}>
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 ${colorClass} blur-2xl group-hover:opacity-20 transition-opacity`}></div>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
            {trend && (
              <span className={`text-sm font-medium mb-1 ${trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${gradientClass} text-white shadow-sm`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  const renderTechTheme = () => {
    return (
      <div className="min-h-screen bg-[#f0f4f8] text-[#333] font-sans flex flex-col relative overflow-hidden pb-6">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0yMCAwaC0xdjFIMTlWMEgxOHYxSDE3VjBIMTZ2MUgxNVYwSDE0djFIMTNWMHptLTUgMTB2MWgtdjFIMTR2LThoMTV2MWgtMTV6IiBmaWxsPSIjZTJlNThjIiBmaWxsLW9wYWNpdHk9IjAuMSIgLz4KPC9zdmc+')] pointer-events-none opacity-50 z-0"></div>

        {/* Header matching the reference: sleek, blue layered */}
        <header className="relative z-10 w-full h-[72px] flex items-center justify-between px-6 bg-gradient-to-b from-white/90 to-white/40 backdrop-blur border-b border-blue-100 shadow-sm">
           <div className="flex items-center gap-3">
              <button onClick={() => navigate('/platform-operations-dashboard')} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                <ArrowLeft size={18} />
              </button>
              <h1 className="text-2xl font-black text-slate-800 tracking-wider">
                 {decodedName} 看板
              </h1>
           </div>
           
           {/* Center Tabs */}
           <div className="absolute left-1/2 -translate-x-1/2 flex items-center h-full">
              <div className="flex gap-2">
                 <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-2 rounded-tl-xl rounded-br-xl font-bold shadow-md transform -skew-x-[20deg]">
                    <span className="block transform skew-x-[20deg] px-2 shadow-blue-500/50">画像分析</span>
                 </div>
                 <div className="bg-blue-100/80 text-blue-700 px-8 py-2 rounded-tl-xl rounded-br-xl font-bold text-slate-600 hover:bg-blue-200 transition transform -skew-x-[20deg] cursor-pointer">
                    <span className="block transform skew-x-[20deg] px-2">活动分析</span>
                 </div>
              </div>
           </div>

           <div className="flex flex-col items-end z-10 text-xs text-slate-500 font-medium">
              <div>数据更新：{new Date().toLocaleString()}</div>
              <div>今日实时</div>
              <button onClick={() => setTheme('standard')} className="mt-1 text-blue-500 hover:text-blue-700 underline text-xs">
                切换标准版
              </button>
           </div>
        </header>

        {/* Sub-header decoration */}
        <div className="w-full flex justify-center mt-2 mb-4 relative z-10">
           <div className="flex items-center gap-4 text-blue-400">
             <div className="flex gap-1"><div className="w-2 h-1.5 bg-blue-200 transform skew-x-[-30deg]"></div><div className="w-2 h-1.5 bg-blue-300 transform skew-x-[-30deg]"></div><div className="w-2 h-1.5 bg-blue-400 transform skew-x-[-30deg]"></div></div>
             <span className="text-blue-600 font-black tracking-widest text-lg px-2">实训客群</span>
             <div className="flex gap-1"><div className="w-2 h-1.5 bg-blue-400 transform skew-x-[-30deg]"></div><div className="w-2 h-1.5 bg-blue-300 transform skew-x-[-30deg]"></div><div className="w-2 h-1.5 bg-blue-200 transform skew-x-[-30deg]"></div></div>
           </div>
        </div>

        <div className="px-6 grid grid-cols-1 md:grid-cols-12 gap-5 z-10 relative">
           {/* Left Column */}
           <div className="md:col-span-3 flex flex-col gap-5">
              {/* Box 1 */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-5 border border-white max-h-[340px] flex flex-col">
                 <h3 className="text-base font-bold text-slate-800 mb-4 tracking-wide">平台活跃趋势</h3>
                 {/* Top charts for box 1 */}
                 <div className="flex justify-between items-center mb-4 border-b border-dashed border-slate-200 pb-4 px-2">
                    <div className="flex flex-col items-center pl-2">
                       <div className="w-14 h-14 flex items-center justify-center relative">
                         <svg className="w-full h-full absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                           <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                           <circle cx="32" cy="32" r="28" fill="none" stroke="#2563eb" strokeWidth="5" strokeDasharray="175" strokeDashoffset="105" strokeLinecap="round" />
                         </svg>
                         <span className="text-sm font-bold text-slate-800">40%</span>
                       </div>
                       <span className="text-xs text-slate-500 mt-2 font-medium">开通率</span>
                    </div>

                    <div className="flex items-center gap-3 pr-2">
                       <div className="w-14 h-14 relative flex-shrink-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={[{name: 'A', value:40},{name: 'B', value:30},{name: 'C', value:20},{name: 'D', value:10}]} cx="50%" cy="50%" innerRadius={12} outerRadius={26} dataKey="value" stroke="none">
                                <Cell fill="#3b82f6" />
                                <Cell fill="#10b981" />
                                <Cell fill="#f59e0b" />
                                <Cell fill="#38bdf8" />
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                       </div>
                       <div className="flex flex-col gap-1.5 justify-center">
                          <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-[#3b82f6]"></div>核心项目</div>
                          <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-[#10b981]"></div>普通实训</div>
                          <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-[#f59e0b]"></div>课后练习</div>
                          <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-[#38bdf8]"></div>自由探索</div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="text-xs text-slate-400 mb-1">账户占比 / 趋势</div>
                 <div className="h-[120px] w-full flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={usageTrend} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorLeft" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{fontSize: 9, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                        <YAxis tick={{fontSize: 9, fill: '#94a3b8'}} hide={false} axisLine={false} tickLine={false} />
                        <RechartsTooltip />
                        <Area type="monotone" dataKey="实训时长" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorLeft)" activeDot={{r:4, fill:'#fff', stroke:'#2563eb', strokeWidth:2}} />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Box 2 */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-5 border border-white flex-1 min-h-[300px]">
                 <h3 className="text-base font-bold text-slate-800 mb-5 tracking-wide">客户评价与使用度</h3>
                 <div className="flex text-xs text-slate-500 mb-3 ml-12 gap-6">
                    <span>基础实训</span>
                    <span>AI辅助</span>
                    <span>综合测评</span>
                 </div>
                 <div className="space-y-4">
                    {popularCourses.slice(0, 5).map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <span className="text-xs text-slate-600 font-medium w-14 shrink-0 text-right">{c.name.substring(0,4)}</span>
                         <div className="flex-1 bg-blue-50 h-3 rounded-full overflow-hidden flex shadow-inner">
                           <div className={`h-full ${i===0 ? 'bg-[#10b981]' : i===1 ? 'bg-[#3b82f6]' : 'bg-[#60a5fa]'}`} style={{ width: `${Math.min(100, (c.duration / 12000) * 100)}%`}}></div>
                         </div>
                         <span className="text-xs font-bold text-slate-500 w-6">{(c.duration / 3000).toFixed(1)}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Center Column */}
           <div className="md:col-span-6 rounded-3xl bg-white/40 border border-white shadow-sm flex flex-col relative overflow-hidden backdrop-blur-sm">
               {/* Center Background Circles */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[1.5px] border-dashed border-blue-200/50"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-blue-300/30 bg-gradient-to-b from-blue-100/10 to-transparent pointer-events-none"></div>

               {/* Top Numbers */}
               <div className="flex justify-center mt-6 z-10 flex-wrap px-4">
                 {String(14893677).split('').map((char, i) => (
                    <React.Fragment key={i}>
                      {i === 2 || i === 5 ? (
                         <div className="flex items-end justify-center text-blue-500 text-3xl md:text-5xl font-bold px-0.5 md:px-1 pb-1 md:pb-2">,</div>
                      ) : null}
                      <div className="mx-0.5 md:mx-1 w-8 md:w-12 h-12 md:h-16 bg-gradient-to-b from-[#4a72d4] to-[#2b51cc] rounded-lg shadow-lg flex items-center justify-center border border-blue-400">
                         <span className="text-2xl md:text-4xl font-bold text-white font-mono drop-shadow">{char}</span>
                      </div>
                    </React.Fragment>
                 ))}
                 <div className="flex items-end text-xl font-bold text-blue-800 ml-3 mb-2 tracking-wider">人次</div>
               </div>

               {/* Middle Illustration & Stats */}
               <div className="flex-1 relative flex items-center justify-center min-h-[360px] py-8">
                  {/* The central illustration placeholder using an Unsplash image since we can't generate 3D assets easily - keeping it tech-focused */}
                  <div className="w-56 h-72 md:w-64 md:h-80 z-10 flex items-center justify-center">
                     <img src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=600" alt="Center Tech Person" className="max-w-full max-h-full object-contain drop-shadow-2xl opacity-90 mix-blend-multiply" />
                  </div>

                  {/* Floating Tags (Left) */}
                  <div className="absolute left-[5%] md:left-[10%] top-[25%] bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full flex items-center gap-2 border border-blue-50 z-20 hover:-translate-y-1 transition-transform">
                     <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                     <span className="text-sm font-bold text-slate-700">男性用户居多</span>
                  </div>
                  <div className="absolute left-[2%] md:left-[5%] top-[45%] bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full flex items-center gap-2 border border-blue-50 z-20 hover:-translate-y-1 transition-transform">
                     <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                     <span className="text-sm font-bold text-slate-700">20-25 岁</span>
                  </div>
                  <div className="absolute left-[3%] md:left-[8%] top-[65%] bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full flex items-center gap-2 border border-blue-50 z-20 hover:-translate-y-1 transition-transform">
                     <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                     <span className="text-sm font-bold text-slate-700">实训高频人群</span>
                  </div>

                  {/* Floating Tags (Right) */}
                  <div className="absolute right-[5%] md:right-[10%] top-[20%] bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full flex items-center gap-2 border border-blue-50 z-20 hover:-translate-y-1 transition-transform">
                     <span className="text-sm font-bold text-slate-700">来自计算机学院</span>
                     <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                  </div>
                  <div className="absolute right-[2%] md:right-[5%] top-[40%] bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full flex items-center gap-2 border border-blue-50 z-20 hover:-translate-y-1 transition-transform">
                     <span className="text-sm font-bold text-slate-700">40% 活跃用户</span>
                     <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                  </div>
                  <div className="absolute right-[3%] md:right-[8%] top-[60%] bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full flex items-center gap-2 border border-blue-50 z-20 hover:-translate-y-1 transition-transform">
                     <span className="text-sm font-bold text-slate-700">日常编码实战</span>
                     <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                  </div>
                  <div className="absolute right-[8%] md:right-[12%] top-[80%] bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full flex items-center gap-2 border border-blue-50 z-20 hover:-translate-y-1 transition-transform">
                     <span className="text-sm font-bold text-slate-700">AI工具使用率高</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                  </div>
               </div>

               {/* Bottom Process Steps */}
               <div className="w-full pb-8 pt-4 px-4 flex justify-between items-center z-10 relative">
                  <div className="flex flex-col items-center group cursor-pointer w-1/4">
                     <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-[0_8px_16px_rgba(37,99,235,0.15)] border-2 border-blue-50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full opacity-50"></div>
                        <div className="w-full h-full rounded-full border-[4px] border-[#3b82f6] border-r-transparent border-t-transparent -rotate-45" style={{clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 80%)'}}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="font-black text-slate-800 text-lg md:text-xl relative z-10">25<span className="text-xs">%</span></span>
                        </div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-blue-100 absolute bottom-6 opacity-50 filter blur-md"></div>
                     <div className="mt-3 bg-[#3b82f6] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">课程学习</div>
                  </div>

                  <div className="flex items-center text-blue-200/70 font-black tracking-widest px-2 hidden sm:flex text-xl drop-shadow">›››</div>

                  <div className="flex flex-col items-center group cursor-pointer w-1/4">
                     <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-[0_8px_16px_rgba(16,185,129,0.15)] border-2 border-emerald-50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-transparent rounded-full opacity-50"></div>
                        <div className="w-full h-full rounded-full border-[4px] border-[#10b981] border-r-transparent -rotate-90"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="font-black text-slate-800 text-lg md:text-xl relative z-10">44<span className="text-xs">%</span></span>
                        </div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-emerald-100 absolute bottom-6 opacity-50 filter blur-md"></div>
                     <div className="mt-3 bg-[#10b981] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">任务实战</div>
                  </div>

                  <div className="flex items-center text-blue-200/70 font-black tracking-widest px-2 hidden sm:flex text-xl drop-shadow">›››</div>

                  <div className="flex flex-col items-center group cursor-pointer w-1/4">
                     <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-[0_8px_16px_rgba(59,130,246,0.15)] border-2 border-blue-50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full opacity-50"></div>
                        <div className="w-full h-full rounded-full border-[4px] border-[#60a5fa] border-r-transparent border-b-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="font-black text-slate-800 text-lg md:text-xl relative z-10">15<span className="text-xs">%</span></span>
                        </div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-blue-100 absolute bottom-6 opacity-50 filter blur-md"></div>
                     <div className="mt-3 bg-[#60a5fa] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">AI助手调用</div>
                  </div>

                   <div className="flex items-center text-blue-200/70 font-black tracking-widest px-2 hidden sm:flex text-xl drop-shadow">›››</div>

                  <div className="flex flex-col items-center group cursor-pointer w-1/4">
                     <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-[0_8px_16px_rgba(245,158,11,0.15)] border-2 border-amber-50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full opacity-50"></div>
                        <div className="w-full h-full rounded-full border-[4px] border-[#f59e0b] border-t-transparent border-l-transparent border-b-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="font-black text-slate-800 text-lg md:text-xl relative z-10">6<span className="text-xs">%</span></span>
                        </div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-amber-100 absolute bottom-6 opacity-50 filter blur-md"></div>
                     <div className="mt-3 bg-gradient-to-r from-orange-400 to-[#f59e0b] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md border border-orange-300">评测总结</div>
                  </div>
               </div>
           </div>

           {/* Right Column */}
           <div className="md:col-span-3 flex flex-col gap-5">
              {/* Box 3 */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-5 border border-white max-h-[340px] flex flex-col">
                 <h3 className="text-base font-bold text-slate-800 mb-4 tracking-wide">年龄与分布</h3>
                 <div className="flex justify-around mb-4">
                    <div className="flex flex-col items-center bg-blue-50/50 rounded-xl px-6 py-2 border border-blue-50">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center text-[#10b981]"><User size={16}/></div>
                          <span className="text-xl font-black text-slate-800">73%</span>
                       </div>
                       <span className="text-xs text-slate-500 mt-1">本科生占比</span>
                    </div>
                    <div className="flex flex-col items-center bg-blue-50/50 rounded-xl px-6 py-2 border border-blue-50">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]"><User size={16}/></div>
                          <span className="text-xl font-black text-slate-800">27%</span>
                       </div>
                       <span className="text-xs text-slate-500 mt-1">研究生占比</span>
                    </div>
                 </div>
                 <div className="h-[140px] w-full flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        {name: '18-20', uv: 10, pv: 5}, {name: '21-22', uv: 15, pv: 8}, {name: '23-24', uv: 25, pv: 15},
                        {name: '25-26', uv: 12, pv: 20}, {name: '27-28', uv: 18, pv: 14}, {name: '29-30', uv: 22, pv: 10},
                        {name: '30+', uv: 15, pv: 8}
                      ]} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 9, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 9, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                        <Bar dataKey="uv" stackId="a" fill="#10b981" barSize={8} radius={[0, 0, 2, 2]} />
                        <Bar dataKey="pv" stackId="a" fill="#3b82f6" barSize={8} radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#10b981] rounded-sm"></div><span className="text-[10px] text-slate-500">本科</span></div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#3b82f6] rounded-sm"></div><span className="text-[10px] text-slate-500">研究生</span></div>
                 </div>
              </div>

              {/* Box 4 */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm p-5 border border-white flex-1 min-h-[300px]">
                 <h3 className="text-base font-bold text-slate-800 mb-5 tracking-wide">AI能力偏好特征</h3>
                 <div className="flex justify-between h-full relative pl-2">
                    {/* Left text list */}
                    <div className="flex flex-col gap-3 justify-center z-10 w-3/5">
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></div><span className="text-xs text-slate-600">代码纠错</span><span className="text-xs font-bold text-[#10b981]">28%</span></div>
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></div><span className="text-xs text-slate-600">大纲生成</span><span className="text-xs font-bold text-[#f59e0b]">24%</span></div>
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full"></div><span className="text-xs text-slate-600">智能问答</span><span className="text-xs font-bold text-[#3b82f6]">18%</span></div>
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full"></div><span className="text-xs text-slate-600">代码补全</span><span className="text-xs font-bold text-[#8b5cf6]">15%</span></div>
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div><span className="text-xs text-slate-600">错误解析</span><span className="text-xs font-bold text-slate-500">10%</span></div>
                       <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div><span className="text-xs text-slate-600">性能优化</span><span className="text-xs font-bold text-cyan-600">5%</span></div>
                    </div>
                    {/* Right pie chart diagram style */}
                    <div className="w-2/5 flex items-center justify-center relative mt-4">
                       <div className="w-28 h-28 relative flex items-center justify-center">
                          {/* Inner circles */}
                          <div className="absolute inset-2 rounded-full border border-blue-100 flex items-center justify-center bg-white shadow-sm z-10">
                             <div className="text-xs text-center leading-tight">
                                <div className="font-bold text-blue-700">代码纠错</div>
                                <div className="text-[10px] text-slate-500">核心常用</div>
                             </div>
                          </div>
                          {/* Outer circular chart segments using SVG */}
                          <svg width="112" height="112" viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                             {/* 28% */}
                             <circle cx="50" cy="50" r="45" fill="transparent" stroke="#10b981" strokeWidth="6" strokeDasharray="282.7" strokeDashoffset="203.5" />
                             {/* 24% */}
                             <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f59e0b" strokeWidth="6" strokeDasharray="282.7" strokeDashoffset="214.8" transform="rotate(100.8 50 50)" />
                             {/* 18% */}
                             <circle cx="50" cy="50" r="45" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="282.7" strokeDashoffset="231.8" transform="rotate(187.2 50 50)" />
                             {/* 15% */}
                             <circle cx="50" cy="50" r="45" fill="transparent" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="282.7" strokeDashoffset="240.3" transform="rotate(252 50 50)" />
                          </svg>
                          <div className="absolute -top-1 -right-2 text-[10px] bg-white border border-[#10b981] text-[#10b981] px-1 rounded-sm z-20">高频</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  if (theme === 'tech') return renderTechTheme();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/platform-operations-dashboard')}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <School className="text-blue-600" size={20} />
                {decodedName}
                <span className="text-xs font-normal px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">院校资源画像</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setTheme('tech')}
              className="px-4 py-1.5 text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm"
            >
              科技风格体验 🚀
            </button>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button onClick={() => setActiveTab('overview')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>总览视角</button>
              <button onClick={() => setActiveTab('courses')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'courses' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>课程分析</button>
              <button onClick={() => setActiveTab('labs')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'labs' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>实训洞察</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Top Stats - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="累计实训时长 (分钟)" 
            value="142,500" 
            trend="+12.5%" 
            icon={Wrench} 
            colorClass="bg-blue-500"
            gradientClass="bg-gradient-to-br from-blue-500 to-indigo-600"
          />
          <StatCard 
            title="累计课程学习时长 (分钟)" 
            value="89,200" 
            trend="+8.2%" 
            icon={BookOpen} 
            colorClass="bg-emerald-500"
            gradientClass="bg-gradient-to-br from-emerald-400 to-teal-500"
          />
          <StatCard 
            title="AI 算力消耗量 (Tokens)" 
            value="1,208k" 
            trend="+24.8%" 
            icon={BrainCircuit} 
            colorClass="bg-purple-500"
            gradientClass="bg-gradient-to-br from-purple-500 to-violet-600"
          />
          <StatCard 
            title="活跃师生人数" 
            value="3,420" 
            trend="+5.1%" 
            icon={Users} 
            colorClass="bg-amber-500"
            gradientClass="bg-gradient-to-br from-amber-400 to-orange-500"
          />
        </div>

        {/* Real-time ticker banner */}
        <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center overflow-hidden border border-slate-200">
          <div className="flex-shrink-0 flex items-center gap-2 mr-4 text-slate-800 font-bold border-r border-slate-200 pr-4">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
             实时动态
          </div>
          <div className="flex-1 overflow-hidden relative h-6">
             <div 
                className="transition-transform duration-500 ease-in-out flex flex-col"
                style={{ transform: `translateY(-${tickerIndex * 24}px)` }}
             >
               {realtimeEvents.map((event, i) => (
                 <div key={i} className="h-6 flex items-center text-sm text-slate-600 truncate">
                   {event}
                 </div>
               ))}
             </div>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="text-blue-500" size={20} />
                  学习与实训时长趋势 (近半年)
                </h2>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLab" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorCourse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Area type="monotone" dataKey="实训时长" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLab)" />
                    <Area type="monotone" dataKey="课程学习" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCourse)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="text-purple-500" size={20} />
                  院系资源使用占比
                </h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center relative">
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentUsage}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {departmentUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value) => [`${value}%`, '占比']}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-xs text-slate-400">活跃分院</span>
                  <span className="text-2xl font-bold text-slate-700">4</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-3 mt-4">
                {departmentUsage.map((dept, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                    <span className="text-xs text-slate-600 truncate" title={dept.name}>{dept.name} ({dept.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI 学伴课程数据专栏 */}
        {(activeTab === 'overview' || activeTab === 'courses') && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex justify-between items-end mb-6 relative z-10">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
                  <BrainCircuit className="text-indigo-500" size={20} />
                  AI 学伴课程学习数据
                </h2>
                <p className="text-sm text-slate-500">追踪 AI 助教参与辅导的课程数据表现</p>
              </div>
              <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg shrink-0">
                <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1.5">
                  <Zap size={14} /> AI 赋能课程
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {aiTutorCourses.map((course, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all group">
                  <div className="text-xs font-bold text-indigo-500 mb-2">{String(idx + 1).padStart(2, '0')}</div>
                  <h3 className="font-semibold text-slate-800 text-sm mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1" title={course.name}>{course.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-xs flex items-center gap-1.5 text-slate-500"><Users size={12}/> 学习人数</span>
                      <span className="text-sm font-medium text-slate-700">{course.students}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-xs flex items-center gap-1.5 text-slate-500"><Zap className="text-amber-500" size={12}/> 辅导互动</span>
                      <span className="text-sm font-medium text-slate-700">{course.interactions.toLocaleString()} 次</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-xs flex items-center gap-1.5 text-slate-500"><Clock size={12}/> 学习时长</span>
                      <span className="text-sm font-medium text-slate-700">{course.hours.toLocaleString()} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 gap-8 ${activeTab === 'overview' ? 'lg:grid-cols-2' : ''}`}>
          {(activeTab === 'overview' || activeTab === 'courses') && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Award className="text-emerald-500" size={20} />
                  热门课程排行榜
                </h2>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">综合热度</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500">排名</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500">课程名称</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 text-right">学习人数</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 text-right">累计学时</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularCourses.map((course, idx) => (
                      <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx === 0 ? 'bg-amber-100 text-amber-600' :
                            idx === 1 ? 'bg-slate-100 text-slate-600' :
                            idx === 2 ? 'bg-orange-100 text-orange-600' :
                            'bg-slate-50 text-slate-500'
                          }`}>
                            {idx + 1}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700">{course.name}</td>
                        <td className="py-3 px-4 text-right text-slate-600">{course.students.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-medium text-slate-700">{course.duration.toLocaleString()}</td>
                        <td className="py-3 px-4">
                           <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[80px] ml-auto">
                              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(course.duration / popularCourses[0].duration) * 100}%` }}></div>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(activeTab === 'overview' || activeTab === 'labs') && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <ActivitySquare className="text-blue-500" size={20} />
                  高频实训排行榜
                </h2>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">调用频次</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500">排名</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500">实验环境</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 text-right">调用次数</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500 text-right">总运行时长</th>
                      <th className="py-3 px-4 text-xs font-semibold text-slate-500"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularLabs.map((lab, idx) => (
                      <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx === 0 ? 'bg-amber-100 text-amber-600' :
                            idx === 1 ? 'bg-slate-100 text-slate-600' :
                            idx === 2 ? 'bg-orange-100 text-orange-600' :
                            'bg-slate-50 text-slate-500'
                          }`}>
                            {idx + 1}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700 flex items-center gap-2">
                          <Monitor size={14} className="text-slate-400" />
                          {lab.name}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-600">{lab.usageCount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-medium text-blue-600">{lab.hours.toLocaleString()}</td>
                        <td className="py-3 px-4">
                           <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[80px] ml-auto">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(lab.usageCount / popularLabs[0].usageCount) * 100}%` }}></div>
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
