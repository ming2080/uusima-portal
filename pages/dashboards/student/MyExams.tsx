import React, { useState } from 'react';
import { Search, Filter, Clock, FileText, ChevronRight, Calendar as CalendarIcon, CheckCircle, Play } from 'lucide-react';

const MyExams: React.FC = () => {
  const [activeTab, setActiveTab] = useState('平台考试');

  const exams = [
    {
      id: 1,
      title: '机器学习算法应用能力测试',
      major: '人工智能专业',
      difficulty: '高级难度',
      duration: '120分钟',
      questions: 40,
      startTime: '2023-11-15 09:00开始',
      status: '进行中',
      timeLeft: '1h45m',
      type: '平台考试'
    },
    {
      id: 2,
      title: 'Python数据分析与可视化测试',
      major: '人工智能专业',
      difficulty: '中级难度',
      duration: '90分钟',
      questions: 35,
      startTime: '2023-11-16 14:00开始',
      status: '待参加',
      type: '平台考试'
    },
    {
      id: 3,
      title: '深度学习框架应用评估',
      major: '人工智能专业',
      difficulty: '高级难度',
      duration: '150分钟',
      questions: 45,
      startTime: '2023-11-18 10:00开始',
      status: '待开始',
      type: '平台考试'
    },
    {
      id: 4,
      title: '人工智能基础理论测试',
      major: '人工智能专业',
      difficulty: '初级难度',
      duration: '60分钟',
      questions: 30,
      startTime: '2023-11-10 15:00完成',
      status: '已完成',
      score: '92/100',
      type: '平台考试'
    }
  ];

  const tabs = ['平台考试', '认证', '竞赛'];

  return (
    <div className="flex gap-6">
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-8 border-b border-gray-100 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索考试名称..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>全部状态</option>
            <option>进行中</option>
            <option>待参加</option>
            <option>已完成</option>
          </select>
          <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>全部专业</option>
            <option>人工智能</option>
            <option>物联网</option>
          </select>
        </div>

        <div className="space-y-4">
          {exams.map(exam => (
            <div key={exam.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    exam.status === '进行中' ? 'bg-amber-100 text-amber-700' :
                    exam.status === '待参加' ? 'bg-blue-100 text-blue-700' :
                    exam.status === '待开始' ? 'bg-indigo-100 text-indigo-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {exam.status}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{exam.title}</h3>
                    <p className="text-xs text-gray-500">{exam.major} · {exam.difficulty}</p>
                  </div>
                </div>
                {exam.status === '进行中' && (
                  <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                    <Clock className="w-3 h-3" />
                    剩余: {exam.timeLeft}
                  </div>
                )}
                {exam.status === '已完成' && (
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">成绩:</p>
                    <p className="text-lg font-bold text-emerald-600">{exam.score}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {exam.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {exam.questions}题
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {exam.startTime}
                  </div>
                </div>
                <button className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  exam.status === '进行中' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
                  exam.status === '待参加' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                  exam.status === '待开始' ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed' :
                  'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}>
                  {exam.status === '进行中' ? '继续考试' :
                   exam.status === '待参加' ? '进入考试' :
                   exam.status === '待开始' ? '未开始' :
                   '查看详情'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="text-blue-600 text-sm flex items-center gap-2 mx-auto">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            加载中...
          </button>
        </div>
      </div>

      <div className="w-80 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-gray-900">考试日历</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <ChevronRight className="w-4 h-4 rotate-180 cursor-pointer" />
              <span>2023年11月</span>
              <ChevronRight className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs mb-4">
            {['日', '一', '二', '三', '四', '五', '六'].map(d => (
              <div key={d} className="text-gray-400 py-2">{d}</div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 21;
              const hasExam = [11, 15, 16, 18, 21, 22].includes(day);
              return (
                <div
                  key={i}
                  className={`py-2 rounded-lg relative cursor-pointer hover:bg-gray-50 ${
                    isToday ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700'
                  }`}
                >
                  {day}
                  {hasExam && (
                    <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      day === 11 ? 'bg-emerald-500' :
                      day === 15 ? 'bg-amber-500' :
                      day === 16 ? 'bg-blue-500' :
                      day === 18 ? 'bg-indigo-500' :
                      'bg-blue-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-6">今日考试</h2>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-bold text-gray-900">机器学习算法应用能力测试</h3>
              <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] rounded uppercase font-bold">进行中</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">人工智能专业 · 高级难度</p>
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  09:00 - 11:00
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  50题 · 120分钟
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExams;
