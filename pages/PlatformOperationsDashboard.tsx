import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  LabelList
} from "recharts";
import { 
  Clock, 
  ArrowLeft, 
  Users, 
  School, 
  BookOpen, 
  Wrench, 
  Cpu,
  TrendingUp,
  BarChart3,
  Flame,
  Award,
  ChevronDown,
  X,
  Calendar
} from "lucide-react";

// --- Mock Data ---
const overallData = {
  users: { total: 12580, trial: 3200, official: 9380 },
  schools: { total: 156, online: 128, private: 28 },
  courseSales: { total: 2850, online: 2120, private: 730 },
  toolUsage: { total: 45680 },
  agentInvocations: { total: 128500, software: 95200, hardware: 33300 },
  labDuration: { total: 68900, hours: 12580 }
};

const trendData = {
  courseLearning: [
    { month: '9月', online: 452, private: 681 },
    { month: '10月', online: 410, private: 720 },
    { month: '11月', online: 538, private: 610 },
    { month: '12月', online: 580, private: 765 },
  ],
  labDuration: [
    { month: '9月', online: 520, private: 740 },
    { month: '10月', online: 582, private: 695 },
    { month: '11月', online: 615, private: 810 },
    { month: '12月', online: 648, private: 785 },
  ],
  newSchools: [
    { month: '9月', count: 3 },
    { month: '10月', count: 5 },
    { month: '11月', count: 4 },
    { month: '12月', count: 7 },
  ]
};

const activityData = {
  activeSchools: [
    { name: '深圳职业技术学院', lab: 25, login: 32, course: 18 },
    { name: '广州番禺职业技术学院', lab: 21, login: 28, course: 15 },
    { name: '广东轻工职业技术学院', lab: 18, login: 22, course: 13 },
    { name: '顺德职业技术学院', lab: 15, login: 19, course: 11 },
    { name: '广东科学技术职业学院', lab: 12, login: 16, course: 9 },
  ],
  activeCourses: [
    { name: 'Python 程序设计', duration: 25, visits: 18 },
    { name: '人工智能基础', duration: 21, visits: 15 },
    { name: '物联网导论', duration: 18, visits: 12 },
    { name: '大数据分析', duration: 15, visits: 9 },
    { name: '工业互联网', duration: 11, visits: 7 },
  ],
  activeLabs: [
    { name: 'AI 模型训练实验室', count: 18, duration: 25 },
    { name: '物联网仿真实验室', count: 15, duration: 21 },
    { name: '大数据处理实验室', count: 12, duration: 18 },
    { name: '区块链开发实验室', count: 9, duration: 14 },
    { name: '工业互联网实验室', count: 7, duration: 11 },
  ]
};

const leaderboardData = {
  schools: [
    { rank: 1, name: '深圳职业技术学院', duration: '8,520 分钟', courseDuration: '12,500 分钟', token: '9,850' },
    { rank: 2, name: '广州番禺职业技术学院', duration: '7,845 分钟', courseDuration: '11,200 分钟', token: '8,920' },
    { rank: 3, name: '广东轻工职业技术学院', duration: '6,910 分钟', courseDuration: '9,800 分钟', token: '7,540' },
    { rank: 4, name: '顺德职业技术学院', duration: '5,840 分钟', courseDuration: '8,600 分钟', token: '6,210' },
    { rank: 5, name: '广东科学技术职业学院', duration: '4,520 分钟', courseDuration: '7,500 分钟', token: '5,180' },
  ],
  courses: [
    { rank: 1, name: 'Python 程序设计', duration: '9,120 分钟' },
    { rank: 2, name: '人工智能基础', duration: '8,450 分钟' },
    { rank: 3, name: '物联网导论', duration: '7,320 分钟' },
    { rank: 4, name: '大数据分析', duration: '6,150 分钟' },
    { rank: 5, name: '工业互联网', duration: '5,480 分钟' },
  ],
  labs: [
    { rank: 1, name: 'AI 模型训练实验室', duration: '9,850 分钟' },
    { rank: 2, name: '物联网仿真实验室', duration: '8,620 分钟' },
    { rank: 3, name: '大数据处理实验室', duration: '7,950 分钟' },
    { rank: 4, name: '区块链开发实验室', duration: '6,480 分钟' },
    { rank: 5, name: '工业互联网实验室', duration: '5,210 分钟' },
  ]
};

const realSchools = [
  '深圳职业技术大学', '金华职业技术大学', '陕西工业职业技术学院', '淄博职业学院', '无锡职业技术学院',
  '常州信息职业技术学院', '广东轻工职业技术大学', '重庆工业职业技术学院', '浙江金融职业学院', '苏州工业园区职业技术学院',
  '芜湖职业技术学院', '北京电子科技职业学院', '广州番禺职业技术学院', '长沙民政职业技术学院', '重庆电子工程职业学院',
  '广东机电职业技术学院', '扬州工业职业技术学院', '常州机电职业技术学院', '宁波职业技术学院', '襄阳职业技术学院',
  '济南职业学院', '武汉职业技术学院', '承德石油高等专科学校', '成都航空职业技术学院', '九江职业技术学院',
  '兰州石化职业技术大学', '柳州职业技术学院', '哈尔滨职业技术学院', '四川建筑职业技术学院', '江苏农林职业技术学院',
  '郑州铁路职业技术学院', '黄河水利职业技术学院', '日照职业技术学院', '威海职业学院', '杭州职业技术学院',
  '温州职业技术学院', '重庆机电职业技术大学', '陕西铁路工程职业技术学院', '四川工程职业技术学院', '贵州交通职业技术学院',
  '河北工业职业技术大学', '内蒙古机电职业技术学院', '辽宁省交通高等专科学校', '长春汽车职业技术大学', '上海城市管理职业技术学院',
  '南京工业职业技术大学', '福建船政交通职业学院', '江西应用技术职业学院', '山东商业职业技术学院', '河南工业职业技术学院'
];

const realCourses = [
  'Python 程序设计', '人工智能基础', '机器学习与数学基础', '深度学习及其应用', '计算机视觉与图像处理', '自然语言处理',
  '物联网导论', '传感器与检测技术', '单片机原理与应用', '嵌入式系统开发', '无线传感网技术', 'RFID与物联网应用',
  '大数据导论', 'Hadoop 大数据开发', 'Spark 大数据分析', '数据挖掘与分析', '数据可视化技术', 'Python 数据分析',
  '工业互联网导论', '工业控制网络', '工业数据采集', '边缘计算应用', '工业互联网平台开发', '工业软件原理与应用',
  'C语言程序设计', 'Java 核心技术', 'Web 前端开发', '数据库原理与应用', 'Linux 操作系统', '软件工程'
];

const realLabs = [
  'AI 面部识别实验', 'YOLO 目标检测实验', 'CNN 图像分类实验', 'RNN 情感分析实验', '智能语音识别实验', '自动驾驶仿真实验',
  'STM32 嵌入式开发实验', 'ZigBee 无线组网实验', 'LoRa 远距离通信实验', 'NB-IoT 物联网接入实验', '智能家居控制系统实验', '智慧农业环境监测实验',
  'Hadoop 集群搭建实验', 'Spark 数据流处理实验', '电商用户行为分析实验', '日志数据挖掘实验', '大屏数据可视化实验', '分布式存储调优实验',
  'PLC 综合控制实验', 'SCADA 系统组态实验', '工业控制协议解析实验', '柔性生产线仿真实验', '数字孪生工厂系统实验', '边缘计算网关配置实验',
  'Python 基础语法实验', 'Java 面向对象实验', 'MySQL 性能优化实验', 'Web 响应式布局实验', 'Linux 网络配置实验', 'Docker 容器部署实验'
];

// Generate mock data for "View All" modals
const generateMockData = (type: string, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const rank = i + 1;
    const schoolName = realSchools[i % realSchools.length];
    const courseName = realCourses[i % realCourses.length];
    const labName = realLabs[i % realLabs.length];
    
    if (type === 'activeSchools') {
      return { rank, name: schoolName, lab: Math.floor(Math.random() * 12) + 2, login: Math.floor(Math.random() * 15) + 3, course: Math.floor(Math.random() * 8) + 2 };
    }
    if (type === 'activeCourses') {
      return { rank, name: courseName, duration: Math.floor(Math.random() * 15) + 2, visits: Math.floor(Math.random() * 8) + 1 };
    }
    if (type === 'activeLabs') {
      return { rank, name: labName, count: Math.floor(Math.random() * 8) + 1, duration: Math.floor(Math.random() * 15) + 2 };
    }
    if (type === 'leaderboardSchools') {
      return { rank, name: schoolName, duration: `${(Math.floor(Math.random() * 3000) + 1500).toLocaleString()} 分钟`, courseDuration: `${(Math.floor(Math.random() * 5000) + 2000).toLocaleString()} 分钟`, token: (Math.floor(Math.random() * 4000) + 1000).toLocaleString() };
    }
    if (type === 'leaderboardCourses') {
      return { rank, name: courseName, duration: `${(Math.floor(Math.random() * 3500) + 1000).toLocaleString()} 分钟` };
    }
    if (type === 'leaderboardLabs') {
      return { rank, name: labName, duration: `${(Math.floor(Math.random() * 3500) + 1000).toLocaleString()} 分钟` };
    }
    if (type === 'trendCourseDetails') {
      return { rank, name: schoolName, duration: `${(Math.floor(Math.random() * 8000) + 1000).toLocaleString()} 分钟` };
    }
    if (type === 'trendLabDetails') {
      return { rank, name: schoolName, duration: `${(Math.floor(Math.random() * 7000) + 500).toLocaleString()} 分钟` };
    }
    if (type === 'trendNewSchoolsDetails') {
      return { rank, name: schoolName, accountCount: Math.floor(Math.random() * 50) + 5, duration: `${(Math.floor(Math.random() * 2000) + 100).toLocaleString()} 分钟` };
    }
    return { rank, name: `Item ${rank}` };
  });
};

const fullData = {
  activeSchools: [...activityData.activeSchools.map((item, i) => ({ rank: i + 1, ...item })), ...generateMockData('activeSchools', 115)],
  activeCourses: [...activityData.activeCourses.map((item, i) => ({ rank: i + 1, ...item })), ...generateMockData('activeCourses', 145)],
  activeLabs: [...activityData.activeLabs.map((item, i) => ({ rank: i + 1, ...item })), ...generateMockData('activeLabs', 105)],
  leaderboardSchools: [...leaderboardData.schools, ...generateMockData('leaderboardSchools', 125)],
  leaderboardCourses: [...leaderboardData.courses, ...generateMockData('leaderboardCourses', 135)],
  leaderboardLabs: [...leaderboardData.labs, ...generateMockData('leaderboardLabs', 120)],
  trendCourseDetails: generateMockData('trendCourseDetails', 150),
  trendLabDetails: generateMockData('trendLabDetails', 150),
  trendNewSchoolsDetails: generateMockData('trendNewSchoolsDetails', 67),
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100 min-w-[150px]">
        <p className="font-medium text-slate-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm mt-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-medium text-slate-900">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const SectionTitle = ({ icon: Icon, title, color, children }: { icon: any, title: string, color: string, children?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-4 mt-8 first:mt-0">
    <div className="flex items-center gap-2">
      <Icon className={`w-5 h-5 ${color}`} />
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
    {children && (
      <div className="flex items-center gap-3">
        {children}
      </div>
    )}
  </div>
);

const SectionFilter = ({ filter, onFilterChange }: { filter: string, onFilterChange: (f: string) => void }) => {
  return (
    <div className="flex items-center gap-3 font-normal">
      <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm text-xs p-1">
        {['按日', '按周', '按月', '按年'].map(f => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1.5 rounded-md transition-colors ${filter === f ? 'bg-slate-100 text-slate-800 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm px-2 py-1 text-xs text-slate-600 gap-2 transition-colors">
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        <input type="date" className="bg-transparent border-none outline-none cursor-pointer text-slate-600 w-[100px]" defaultValue="2024-01-01" />
        <span className="text-slate-300">-</span>
        <input type="date" className="bg-transparent border-none outline-none cursor-pointer text-slate-600 w-[100px]" defaultValue="2024-12-31" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtext, icon: Icon, iconColor }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-medium text-slate-600">{title}</h3>
      <div className={`p-2 rounded-lg bg-slate-50`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
    <div>
      <div className="text-3xl font-bold text-slate-900 mb-2 font-din">{value.toLocaleString()}</div>
      <div className="text-xs text-slate-500">{subtext}</div>
    </div>
  </div>
);

const ChartCard = ({ title, onViewAll, viewAllText = "查看全部", children }: any) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col h-[320px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <div className="flex items-center gap-3">
          {onViewAll && (
            <button 
              onClick={onViewAll}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {viewAllText}
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 w-full h-full min-h-0">
        {children}
      </div>
    </div>
  );
};

const LeaderboardCard = ({ title, icon: Icon, iconColor, columns, data, onViewAll }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
      </div>
      {onViewAll && (
        <button 
          onClick={onViewAll}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          查看全部
        </button>
      )}
    </div>
    <div className="flex-1">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 border-b border-slate-100">
          <tr>
            {columns.map((col: string, idx: number) => (
              <th key={idx} className={`pb-3 font-medium ${idx > 1 ? 'text-right' : ''}`}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, idx: number) => (
            <tr key={idx} className="border-b border-slate-50 last:border-0">
              <td className="py-3 w-12">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                  row.rank === 2 ? 'bg-slate-100 text-slate-600' :
                  row.rank === 3 ? 'bg-orange-100 text-orange-600' :
                  'bg-slate-50 text-slate-500'
                }`}>
                  {row.rank}
                </div>
              </td>
              <td className="py-3 font-medium text-slate-700 whitespace-nowrap">{row.name}</td>
              {row.duration && <td className="py-3 text-right text-slate-600 whitespace-nowrap">{row.duration}</td>}
              {row.courseDuration && <td className="py-3 text-right text-slate-600 whitespace-nowrap">{row.courseDuration}</td>}
              {row.token && <td className="py-3 text-right text-slate-600 whitespace-nowrap">{row.token}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PlatformOperationsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isChartAnimationActive, setIsChartAnimationActive] = useState(true);
  
  // Filters state
  const [activityFilter, setActivityFilter] = useState('按日');
  const [trendFilter, setTrendFilter] = useState('按月');
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState('schools');

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    columns: string[];
    data: any[];
    type: string;
  }>({
    isOpen: false,
    title: '',
    columns: [],
    data: [],
    type: ''
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsChartAnimationActive(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleViewAll = (title: string, columns: string[], data: any[], type: string) => {
    setModalConfig({
      isOpen: true,
      title,
      columns,
      data,
      type
    });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const getScaledData = (data: any[], filter: string) => {
    const multiplier = filter === '按日' ? 1 : filter === '按周' ? 7 : filter === '按月' ? 30 : 365;
    
    const scaled = data.map(item => {
      const newItem = { ...item };
      // Generate a stable pseudo-random factor based on name and filter
      const seedStr = item.name + filter;
      let hash = 0;
      for (let i = 0; i < seedStr.length; i++) {
        hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
        hash |= 0;
      }
      const randomFactor = 0.7 + (Math.abs(hash % 60) / 100); // 0.7 to 1.29
      
      for (const key in newItem) {
        if (typeof newItem[key] === 'number' && key !== 'rank') {
          newItem[key] = Math.floor(newItem[key] * multiplier * randomFactor);
        }
      }
      return newItem;
    });

    // Sort by the first numeric key to maintain largest to smallest order
    scaled.sort((a, b) => {
      const key = Object.keys(a).find(k => typeof a[k] === 'number' && k !== 'rank');
      if (key) {
        return (b[key as keyof typeof b] as number) - (a[key as keyof typeof a] as number);
      }
      return 0;
    });

    // Update ranks after sorting
    return scaled.map((item, index) => ({ ...item, rank: index + 1 }));
  };

  const getScaledTrendData = (data: any[], filter: string, isCount = false) => {
    const multiplier = filter === '按日' ? 0.03 : filter === '按周' ? 0.23 : filter === '按月' ? 1 : 12;
    const labelsMap: Record<string, string[]> = {
      '按日': ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
      '按周': ['第1周', '第2周', '第3周', '第4周', '第5周'],
      '按月': ['9月', '10月', '11月', '12月'],
      '按年': ['2021年', '2022年', '2023年', '2024年'],
    };
    
    const targetLength = isCount ? 7 : labelsMap[filter].length; 
    const labels = labelsMap[filter] || labelsMap['按月'];

    return Array.from({ length: labels.length }, (_, i) => {
      // try to get base seed from original if it exists
      const baseItem = data[i % data.length] || data[0]; 
      const newItem: any = { month: labels[i] }; // Using 'month' as the generic key name for the XAxis 
      
      const seedStr = (baseItem.month || i.toString()) + filter;
      let hash = 0;
      for (let j = 0; j < seedStr.length; j++) {
          hash = ((hash << 5) - hash) + seedStr.charCodeAt(j);
          hash |= 0;
      }
      const randomFactor = 0.5 + (Math.abs(hash % 100) / 100); 

      for (const key in baseItem) {
        if (typeof baseItem[key] === 'number') {
          newItem[key] = Math.floor(baseItem[key] * multiplier * randomFactor);
        }
      }
      return newItem;
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-y-auto pb-10">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/operations-dashboard')}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-widest text-slate-900">
              UUSIMA 运营决策大屏
            </h1>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 border-slate-200 p-1 rounded-2xl border ml-8">
            <button
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all bg-white text-blue-600 shadow-sm"
            >
              平台运营
            </button>
            <button
              onClick={() => navigate('/big-screen-dashboard', { state: { activeTab: 'operations' } })}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-slate-500 hover:text-slate-700"
            >
              平台运维
            </button>
            <button
              onClick={() => navigate('/big-screen-dashboard', { state: { activeTab: 'business' } })}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-slate-500 hover:text-slate-700"
            >
              运营情况
            </button>
          </div>
        </div>
        <div className="text-sm text-slate-500 flex items-center gap-2">
          最后更新: <span className="font-din font-medium text-slate-700">{currentTime.toLocaleTimeString('zh-CN', { hour12: false })}</span>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 pt-6 space-y-8">
        
        {/* Section 1: 数据总览 */}
        <section>
          <SectionTitle icon={BarChart3} title="数据总览" color="text-blue-600" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard 
              title="平台用户数" 
              value={overallData.users.total} 
              subtext={`体验账号: ${overallData.users.trial.toLocaleString()} | 正式账号: ${overallData.users.official.toLocaleString()}`}
              icon={Users}
              iconColor="text-blue-500"
            />
            <StatCard 
              title="学校总数" 
              value={overallData.schools.total} 
              subtext={`线上: ${overallData.schools.online} | 私有化: ${overallData.schools.private}`}
              icon={School}
              iconColor="text-emerald-500"
            />
            <StatCard 
              title="课程销量" 
              value={overallData.courseSales.total} 
              subtext={`线上: ${overallData.courseSales.online.toLocaleString()} | 私有化: ${overallData.courseSales.private.toLocaleString()}`}
              icon={BookOpen}
              iconColor="text-violet-500"
            />
            <StatCard 
              title="教学工具使用量" 
              value={overallData.toolUsage.total} 
              subtext="AI 教学工具总使用次数"
              icon={Wrench}
              iconColor="text-orange-500"
            />
            <StatCard 
              title="AI 技能助手调用次数" 
              value={overallData.agentInvocations.total} 
              subtext={`软件: ${overallData.agentInvocations.software.toLocaleString()} | 硬件: ${overallData.agentInvocations.hardware.toLocaleString()}`}
              icon={Cpu}
              iconColor="text-pink-500"
            />
            <StatCard 
              title="实验使用时长" 
              value={overallData.labDuration.total} 
              subtext={`总时长: ${overallData.labDuration.hours.toLocaleString()} 小时`}
              icon={Clock}
              iconColor="text-cyan-500"
            />
          </div>
        </section>

        {/* Section 2: 趋势分析 & 业务总榜 */}
        <div className="flex flex-col xl:flex-row justify-between gap-6">
          <div className="w-full xl:w-[68%] flex flex-col">
            <SectionTitle icon={TrendingUp} title="趋势分析" color="text-emerald-600">
              <SectionFilter filter={trendFilter} onFilterChange={setTrendFilter} />
            </SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1">
              <ChartCard 
                title="课程学习时长"
                viewAllText="查看详情"
                onViewAll={() => handleViewAll('课程学习时长排行', ['排名', '学校名称', '累计学习时长'], fullData.trendCourseDetails, 'trendCourseDetails')}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getScaledTrendData(trendData.courseLearning, trendFilter)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrivateCourse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOnlineCourse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                    <RechartsTooltip isAnimationActive={false} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    <Area type="monotone" dataKey="private" name="私有化课程" stroke="#34D399" fillOpacity={1} fill="url(#colorPrivateCourse)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="private" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                    </Area>
                    <Area type="monotone" dataKey="online" name="线上课程" stroke="#60A5FA" fillOpacity={1} fill="url(#colorOnlineCourse)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="online" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                    </Area>
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
              
              <ChartCard 
                title="实验使用时长"
                viewAllText="查看详情"
                onViewAll={() => handleViewAll('实验环境使用时长排行', ['排名', '学校名称', '累计使用时长'], fullData.trendLabDetails, 'trendLabDetails')}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getScaledTrendData(trendData.labDuration, trendFilter)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrivateLab" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#A78BFA" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOnlineLab" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                    <RechartsTooltip isAnimationActive={false} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    <Area type="monotone" dataKey="private" name="私有化实验" stroke="#A78BFA" fillOpacity={1} fill="url(#colorPrivateLab)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="private" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                    </Area>
                    <Area type="monotone" dataKey="online" name="线上实验" stroke="#FBBF24" fillOpacity={1} fill="url(#colorOnlineLab)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="online" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                    </Area>
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard 
                title="新开通学校数"
                viewAllText="查看详情"
                onViewAll={() => handleViewAll('新开通学校详情', ['序号', '学校名称', '账号数', '累计时长'], fullData.trendNewSchoolsDetails, 'trendNewSchoolsDetails')}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getScaledTrendData(trendData.newSchools, trendFilter, true)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                    <RechartsTooltip isAnimationActive={false} cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="count" fill="#06B6D4" radius={[4, 4, 0, 0]} maxBarSize={40} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="count" position="top" style={{ fontSize: '10px', fill: '#64748B' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
          
          <div className="w-full xl:w-[30%] flex flex-col">
            <SectionTitle icon={Award} title="业务总榜" color="text-amber-500" />
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col flex-1 h-[320px]">
              <div className="flex bg-slate-50 p-1 rounded-lg mb-4 text-xs font-medium border border-slate-100">
                <button
                  className={`flex-1 py-1.5 rounded-md transition-all ${activeLeaderboardTab === 'schools' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                  onClick={() => setActiveLeaderboardTab('schools')}
                >
                  院校
                </button>
                <button
                  className={`flex-1 py-1.5 rounded-md transition-all ${activeLeaderboardTab === 'courses' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                  onClick={() => setActiveLeaderboardTab('courses')}
                >
                  课程
                </button>
                <button
                  className={`flex-1 py-1.5 rounded-md transition-all ${activeLeaderboardTab === 'labs' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
                  onClick={() => setActiveLeaderboardTab('labs')}
                >
                  实验
                </button>
              </div>

              {activeLeaderboardTab === 'schools' && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="font-bold text-slate-800 text-xs">院校资源用量榜</span>
                    <button onClick={() => handleViewAll('院校资源用量榜', ['排名', '学校名称', '累计实训时长', '累计课程时长', 'AI 算力消耗'], fullData.leaderboardSchools, 'leaderboardSchools')} className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline">查看全部</button>
                  </div>
                  <div className="overflow-y-auto pr-1 text-xs">
                    <table className="w-full text-left">
                      <tbody>
                        {leaderboardData.schools.map((row: any, idx: number) => (
                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                            <td className="py-2 w-8">
                              <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center font-bold text-[10px] ${
                                row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                                row.rank === 2 ? 'bg-slate-100 text-slate-600' :
                                row.rank === 3 ? 'bg-orange-100 text-orange-600' :
                                'bg-slate-50 text-slate-500'
                              }`}>
                                {row.rank}
                              </div>
                            </td>
                            <td className="py-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-medium text-slate-700 truncate min-w-0" title={row.name}>{row.name}</span>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 shrink-0">
                                  <div className="flex items-center"><span className="text-slate-400 mr-1">实训</span><span className="font-din text-purple-600 font-medium">{row.duration.replace(' 分钟', 'm').replace(/,/g, '')}</span></div>
                                  <div className="flex items-center"><span className="text-slate-400 mr-1">课程</span><span className="font-din text-emerald-600 font-medium">{row.courseDuration.replace(' 分钟', 'm').replace(/,/g, '')}</span></div>
                                  <div className="flex items-center"><span className="text-slate-400 mr-1">算力</span><span className="font-din text-blue-600 font-medium">{row.token.replace(/,/g, '')}</span></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeLeaderboardTab === 'courses' && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="font-bold text-slate-800 text-xs">热门课程榜</span>
                    <button onClick={() => handleViewAll('热门课程学时榜单', ['排名', '课程名称', '累计学时'], fullData.leaderboardCourses, 'leaderboardCourses')} className="text-[11px] text-emerald-600 hover:text-emerald-800 hover:underline">查看全部</button>
                  </div>
                  <div className="overflow-y-auto pr-1 text-xs">
                    <table className="w-full text-left">
                      <tbody>
                        {leaderboardData.courses.map((row: any, idx: number) => (
                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                            <td className="py-2 w-8">
                              <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center font-bold text-[10px] ${
                                row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                                row.rank === 2 ? 'bg-slate-100 text-slate-600' :
                                row.rank === 3 ? 'bg-orange-100 text-orange-600' :
                                'bg-slate-50 text-slate-500'
                              }`}>
                                {row.rank}
                              </div>
                            </td>
                            <td className="py-2 font-medium text-slate-700 truncate max-w-[100px]">{row.name}</td>
                            <td className="py-2 text-right text-slate-500 font-din">{row.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeLeaderboardTab === 'labs' && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="font-bold text-slate-800 text-xs">实验环境使用榜单</span>
                    <button onClick={() => handleViewAll('实训环境调用排行', ['排名', '实验环境名称', '环境运行总时长'], fullData.leaderboardLabs, 'leaderboardLabs')} className="text-[11px] text-purple-600 hover:text-purple-800 hover:underline">查看全部</button>
                  </div>
                  <div className="overflow-y-auto pr-1 text-xs">
                    <table className="w-full text-left">
                      <tbody>
                        {leaderboardData.labs.map((row: any, idx: number) => (
                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                            <td className="py-2 w-8">
                              <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center font-bold text-[10px] ${
                                row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                                row.rank === 2 ? 'bg-slate-100 text-slate-600' :
                                row.rank === 3 ? 'bg-orange-100 text-orange-600' :
                                'bg-slate-50 text-slate-500'
                              }`}>
                                {row.rank}
                              </div>
                            </td>
                            <td className="py-2 font-medium text-slate-700 truncate max-w-[100px]">{row.name}</td>
                            <td className="py-2 text-right text-slate-500 font-din">{row.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: 教学与实训活动情况 */}
        <section>
          <SectionTitle icon={Flame} title="教学与实训活动情况" color="text-red-500">
            <SectionFilter filter={activityFilter} onFilterChange={setActivityFilter} />
          </SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard 
              title="活跃院校榜单"
              onViewAll={() => handleViewAll('活跃院校榜单', ['排名', '学校名称', '实验环境调用量', '平台登录人次', '课程参与频次'], getScaledData(fullData.activeSchools, activityFilter), 'activeSchools')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getScaledData(activityData.activeSchools, activityFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} width={100} />
                  <RechartsTooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: '#F1F5F9' }} 
                    isAnimationActive={false}
                  />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="lab" name="实验环境调用量" fill="#F59E0B" barSize={8} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="lab" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                  <Bar dataKey="login" name="平台登录人次" fill="#3B82F6" barSize={8} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="login" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                  <Bar dataKey="course" name="课程参与频次" fill="#10B981" barSize={8} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="course" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard 
              title="课程热度榜单"
              onViewAll={() => handleViewAll('课程热度榜单', ['排名', '课程名称', '累计学习时长', '累计访问人次'], getScaledData(fullData.activeCourses, activityFilter), 'activeCourses')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getScaledData(activityData.activeCourses, activityFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} width={80} />
                  <RechartsTooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: '#F1F5F9' }} 
                    isAnimationActive={false}
                  />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="duration" name="累计学习时长" fill="#EC4899" barSize={12} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="duration" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                  <Bar dataKey="visits" name="累计访问人次" fill="#8B5CF6" barSize={12} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="visits" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard 
              title="实验环境使用榜单"
              onViewAll={() => handleViewAll('实验环境使用榜单', ['排名', '实验环境名称', '累计运行时长'], getScaledData(fullData.activeLabs, activityFilter), 'activeLabs')}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getScaledData(activityData.activeLabs, activityFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} width={100} />
                  <RechartsTooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: '#F1F5F9' }} 
                    isAnimationActive={false}
                  />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="duration" name="累计运行时长" fill="#F97316" barSize={12} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                    <LabelList dataKey="duration" position="right" style={{ fontSize: '10px', fill: '#64748B' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </section>



      </main>

      {/* Data Modal */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">{modalConfig.title}</h2>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 border-b border-slate-200 sticky top-0 bg-white z-10">
                  <tr>
                    {modalConfig.columns.map((col: string, idx: number) => (
                      <th key={idx} className={`pb-3 pt-2 font-medium ${idx > 1 ? 'text-right' : ''}`}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modalConfig.data.map((row: any, idx: number) => (
                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 w-16">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                          row.rank === 2 ? 'bg-slate-100 text-slate-600' :
                          row.rank === 3 ? 'bg-orange-100 text-orange-600' :
                          'bg-slate-50 text-slate-500'
                        }`}>
                          {row.rank}
                        </div>
                      </td>
                      <td className="py-3 font-medium text-slate-700">
                        {modalConfig.type === 'leaderboardSchools' ? (
                          <Link 
                            to={`/school-dashboard/${encodeURIComponent(row.name)}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                          >
                            {row.name}
                          </Link>
                        ) : (
                          row.name
                        )}
                      </td>
                      
                      {/* Dynamic columns based on type */}
                      {modalConfig.type === 'activeSchools' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.lab?.toLocaleString()}</td>
                          <td className="py-3 text-right text-slate-600">{row.login?.toLocaleString()}</td>
                          <td className="py-3 text-right text-slate-600">{row.course?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'activeCourses' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.duration?.toLocaleString()}</td>
                          <td className="py-3 text-right text-slate-600">{row.visits?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'activeLabs' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.duration?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'leaderboardSchools' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.duration}</td>
                          <td className="py-3 text-right text-slate-600">{row.courseDuration}</td>
                          <td className="py-3 text-right text-slate-600">{row.token}</td>
                        </>
                      )}
                      {modalConfig.type === 'leaderboardCourses' && (
                        <td className="py-3 text-right text-slate-600">{row.duration}</td>
                      )}
                      {modalConfig.type === 'leaderboardLabs' && (
                        <td className="py-3 text-right text-slate-600">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendCourseDetails' && (
                        <td className="py-3 text-right text-slate-600">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendLabDetails' && (
                        <td className="py-3 text-right text-slate-600">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendNewSchoolsDetails' && (
                        <>
                          <td className="py-3 text-right text-slate-600">{row.accountCount}</td>
                          <td className="py-3 text-right text-slate-600">{row.duration}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-right">
              共 {modalConfig.data.length} 条记录
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformOperationsDashboard;
