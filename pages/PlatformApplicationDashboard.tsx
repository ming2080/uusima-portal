import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  School,
  Users,
  GraduationCap,
  Clock,
  Building,
  HelpCircle,
  X,
  RefreshCw,
  AlertTriangle,
  Calendar
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Line
} from 'recharts';

// --- Custom Interfaces ---
interface SchoolRecord {
  school: string;
  format: 'SaaS云服务' | '私有化部署' | '试用开通';
  startDate: string;
  platform: string;
  
  // 1. 授权账号数 (used / quota)
  usedAccounts: number;
  quotaAccounts: number;
  
  // 2. 实验时长数 (usedHours h / quotaHours h)
  usedHours: number;
  quotaHours: number;
  
  // 3. 授权周期 (usedYears年 / totalYears年)
  usedYears: number;
  totalYears: number;
  
  // 4. token购买量 (usedTokens / totalTokens)
  usedTokens: number;
  totalTokens: number;
  
  // 5. 累计购买年限
  cumulativeYears: string;
  
  // 6. 账号规模区间
  range: '1-30' | '31-100' | '101-300' | '300以上';
  
  // 7. 剩余有效期 (in days)
  remainingDays: number;
}

// --- Vocational College Data (Chinese Higher Vocational Schools Only) ---
const applicationData: SchoolRecord[] = [
  {
    school: '深圳职业技术大学',
    format: 'SaaS云服务',
    startDate: '2022-03-15',
    platform: '智慧教学平台',
    usedAccounts: 48600,
    quotaAccounts: 60000,
    usedHours: 48600,
    quotaHours: 60000,
    usedYears: 2,
    totalYears: 3,
    usedTokens: 78500,
    totalTokens: 100000,
    cumulativeYears: '4年',
    range: '300以上',
    remainingDays: 247
  },
  {
    school: '广州番禺职业技术学院',
    format: '私有化部署',
    startDate: '2021-07-20',
    platform: '教学管理平台',
    usedAccounts: 32505,
    quotaAccounts: 45000,
    usedHours: 32500,
    quotaHours: 45000,
    usedYears: 1,
    totalYears: 3,
    usedTokens: 45000,
    totalTokens: 50000,
    cumulativeYears: '5年',
    range: '300以上',
    remainingDays: 118
  },
  {
    school: '广东轻工职业技术学院',
    format: 'SaaS云服务',
    startDate: '2023-01-10',
    platform: '在线学习平台',
    usedAccounts: 22402,
    quotaAccounts: 30000,
    usedHours: 22400,
    quotaHours: 30000,
    usedYears: 1,
    totalYears: 2,
    usedTokens: 28000,
    totalTokens: 40000,
    cumulativeYears: '3年',
    range: '101-300',
    remainingDays: 332
  },
  {
    school: '顺德职业技术学院',
    format: '私有化部署',
    startDate: '2022-09-05',
    platform: '科研协同平台',
    usedAccounts: 16800,
    quotaAccounts: 20000,
    usedHours: 16800,
    quotaHours: 20000,
    usedYears: 2,
    totalYears: 3,
    usedTokens: 19500,
    totalTokens: 25000,
    cumulativeYears: '4年',
    range: '31-100',
    remainingDays: 196
  },
  {
    school: '广东科学技术职业学院',
    format: 'SaaS云服务',
    startDate: '2023-05-18',
    platform: '智能教育平台',
    usedAccounts: 9102,
    quotaAccounts: 10000,
    usedHours: 9100,
    quotaHours: 10000,
    usedYears: 1,
    totalYears: 2,
    usedTokens: 10000,
    totalTokens: 12000,
    cumulativeYears: '3年',
    range: '31-100',
    remainingDays: 287
  },
  {
    school: '西平职业教育中心', // Keeping original school
    format: '试用开通',
    startDate: '2024-11-12',
    platform: '智慧校园平台',
    usedAccounts: 1600,
    quotaAccounts: 3000,
    usedHours: 1600,
    quotaHours: 3000,
    usedYears: 0,
    totalYears: 1,
    usedTokens: 1000,
    totalTokens: 2000,
    cumulativeYears: '1年',
    range: '1-30',
    remainingDays: 28
  },
  {
    school: '江苏农林职业技术学院',
    format: 'SaaS云服务',
    startDate: '2022-06-30',
    platform: '数据中台平台',
    usedAccounts: 6543,
    quotaAccounts: 8000,
    usedHours: 5200,
    quotaHours: 8000,
    usedYears: 1,
    totalYears: 3,
    usedTokens: 6000,
    totalTokens: 10000,
    cumulativeYears: '4年',
    range: '31-100',
    remainingDays: 154
  },
  {
    school: '无锡职业技术学院',
    format: '私有化部署',
    startDate: '2021-12-01',
    platform: '教学资源平台',
    usedAccounts: 12345,
    quotaAccounts: 15000,
    usedHours: 9500,
    quotaHours: 15000,
    usedYears: 1,
    totalYears: 3,
    usedTokens: 8000,
    totalTokens: 15000,
    cumulativeYears: '5年',
    range: '31-100',
    remainingDays: 63
  },
  {
    school: '重庆电子工程职业学院',
    format: '私有化部署',
    startDate: '2023-10-09',
    platform: '计算机仿真平台',
    usedAccounts: 28500,
    quotaAccounts: 35000,
    usedHours: 25000,
    quotaHours: 30000,
    usedYears: 2,
    totalYears: 3,
    usedTokens: 22000,
    totalTokens: 30000,
    cumulativeYears: '3年',
    range: '300以上',
    remainingDays: 412
  },
  {
    school: '陕西工业职业技术学院',
    format: '试用开通',
    startDate: '2025-02-14',
    platform: '工业互联网教学中台',
    usedAccounts: 1400,
    quotaAccounts: 2000,
    usedHours: 1200,
    quotaHours: 2000,
    usedYears: 0,
    totalYears: 1,
    usedTokens: 800,
    totalTokens: 1500,
    cumulativeYears: '1年',
    range: '1-30',
    remainingDays: 15
  },
  {
    school: '北京电子科技职业学院',
    format: 'SaaS云服务',
    startDate: '2022-08-20',
    platform: '物联网实践系统',
    usedAccounts: 18500,
    quotaAccounts: 22000,
    usedHours: 16000,
    quotaHours: 20000,
    usedYears: 2,
    totalYears: 3,
    usedTokens: 15000,
    totalTokens: 20000,
    cumulativeYears: '4年',
    range: '101-300',
    remainingDays: 205
  },
  {
    school: '常州信息职业技术学院',
    format: '私有化部署',
    startDate: '2022-11-05',
    platform: '人工智能实训套件',
    usedAccounts: 12000,
    quotaAccounts: 16000,
    usedHours: 11000,
    quotaHours: 15000,
    usedYears: 1,
    totalYears: 3,
    usedTokens: 10000,
    totalTokens: 12000,
    cumulativeYears: '3年',
    range: '101-300',
    remainingDays: 145
  },
  {
    school: '黄河水利职业技术学院',
    format: 'SaaS云服务',
    startDate: '2023-04-20',
    platform: '水利工程数字化中台',
    usedAccounts: 7500,
    quotaAccounts: 10000,
    usedHours: 6800,
    quotaHours: 10000,
    usedYears: 1,
    totalYears: 2,
    usedTokens: 5000,
    totalTokens: 8000,
    cumulativeYears: '3年',
    range: '31-100',
    remainingDays: 520
  },
  {
    school: '浙江金融职业学院',
    format: '私有化部署',
    startDate: '2021-10-18',
    platform: '金融大数据实训平台',
    usedAccounts: 27000,
    quotaAccounts: 35000,
    usedHours: 22000,
    quotaHours: 35000,
    usedYears: 2,
    totalYears: 3,
    usedTokens: 20000,
    totalTokens: 25000,
    cumulativeYears: '5年',
    range: '300以上',
    remainingDays: 85
  },
  {
    school: '南京信息职业技术学院',
    format: 'SaaS云服务',
    startDate: '2024-03-12',
    platform: '智慧教学协同平台',
    usedAccounts: 11000,
    quotaAccounts: 15000,
    usedHours: 9500,
    quotaHours: 15000,
    usedYears: 1,
    totalYears: 2,
    usedTokens: 8000,
    totalTokens: 10000,
    cumulativeYears: '2年',
    range: '31-100',
    remainingDays: 298
  },
  {
    school: '四川建筑职业技术学院',
    format: '试用开通',
    startDate: '2025-01-10',
    platform: 'BIM虚拟仿真设计中台',
    usedAccounts: 380,
    quotaAccounts: 500,
    usedHours: 300,
    quotaHours: 500,
    usedYears: 0,
    totalYears: 1,
    usedTokens: 200,
    totalTokens: 500,
    cumulativeYears: '1年',
    range: '1-30',
    remainingDays: 45
  }
];

// --- Static Analytics Data (Matching Screenshot Visuals) ---
const formatChartData = [
  { name: 'SaaS云服务', value: 772, color: '#00f3ff' },
  { name: '私有化部署', value: 368, color: '#10b981' },
  { name: '试用开通', value: 128, color: '#fb923c' }
];

const bracketChartData = [
  { name: '1-30', value: 506, color: '#3b82f6' },
  { name: '31-100', value: 336, color: '#14b8a6' },
  { name: '101-300', value: 218, color: '#a855f7' },
  { name: '300以上', value: 208, color: '#fb923c' }
];

const expirationTrendData = [
  { month: '2025-06', count: 18, ratio: 5.2 },
  { month: '2025-07', count: 21, ratio: 6.1 },
  { month: '2025-08', count: 27, ratio: 7.8 },
  { month: '2025-09', count: 19, ratio: 5.5 },
  { month: '2025-10', count: 22, ratio: 6.3 },
  { month: '2025-11', count: 25, ratio: 7.2 },
  { month: '2025-12', count: 34, ratio: 9.8 },
  { month: '2026-01', count: 31, ratio: 8.9 },
  { month: '2026-02', count: 28, ratio: 8.0 },
  { month: '2026-03', count: 23, ratio: 6.6 },
  { month: '2026-04', count: 20, ratio: 5.7 },
  { month: '2026-05', count: 17, ratio: 4.9 }
];

export default function PlatformApplicationDashboard() {
  const navigate = useNavigate();
  
  // --- Data source initialized in state to allow interactive changes ---
  const [schools, setSchools] = useState<SchoolRecord[]>(applicationData);

  // --- Global custom time period query states ---
  const [timeRangeType, setTimeRangeType] = useState<'all' | 'week' | 'month' | '3months' | 'year' | 'custom'>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  const timeRangeFilteredData = useMemo(() => {
    let result = [...schools];
    const anchorDate = new Date('2026-05-29'); // Use the same anchor date as the system banner for consistent UX!
    
    if (timeRangeType === 'week') {
      const limit = new Date(anchorDate);
      limit.setDate(limit.getDate() - 7);
      const limitStr = limit.toISOString().split('T')[0];
      result = result.filter(item => item.startDate >= limitStr);
    } else if (timeRangeType === 'month') {
      const limit = new Date(anchorDate);
      limit.setMonth(limit.getMonth() - 1);
      const limitStr = limit.toISOString().split('T')[0];
      result = result.filter(item => item.startDate >= limitStr);
    } else if (timeRangeType === '3months') {
      const limit = new Date(anchorDate);
      limit.setMonth(limit.getMonth() - 3);
      const limitStr = limit.toISOString().split('T')[0];
      result = result.filter(item => item.startDate >= limitStr);
    } else if (timeRangeType === 'year') {
      const limit = new Date(anchorDate);
      limit.setFullYear(limit.getFullYear() - 1);
      const limitStr = limit.toISOString().split('T')[0];
      result = result.filter(item => item.startDate >= limitStr);
    } else if (timeRangeType === 'custom') {
      if (customStartDate) {
        result = result.filter(item => item.startDate >= customStartDate);
      }
      if (customEndDate) {
        result = result.filter(item => item.startDate <= customEndDate);
      }
    }
    return result;
  }, [schools, timeRangeType, customStartDate, customEndDate]);

  // --- Dynamic KPI metrics calculation based on overall time cycles ---
  const kpiSchoolCount = useMemo(() => {
    return Math.round((timeRangeFilteredData.length / schools.length) * 1268);
  }, [timeRangeFilteredData, schools.length]);

  const kpiAccountsCount = useMemo(() => {
    const totalBaseAccounts = schools.reduce((sum, s) => sum + s.quotaAccounts, 0);
    const currentFilteredAccounts = timeRangeFilteredData.reduce((sum, s) => sum + s.quotaAccounts, 0);
    return totalBaseAccounts > 0 ? Math.round((currentFilteredAccounts / totalBaseAccounts) * 856432) : 0;
  }, [timeRangeFilteredData, schools]);

  const kpiScaleCount = useMemo(() => {
    const totalBaseScale = schools.filter(s => s.usedAccounts > 10000).length;
    const currentFilteredScale = timeRangeFilteredData.filter(s => s.usedAccounts > 10000).length;
    return totalBaseScale > 0 ? Math.round((currentFilteredScale / totalBaseScale) * 362) : 0;
  }, [timeRangeFilteredData, schools]);

  const kpiExpiringCount = useMemo(() => {
    const totalBaseExpiring = schools.filter(s => s.remainingDays <= 365).length;
    const currentFilteredExpiring = timeRangeFilteredData.filter(s => s.remainingDays <= 365).length;
    return totalBaseExpiring > 0 ? Math.round((currentFilteredExpiring / totalBaseExpiring) * 146) : 0;
  }, [timeRangeFilteredData, schools]);

  // --- Dynamic Chart 1 (Opening formats distribution pie) ---
  const dynamicFormatChartData = useMemo(() => {
    const saasCount = timeRangeFilteredData.filter(s => s.format === 'SaaS云服务').length;
    const privateCount = timeRangeFilteredData.filter(s => s.format === '私有化部署').length;
    const trialCount = timeRangeFilteredData.filter(s => s.format === '试用开通').length;
    
    const total = saasCount + privateCount + trialCount;
    if (total === 0) {
      return [
        { name: 'SaaS云服务', value: 0, color: '#00f3ff', percent: '0%' },
        { name: '私有化部署', value: 0, color: '#10b981', percent: '0%' },
        { name: '试用开通', value: 0, color: '#fb923c', percent: '0%' }
      ];
    }
    
    // Scale count to match the current kpiSchoolCount proportionally
    const saasVal = Math.round((saasCount / total) * kpiSchoolCount);
    const privateVal = Math.round((privateCount / total) * kpiSchoolCount);
    const trialVal = Math.max(0, kpiSchoolCount - saasVal - privateVal); // Ensure exact sum
    
    const saasP = kpiSchoolCount > 0 ? Math.round((saasVal / kpiSchoolCount) * 100) + '%' : '0%';
    const privateP = kpiSchoolCount > 0 ? Math.round((privateVal / kpiSchoolCount) * 100) + '%' : '0%';
    const trialP = kpiSchoolCount > 0 ? Math.round((trialVal / kpiSchoolCount) * 100) + '%' : '0%';
    
    return [
      { name: 'SaaS云服务', value: saasVal, color: '#00f3ff', percent: saasP },
      { name: '私有化部署', value: privateVal, color: '#10b981', percent: privateP },
      { name: '试用开通', value: trialVal, color: '#fb923c', percent: trialP }
    ];
  }, [timeRangeFilteredData, kpiSchoolCount]);

  // --- Dynamic Chart 2 (Accounts bracket ranges distribution bar) ---
  const dynamicBracketChartData = useMemo(() => {
    const counts = { '1-30': 0, '31-100': 0, '101-300': 0, '300以上': 0 };
    timeRangeFilteredData.forEach(s => {
      if (counts[s.range] !== undefined) {
        counts[s.range]++;
      }
    });
    const total = timeRangeFilteredData.length;
    if (total === 0) {
      return [
        { name: '1-30', value: 0, color: '#3b82f6' },
        { name: '31-100', value: 0, color: '#14b8a6' },
        { name: '101-300', value: 0, color: '#a855f7' },
        { name: '300以上', value: 0, color: '#fb923c' }
      ];
    }
    const val1 = Math.round((counts['1-30'] / total) * kpiSchoolCount);
    const val2 = Math.round((counts['31-100'] / total) * kpiSchoolCount);
    const val3 = Math.round((counts['101-300'] / total) * kpiSchoolCount);
    const val4 = Math.max(0, kpiSchoolCount - val1 - val2 - val3);
    return [
      { name: '1-30', value: val1, color: '#3b82f6' },
      { name: '31-100', value: val2, color: '#14b8a6' },
      { name: '101-300', value: val3, color: '#a855f7' },
      { name: '300以上', value: val4, color: '#fb923c' }
    ];
  }, [timeRangeFilteredData, kpiSchoolCount]);

  // --- Dynamic Chart 3 (Monthly expiration counts column bar) ---
  const dynamicExpirationTrendData = useMemo(() => {
    const totalBase: number = 146;
    if (totalBase === 0) return expirationTrendData;
    
    return expirationTrendData.map(item => {
      const scaledCount = Math.round((item.count / totalBase) * kpiExpiringCount);
      const scaledRatio = Number(((scaledCount / (kpiSchoolCount || 1)) * 100).toFixed(1));
      return {
        ...item,
        count: scaledCount,
        ratio: isNaN(scaledRatio) ? 0 : scaledRatio
      };
    });
  }, [kpiExpiringCount, kpiSchoolCount]);

  // --- 动态提取去重后的产品平台列表与可分配的总合同年限列表 ---
  const allPlatforms = useMemo(() => {
    return Array.from(new Set(schools.map(s => s.platform)));
  }, [schools]);

  const allYears = useMemo<number[]>(() => {
    return Array.from(new Set(schools.map(s => Number(s.totalYears)))).sort((a, b) => Number(a) - Number(b));
  }, [schools]);

  // --- Basic Search Query ---
  const [searchQuery, setSearchQuery] = useState("");
  
  // --- Popover and Menu Toggling ---
  const [activePopover, setActivePopover] = useState<string | null>(null);

  // --- Filter 1: 院校名称模糊过滤 ---
  const [schoolFilter, setSchoolFilter] = useState<string>("");
  const [tempSchoolFilter, setTempSchoolFilter] = useState<string>("");

  // --- Filter 2: 开通形式 (Multi-select) ---
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['SaaS云服务', '私有化部署', '试用开通']); // Matches design initially
  const [tempSelectedFormats, setTempSelectedFormats] = useState<string[]>(['SaaS云服务', '私有化部署', '试用开通']);
  const [formatKeyword, setFormatKeyword] = useState("");

  // --- Filter 3: 首次开通时间 ---
  const [startDateMin, setStartDateMin] = useState<string>("");
  const [startDateMax, setStartDateMax] = useState<string>("");
  const [tempStartDateMin, setTempStartDateMin] = useState<string>("");
  const [tempStartDateMax, setTempStartDateMax] = useState<string>("");

  // --- Filter 4: 产品 / 平台名称 (Multi-select) ---
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [tempSelectedPlatforms, setTempSelectedPlatforms] = useState<string[]>([]);
  const [platformKeyword, setPlatformKeyword] = useState("");

  // --- Filter 5: 授权账号数 (Range) ---
  const [minAccounts, setMinAccounts] = useState<string>("");
  const [maxAccounts, setMaxAccounts] = useState<string>("");
  const [tempMinAccounts, setTempMinAccounts] = useState<string>("");
  const [tempMaxAccounts, setTempMaxAccounts] = useState<string>("");

  // --- Filter 6: 实验时长范围 ---
  const [minHours, setMinHours] = useState<string>("");
  const [maxHours, setMaxHours] = useState<string>("");
  const [tempMinHours, setTempMinHours] = useState<string>("");
  const [tempMaxHours, setTempMaxHours] = useState<string>("");

  // --- Filter 7: 授权年限多选 ---
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [tempSelectedYears, setTempSelectedYears] = useState<number[]>([]);

  // --- Filter 8: Token 购买总量范围 ---
  const [minTokens, setMinTokens] = useState<string>("");
  const [maxTokens, setMaxTokens] = useState<string>("");
  const [tempMinTokens, setTempMinTokens] = useState<string>("");
  const [tempMaxTokens, setTempMaxTokens] = useState<string>("");

  // --- Filter 9: 账号规模区间 (Multi-select) ---
  const [selectedRanges, setSelectedRanges] = useState<string[]>(['1-30', '31-100', '101-300', '300以上']); // Matches design initially
  const [tempSelectedRanges, setTempSelectedRanges] = useState<string[]>(['1-30', '31-100', '101-300', '300以上']);

  // --- Filter 10: 剩余有效期 ---
  const [remainingDaysFilter, setRemainingDaysFilter] = useState<number | null>(null); // Matches <180天 design initially

  // --- 联动监测各列的筛选活跃状态 ---
  const colFilterStatus = useMemo(() => {
    return {
      school: schoolFilter !== "",
      format: selectedFormats.length < 3,
      startDate: startDateMin !== "" || startDateMax !== "",
      platform: selectedPlatforms.length > 0,
      accounts: minAccounts !== "" || maxAccounts !== "",
      hours: minHours !== "" || maxHours !== "",
      years: selectedYears.length > 0,
      tokens: minTokens !== "" || maxTokens !== "",
      range: selectedRanges.length < 4,
      remaining: remainingDaysFilter !== null
    };
  }, [
    schoolFilter, selectedFormats, startDateMin, startDateMax, selectedPlatforms,
    minAccounts, maxAccounts, minHours, maxHours, selectedYears, minTokens,
    maxTokens, selectedRanges, remainingDaysFilter
  ]);

  // --- Sort & Pagination States ---
  const [sortConfig, setSortConfig] = useState<{ key: keyof SchoolRecord; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Actions Modal State for inline interactions ---
  const [actionModal, setActionModal] = useState<{ 
    type: 'detail' | 'renew' | 'notify' | null; 
    record: SchoolRecord | null; 
  }>({ type: null, record: null });

  // Inline forms temporarily bound states
  const [renewYears, setRenewYears] = useState<number>(1); // default renew 1 year
  const [renewAccounts, setRenewAccounts] = useState<number>(100); // add 100 accounts
  const [notifyContent, setNotifyContent] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const handleApplyRenew = () => {
    if (!actionModal.record) return;
    const targetId = actionModal.record.id;
    setSchools(prev => prev.map(item => {
      if (item.id === targetId) {
        // Appending years of renewal and recalculating days remaining
        const addedDays = renewYears * 365;
        return {
          ...item,
          totalYears: item.totalYears + renewYears,
          quotaAccounts: item.quotaAccounts + renewAccounts,
          remainingDays: item.remainingDays + addedDays
        };
      }
      return item;
    }));
    setToastMsg(`✨ 「${actionModal.record.school}」续约延长成功！服务年限增加 ${renewYears} 年，账号增加 ${renewAccounts} 个！`);
    setActionModal({ type: null, record: null });
  };

  const handleSendNotification = () => {
    if (!actionModal.record) return;
    setToastMsg(`✉️ 成功向「${actionModal.record.school}」平台管理端下发督办提醒通知成功！`);
    setActionModal({ type: null, record: null });
    setNotifyContent("");
  };

  // --- Sorting Trigger ---
  const handleSort = (key: keyof SchoolRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // --- Dynamic Formats and Counts calculation ---
  const formatCounts = useMemo(() => {
    const counts: Record<string, number> = { 'SaaS云服务': 0, '私有化部署': 0, '试用开通': 0 };
    schools.forEach(item => {
      if (counts[item.format] !== undefined) {
        counts[item.format]++;
      }
    });
    return counts;
  }, [schools]);

  const rangeCounts = useMemo(() => {
    const counts: Record<string, number> = { '1-30': 0, '31-100': 0, '101-300': 0, '300以上': 0 };
    schools.forEach(item => {
      if (counts[item.range] !== undefined) {
        counts[item.range]++;
      }
    });
    return counts;
  }, [schools]);

  // --- Reset All Filters ---
  const handleResetFilters = () => {
    setSearchQuery("");
    
    // 1. 院校名称
    setSchoolFilter("");
    setTempSchoolFilter("");

    // 2. 开通形式
    setSelectedFormats(['SaaS云服务', '私有化部署', '试用开通']);
    setTempSelectedFormats(['SaaS云服务', '私有化部署', '试用开通']);
    setFormatKeyword("");

    // 3. 首次开通时间
    setStartDateMin("");
    setStartDateMax("");
    setTempStartDateMin("");
    setTempStartDateMax("");

    // 4. 产品/平台
    setSelectedPlatforms([]);
    setTempSelectedPlatforms([]);
    setPlatformKeyword("");

    // 5. 账号规模
    setMinAccounts("");
    setMaxAccounts("");
    setTempMinAccounts("");
    setTempMaxAccounts("");

    // 6. 实验时长
    setMinHours("");
    setMaxHours("");
    setTempMinHours("");
    setTempMaxHours("");

    // 7. 授权年限
    setSelectedYears([]);
    setTempSelectedYears([]);

    // 8. Token购买量
    setMinTokens("");
    setMaxTokens("");
    setTempMinTokens("");
    setTempMaxTokens("");

    // 9. 规模区间
    setSelectedRanges(['1-30', '31-100', '101-300', '300以上']);
    setTempSelectedRanges(['1-30', '31-100', '101-300', '300以上']);

    // 10. 剩余有效期
    setRemainingDaysFilter(null);

    setCurrentPage(1);
    setActivePopover(null);
  };

  // --- Check if any custom filter is active ---
  const isAnyFilterActive = useMemo(() => {
    if (searchQuery !== "") return true;
    if (schoolFilter !== "") return true;
    if (selectedFormats.length !== 3) return true;
    if (startDateMin !== "" || startDateMax !== "") return true;
    if (selectedPlatforms.length > 0) return true;
    if (minAccounts !== "" || maxAccounts !== "") return true;
    if (minHours !== "" || maxHours !== "") return true;
    if (selectedYears.length > 0) return true;
    if (minTokens !== "" || maxTokens !== "") return true;
    if (selectedRanges.length !== 4) return true;
    if (remainingDaysFilter !== null) return true;
    return false;
  }, [
    searchQuery, schoolFilter, selectedFormats, startDateMin, startDateMax,
    selectedPlatforms, minAccounts, maxAccounts, minHours, maxHours,
    selectedYears, minTokens, maxTokens, selectedRanges, remainingDaysFilter
  ]);

  // --- Filtering core logic ---
  const filteredData = useMemo(() => {
    let result = [...timeRangeFilteredData];

    // 1. Search Query (Top global search)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.school.toLowerCase().includes(q) || 
        item.platform.toLowerCase().includes(q)
      );
    }

    // 2. 院校名称模糊过滤 (Column filter)
    if (schoolFilter) {
      const sf = schoolFilter.toLowerCase();
      result = result.filter(item => item.school.toLowerCase().includes(sf));
    }

    // 3. Open Format Selection (Multi-select)
    if (selectedFormats.length > 0) {
      result = result.filter(item => selectedFormats.includes(item.format));
    } else {
      return []; // empty if nothing selected
    }

    // 4. 首次开通时间范围过滤
    if (startDateMin) {
      result = result.filter(item => item.startDate >= startDateMin);
    }
    if (startDateMax) {
      result = result.filter(item => item.startDate <= startDateMax);
    }

    // 5. 产品/平台多选过滤
    if (selectedPlatforms.length > 0) {
      result = result.filter(item => selectedPlatforms.includes(item.platform));
    }

    // 6. Authorized Accounts (Range filter)
    if (minAccounts !== "") {
      const minVal = parseInt(minAccounts, 10);
      if (!isNaN(minVal)) {
        result = result.filter(item => item.usedAccounts >= minVal);
      }
    }
    if (maxAccounts !== "") {
      const maxVal = parseInt(maxAccounts, 10);
      if (!isNaN(maxVal)) {
        result = result.filter(item => item.usedAccounts <= maxVal);
      }
    }

    // 7. 实验时长范围过滤
    if (minHours !== "") {
      const minH = parseInt(minHours, 10);
      if (!isNaN(minH)) {
        result = result.filter(item => item.usedHours >= minH);
      }
    }
    if (maxHours !== "") {
      const maxH = parseInt(maxHours, 10);
      if (!isNaN(maxH)) {
        result = result.filter(item => item.usedHours <= maxH);
      }
    }

    // 8. 授权周期总年数多选
    if (selectedYears.length > 0) {
      result = result.filter(item => selectedYears.includes(item.totalYears));
    }

    // 9. Token购买总量范围筛选
    if (minTokens !== "") {
      const minTok = parseInt(minTokens, 10);
      if (!isNaN(minTok)) {
        result = result.filter(item => item.totalTokens >= minTok);
      }
    }
    if (maxTokens !== "") {
      const maxTok = parseInt(maxTokens, 10);
      if (!isNaN(maxTok)) {
        result = result.filter(item => item.totalTokens <= maxTok);
      }
    }

    // 10. Bracket Range Selection
    if (selectedRanges.length > 0) {
      result = result.filter(item => selectedRanges.includes(item.range));
    } else {
      return [];
    }

    // 11. Expiration Days Filter
    if (remainingDaysFilter !== null) {
      result = result.filter(item => item.remainingDays <= remainingDaysFilter);
    }

    // 12. Apply Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue, 'zh-CN') 
            : bValue.localeCompare(aValue, 'zh-CN');
        } else {
          return sortConfig.direction === 'asc' 
            ? (aValue as number) - (bValue as number) 
            : (bValue as number) - (aValue as number);
        }
      });
    }

    return result;
  }, [
    timeRangeFilteredData, searchQuery, schoolFilter, selectedFormats, startDateMin, startDateMax,
    selectedPlatforms, minAccounts, maxAccounts, minHours, maxHours,
    selectedYears, minTokens, maxTokens, selectedRanges, remainingDaysFilter, sortConfig
  ]);

  // Reset page relative to filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery, schoolFilter, selectedFormats, startDateMin, startDateMax,
    selectedPlatforms, minAccounts, maxAccounts, minHours, maxHours,
    selectedYears, minTokens, maxTokens, selectedRanges, remainingDaysFilter
  ]);

  // --- Pagination Slice ---
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const pagedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // --- CSV Export Handler ---
  const handleExportCSV = () => {
    if (filteredData.length === 0) return;

    const headers = [
      "排名", "院校名称", "开通形式", "首次开通时间", "开通产品 / 平台名称", 
      "授权账号数", "实验时长数", "授权周期", "token购买量", 
      "账号规模区间", "剩余有效期"
    ];
    
    const csvRows = [
      headers.join(','),
      ...filteredData.map((item, index) => [
        index + 1,
        `"${item.school}"`,
        `"${item.format}"`,
        `"${item.startDate}"`,
        `"${item.platform}"`,
        `"${item.usedAccounts} / ${item.quotaAccounts}"`,
        `"${item.usedHours}h / ${item.quotaHours}h"`,
        `"${item.usedYears}年 / ${item.totalYears}年"`,
        `"${item.usedTokens} / ${item.totalTokens}"`,
        `"${item.range}"`,
        `"${item.remainingDays}天"`
      ].join(','))
    ].join('\n');

    const blob = new Blob(["\ufeff" + csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `UUSIMA_应用开通详细表_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#030712] bg-gradient-to-b from-[#03081a] via-[#02050f] to-[#010206] text-slate-100 font-sans flex flex-col overflow-y-auto pb-10 antialiased selection:bg-cyan-500/30">
      
      {/* 🚀 SCI-FI CYBERPUNK HEADER BANNER */}
      <header className="relative w-full bg-[#050b1a]/95 backdrop-blur-md border-b border-cyan-500/20 px-8 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Left Side Group */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="p-2.5 rounded-full hover:bg-cyan-950/60 border border-transparent hover:border-cyan-500/30 text-cyan-400 hover:text-cyan-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 animate-pulse" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
              <Building className="w-5 h-5 text-[#030712]" />
            </div>
            <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-cyan-100 to-white drop-shadow-[0_2px_10px_rgba(6,182,212,0.35)] font-mono">
              智慧教学实验端大屏
            </h1>
          </div>
          
          {/* Cyber Tab Switcher */}
          <div className="flex bg-cyan-950/20 ring-1 ring-cyan-500/10 border border-cyan-500/25 p-1 rounded-2xl ml-8 shadow-inner">
            <button
              onClick={() => navigate('/platform-operations-dashboard')}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-500/5 cursor-pointer"
            >
              运营总览
            </button>
            <button
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all bg-gradient-to-r from-cyan-900/90 to-cyan-800/50 ring-1 ring-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              应用开通
            </button>
            <button
              onClick={() => navigate('/big-screen-dashboard', { state: { activeTab: 'operations' } })}
              className="px-6 py-2 rounded-xl text-sm font-bold tracking-widest transition-all text-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-500/5 cursor-pointer"
            >
              运维健康
            </button>
          </div>
        </div>

        {/* Center Title Logo Glow (Inspired by Attachment) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center">
          <div className="text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_4px_16px_rgba(0,243,255,0.6)] font-mono px-8 py-1.5 relative border-r-2 border-l-2 border-cyan-500/20 bg-gradient-to-r from-cyan-950/10 via-cyan-950/40 to-cyan-950/10 rounded-lg">
            平台应用开通运营总览大屏
            <span className="absolute -bottom-1 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></span>
          </div>
        </div>

        {/* Right Dynamic Date Time */}
        <div className="text-xs text-cyan-500/80 flex items-center gap-2 font-mono bg-cyan-950/30 px-3.5 py-1.5 rounded-lg border border-cyan-500/10 shadow-inner">
          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>数据更新时间:</span>
          <span className="font-din font-semibold text-[#00f3ff] drop-shadow-[0_0_6px_rgba(0,243,255,0.4)]">
            2026-05-29 {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-8 pt-8 flex flex-col gap-6">
        
        {/* ========================================================
            🎯 全局自定义时间周期查询控制台 (Global Time Range Selector)
            ======================================================== */}
        <section className="bg-gradient-to-r from-[#070e26] via-[#091535] to-[#050b1e] border-2 border-cyan-500/20 rounded-2xl p-4 shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden animate-fadeIn" id="global-timerange-console">
          {/* Cyber accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

          {/* Left Title and Tip */}
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Calendar className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white flex items-center gap-2">
                全局数据时间周期检索控制台
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-cyan-950/40 text-[#00f3ff] border border-cyan-500/20 animate-pulse">LIVE</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">选择院校开通实训的激活周期，全局 KPI 指标和所有图表自动实现动态联动，符合职教教学周期</p>
            </div>
          </div>

          {/* Right Action Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-[#040815]/90 border border-cyan-500/25 p-1 rounded-xl shadow-inner gap-1">
              {[
                { type: 'all', label: '全部周期' },
                { type: 'week', label: '最近一周' },
                { type: 'month', label: '最近一月' },
                { type: '3months', label: '最近一季' },
                { type: 'year', label: '最近一年' },
                { type: 'custom', label: '自定义时间' },
              ].map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => {
                    setTimeRangeType(opt.type as any);
                    if (opt.type !== 'custom') {
                      setCustomStartDate('');
                      setCustomEndDate('');
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-bold transition-all rounded-lg cursor-pointer ${
                    timeRangeType === opt.type
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-[#040815] shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'text-cyan-500/80 hover:text-cyan-300 hover:bg-cyan-500/5'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Custom Date Picker Inputs */}
            {timeRangeType === 'custom' && (
              <div className="flex items-center gap-2 animate-fadeIn bg-[#040815] border border-cyan-500/25 p-1.5 rounded-xl">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="bg-[#030612] text-xs font-mono text-cyan-200 outline-none border border-cyan-500/10 p-1.5 rounded focus:ring-1 focus:ring-cyan-500"
                />
                <span className="text-cyan-500 font-bold text-xs">至</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="bg-[#030612] text-xs font-mono text-cyan-200 outline-none border border-cyan-500/10 p-1.5 rounded focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            📊 TOP ROW GLOWING KPI CARDS WITH CONCENTRIC HOVER EFFECTS
            ======================================================== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" id="applications-kpi-row">
          
          {/* Card 1: 开通院校总数 */}
          <div className="bg-gradient-to-br from-[#0e1834] to-[#040815] border border-cyan-500/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300 relative overflow-hidden h-36">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-cyan-500/5 blur-3xl rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Circle Icon Container with custom hover interaction animations */}
            <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-xs" />
              <div className="absolute inset-0 rounded-xl border border-dashed border-cyan-400/20 group-hover:rotate-45 transition-transform duration-700" />
              <div className="absolute inset-1.5 bg-[#030612]/90 border border-cyan-500/10 rounded-xl flex items-center justify-center">
                <School className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Content Displaying Metrics only */}
            <div className="mt-2">
              <p className="text-cyan-400/70 text-xs font-semibold tracking-wider">开通院校总数</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl md:text-3xl font-din font-black text-white drop-shadow-[0_2px_12px_rgba(34,211,238,0.4)]">
                  {kpiSchoolCount.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 font-bold">所</span>
              </div>
            </div>
          </div>

          {/* Card 2: 开通账号总数 */}
          <div className="bg-gradient-to-br from-[#0e1834] to-[#040815] border border-emerald-500/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-emerald-400/40 transition-all duration-300 relative overflow-hidden h-36">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-500/5 blur-3xl rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Circle Icon Container */}
            <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-xl blur-xs" />
              <div className="absolute inset-0 rounded-xl border border-dashed border-emerald-400/20 group-hover:-rotate-45 transition-transform duration-700" />
              <div className="absolute inset-1.5 bg-[#030612]/90 border border-emerald-500/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Content Displaying Metrics only */}
            <div className="mt-2">
              <p className="text-emerald-400/70 text-xs font-semibold tracking-wider">开通账号总数</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl md:text-3xl font-din font-black text-white drop-shadow-[0_2px_12px_rgba(16,185,129,0.4)]">
                  {kpiAccountsCount.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 font-bold">个</span>
              </div>
            </div>
          </div>

          {/* Card 3: 规模化开通院校数 */}
          <div className="bg-gradient-to-br from-[#0e1834] to-[#040815] border border-purple-500/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-purple-400/40 transition-all duration-300 relative overflow-hidden h-36">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-purple-500/5 blur-3xl rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Circle Icon Container */}
            <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/10 rounded-xl blur-xs" />
              <div className="absolute inset-0 rounded-xl border border-dashed border-purple-400/20 group-hover:rotate-90 transition-transform duration-1000" />
              <div className="absolute inset-1.5 bg-[#030612]/90 border border-purple-500/10 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Content Displaying Metrics only */}
            <div className="mt-2">
              <p className="text-purple-400/70 text-xs font-semibold tracking-wider">规模化开通院校数</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl md:text-3xl font-din font-black text-white drop-shadow-[0_2px_12px_rgba(168,85,247,0.4)]">
                  {kpiScaleCount.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 font-bold">所</span>
              </div>
            </div>
          </div>

          {/* Card 4: 一年内到期院校数 */}
          <div className="bg-gradient-to-br from-[#0e1834] to-[#040815] border border-orange-500/20 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-orange-400/40 transition-all duration-300 relative overflow-hidden h-36">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-orange-500/5 blur-3xl rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Circle Icon Container */}
            <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-500/10 rounded-xl blur-xs" />
              <div className="absolute inset-0 rounded-xl border border-dashed border-orange-400/20 group-hover:-rotate-90 transition-transform duration-1000" />
              <div className="absolute inset-1.5 bg-[#030612]/90 border border-orange-500/10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Content Displaying Metrics only */}
            <div className="mt-2">
              <p className="text-orange-400/70 text-xs font-semibold tracking-wider">一年内到期院校数</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl md:text-3xl font-din font-black text-white drop-shadow-[0_2px_12px_rgba(249,115,22,0.4)]">
                  {kpiExpiringCount.toLocaleString()}
                </span>
                <span className="text-[11px] text-orange-400 font-bold">所</span>
              </div>
            </div>
          </div>
        </section>
         {/* ========================================================
            📈 MIDDLE ROW METRIC VISUALIZATIONS & CHARTS
            ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="applications-charts-row">
          
          {/* Chart 1: 开通形式分布 (Pie Donut Chart) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#091024]/80 to-[#040815]/95 rounded-2xl border border-cyan-500/15 p-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-[310px] group relative">
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-2">
              <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-cyan-500 rounded-sm inline-block" />
                开通形式分布
              </span>
              <span className="text-xs text-[#00f3ff] font-semibold drop-shadow-[0_0_6px_rgba(0,243,255,0.4)]">时间维度已联动</span>
            </div>
            
            <div className="flex-1 flex items-center justify-between pr-4 relative">
              {/* Donut Container */}
              <div className="w-[150px] h-[150px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dynamicFormatChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={68}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {dynamicFormatChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Embedded Center Total Info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-cyan-400 font-bold tracking-wider">总计</span>
                  <span className="text-xl font-black text-white font-din leading-none">{kpiSchoolCount.toLocaleString()}</span>
                  <span className="text-[11px] text-cyan-400 font-bold mt-0.5">所院校</span>
                </div>
              </div>
              {/* Legends Stack Info */}
              <div className="flex-1 flex flex-col gap-2.5 pl-4 z-10">
                {dynamicFormatChartData.map((item) => {
                  return (
                    <div key={item.name} className="flex items-center justify-between group/legend">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-slate-300 font-medium group-hover/legend:text-white transition-colors">{item.name}</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-xs font-bold text-white mr-1.5">{item.value}</span>
                        <span className="text-[11px] text-[#00f3ff] font-bold bg-cyan-950/45 border border-cyan-500/10 px-1.5 py-0.5 rounded">
                          {item.percent}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
          </div>

          {/* Chart 2: 账号规模区间分布 (院校数) (Horizontal Bar Chart) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#091024]/80 to-[#040815]/95 rounded-2xl border border-cyan-500/15 p-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-[310px] group">
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-2">
              <span className="text-xs font-bold text-center text-cyan-300 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-emerald-500 rounded-sm inline-block" />
                账号规模区间分布 (院校数)
              </span>
              <span className="text-xs text-[#00f3ff] font-semibold drop-shadow-[0_0_6px_rgba(0,243,255,0.4)]">时间维度已联动</span>
            </div>

            {/* Horizontal Stack representation of the horizontal bars in attachment */}
            <div className="flex-1 flex flex-col justify-around py-2 px-1">
              {(() => {
                const maxVal = Math.max(10, ...dynamicBracketChartData.map(d => d.value));
                return dynamicBracketChartData.map((item) => {
                  const percentageWidth = Math.min(100, (item.value / maxVal) * 100);
                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">{item.name} 口径</span>
                        <span className="font-din font-bold text-white tracking-wide" style={{ color: item.color }}>{item.value} <span className="text-xs text-slate-400">所</span></span>
                      </div>
                      
                      {/* The beautiful gradient bar frame */}
                      <div className="w-full bg-[#040815]/80 border border-cyan-500/10 rounded-full h-2 overflow-hidden shadow-inner flex">
                        <div 
                          className="rounded-full h-full relative transition-all duration-1000"
                          style={{ 
                            width: `${percentageWidth}%`, 
                            backgroundColor: item.color,
                            boxShadow: `0 0 10px ${item.color}50`
                          }}
                        />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Custom Bottom scale display */}
            <div className="flex items-center justify-between text-xs text-cyan-400 border-t border-cyan-500/5 pt-1.5 font-mono px-2">
              <span>0</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span className="text-cyan-500 font-bold">按当前周期分布</span>
            </div>
          </div>

          {/* Chart 3: 一年内到期院校趋势 (所) (Bar Chart) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#091024]/80 to-[#040815]/95 rounded-2xl border border-cyan-500/15 p-5 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-[310px] group">
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-1">
              <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-blue-500 rounded-sm inline-block animate-pulse" />
                一年内到期院校分月盘点 (所)
              </span>
              <div className="flex items-center gap-2 text-xs font-bold bg-cyan-950/40 border border-cyan-500/10 px-2.5 py-1 rounded-md">
                <span className="w-2 h-2 rounded bg-cyan-400 inline-block animate-pulse" />
                <span className="text-slate-300 font-mono">年内到期: {kpiExpiringCount} 所</span>
              </div>
            </div>

            {/* Simple Bar Chart reflecting count */}
            <div className="flex-1 w-full min-h-0 pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dynamicExpirationTrendData} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                  <XAxis 
                    dataKey="month" 
                    stroke="#1e293b" 
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <YAxis 
                    stroke="transparent"
                    tick={{ fill: '#94a3b8', fontSize: 10 }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#091024', borderColor: '#00f3ff', borderRadius: '8px' }}
                    labelStyle={{ color: '#00f3ff', fontWeight: 'bold', fontSize: '10px' }}
                    itemStyle={{ color: '#e2e8f0', fontSize: '11px' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#22d3ee" 
                    barSize={14} 
                    radius={[3, 3, 0, 0]}
                  >
                    {dynamicExpirationTrendData.map((entry, index) => {
                      // Highlight months with higher expire counts using rose-red
                      const isHighPeak = entry.count > 15;
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isHighPeak ? '#ef4444' : '#06b6d4'} 
                          className="hover:opacity-80 transition-opacity"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>
        </section>

        {/* ========================================================
            📋 BOTTOM SECTION: ACTIVATION DETAILED TABLE WITH INTERACTIVE SCENARIOS
            ======================================================== */}
        <section className="bg-gradient-to-br from-[#0c142b]/85 to-[#040815]/95 border border-cyan-500/15 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col p-6 gap-5 relative">
          
          {/* Table Header Controls Grid */}
          <div className="flex flex-col gap-4 border-b border-cyan-500/10 pb-4">
            
            {/* Row 1: Title, Count Info, Search Input & Export Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Side: Title & Counter info */}
              <div className="flex items-center gap-4">
                <div className="bg-cyan-500/10 p-2.5 border border-cyan-500/20 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-widest text-[#00f3ff] drop-shadow-[0_0_8px_rgba(0,243,255,0.3)]">
                    开通情况明细表
                  </h3>
                  <p className="text-[11px] text-cyan-600/80 mt-0.5">面向高职院校应用开通账号、时长及Token资源配额消耗深度监控</p>
                </div>
              </div>

              {/* Right Side: Primary School/Platform Search & Export Actuator */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative group">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-cyan-500 group-focus-within:text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)] transition-colors" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="智能搜索高职院校或开通产品名称..."
                    className="pl-9 pr-4 py-2 border border-cyan-500/25 rounded-xl text-xs w-[280px] focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all bg-[#040815]/80 text-cyan-100 placeholder:text-cyan-700/80 shadow-[0_2px_15px_rgba(0,0,0,0.4)] font-mono"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-cyan-600 hover:text-cyan-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Primary Export Actuator */}
                <button 
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4.5 py-2 hover:bg-cyan-500 hover:text-[#030712] hover:font-black bg-[#091024]/80 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-xs font-bold text-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)] active:scale-95 group"
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  <span>导出 Excel/CSV</span>
                </button>
              </div>

            </div>

            {/* Row 2: Advanced Criteria Filter Actions, Status and Active badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-1 bg-[#040816]/70 border border-cyan-500/10 p-3 rounded-xl">
              
              {/* Left Side: Statistics showing quantity */}
              <div className="text-xs text-slate-400/90 font-bold flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                已筛选 <span className="text-cyan-400 font-black font-din text-sm px-0.5">{filteredData.length}</span> / {schools.length} 条高职院校
              </div>

              {/* Right Side Group: Open Field Filter Trigger, Reset, Filter Summary and Tags */}
              <div className="flex flex-wrap items-center gap-3 justify-end md:ml-auto">
                
                {/* 字段筛选 Trigger with down triangle */}
                <div className="relative">
                  <button 
                    onClick={() => setActivePopover(activePopover === 'fields' ? null : 'fields')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold active:scale-95 transition-all cursor-pointer ${activePopover === 'fields' ? 'bg-cyan-500 border-cyan-400 text-[#030712]' : 'bg-[#080d22] border-cyan-500/25 text-cyan-300 hover:border-cyan-500/60'}`}
                  >
                    <span>📁 字段筛选</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Fields List Config Selector Dialog Panel */}
                  {activePopover === 'fields' && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.9)] z-50 text-xs text-slate-100 font-normal">
                      <div className="flex items-center justify-between border-b border-cyan-500/15 pb-2 mb-3">
                        <span className="font-[#00f3ff] text-xs font-bold text-[#00f3ff]">快捷筛选配置</span>
                        <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                      </div>
                      
                      {/* Interactive remaining days option inside field configuration */}
                      <p className="text-cyan-500 font-bold mb-1 text-xs">剩余有效期保障过滤:</p>
                      <div className="grid grid-cols-2 gap-1.5 mb-3">
                        {[
                          { label: '全部期限', value: null },
                          { label: '<30天 (严重期)', value: 30 },
                          { label: '<120天 (紧张期)', value: 120 },
                          { label: '<180天 (续约关注)', value: 180 },
                        ].map((choice, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setRemainingDaysFilter(choice.value);
                              setActivePopover(null);
                            }}
                            className={`px-2 py-1.5 text-xs rounded border text-left transition-colors truncate ${remainingDaysFilter === choice.value ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 font-medium' : 'bg-black/30 border-cyan-500/10 text-slate-400 hover:border-cyan-500/30'}`}
                          >
                            {choice.label}
                          </button>
                        ))}
                      </div>

                      <div className="w-full h-px bg-cyan-500/15 my-2" />
                      
                      <div className="flex flex-col gap-1 text-xs text-slate-400 leading-normal">
                        <span>小提示: 可以在各列头使用 ▽ 进行高阶筛查</span>
                        <span className="text-cyan-400 cursor-pointer hover:underline text-xs" onClick={handleResetFilters}>全部重置</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 重置筛选 Trigger */}
                <button 
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/15 bg-transparent hover:bg-cyan-950/20 text-xs font-bold text-cyan-500 hover:text-cyan-300 hover:border-cyan-500/30 transition-all cursor-pointer active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>重置筛选</span>
                </button>



                {/* Active Criteria Tags representation */}
                {isAnyFilterActive && (
                  <div className="flex flex-wrap items-center gap-2 ml-3">
                    {/* 1. 院校名称过滤标签 */}
                    {schoolFilter && (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-cyan-500/20 bg-cyan-950/25 text-cyan-300">
                        <span>学校: "{schoolFilter}"</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => { setSchoolFilter(""); setTempSchoolFilter(""); }} 
                        />
                      </span>
                    )}

                    {/* 2. 开通形式过滤标签 */}
                    {selectedFormats.length < 3 && selectedFormats.map(fmt => (
                      <span key={fmt} className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-cyan-500/20 bg-cyan-950/25 text-cyan-300">
                        <span>开通形式: {fmt}</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => setSelectedFormats(prev => {
                            const next = prev.filter(f => f !== fmt);
                            return next.length === 0 ? ['SaaS云服务', '私有化部署', '试用开通'] : next;
                          })} 
                        />
                      </span>
                    ))}

                    {/* 3. 首次开通时间过滤标签 */}
                    {(startDateMin || startDateMax) && (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-blue-500/20 bg-blue-950/25 text-blue-300">
                        <span>时间: {startDateMin || "早期"} 至 {startDateMax || "不限"}</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => { setStartDateMin(""); setStartDateMax(""); setTempStartDateMin(""); setTempStartDateMax(""); }} 
                        />
                      </span>
                    )}

                    {/* 4. 产品平台过滤标签 */}
                    {selectedPlatforms.length > 0 && selectedPlatforms.map(plat => (
                      <span key={plat} className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-teal-500/20 bg-teal-950/25 text-teal-300">
                        <span>平台: {plat}</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => setSelectedPlatforms(prev => prev.filter(p => p !== plat))} 
                        />
                      </span>
                    ))}

                    {/* 5. 账号数范围过滤标签 */}
                    {(minAccounts || maxAccounts) && (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-purple-500/20 bg-purple-950/25 text-purple-300">
                        <span>账号数: {minAccounts || "0"} - {maxAccounts || "不限"}</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => { setMinAccounts(""); setMaxAccounts(""); setTempMinAccounts(""); setTempMaxAccounts(""); }} 
                        />
                      </span>
                    )}

                    {/* 6. 实验时长过滤标签 */}
                    {(minHours || maxHours) && (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-orange-500/20 bg-orange-950/25 text-orange-300">
                        <span>时长: {minHours || "0"}h - {maxHours || "不限"}h</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => { setMinHours(""); setMaxHours(""); setTempMinHours(""); setTempMaxHours(""); }} 
                        />
                      </span>
                    )}

                    {/* 7. 合同年限过滤标签 */}
                    {selectedYears.length > 0 && selectedYears.map(yr => (
                      <span key={yr} className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-emerald-500/20 bg-emerald-950/25 text-emerald-300">
                        <span>年限: {yr}年</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => setSelectedYears(prev => prev.filter(y => y !== yr))} 
                        />
                      </span>
                    ))}

                    {/* 8. Token过滤标签 */}
                    {(minTokens || maxTokens) && (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-cyan-500/20 bg-cyan-950/25 text-cyan-300">
                        <span>Token额: {minTokens || "0"} - {maxTokens || "不限"}</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => { setMinTokens(""); setMaxTokens(""); setTempMinTokens(""); setTempMaxTokens(""); }} 
                        />
                      </span>
                    )}

                    {/* 9. 规模区间过滤标签 */}
                    {selectedRanges.length < 4 && selectedRanges.map(rng => (
                      <span key={rng} className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-indigo-500/20 bg-indigo-950/25 text-indigo-300">
                        <span>账号规模: {rng}</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => setSelectedRanges(prev => {
                            const next = prev.filter(r => r !== rng);
                            return next.length === 0 ? ['1-30', '31-100', '101-300', '300以上'] : next;
                          })} 
                        />
                      </span>
                    ))}

                    {/* 10. 剩余有效期过滤标签 */}
                    {remainingDaysFilter !== null && (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-red-500/20 bg-red-950/25 text-red-300">
                        <span>剩余有效期: &lt;{remainingDaysFilter}天</span>
                        <X 
                          className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer transition-colors" 
                          onClick={() => setRemainingDaysFilter(null)} 
                        />
                      </span>
                    )}

                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Actual Detailed Data Grid Table */}
          <div className="overflow-x-auto w-full rounded-xl border border-cyan-500/10 shadow-lg relative min-h-[400px]">
            <table className="w-full text-left border-collapse table-fixed min-w-[1360px]">
              
              {/* Table Headings Section */}
              <thead className="bg-[#050b1d] sticky top-0 z-20 border-b border-cyan-500/20">
                <tr className="text-cyan-300 text-xs md:text-[13px] font-extrabold uppercase tracking-wider relative">
                  
                  {/* Row 1: School Name */}
                  <th className="px-4 py-4 w-[240px] relative hover:bg-[#071330] transition-colors">
                    <div className="flex items-center justify-between gap-1.5">
                      <span 
                        onClick={() => handleSort('school')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'school' ? 'text-white underline decoration-[#00f3ff] font-extrabold' : ''}`}
                        title="点击快速按院校名称排序"
                      >
                        院校名称 {sortConfig?.key === 'school' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempSchoolFilter(schoolFilter);
                          setActivePopover(activePopover === 'school' ? null : 'school');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.school ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                        title="快速模糊筛选学校"
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* School Filter Popover */}
                    {activePopover === 'school' && (
                      <div className="absolute left-0 top-full mt-2 w-64 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">过滤学校名称</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="mb-3">
                          <input 
                            type="text" 
                            placeholder="输入院校名称关键字..." 
                            value={tempSchoolFilter || ''}
                            onChange={(e) => setTempSchoolFilter(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setSchoolFilter(tempSchoolFilter || '');
                                setActivePopover(null);
                              }
                            }}
                            className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-2 mt-1 text-xs text-slate-100 outline-none focus:border-cyan-400"
                          />
                        </div>
                        <div className="flex justify-between border-t border-[#00f3ff]/15 pt-2.5">
                          <button 
                            onClick={() => {
                              setSchoolFilter("");
                              setTempSchoolFilter("");
                              setActivePopover(null);
                            }}
                            className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                          >
                            重置
                          </button>
                          <button 
                            onClick={() => {
                              setSchoolFilter(tempSchoolFilter || '');
                              setActivePopover(null);
                            }}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded text-[11px]"
                          >
                            确定
                          </button>
                        </div>
                      </div>
                    )}
                  </th>

                  {/* Row 2: Format Filter */}
                  <th className="px-4 py-4 w-[125px] relative hover:bg-[#071330] transition-colors">
                    <div className="flex items-center justify-between gap-1">
                      <span 
                        onClick={() => handleSort('format')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'format' ? 'text-white underline decoration-[#00f3ff]' : ''}`}
                      >
                        开通形式 {sortConfig?.key === 'format' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempSelectedFormats([...selectedFormats]);
                          setFormatKeyword("");
                          setActivePopover(activePopover === 'format' ? null : 'format');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.format ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {activePopover === 'format' && (
                      <div className="absolute left-0 top-full mt-2 w-64 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">过滤开通形式</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="relative mb-3">
                          <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-cyan-700" />
                          <input 
                            type="text" 
                            placeholder="关键字..." 
                            value={formatKeyword}
                            onChange={(e) => setFormatKeyword(e.target.value)}
                            className="w-full bg-black/40 border border-cyan-500/20 rounded-lg pl-7 pr-2 py-1.5 text-xs text-slate-200"
                          />
                        </div>
                        <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                          {[
                            { name: 'SaaS云服务', count: formatCounts['SaaS云服务'] },
                            { name: '私有化部署', count: formatCounts['私有化部署'] },
                            { name: '试用开通', count: formatCounts['试用开通'] }
                          ].filter(o => o.name.includes(formatKeyword)).map(opt => {
                            const isChecked = tempSelectedFormats.includes(opt.name);
                            return (
                              <label key={opt.name} className="flex items-center justify-between p-1 hover:bg-cyan-950/20 rounded cursor-pointer transition-colors text-slate-300">
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked}
                                    onChange={() => {
                                      if (isChecked) {
                                        setTempSelectedFormats(prev => prev.filter(f => f !== opt.name));
                                      } else {
                                        setTempSelectedFormats(prev => [...prev, opt.name]);
                                      }
                                    }}
                                    className="accent-cyan-500"
                                  />
                                  <span>{opt.name}</span>
                                </div>
                                <span className="text-[10px] text-cyan-500 bg-cyan-950/50 px-1.5 rounded-full font-din">{opt.count || 0}校</span>
                              </label>
                            );
                          })}
                        </div>
                        <div className="flex justify-between border-t border-[#00f3ff]/15 pt-2.5">
                          <button 
                            onClick={() => setTempSelectedFormats(['SaaS云服务', '私有化部署', '试用开通'])}
                            className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                          >
                            重置
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedFormats(tempSelectedFormats.length === 0 ? ['SaaS云服务', '私有化部署', '试用开通'] : tempSelectedFormats);
                              setActivePopover(null);
                            }}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded text-[11px]"
                          >
                            完成
                          </button>
                        </div>
                      </div>
                    )}
                  </th>
                  
                  {/* Row 3: First Open Date */}
                  <th className="px-4 py-4 w-[130px] relative hover:bg-[#071330] transition-colors">
                    <div className="flex items-center justify-between gap-1">
                      <span 
                        onClick={() => handleSort('startDate')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'startDate' ? 'text-white underline decoration-[#00f3ff]' : ''}`}
                      >
                        开通时间 {sortConfig?.key === 'startDate' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempStartDateMin(startDateMin);
                          setTempStartDateMax(startDateMax);
                          setActivePopover(activePopover === 'startDate' ? null : 'startDate');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.startDate ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {activePopover === 'startDate' && (
                      <div className="absolute left-0 top-full mt-2 w-64 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">筛选首次开通时间</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-2 mb-3">
                          <div>
                            <span className="text-slate-400 block mb-1">开始日期:</span>
                            <input 
                              type="date" 
                              value={tempStartDateMin}
                              onChange={(e) => setTempStartDateMin(e.target.value)}
                              className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-1 px-2 text-slate-100 outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-slate-400 block mb-1">结束日期:</span>
                            <input 
                              type="date" 
                              value={tempStartDateMax}
                              onChange={(e) => setTempStartDateMax(e.target.value)}
                              className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-1 px-2 text-slate-100 outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between border-t border-[#00f3ff]/15 pt-2.5">
                          <button 
                            onClick={() => {
                              setStartDateMin(""); setStartDateMax(""); setTempStartDateMin(""); setTempStartDateMax("");
                              setActivePopover(null);
                            }}
                            className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                          >
                            重置
                          </button>
                          <button 
                            onClick={() => {
                              setStartDateMin(tempStartDateMin);
                              setStartDateMax(tempStartDateMax);
                              setActivePopover(null);
                            }}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded text-[11px]"
                          >
                            应用
                          </button>
                        </div>
                      </div>
                    )}
                  </th>

                  {/* Row 4: Platform filterable header */}
                  <th className="px-4 py-4 w-[180px] relative hover:bg-[#071330] transition-colors">
                    <div className="flex items-center justify-between gap-1">
                      <span 
                        onClick={() => handleSort('platform')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'platform' ? 'text-white underline decoration-[#00f3ff]' : ''}`}
                      >
                        产品平台 {sortConfig?.key === 'platform' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempSelectedPlatforms([...selectedPlatforms]);
                          setPlatformKeyword("");
                          setActivePopover(activePopover === 'platform' ? null : 'platform');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.platform ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {activePopover === 'platform' && (
                      <div className="absolute left-0 top-full mt-2 w-64 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">过滤产品/平台</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="relative mb-3">
                          <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-cyan-700" />
                          <input 
                            type="text" 
                            placeholder="搜索平台..." 
                            value={platformKeyword}
                            onChange={(e) => setPlatformKeyword(e.target.value)}
                            className="w-full bg-black/40 border border-cyan-500/20 rounded-lg pl-7 pr-2 py-1.5 text-xs text-slate-200"
                          />
                        </div>
                        <div className="space-y-1.5 mb-3 max-h-40 overflow-y-auto">
                          {allPlatforms.filter(p => p.toLowerCase().includes(platformKeyword.toLowerCase())).map(plat => {
                            const isChecked = tempSelectedPlatforms.includes(plat);
                            return (
                              <label key={plat} className="flex items-center gap-2 p-1 hover:bg-cyan-950/20 rounded cursor-pointer text-slate-300">
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setTempSelectedPlatforms(prev => prev.filter(p => p !== plat));
                                    } else {
                                      setTempSelectedPlatforms(prev => [...prev, plat]);
                                    }
                                  }}
                                  className="accent-cyan-500"
                                />
                                <span className="truncate" title={plat}>{plat}</span>
                              </label>
                            );
                          })}
                        </div>
                        <div className="flex justify-between border-t border-[#00f3ff]/15 pt-2.5">
                          <button 
                            onClick={() => setSelectedPlatforms([])}
                            className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                          >
                            不限
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedPlatforms(tempSelectedPlatforms);
                              setActivePopover(null);
                            }}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded text-[11px]"
                          >
                            确定
                          </button>
                        </div>
                      </div>
                    )}
                  </th>

                  {/* Row 5: Authorized accounts (已用 / 配额) */}
                  <th className="px-4 py-4 w-[150px] relative hover:bg-cyan-950/25 transition-colors">
                    <div className="flex items-center justify-between">
                      <span onDoubleClick={() => handleSort('usedAccounts')} className="cursor-pointer select-none">
                        授权账号数 <span className="text-[11px] text-slate-400 font-bold">(已用 / 配额)</span>
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempMinAccounts(minAccounts);
                          setTempMaxAccounts(maxAccounts);
                          setActivePopover(activePopover === 'accounts' ? null : 'accounts');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-500 ${(minAccounts || maxAccounts) ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30' : ''}`}
                      >
                        <Filter className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Popover slider values query on accounts */}
                    {activePopover === 'accounts' && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.8)] z-50 text-xs text-slate-100 normal-case font-normal font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">筛选授权账号规模</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <label className="text-[10px] text-slate-400">最小值 (已用账号数):</label>
                            <input 
                              type="number" 
                              placeholder="0"
                              value={tempMinAccounts}
                              onChange={(e) => setTempMinAccounts(e.target.value)}
                              className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-1.5 mt-1 text-xs text-slate-100 outline-none focus:border-cyan-400 font-din"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400">最大值 (已用账号数):</label>
                            <input 
                              type="number" 
                              placeholder="不限"
                              value={tempMaxAccounts}
                              onChange={(e) => setTempMaxAccounts(e.target.value)}
                              className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-1.5 mt-1 text-xs text-slate-100 outline-none focus:border-cyan-400 font-din"
                            />
                          </div>
                        </div>

                        <p className="text-[9px] text-cyan-600/70 mb-3 leading-tight">支持按当前已活跃开通账号数量或配额范围进行边界过滤</p>

                        <div className="flex justify-between border-t border-cyan-500/10 pt-2.5">
                          <button 
                            onClick={() => {
                              setMinAccounts("");
                              setMaxAccounts("");
                              setActivePopover(null);
                            }}
                            className="text-[10px] text-red-400 hover:text-red-300 font-medium"
                          >
                            清除
                          </button>
                          <button 
                            onClick={() => {
                              setMinAccounts(tempMinAccounts);
                              setMaxAccounts(tempMaxAccounts);
                              setActivePopover(null);
                            }}
                            className="px-4 py-1.5 bg-cyan-500 text-black font-extrabold rounded-lg text-xs transition-transform active:scale-95 shadow-lg shadow-cyan-500/20"
                          >
                            应用筛选
                          </button>
                        </div>
                      </div>
                    )}
                  </th>

                  {/* Row 6: Used Lab Hours */}
                  <th className="px-4 py-4 w-[140px] relative hover:bg-[#071330] transition-colors">
                    <div className="flex items-center justify-between gap-1">
                      <span 
                        onClick={() => handleSort('usedHours')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'usedHours' ? 'text-white underline decoration-[#00f3ff]' : ''}`}
                      >
                        实验时长数 {sortConfig?.key === 'usedHours' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempMinHours(minHours);
                          setTempMaxHours(maxHours);
                          setActivePopover(activePopover === 'hours' ? null : 'hours');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.hours ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {activePopover === 'hours' && (
                      <div className="absolute left-0 top-full mt-2 w-64 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">筛选实验总时长(h)</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-slate-400 block mb-1">最小时长:</span>
                            <input 
                              type="number" 
                              placeholder="0"
                              value={tempMinHours}
                              onChange={(e) => setTempMinHours(e.target.value)}
                              className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-1.5 text-xs text-slate-100 font-din outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-slate-400 block mb-1">最大时长:</span>
                            <input 
                              type="number" 
                              placeholder="不限"
                              value={tempMaxHours}
                              onChange={(e) => setTempMaxHours(e.target.value)}
                              className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-1.5 text-xs text-slate-100 font-din outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between border-t border-[#00f3ff]/15 pt-2.5">
                          <button 
                            onClick={() => {
                              setMinHours(""); setMaxHours(""); setTempMinHours(""); setTempMaxHours("");
                              setActivePopover(null);
                            }}
                            className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                          >
                            重置
                          </button>
                          <button 
                            onClick={() => {
                              setMinHours(tempMinHours);
                              setMaxHours(tempMaxHours);
                              setActivePopover(null);
                            }}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded text-[11px]"
                          >
                            确定
                          </button>
                        </div>
                      </div>
                    )}
                  </th>

                  {/* Row 7: License Period */}
                  <th className="px-4 py-4 w-[140px] relative hover:bg-[#071330] transition-colors">
                    <div className="flex items-center justify-between gap-1">
                      <span 
                        onClick={() => handleSort('totalYears')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'totalYears' ? 'text-white underline decoration-[#00f3ff]' : ''}`}
                      >
                        授权周期 {sortConfig?.key === 'totalYears' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempSelectedYears([...selectedYears]);
                          setActivePopover(activePopover === 'years' ? null : 'years');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.years ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {activePopover === 'years' && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">筛选合同授权年限</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-1.5 mb-3 max-h-40 overflow-y-auto">
                          {allYears.map(yr => {
                            const isChecked = tempSelectedYears.includes(yr);
                            return (
                              <label key={yr} className="flex items-center gap-2 p-1 hover:bg-cyan-950/20 rounded cursor-pointer text-slate-300">
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setTempSelectedYears(prev => prev.filter(y => y !== yr));
                                    } else {
                                      setTempSelectedYears(prev => [...prev, yr]);
                                    }
                                  }}
                                  className="accent-cyan-500"
                                />
                                <span>{yr} 年合约</span>
                              </label>
                            );
                          })}
                        </div>
                        <div className="flex justify-between border-t border-[#00f3ff]/15 pt-2.5">
                          <button 
                            onClick={() => setSelectedYears([])}
                            className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                          >
                            重置
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedYears(tempSelectedYears);
                              setActivePopover(null);
                            }}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded text-[11px]"
                          >
                            确定
                          </button>
                        </div>
                      </div>
                    )}
                  </th>

                  {/* Row 8: Tokens */}
                  <th className="px-4 py-4 w-[150px] relative hover:bg-[#071330] transition-colors">
                    <div className="flex items-center justify-between gap-1">
                      <span 
                        onClick={() => handleSort('totalTokens')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'totalTokens' ? 'text-white underline decoration-[#00f3ff]' : ''}`}
                      >
                        Token 购买量 {sortConfig?.key === 'totalTokens' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempMinTokens(minTokens);
                          setTempMaxTokens(maxTokens);
                          setActivePopover(activePopover === 'tokens' ? null : 'tokens');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.tokens ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {activePopover === 'tokens' && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">筛选Token总量</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-slate-400 block mb-1">最少 Token:</span>
                            <input 
                              type="number" 
                              placeholder="0"
                              value={tempMinTokens}
                              onChange={(e) => setTempMinTokens(e.target.value)}
                              className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-1.5 text-xs text-slate-100 font-din outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-slate-400 block mb-1">最多 Token:</span>
                            <input 
                              type="number" 
                              placeholder="不限"
                              value={tempMaxTokens}
                              onChange={(e) => setTempMaxTokens(e.target.value)}
                              className="w-full bg-[#030612] border border-cyan-500/20 rounded-md p-1.5 text-xs text-slate-100 font-din outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between border-t border-[#00f3ff]/15 pt-2.5">
                          <button 
                            onClick={() => {
                              setMinTokens(""); setMaxTokens(""); setTempMinTokens(""); setTempMaxTokens("");
                              setActivePopover(null);
                            }}
                            className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                          >
                            重置
                          </button>
                          <button 
                            onClick={() => {
                              setMinTokens(tempMinTokens);
                              setMaxTokens(tempMaxTokens);
                              setActivePopover(null);
                            }}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded text-[11px]"
                          >
                            确定
                          </button>
                        </div>
                      </div>
                    )}
                  </th>

                  {/* Row 9: Scale Range */}
                  <th className="px-4 py-4 w-[115px] relative hover:bg-[#071330] transition-colors">
                    <div className="flex items-center justify-between gap-1">
                      <span 
                        onClick={() => handleSort('range')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'range' ? 'text-white underline decoration-[#00f3ff]' : ''}`}
                      >
                        规模区间 {sortConfig?.key === 'range' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempSelectedRanges([...selectedRanges]);
                          setActivePopover(activePopover === 'range' ? null : 'range');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.range ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {activePopover === 'range' && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff]">筛选规模区间</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-1.5 mb-3 font-sans text-slate-300">
                          {['1-30', '31-100', '101-300', '300以上'].map(rng => {
                            const isChecked = tempSelectedRanges.includes(rng);
                            return (
                              <label key={rng} className="flex items-center gap-2 p-1 hover:bg-cyan-950/20 rounded cursor-pointer text-slate-300">
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setTempSelectedRanges(prev => prev.filter(r => r !== rng));
                                    } else {
                                      setTempSelectedRanges(prev => [...prev, rng]);
                                    }
                                  }}
                                  className="accent-cyan-500"
                                />
                                <span>{rng} 人规模</span>
                              </label>
                            );
                          })}
                        </div>
                        <div className="flex justify-between border-t border-[#00f3ff]/15 pt-2.5">
                          <button 
                            onClick={() => setTempSelectedRanges(['1-30', '31-100', '101-300', '300以上'])}
                            className="text-[#00f3ff] hover:underline text-[11px] font-bold font-sans"
                          >
                            全选
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedRanges(tempSelectedRanges.length === 0 ? ['1-30', '31-100', '101-300', '300以上'] : tempSelectedRanges);
                              setActivePopover(null);
                            }}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded text-[11px]"
                          >
                            确定
                          </button>
                        </div>
                      </div>
                    )}
                  </th>

                  {/* Row 10: Remaining Days */}
                  <th className="px-4 py-4 w-[130px] relative hover:bg-[#071330] transition-colors text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span 
                        onClick={() => handleSort('remainingDays')}
                        className={`cursor-pointer select-none truncate hover:text-[#00f3ff] ${sortConfig?.key === 'remainingDays' ? 'text-white underline decoration-[#00f3ff]' : ''}`}
                      >
                        剩余有效期 {sortConfig?.key === 'remainingDays' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePopover(activePopover === 'remaining' ? null : 'remaining');
                        }}
                        className={`p-1 rounded hover:bg-cyan-500/20 text-cyan-400 ${colFilterStatus.remaining ? 'text-white bg-cyan-500/30 ring-1 ring-cyan-400' : ''}`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {activePopover === 'remaining' && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-[#091129] border border-cyan-500/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.85)] z-50 text-xs text-slate-100 normal-case font-normal font-sans">
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-3">
                          <span className="font-bold text-[#00f3ff] text-xs">筛选有效期警戒</span>
                          <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-1 mb-3 bg-transparent">
                          {[
                            { label: '不限时间 (显示全部)', value: null },
                            { label: '严重预警 (<30 天)', value: 30 },
                            { label: '中度警戒 (<120 天)', value: 120 },
                            { label: '轻度关注 (<180 天)', value: 180 },
                          ].map((choice, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setRemainingDaysFilter(choice.value);
                                setActivePopover(null);
                              }}
                              className={`w-full text-left p-1.5 rounded hover:bg-cyan-950/40 text-slate-300 hover:text-white ${remainingDaysFilter === choice.value ? 'text-[#00f3ff] font-extrabold bg-[#05112e]/50' : ''}`}
                            >
                              {choice.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </th>

                </tr>
              </thead>
              
              {/* Table Data Body Segment */}
              <tbody className="divide-y divide-cyan-500/10 text-slate-300 text-xs font-mono">
                {pagedData.length > 0 ? pagedData.map((item, index) => {
                  
                  // Calculate dynamic index based on pagination Page
                  const serialNumber = (currentPage - 1) * pageSize + index + 1;

                  // Expiration colors
                  let remColor = "text-emerald-400 font-bold";
                  let remBg = "bg-emerald-500/10 border border-emerald-500/20";
                  if (item.remainingDays <= 30) {
                    remColor = "text-red-400 font-extrabold";
                    remBg = "bg-red-500/15 border border-red-500/25 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.2)]";
                  } else if (item.remainingDays <= 120) {
                    remColor = "text-amber-500 font-bold";
                    remBg = "bg-amber-500/10 border border-amber-500/20";
                  }

                  // Open format badge coloring
                  let formClass = "text-cyan-400 bg-cyan-950/40 border border-cyan-500/20";
                  if (item.format === '私有化部署') {
                    formClass = "text-emerald-400 bg-emerald-950/40 border border-emerald-500/20";
                  } else if (item.format === '试用开通') {
                    formClass = "text-orange-400 bg-orange-950/45 border border-orange-500/20";
                  }

                  // Scale interval badge coloring
                  let bkClass = "bg-blue-950/40 text-blue-300 border border-blue-500/20";
                  if (item.range === '300以上') bkClass = "bg-amber-950/40 text-amber-300 border border-amber-500/20";
                  else if (item.range === '101-300') bkClass = "bg-purple-950/40 text-purple-300 border border-purple-500/20";
                  else if (item.range === '31-100') bkClass = "bg-teal-950/40 text-teal-300 border border-teal-500/20";

                  // Calculate percents for visual indicator progress-bars
                  const accountsUsagePercent = Math.min(100, Math.round((item.usedAccounts / item.quotaAccounts) * 100)) || 0;
                  const hoursUsagePercent = Math.min(100, Math.round((item.usedHours / item.quotaHours) * 100)) || 0;
                  const yearsUsagePercent = Math.min(100, Math.round((item.usedYears / item.totalYears) * 100)) || 0;
                  const tokensUsagePercent = Math.min(100, Math.round((item.usedTokens / item.totalTokens) * 100)) || 0;

                  // Define the health conditions:
                  const isExpiringSoon = item.remainingDays <= 30;
                  const isIdleAnomaly = yearsUsagePercent >= 50 && hoursUsagePercent < 15;
                  
                  // Progress bars health check color mappings
                  let accountsBarColor = "bg-cyan-500";
                  if (accountsUsagePercent >= 90) {
                    accountsBarColor = "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
                  } else if (accountsUsagePercent < 20) {
                    accountsBarColor = "bg-amber-500 animate-pulse";
                  }

                  let hoursBarColor = "bg-[#0284c7]";
                  if (isIdleAnomaly) {
                    hoursBarColor = "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.4)]";
                  } else if (hoursUsagePercent >= 85) {
                    hoursBarColor = "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
                  }

                  let yearsBarColor = "bg-gradient-to-r from-cyan-500/80 to-indigo-500";
                  if (isExpiringSoon) {
                    yearsBarColor = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]";
                  } else if (yearsUsagePercent >= 90) {
                    yearsBarColor = "bg-amber-500";
                  }

                  return (
                    <tr 
                      key={item.id || index} 
                      className={`hover:bg-cyan-950/20 group/row transition-all duration-150 border-r border-[#00f3ff]/0 hover:border-r-[3px] hover:border-[#00f3ff] ${index % 2 === 0 ? 'bg-black/10' : 'bg-transparent'}`}
                    >
                      
                      {/* Row 1: School Name (widen to w-[240px]) */}
                      <td className="px-4 py-4 w-[240px] font-extrabold text-[#e2e8f0] text-xs md:text-sm group-hover/row:text-[#00f3ff] transition-colors relative" title={item.school}>
                        <div className="flex flex-col gap-1">
                          <span className="truncate block font-bold text-sm text-cyan-100">{item.school}</span>
                          <div className="flex flex-wrap gap-1.5 mt-0.5 items-center">
                            {isExpiringSoon && (
                              <span className="px-1.5 py-0.5 text-[9px] font-black rounded bg-red-950/65 border border-red-500/40 text-red-400 animate-pulse whitespace-nowrap shadow-[0_0_8px_rgba(239,68,68,0.25)]">
                                ⏳ 临期预警 ({item.remainingDays}天)
                              </span>
                            )}
                            {isIdleAnomaly && (
                              <span className="px-1.5 py-0.5 text-[9px] font-black rounded bg-amber-955/65 border border-amber-500/40 text-amber-400 animate-pulse whitespace-nowrap shadow-[0_0_8px_rgba(245,158,11,0.25)]">
                                ⚠️ 闲置异常 (用量低)
                              </span>
                            )}
                            {!isExpiringSoon && !isIdleAnomaly && (
                              <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-emerald-950/50 border border-emerald-500/25 text-emerald-400 whitespace-nowrap">
                                ✓ 运行状况良好
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Row 2: Format Badge */}
                      <td className="px-4 py-4 w-[125px]">
                        <span className={`px-2.5 py-1.5 rounded-md text-xs font-black inline-block whitespace-nowrap tracking-wide leading-none ${formClass}`}>
                          {item.format}
                        </span>
                      </td>

                      {/* Row 3: Start/Open Date */}
                      <td className="px-4 py-4 w-[130px] text-slate-400 font-din text-xs md:text-[13px] font-semibold">
                        {item.startDate}
                      </td>

                      {/* Row 4: Product Platform */}
                      <td className="px-4 py-4 w-[180px] text-slate-300 font-bold text-xs md:text-sm truncate group-hover/row:text-white transition-colors" title={item.platform}>
                        {item.platform}
                      </td>

                      {/* Row 5: Authorized Accounts (used / quota) */}
                      <td className="px-4 py-4 w-[150px] relative">
                        <div className="space-y-1">
                          <div className="flex items-baseline justify-between text-xs md:text-[13px]">
                            <span className="text-cyan-300 font-din font-black">{item.usedAccounts.toLocaleString()}</span>
                            <span className="text-slate-500 font-din">/ {item.quotaAccounts.toLocaleString()}</span>
                          </div>
                          {/* Visual progress scale */}
                          <div className="w-full h-1.5 bg-[#030612] rounded overflow-hidden flex relative">
                            <div 
                              className={`h-full rounded-r ${accountsBarColor}`} 
                              style={{ width: `${accountsUsagePercent}%` }}
                            />
                            <span className="absolute right-1 text-[10px] text-slate-400 font-din leading-none -top-0.5">{accountsUsagePercent}%</span>
                          </div>
                        </div>
                      </td>

                      {/* Row 6: Lab Hours Duration (used / quota) */}
                      <td className="px-4 py-4 w-[140px] relative">
                        <div className="space-y-1">
                          <div className="flex items-baseline justify-between text-xs md:text-[13px]">
                            <span className="text-[#38bdf8] font-din font-black">{item.usedHours.toLocaleString()}h</span>
                            <span className="text-slate-500 font-din">/ {item.quotaHours.toLocaleString()}h</span>
                          </div>
                          {/* Visual progress speed */}
                          <div className="w-full h-1.5 bg-[#030612] rounded overflow-hidden flex relative">
                            <div 
                              className={`h-full rounded-r ${hoursBarColor}`}
                              style={{ width: `${hoursUsagePercent}%` }}
                            />
                            <span className="absolute right-1 text-[10px] text-slate-400 font-din leading-none -top-0.5">{hoursUsagePercent}%</span>
                          </div>
                        </div>
                      </td>

                      {/* Row 7: License Period Years (used / total) */}
                      <td className="px-4 py-4 w-[140px] relative">
                        <div className="space-y-1">
                          <div className="flex items-baseline justify-between text-xs md:text-[13px]">
                            <span className="text-indigo-300 font-din font-black">{item.usedYears}年</span>
                            <span className="text-slate-500 font-din">/ {item.totalYears}年</span>
                          </div>
                          {/* Visual progress cycle */}
                          <div className="w-full h-1.5 bg-[#030612] rounded overflow-hidden flex relative">
                            <div 
                              className={`h-full rounded-r ${yearsBarColor}`}
                              style={{ width: `${yearsUsagePercent}%` }}
                            />
                            <span className="absolute right-1 text-[10px] text-slate-400 font-din leading-none -top-0.5">{yearsUsagePercent}%</span>
                          </div>
                        </div>
                      </td>

                      {/* Row 8: Tokens Metrics (used / total) */}
                      <td className="px-4 py-4 w-[150px] relative">
                        <div className="space-y-1">
                          <div className="flex items-baseline justify-between text-xs md:text-[13px]">
                            <span className="text-amber-400 font-din font-black">{item.usedTokens.toLocaleString()}</span>
                            <span className="text-slate-500 font-din">/ {item.totalTokens.toLocaleString()}</span>
                          </div>
                          {/* Visual token bar */}
                          <div className="w-full h-1.5 bg-[#030612] rounded overflow-hidden flex relative">
                            <div 
                              className="h-full bg-amber-400 rounded-r shadow-[0_0_5px_rgba(251,191,36,0.3)]" 
                              style={{ width: `${tokensUsagePercent}%` }}
                            />
                            <span className="absolute right-1 text-[10px] text-slate-400 font-din leading-none -top-0.5">{tokensUsagePercent}%</span>
                          </div>
                        </div>
                      </td>

                      {/* Row 10: Size bracket range size */}
                      <td className="px-4 py-4 w-[115px] text-center">
                        <span className={`px-2.5 py-1.5 bg-transparent rounded text-xs font-black inline-block leading-none ${bkClass}`}>
                          {item.range}
                        </span>
                      </td>

                      {/* Row 11: Remaining Validity Days */}
                      <td className="px-4 py-4 w-[130px] text-right">
                        <span className={`px-2.5 py-1.5 rounded-lg text-xs leading-none font-extrabold inline-block text-center ${remBg} ${remColor}`}>
                          {item.remainingDays}天
                        </span>
                      </td>

                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={10} className="px-5 py-24 text-center text-cyan-500/50 font-bold text-sm bg-black/20">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <span className="text-cyan-400 tracking-wider font-extrabold text-[#00f3ff] text-xs md:text-sm">没有检索到符合过滤限制的高职院校资源数据</span>
                        <button onClick={handleResetFilters} className="px-4 py-2 bg-cyan-950/50 hover:bg-cyan-500 hover:text-black border border-cyan-500/30 font-black rounded-lg text-xs text-cyan-400 transition-all">
                          立即重置筛选器
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Navigation and Selector */}
          <div className="bg-[#040815]/90 border border-cyan-500/10 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm font-bold text-cyan-500">
            
            {/* Page Size Options */}
            <div className="flex items-center gap-3 select-none">
              <span>每页显示</span>
              <div className="relative">
                <select 
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="bg-[#091024] cursor-pointer outline-none border border-cyan-500/30 hover:border-cyan-400 rounded-lg px-2.5 py-1.5 text-cyan-300 font-mono text-xs md:text-sm focus:ring-1 focus:ring-[#00f3ff] shadow-inner"
                >
                  {[5, 10, 15, 20].map(sz => (
                    <option key={sz} value={sz} className="bg-[#091024]">{sz} 条</option>
                  ))}
                </select>
              </div>
              <span>记录</span>
            </div>

            {/* Paging Buttons */}
            <div className="flex items-center gap-2 select-none">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-cyan-500/10 bg-[#091024]/40 hover:bg-[#091024]/80 disabled:opacity-35 rounded-lg text-cyan-400 hover:text-cyan-100 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3.5 py-1.5 text-xs md:text-sm font-black transition-all rounded-lg cursor-pointer ${currentPage === p ? 'bg-cyan-500 text-[#040815]' : 'border border-cyan-500/10 bg-transparent text-cyan-500 hover:border-cyan-500/30 hover:text-cyan-300'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-cyan-500/10 bg-[#091024]/40 hover:bg-[#091024]/80 disabled:opacity-35 rounded-lg text-cyan-400 hover:text-cyan-100 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
