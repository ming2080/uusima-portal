import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, Terminal, List, Maximize2, X, 
  Search, ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
  MessageSquare, Plus, Paperclip, Send, Image as ImageIcon,
  Bot
} from 'lucide-react';

const AIInteraction: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const [activeLeftTab, setActiveLeftTab] = useState<'guide' | 'commands' | 'syllabus'>('guide');
  const [activeCommandTab, setActiveCommandTab] = useState('greenhouse');
  const [chatInput, setChatInput] = useState('');

  // Mock course data
  const courseTitle = "边缘计算技术应用";

  const commandTabs = [
    { id: 'greenhouse', label: '智慧温室' },
    { id: 'home', label: '智慧家居' },
    { id: 'mask', label: '智能口罩检测' },
  ];

  const commands = [
    "请介绍智慧温室项目通过物联网技术实现温湿度的自动控制操作步骤",
    "请介绍在智慧温室项目中，Zigbee设备接入EdgeX的操作步骤",
    "请介绍在ThingsBoard平台智慧温室项目的实时仪表盘的设计步骤"
  ];

  const suggestedQuestions = [
    "请介绍下这门课程的主要内容",
    "这门课程的主要大纲内容有哪些",
    "请介绍下这门课程的技术栈有哪些"
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center px-4 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors mr-2 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-lg font-bold text-slate-800">{courseTitle}</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        
        {/* Left Panel - Document/Tools */}
        <div className="w-[60%] flex bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-20 bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 gap-4 shrink-0">
            <button 
              onClick={() => setActiveLeftTab('guide')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${activeLeftTab === 'guide' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs font-medium">指导书</span>
            </button>
            <button 
              onClick={() => setActiveLeftTab('commands')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${activeLeftTab === 'commands' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <Terminal className="w-6 h-6" />
              <span className="text-xs font-medium">指令库</span>
            </button>
            <button 
              onClick={() => setActiveLeftTab('syllabus')}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${activeLeftTab === 'syllabus' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <List className="w-6 h-6" />
              <span className="text-xs font-medium">目录</span>
            </button>
          </div>

          {/* Left Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-100 flex items-center justify-end px-4 gap-2 shrink-0">
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"><Maximize2 className="w-4 h-4" /></button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-hidden flex">
              {activeLeftTab === 'guide' && (
                <div className="flex-1 flex flex-col bg-slate-100 p-4 overflow-auto">
                  {/* PDF Viewer Mock */}
                  <div className="bg-white shadow-sm mx-auto w-full max-w-3xl min-h-[800px] p-12">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-8">
                      <div className="flex items-center gap-4">
                        <button className="p-1 hover:bg-slate-100 rounded"><List className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-slate-100 rounded"><Search className="w-4 h-4" /></button>
                        <div className="flex items-center gap-2 text-sm">
                          <input type="text" defaultValue="1" className="w-10 border rounded px-1 text-center" />
                          <span>/ 67</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-slate-100 rounded"><ZoomOut className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-slate-100 rounded"><ZoomIn className="w-4 h-4" /></button>
                      </div>
                    </div>
                    
                    <div className="prose prose-slate max-w-none">
                      <h1 className="text-3xl font-bold mb-8">1 AIoT 案例——智慧温室</h1>
                      <h2 className="text-xl font-bold mb-4">1.1 背景</h2>
                      <p className="text-sm leading-relaxed text-slate-700 mb-4">
                        据联合国机构发布《2020年世界粮食安全和营养状况报告》报告显示，2019年全球近6.9亿人处于饥饿状态，与2018年相比增加1000万，与5年前相比增加近6000万。2020年，全球预计将至少新增约8300万饥饿人口，甚至可能新增超过1.3亿。世界粮食安全问题不容忽视。党的十八大以来，以习近平同志为核心的党中央把粮食安全作为治国理政的头等大事，提出了“确保谷物基本自给、口粮绝对安全”的新粮食安全观，确立了以我为主、立足国内、确保产能、适度进口、科技支撑的国家粮食安全战略，始终坚持走中国特色粮食安全之路。
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700 mb-4">
                        温度是植物生命活动的生存因子，它对植物的生长发育影响很大。热带、亚热带地区生长的植物对温度要求较高，原产于北方的植物要求偏低。把热带和亚热带植物移到寒冷的北方栽培，常因气温太低不能正常生长发育，甚至冻死。喜温凉爽的北方植物，移至南方生长，虽然温度增加，但终因冬季低温不够而生长不良或影响开花。
                      </p>
                      <h2 className="text-xl font-bold mb-4 mt-8">1.2 改造需求</h2>
                      <p className="text-sm leading-relaxed text-slate-700 mb-4">
                        智慧恒温系统用于作物种植环境的温度调节，根据节能环保的原则，该系统分别测量室内外温度，并使用“大功率温室恒温机”和“低功耗空气循环器”两种方式实现自动恒温管理。当室内温度超过客户指定的正常阈值时，系统需根据室外温度自行决定启动的“恒温”设备，由此实现智能化功耗控制系统。智慧温室内部与外部的温度、湿度数据、以及温度调节设备是否启动，需在云端实时显示。完成系统搭建的同时，需为客户提供控制系统设计图纸并附上文字说明，清晰的描述执行逻辑。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'commands' && (
                <div className="flex-1 flex flex-col">
                  {/* Command Tabs */}
                  <div className="flex border-b border-slate-100 px-4">
                    {commandTabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveCommandTab(tab.id)}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeCommandTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Command List */}
                  <div className="flex-1 overflow-auto p-6">
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-slate-500 mb-4">智慧温室（教材）</h3>
                      <div className="space-y-3">
                        {commands.map((cmd, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setChatInput(cmd)}
                            className="w-full text-left p-4 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors text-sm"
                          >
                            {cmd}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-4">智慧温室（视频）</h3>
                      {/* Video commands would go here */}
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'syllabus' && (
                <div className="flex-1 p-6 overflow-auto">
                  <h2 className="text-lg font-bold mb-6">课程目录</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h3 className="font-medium text-slate-800 mb-2">第一章：智能家居环境监测系统</h3>
                      <ul className="space-y-2 text-sm text-slate-600 pl-4 list-disc">
                        <li>1.1-1 使用MQTT协议将设备接入TB</li>
                        <li>2.1-2 分析通过EdgeX和Node-RED将设备接入TB的技术架构</li>
                        <li>3.1-3 在仿真平台安装ZigBee网络设备</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - AI Chat */}
        <div className="w-[40%] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
          {/* Chat Header Area */}
          <div className="flex flex-col items-center justify-center pt-12 pb-8 px-6 border-b border-slate-50">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{courseTitle}</h2>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
            {/* Welcome Message */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-blue-600">欢迎来到多模态智能实训平台~</h3>
                  <button className="px-4 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-500 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                    <List className="w-4 h-4" />
                    进入实验
                  </button>
                </div>
                
                {/* Suggested Questions */}
                <div className="space-y-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setChatInput(q)}
                      className="flex items-center justify-between w-fit px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition-colors group"
                    >
                      {q}
                      <ArrowLeft className="w-4 h-4 ml-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center justify-between mb-4 px-2">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <MessageSquare className="w-4 h-4" />
                会话列表
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                <Plus className="w-4 h-4" />
                新建会话
              </button>
            </div>
            
            <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <textarea 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="点击这里开始提问"
                className="w-full bg-transparent border-none focus:ring-0 resize-none p-2 text-sm min-h-[80px]"
              />
              <div className="flex items-center justify-between px-2 pb-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"><BookOpen className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"><Paperclip className="w-4 h-4" /></button>
                </div>
                <button className={`p-2 rounded-xl transition-colors ${chatInput.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400'}`}>
                  <ArrowLeft className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIInteraction;
