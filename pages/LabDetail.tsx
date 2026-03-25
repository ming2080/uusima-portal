import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Clock, BarChart, Users, CheckCircle, Monitor, Server, Shield, BookOpen, Star, ChevronRight, Heart } from 'lucide-react';
import { User } from '../types';

interface LabDetailProps {
  user: User | null;
  onLoginRequest: () => void;
}

// Mock data for lab details
const LAB_DETAILS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Linux 服务器管理与运维实战',
    description: '本实验环境提供真实的 CentOS 7 实例，带你从零开始掌握 Linux 系统的核心管理技能。涵盖文件系统、用户权限、进程管理、网络配置及基础 Shell 脚本编写。',
    category: '操作系统',
    difficulty: '初级',
    duration: '120 分钟',
    enrolled: 1250,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1200',
    instructor: {
      name: '张建国',
      title: '资深系统架构师',
      avatar: 'https://picsum.photos/seed/zhang/100'
    },
    objectives: [
      '熟练使用 Linux 基础命令行工具',
      '掌握文件与目录的权限管理 (chmod, chown)',
      '了解系统进程监控与管理 (ps, top, kill)',
      '配置基础网络设置与防火墙规则'
    ],
    syllabus: [
      { title: '环境准备与基础命令', duration: '20 分钟' },
      { title: '用户与权限管理', duration: '30 分钟' },
      { title: '软件包管理与服务配置', duration: '40 分钟' },
      { title: '系统监控与日志分析', duration: '30 分钟' }
    ],
    prerequisites: '具备基本的计算机操作知识，了解操作系统的基本概念。'
  },
  '2': {
    id: '2',
    title: 'Cisco Packet Tracer 企业级网络架构',
    description: '使用 Cisco Packet Tracer 模拟器，设计、配置并排查复杂的企业级网络拓扑。学习 VLAN、路由协议 (OSPF, EIGRP) 及访问控制列表 (ACL)。',
    category: '网络工程',
    difficulty: '中级',
    duration: '180 分钟',
    enrolled: 890,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&q=80&w=1200',
    instructor: {
      name: '李思科',
      title: 'CCIE 认证网络专家',
      avatar: 'https://picsum.photos/seed/li/100'
    },
    objectives: [
      '设计多层交换网络架构',
      '配置 VLAN 间路由',
      '实施 OSPF 动态路由协议',
      '配置标准与扩展 ACL 保护网络安全'
    ],
    syllabus: [
      { title: '网络拓扑设计与物理连接', duration: '30 分钟' },
      { title: 'VLAN 与 Trunking 配置', duration: '45 分钟' },
      { title: 'OSPF 路由协议实施', duration: '60 分钟' },
      { title: 'ACL 安全策略部署', duration: '45 分钟' }
    ],
    prerequisites: '了解 TCP/IP 协议栈，熟悉基础的网络概念（IP地址、子网掩码）。'
  }
};

const LabDetail: React.FC<LabDetailProps> = ({ user, onLoginRequest }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus'>('overview');
  const [isFavorited, setIsFavorited] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fallback to lab 1 if not found
  const lab = LAB_DETAILS[id || '1'] || LAB_DETAILS['1'];

  const handleStartLab = () => {
    if (user) {
      navigate(`/lab-session/${lab.id}`);
    } else {
      onLoginRequest();
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    setToastMessage(isFavorited ? "已取消收藏" : "收藏成功！");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {toastMessage}
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex text-sm text-gray-500 mb-6">
            <button onClick={() => navigate('/labs')} className="hover:text-blue-600 transition-colors">实训中心</button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">{lab.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Info */}
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-4">
                {lab.category}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {lab.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {lab.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center">
                  <BarChart className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="font-medium">难度: {lab.difficulty}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="font-medium">时长: {lab.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="font-medium">{lab.enrolled} 人已学习</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 mr-1 fill-current" />
                  <span className="font-bold text-gray-900">{lab.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={handleStartLab}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  开始实验
                </button>
                <button 
                  onClick={handleFavorite}
                  className={`px-6 py-3.5 border text-lg font-medium rounded-xl transition-all flex items-center ${
                    isFavorited 
                      ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? '已收藏' : '收藏'}
                </button>
              </div>
            </div>

            {/* Right: Thumbnail & Instructor */}
            <div className="w-full lg:w-[400px] flex-shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 mb-6 aspect-video">
                <img src={lab.thumbnail} alt={lab.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
                <img src={lab.instructor.avatar} alt={lab.instructor.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-0.5">授课导师</div>
                  <div className="text-base font-bold text-gray-900">{lab.instructor.name}</div>
                  <div className="text-sm text-gray-600">{lab.instructor.title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-4 text-base font-medium transition-colors relative ${activeTab === 'overview' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
              >
                实验概述
                {activeTab === 'overview' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('syllabus')}
                className={`pb-4 px-4 text-base font-medium transition-colors relative ${activeTab === 'syllabus' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
              >
                实验大纲
                {activeTab === 'syllabus' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-bold text-gray-900 mb-4">你将学到什么</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {lab.objectives.map((obj: string, idx: number) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">前置要求</h3>
                <div className="bg-gray-100 rounded-xl p-5 text-gray-700 leading-relaxed mb-10 border border-gray-200">
                  {lab.prerequisites}
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-bold text-gray-900 mb-6">实验步骤</h3>
                <div className="space-y-4">
                  {lab.syllabus.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center hover:border-blue-300 transition-colors shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">实验环境特性</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Monitor className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">沉浸式 Web 终端</div>
                    <div className="text-xs text-gray-500 mt-1">无需安装任何本地软件，浏览器即开即用。</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Server className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">独享云端资源</div>
                    <div className="text-xs text-gray-500 mt-1">每个实验实例均为独立隔离环境，保障性能。</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">安全沙箱隔离</div>
                    <div className="text-xs text-gray-500 mt-1">实验结束后自动销毁，无需担心破坏系统。</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <BookOpen className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">AI 智能助教</div>
                    <div className="text-xs text-gray-500 mt-1">实验过程中提供实时的错误排查与指导。</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDetail;
