import React, { useState, useEffect, useRef } from "react";
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
  Calendar,
  Search,
  Rocket
} from "lucide-react";

// --- Mock Data ---
const overallData = {
  users: { total: 12580, detail: '体验账号: 3,200 | 正式账号: 9,380' },
  schools: { total: 156, detail: '线上: 128 | 私有化: 28' },
  courses: { total: 2850, detail: '线上: 2,120 | 私有化: 730' },
  toolUsage: { total: 45680, detail: 'AI 教学工具总使用次数' },
  agentInvocations: { total: 128500, detail: '软件: 95,200 | 硬件: 33,300' },
  labDuration: { total: 68900, detail: '容器型: 48,900 | 平台型: 20,000' }
};

const dynamicsData = [
  { id: 1, title: '平台累计用户突破 12,000', desc: '感谢各院校的支持与信任，平台用户规模再创新高！', time: '10-01 14:30', icon: Users, color: 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]', bg: 'bg-blue-900/30' },
  { id: 2, title: 'AI 技能助手使用量增长 120%', desc: '本月 AI 技能助手使用次数较上月增长 120%。', time: '10-01 11:20', icon: Cpu, color: 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]', bg: 'bg-blue-900/30' },
  { id: 3, title: '新增优质课程 320 门', desc: '本月新增优质课程 320 门，持续丰富平台教学资源！', time: '10-01 10:15', icon: BookOpen, color: 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]', bg: 'bg-blue-900/30' },
  { id: 4, title: '实训时长突破 6 万小时', desc: '实训时长累计突破 6 万小时，实践教学成效显著！', time: '09-30 16:45', icon: Clock, color: 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]', bg: 'bg-blue-900/30' },
];

const todayData = [
  { title: '今日新增用户', value: 568, trend: '↑ 12.5%', icon: Users },
  { title: '今日学习时长 (小时)', value: 8652, trend: '↑ 15.2%', icon: Clock },
  { title: '今日实训时长 (小时)', value: 2368, trend: '↑ 11.3%', icon: Cpu },
  { title: '今日课程学习人次', value: 3865, trend: '↑ 9.8%', icon: BookOpen },
  { title: '今日技术助手调用', value: 4125, trend: '↑ 14.6%', icon: Rocket },
  { title: '今日实验完成数', value: 1258, trend: '↑ 10.7%', icon: Award },
];

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
      <div className="bg-[#111827] ring-1 ring-cyan-500/20 p-3 rounded-lg shadow-lg border border-cyan-500/20 min-w-[150px]">
        <p className="font-medium text-cyan-400 font-bold tracking-wider mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm mt-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-cyan-300">{entry.name}:</span>
            <span className="font-medium text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const SectionTitle = ({ icon: Icon, title, color, children }: { icon: any, title: string, color: string, children?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-4 mt-8 first:mt-0 min-h-[36px]">
    <div className="flex items-center gap-2">
      <Icon className={`w-5 h-5 ${color}`} />
      <h2 className="text-lg font-bold text-cyan-400 font-bold tracking-wider">{title}</h2>
    </div>
    {children && (
      <div className="flex items-center gap-3">
        {children}
      </div>
    )}
  </div>
);

const SectionFilter = ({ filter, onFilterChange, showShortcuts = true }: { filter: string, onFilterChange: (f: string) => void, showShortcuts?: boolean }) => {
  return (
    <div className="flex items-center gap-3 font-normal">
      {showShortcuts && (
        <div className="flex items-center bg-[#111827] ring-1 ring-cyan-500/20 border border-cyan-500/30 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] text-xs p-1">
          {['按日', '按周', '按月', '按年'].map(f => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1.5 rounded-md transition-colors ${filter === f ? 'bg-cyan-900/40 text-cyan-400 font-bold tracking-wider font-medium' : 'text-cyan-500 hover:text-cyan-100'}`}
            >
              {f}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center bg-[#111827] ring-1 ring-cyan-500/20 border border-cyan-500/30 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] px-2 py-1 text-xs text-cyan-300 gap-2 transition-colors">
        <Calendar className="w-3.5 h-3.5 text-cyan-600" />
        <input type="date" className="bg-transparent border-none outline-none cursor-pointer text-cyan-300 w-[100px]" defaultValue="2024-01-01" />
        <span className="text-cyan-700">-</span>
        <input type="date" className="bg-transparent border-none outline-none cursor-pointer text-cyan-300 w-[100px]" defaultValue="2024-12-31" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, detail, icon: Icon, iconColor, iconBg }: any) => {
  return (
    <div className="bg-[#111827] ring-1 ring-cyan-500/20 rounded-xl p-5 shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-cyan-500/20 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[13px] font-bold text-cyan-100">{title}</h3>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] mb-2 font-din tracking-tight truncate">{typeof value === 'number' ? value.toLocaleString() : value}</div>
        {detail && <div className="text-[10px] text-cyan-500 truncate">{detail}</div>}
      </div>
    </div>
  );
};

const ChartCard = ({ title, onViewAll, viewAllText = "查看全部", children }: any) => {
  return (
    <div className="bg-[#111827] ring-1 ring-cyan-500/20 rounded-xl p-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-cyan-500/20 flex flex-col h-[320px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-cyan-400 font-bold tracking-wider">{title}</h3>
        <div className="flex items-center gap-3">
          {onViewAll && (
            <button 
              onClick={onViewAll}
              className="text-xs text-cyan-400 hover:text-cyan-200 hover:underline transition-colors"
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
  <div className="bg-[#111827] ring-1 ring-cyan-500/20 rounded-xl p-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-cyan-500/20 flex flex-col">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h3 className="text-base font-bold text-cyan-400 font-bold tracking-wider">{title}</h3>
      </div>
      {onViewAll && (
        <button 
          onClick={onViewAll}
          className="text-xs text-cyan-400 hover:text-cyan-200 hover:underline transition-colors"
        >
          查看全部
        </button>
      )}
    </div>
    <div className="flex-1">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-cyan-500 border-b border-cyan-500/20">
          <tr>
            {columns.map((col: string, idx: number) => (
              <th key={idx} className={`pb-3 font-medium ${idx > 1 ? 'text-right' : ''}`}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, idx: number) => (
            <tr key={idx} className="border-b border-cyan-500/10 last:border-0">
              <td className="py-3 w-12">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                  row.rank === 2 ? 'bg-cyan-900/40 text-cyan-300' :
                  row.rank === 3 ? 'bg-orange-800/30 text-orange-400' :
                  'bg-[#0B0F19]/80 text-cyan-500'
                }`}>
                  {row.rank}
                </div>
              </td>
              <td className="py-3 font-medium text-cyan-100 whitespace-nowrap">{row.name}</td>
              {row.duration && <td className="py-3 text-right text-cyan-300 whitespace-nowrap">{row.duration}</td>}
              {row.courseDuration && <td className="py-3 text-right text-cyan-300 whitespace-nowrap">{row.courseDuration}</td>}
              {row.token && <td className="py-3 text-right text-cyan-300 whitespace-nowrap">{row.token}</td>}
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
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [searchVisibleCount, setSearchVisibleCount] = useState(20);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchVisibleCount(20);
  }, [searchQuery]);

  const sortedFilteredSchools = [...realSchools]
    .filter(school => school.includes(searchQuery))
    .sort((a, b) => a.localeCompare(b, 'zh-CN'));
  
  const displayedSchools = sortedFilteredSchools.slice(0, searchVisibleCount);

  const handleSearchScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 20;
    if (bottom && searchVisibleCount < sortedFilteredSchools.length) {
      setSearchVisibleCount(prev => prev + 20);
    }
  };
  
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
    <div className="min-h-screen bg-[#0B0F19] font-sans overflow-y-auto pb-10">
      {/* Header */}
      <header className="bg-[#111827] ring-1 ring-cyan-500/20 border-b border-cyan-500/30 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/operations-dashboard')}
            className="p-2 rounded-full hover:bg-cyan-900/40 transition-colors text-cyan-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-widest text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              UUSIMA 运营决策大屏
            </h1>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-cyan-900/40 border-cyan-500/30 p-1 rounded-2xl border ml-8">
            <button
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all bg-[#111827] ring-1 ring-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              运营总览
            </button>
            <button
              onClick={() => navigate('/platform-application-dashboard')}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-cyan-500 hover:text-cyan-100"
            >
              应用开通
            </button>
            <button
              onClick={() => navigate('/big-screen-dashboard', { state: { activeTab: 'operations' } })}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-cyan-500 hover:text-cyan-100"
            >
              运维健康
            </button>
            <button
              onClick={() => navigate('/big-screen-dashboard', { state: { activeTab: 'business' } })}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-cyan-500 hover:text-cyan-100 hidden"
            >
              运营情况
            </button>
          </div>
        </div>
        <div className="text-sm text-cyan-500 flex items-center gap-2">
          最后更新: <span className="font-din font-medium text-cyan-100">{currentTime.toLocaleTimeString('zh-CN', { hour12: false })}</span>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 pt-6 space-y-8">
        
        {/* Section 1: 数据总览 */}
        <section>
          <SectionTitle icon={BarChart3} title="数据总览" color="text-cyan-400">
            <div className="relative z-50 w-64" ref={searchContainerRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => setIsSearchDropdownOpen(true)}
                placeholder="搜索学校使用信息..."
                className="w-full pl-9 pr-9 py-2 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 bg-[#111827] ring-1 ring-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-normal placeholder:text-cyan-600 hover:border-slate-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (searchQuery.trim()) {
                      navigate(`/school-dashboard/${encodeURIComponent(searchQuery.trim())}`);
                      setIsSearchDropdownOpen(false);
                    }
                  }
                }}
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-cyan-600 group-focus-within:text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] transition-colors pointer-events-none" />
              <ChevronDown 
                className="absolute right-3 top-2.5 w-4 h-4 text-cyan-600 cursor-pointer hover:text-cyan-300 transition-colors" 
                onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
              />
              
              {isSearchDropdownOpen && displayedSchools.length > 0 && (
                <div 
                  className="absolute top-full mt-1 w-full bg-[#111827] ring-1 ring-cyan-500/20 border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] overflow-hidden max-h-[300px] overflow-y-auto z-50"
                  onScroll={handleSearchScroll}
                >
                  <div className="py-1">
                    {displayedSchools.map((school) => (
                      <button
                        key={school}
                        className="w-full text-left px-4 py-2.5 text-sm text-cyan-100 hover:bg-[#0B0F19]/80 hover:text-cyan-400 transition-colors font-medium border-b border-cyan-500/10 last:border-0"
                        onClick={() => {
                          setSearchQuery(school);
                          setIsSearchDropdownOpen(false);
                          navigate(`/school-dashboard/${encodeURIComponent(school)}`);
                        }}
                      >
                        {school}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {isSearchDropdownOpen && displayedSchools.length === 0 && (
                <div className="absolute top-full mt-1 w-full bg-[#111827] ring-1 ring-cyan-500/20 border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] p-4 text-center z-50">
                  <div className="text-sm text-cyan-500">未找到相关学校</div>
                </div>
              )}
            </div>
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard title="平台用户数" value={overallData.users.total} detail={overallData.users.detail} icon={Users} iconColor="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" iconBg="bg-blue-900/30" />
            <StatCard title="学校总数" value={overallData.schools.total} detail={overallData.schools.detail} icon={School} iconColor="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" iconBg="bg-emerald-900/30" />
            <StatCard title="课程数量" value={overallData.courses.total} detail={overallData.courses.detail} icon={BookOpen} iconColor="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]" iconBg="bg-purple-900/30" />
            <StatCard title="教学工具使用量" value={overallData.toolUsage.total} detail={overallData.toolUsage.detail} icon={Rocket} iconColor="text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]" iconBg="bg-orange-900/30" />
            <StatCard title="AI技能助手调用次数" value={overallData.agentInvocations.total} detail={overallData.agentInvocations.detail} icon={Cpu} iconColor="text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.8)]" iconBg="bg-pink-900/30" />
            <StatCard title="实训使用时长(小时)" value={overallData.labDuration.total} detail={overallData.labDuration.detail} icon={Clock} iconColor="text-cyan-400" iconBg="bg-blue-800/30" />
          </div>
        </section>

        {/* Section 2: 趋势分析 & 业务总榜 */}
        <div className="flex flex-col xl:flex-row justify-between gap-6">
          <div className="w-full xl:w-[68%] flex flex-col">
            <SectionTitle icon={TrendingUp} title="趋势分析" color="text-emerald-400">
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
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#164E63" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#06B6D4' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#06B6D4' }} />
                    <RechartsTooltip isAnimationActive={false} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(6,182,212,0.3)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    <Area type="monotone" dataKey="private" name="私有化课程" stroke="#34D399" fillOpacity={1} fill="url(#colorPrivateCourse)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="private" position="top" style={{ fontSize: '10px', fill: '#22D3EE' }} />
                    </Area>
                    <Area type="monotone" dataKey="online" name="线上课程" stroke="#60A5FA" fillOpacity={1} fill="url(#colorOnlineCourse)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="online" position="top" style={{ fontSize: '10px', fill: '#22D3EE' }} />
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
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#164E63" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#06B6D4' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#06B6D4' }} />
                    <RechartsTooltip isAnimationActive={false} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(6,182,212,0.3)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    <Area type="monotone" dataKey="private" name="私有化实验" stroke="#A78BFA" fillOpacity={1} fill="url(#colorPrivateLab)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="private" position="top" style={{ fontSize: '10px', fill: '#22D3EE' }} />
                    </Area>
                    <Area type="monotone" dataKey="online" name="线上实验" stroke="#FBBF24" fillOpacity={1} fill="url(#colorOnlineLab)" strokeWidth={2} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="online" position="top" style={{ fontSize: '10px', fill: '#22D3EE' }} />
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
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#164E63" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#06B6D4' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#06B6D4' }} />
                    <RechartsTooltip isAnimationActive={false} cursor={{ fill: '#0B0F19' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(6,182,212,0.3)' }} />
                    <Bar dataKey="count" fill="#06B6D4" radius={[4, 4, 0, 0]} maxBarSize={40} isAnimationActive={isChartAnimationActive}>
                      <LabelList dataKey="count" position="top" style={{ fontSize: '10px', fill: '#22D3EE' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
          
          <div className="w-full xl:w-[30%] flex flex-col">
            <SectionTitle icon={Award} title="业务总榜" color="text-amber-500" />
            <div className="bg-[#111827] ring-1 ring-cyan-500/20 rounded-xl p-5 shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-cyan-500/20 flex flex-col flex-1">
              <div className="flex items-center gap-4 justify-between mb-4">
                <div className="flex bg-[#0B0F19]/80 p-1 rounded-lg text-xs font-medium border border-cyan-500/20 w-[60%]">
                  <button
                    className={`flex-1 py-1.5 rounded-md transition-all ${activeLeaderboardTab === 'schools' ? 'bg-[#111827] ring-1 ring-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-cyan-400' : 'text-cyan-500 hover:text-cyan-100'}`}
                    onClick={() => setActiveLeaderboardTab('schools')}
                  >
                    院校
                  </button>
                  <button
                    className={`flex-1 py-1.5 rounded-md transition-all ${activeLeaderboardTab === 'courses' ? 'bg-[#111827] ring-1 ring-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-emerald-400' : 'text-cyan-500 hover:text-cyan-100'}`}
                    onClick={() => setActiveLeaderboardTab('courses')}
                  >
                    课程
                  </button>
                  <button
                    className={`flex-1 py-1.5 rounded-md transition-all ${activeLeaderboardTab === 'labs' ? 'bg-[#111827] ring-1 ring-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-purple-400' : 'text-cyan-500 hover:text-cyan-100'}`}
                    onClick={() => setActiveLeaderboardTab('labs')}
                  >
                    实验
                  </button>
                </div>
                <button 
                  onClick={() => {
                    if (activeLeaderboardTab === 'schools') {
                      handleViewAll('院校资源用量榜', ['排名', '学校名称', '累计实训时长', '累计课程时长', 'AI 算力消耗'], fullData.leaderboardSchools, 'leaderboardSchools');
                    } else if (activeLeaderboardTab === 'courses') {
                      handleViewAll('热门课程学时榜单', ['排名', '课程名称', '累计学时'], fullData.leaderboardCourses, 'leaderboardCourses');
                    } else {
                      handleViewAll('实训环境调用排行', ['排名', '实验环境名称', '环境运行总时长'], fullData.leaderboardLabs, 'leaderboardLabs');
                    }
                  }} 
                  className={`text-[11px] whitespace-nowrap shrink-0 hover:underline ${activeLeaderboardTab === 'schools' ? 'text-cyan-400 hover:text-cyan-200' : activeLeaderboardTab === 'courses' ? 'text-emerald-400 hover:text-emerald-200' : 'text-purple-400 hover:text-purple-200'}`}
                >
                  查看全部 &gt;
                </button>
              </div>

              {activeLeaderboardTab === 'schools' && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="mb-3 text-sm">
                    <span className="font-bold text-cyan-400 font-bold tracking-wider text-xs">院校资源用量榜</span>
                  </div>
                  <div className="overflow-y-auto pr-1 text-xs">
                    <table className="w-full text-left table-fixed">
                      <thead>
                        <tr>
                          <th className="w-8 font-normal"></th>
                          <th className="font-normal truncate"></th>
                          <th className="w-10 text-right text-[10px] text-cyan-600 font-normal">实训</th>
                          <th className="w-12 text-right text-[10px] text-cyan-600 font-normal">课程</th>
                          <th className="w-8 text-right text-[10px] text-cyan-600 font-normal">算力</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.schools.map((row: any, idx: number) => (
                          <tr key={idx} className="border-b border-cyan-500/10 last:border-0 hover:bg-[#0B0F19]/80/50">
                            <td className="py-2 w-8">
                              <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center font-bold text-[10px] ${
                                row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                                row.rank === 2 ? 'bg-cyan-900/40 text-cyan-300' :
                                row.rank === 3 ? 'bg-orange-800/30 text-orange-400' :
                                'bg-[#0B0F19]/80 text-cyan-500'
                              }`}>
                                {row.rank}
                              </div>
                            </td>
                            <td className="py-2 pr-1 truncate">
                              <Link to={`/school-dashboard/${encodeURIComponent(row.name)}`} className="font-medium text-cyan-400 hover:text-cyan-200 hover:underline" title={row.name}>{row.name}</Link>
                            </td>
                            <td className="py-2 text-right font-din text-purple-400 font-medium text-[10px]">
                              {row.duration.replace(' 分钟', 'm').replace(/,/g, '')}
                            </td>
                            <td className="py-2 text-right font-din text-emerald-400 font-medium text-[10px]">
                              {row.courseDuration.replace(' 分钟', 'm').replace(/,/g, '')}
                            </td>
                            <td className="py-2 text-right font-din text-cyan-400 font-medium text-[10px]">
                              {row.token.replace(/,/g, '')}
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
                  <div className="mb-3 text-sm">
                    <span className="font-bold text-cyan-400 font-bold tracking-wider text-xs">热门课程榜</span>
                  </div>
                  <div className="overflow-y-auto pr-1 text-xs">
                    <table className="w-full text-left">
                      <tbody>
                        {leaderboardData.courses.map((row: any, idx: number) => (
                          <tr key={idx} className="border-b border-cyan-500/10 last:border-0 hover:bg-[#0B0F19]/80/50">
                            <td className="py-2 w-8">
                              <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center font-bold text-[10px] ${
                                row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                                row.rank === 2 ? 'bg-cyan-900/40 text-cyan-300' :
                                row.rank === 3 ? 'bg-orange-800/30 text-orange-400' :
                                'bg-[#0B0F19]/80 text-cyan-500'
                              }`}>
                                {row.rank}
                              </div>
                            </td>
                            <td className="py-2 font-medium text-cyan-100 truncate max-w-[100px]">{row.name}</td>
                            <td className="py-2 text-right text-cyan-500 font-din">{row.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeLeaderboardTab === 'labs' && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="mb-3 text-sm">
                    <span className="font-bold text-cyan-400 font-bold tracking-wider text-xs">实验环境使用榜单</span>
                  </div>
                  <div className="overflow-y-auto pr-1 text-xs">
                    <table className="w-full text-left">
                      <tbody>
                        {leaderboardData.labs.map((row: any, idx: number) => (
                          <tr key={idx} className="border-b border-cyan-500/10 last:border-0 hover:bg-[#0B0F19]/80/50">
                            <td className="py-2 w-8">
                              <div className={`w-5 h-5 mx-auto rounded flex items-center justify-center font-bold text-[10px] ${
                                row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                                row.rank === 2 ? 'bg-cyan-900/40 text-cyan-300' :
                                row.rank === 3 ? 'bg-orange-800/30 text-orange-400' :
                                'bg-[#0B0F19]/80 text-cyan-500'
                              }`}>
                                {row.rank}
                              </div>
                            </td>
                            <td className="py-2 font-medium text-cyan-100 truncate max-w-[100px]">{row.name}</td>
                            <td className="py-2 text-right text-cyan-500 font-din">{row.duration}</td>
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

        {/* Section 3 & 4 Layout */}
        <div className="flex flex-col gap-6 pb-6 mt-6">
          {/* Row 1: Section 3 */}
          <div className="flex flex-col gap-6">
            {/* Section 3: 教学与实训活动情况 */}
            <section className="w-full flex flex-col">
              <SectionTitle icon={Flame} title="教学与实训活动情况" color="text-cyan-400">
                <SectionFilter filter={activityFilter} onFilterChange={setActivityFilter} showShortcuts={false} />
              </SectionTitle>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1">
                <ChartCard 
                  title="活跃院校榜单"
                  onViewAll={() => handleViewAll('活跃院校榜单', ['排名', '学校名称', '实验环境调用量', '平台登录人次', '课程参与频次'], getScaledData(fullData.activeSchools, activityFilter), 'activeSchools')}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getScaledData(activityData.activeSchools, activityFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#164E63" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#06B6D4' }} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false} 
                        width={100} 
                        tick={({ x, y, payload }: any) => (
                          <g transform={`translate(${x},${y})`}>
                            <text
                              x={0}
                              y={0}
                              dy={4}
                              textAnchor="end"
                              fill="#2563EB"
                              fontSize={10}
                              className="cursor-pointer hover:underline"
                              onClick={() => navigate(`/school-dashboard/${encodeURIComponent(payload.value)}`)}
                            >
                              {payload.value}
                            </text>
                          </g>
                        )}
                      />
                      <RechartsTooltip 
                        content={<CustomTooltip />}
                        cursor={{ fill: '#0B0F19' }} 
                        isAnimationActive={false}
                      />
                      <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="lab" name="实验调用" fill="#3B82F6" barSize={6} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive} />
                      <Bar dataKey="login" name="平台登录" fill="#60A5FA" barSize={6} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive} />
                      <Bar dataKey="course" name="课程参与" fill="#93C5FD" barSize={6} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard 
                  title="课程热度榜单"
                  onViewAll={() => handleViewAll('课程热度榜单', ['排名', '课程名称', '累计学习时长', '累计访问人次'], getScaledData(fullData.activeCourses, activityFilter), 'activeCourses')}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getScaledData(activityData.activeCourses, activityFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#164E63" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#06B6D4' }} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#22D3EE' }} width={80} />
                      <RechartsTooltip 
                        content={<CustomTooltip />}
                        cursor={{ fill: '#0B0F19' }} 
                        isAnimationActive={false}
                      />
                      <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="duration" name="累计学习时长(千小时)" fill="#C084FC" barSize={8} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                        <LabelList dataKey="duration" position="right" style={{ fontSize: '10px', fill: '#22D3EE' }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard 
                  title="实训实验使用榜单"
                  onViewAll={() => handleViewAll('实验环境使用榜单', ['排名', '实验环境名称', '累计运行时长'], getScaledData(fullData.activeLabs, activityFilter), 'activeLabs')}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getScaledData(activityData.activeLabs, activityFilter)} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#164E63" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#06B6D4' }} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#22D3EE' }} width={100} />
                      <RechartsTooltip 
                        content={<CustomTooltip />}
                        cursor={{ fill: '#0B0F19' }} 
                        isAnimationActive={false}
                      />
                      <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="duration" name="累计使用时长(千小时)" fill="#F97316" barSize={8} radius={[0, 4, 4, 0]} isAnimationActive={isChartAnimationActive}>
                        <LabelList dataKey="duration" position="right" style={{ fontSize: '10px', fill: '#22D3EE' }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            </section>
          </div>

          {/* Row 2: Section 4 */}
          <div className="flex flex-col gap-6">
            {/* Section 4: 数据概览 (今日) */}
            <section className="w-full flex flex-col">
              <SectionTitle icon={BarChart3} title="数据概览 (今日)" color="text-cyan-400" />
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 flex-1">
                {todayData.map((item, idx) => (
                  <div key={idx} className="bg-[#111827] ring-1 ring-cyan-500/20 rounded-xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-cyan-500/20 flex items-center gap-3 h-full">
                    <div className="w-10 h-10 rounded-xl bg-blue-900/30 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <h3 className="text-xs font-medium text-cyan-100 mb-0.5 truncate">{item.title}</h3>
                      <div className="text-lg font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] font-din truncate">{item.value.toLocaleString()}</div>
                      <div className="text-[10px] text-cyan-500 truncate mt-0.5">较昨日 <span className="font-medium text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] ml-0.5">{item.trend}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

      </main>

      {/* Data Modal */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-[#111827] ring-1 ring-cyan-500/20 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20">
              <h2 className="text-lg font-bold text-cyan-400 font-bold tracking-wider">{modalConfig.title}</h2>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-cyan-900/40 text-cyan-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-cyan-500 border-b border-cyan-500/30 sticky top-0 bg-[#111827] ring-1 ring-cyan-500/20 z-10">
                  <tr>
                    {modalConfig.columns.map((col: string, idx: number) => (
                      <th key={idx} className={`pb-3 pt-2 font-medium ${idx > 1 ? 'text-right' : ''}`}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modalConfig.data.map((row: any, idx: number) => (
                    <tr key={idx} className="border-b border-cyan-500/10 hover:bg-[#0B0F19]/80/50 transition-colors">
                      <td className="py-3 w-16">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          row.rank === 1 ? 'bg-amber-100 text-amber-600' :
                          row.rank === 2 ? 'bg-cyan-900/40 text-cyan-300' :
                          row.rank === 3 ? 'bg-orange-800/30 text-orange-400' :
                          'bg-[#0B0F19]/80 text-cyan-500'
                        }`}>
                          {row.rank}
                        </div>
                      </td>
                      <td className="py-3 font-medium text-cyan-100">
                        {['leaderboardSchools', 'activeSchools', 'trendCourseDetails', 'trendLabDetails', 'trendNewSchoolsDetails'].includes(modalConfig.type) ? (
                          <Link 
                            to={`/school-dashboard/${encodeURIComponent(row.name)}`}
                            className="text-cyan-400 hover:text-cyan-200 hover:underline transition-colors"
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
                          <td className="py-3 text-right text-cyan-300">{row.lab?.toLocaleString()}</td>
                          <td className="py-3 text-right text-cyan-300">{row.login?.toLocaleString()}</td>
                          <td className="py-3 text-right text-cyan-300">{row.course?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'activeCourses' && (
                        <>
                          <td className="py-3 text-right text-cyan-300">{row.duration?.toLocaleString()}</td>
                          <td className="py-3 text-right text-cyan-300">{row.visits?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'activeLabs' && (
                        <>
                          <td className="py-3 text-right text-cyan-300">{row.duration?.toLocaleString()}</td>
                        </>
                      )}
                      {modalConfig.type === 'leaderboardSchools' && (
                        <>
                          <td className="py-3 text-right text-cyan-300">{row.duration}</td>
                          <td className="py-3 text-right text-cyan-300">{row.courseDuration}</td>
                          <td className="py-3 text-right text-cyan-300">{row.token}</td>
                        </>
                      )}
                      {modalConfig.type === 'leaderboardCourses' && (
                        <td className="py-3 text-right text-cyan-300">{row.duration}</td>
                      )}
                      {modalConfig.type === 'leaderboardLabs' && (
                        <td className="py-3 text-right text-cyan-300">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendCourseDetails' && (
                        <td className="py-3 text-right text-cyan-300">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendLabDetails' && (
                        <td className="py-3 text-right text-cyan-300">{row.duration}</td>
                      )}
                      {modalConfig.type === 'trendNewSchoolsDetails' && (
                        <>
                          <td className="py-3 text-right text-cyan-300">{row.accountCount}</td>
                          <td className="py-3 text-right text-cyan-300">{row.duration}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-cyan-500/20 bg-[#0B0F19]/80 text-xs text-cyan-500 text-right">
              共 {modalConfig.data.length} 条记录
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformOperationsDashboard;
