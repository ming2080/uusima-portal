import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  Settings,
  MoreVertical,
  Calendar,
  Link as LinkIcon,
  Settings2,
  MoreHorizontal
} from "lucide-react";

interface Exam {
  id: number;
  name: string;
  sessionCount: number;
  category: string;
  time: string;
  candidateCount: number;
  status: string;
  isLinked: boolean;
  creator: string;
}

const ExamManage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const exams: Exam[] = [
    { id: 1, name: "区块链", sessionCount: 1, category: "模拟考试", time: "2026-03-16 14:00:00 ~ 2027-03-12 23:59:59", candidateCount: 0, status: "进行中", isLinked: true, creator: "林志斌" },
    { id: 2, name: "大数据 - 场次", sessionCount: 1, category: "模拟考试", time: "2026-03-16 14:00:00 ~ 2027-04-23 23:59:59", candidateCount: 1, status: "进行中", isLinked: true, creator: "林志斌" },
    { id: 3, name: "物联网 - 场次", sessionCount: 1, category: "模拟考试", time: "2026-03-16 14:00:00 ~ 2027-03-19 23:59:59", candidateCount: 0, status: "进行中", isLinked: true, creator: "林志斌" },
    { id: 4, name: "人工智能 - 场次", sessionCount: 1, category: "模拟考试", time: "2026-03-16 14:00:00 ~ 2027-03-05 23:59:59", candidateCount: 0, status: "进行中", isLinked: true, creator: "林志斌" },
    { id: 5, name: "学伴考试26.03.09.19", sessionCount: 1, category: "初级软件工程师", time: "2026-03-09 00:00:00 ~ 2026-03-13 23:59:59", candidateCount: 0, status: "已结束", isLinked: true, creator: "" },
    { id: 6, name: "已结束未发布考试", sessionCount: 1, category: "初级软件工程师", time: "2026-01-16 17:00:00 ~ 2026-01-31 23:59:59", candidateCount: 0, status: "已结束", isLinked: false, creator: "林娜 (超级管理员)" },
    { id: 7, name: "123", sessionCount: 0, category: "初级软件工程师", time: "-", candidateCount: 0, status: "未发布", isLinked: false, creator: "林娜 (超级管理员)" },
    { id: 8, name: "我是测试未发布考试", sessionCount: 1, category: "计算机等级考试", time: "2026-01-20 00:00:00 ~ 2026-01-31 23:59:59", candidateCount: 0, status: "未发布", isLinked: false, creator: "郭尧锋" },
    { id: 9, name: "实操题考试", sessionCount: 5, category: "计算机等级考试", time: "2026-01-16 10:17:00 ~ 2027-01-16 23:59:59", candidateCount: 2, status: "进行中", isLinked: true, creator: "郭尧锋" },
    { id: 10, name: "小锋测试考试", sessionCount: 2, category: "初级软件工程师", time: "2026-01-13 17:20:00 ~ 2026-01-31 23:59:59", candidateCount: 1, status: "未发布", isLinked: false, creator: "郭尧锋" },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === exams.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(exams.map(e => e.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center">
        <div className="w-40">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">选择考试分类</option>
            <option value="mock">模拟考试</option>
            <option value="cert">初级软件工程师</option>
          </select>
        </div>
        <div className="w-40">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">选择考试状态</option>
            <option value="ongoing">进行中</option>
            <option value="ended">已结束</option>
            <option value="unreleased">未发布</option>
          </select>
        </div>
        <div className="w-40">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="考试开始时间"
              className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="w-40">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="考试结束时间"
              className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="w-48">
          <input
            type="text"
            placeholder="搜索考试名称"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors ml-auto">
          <RotateCcw className="w-4 h-4" />
          重置
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 items-center">
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          新增
        </button>
        <button 
          disabled={selectedIds.length !== 1}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-lg disabled:cursor-not-allowed"
        >
          <Edit className="w-4 h-4" />
          编辑
        </button>
        <button 
          disabled={selectedIds.length === 0}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-lg disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          删除
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === exams.length && exams.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">考试名称</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">场次数量</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">考试分类</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">考试时间</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">考试人数</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">考试状态</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">是否关联任务</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">创建人</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(e.id)}
                    onChange={() => toggleSelect(e.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    {e.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{e.sessionCount}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{e.category}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{e.time}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{e.candidateCount}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    e.status === '进行中' ? 'text-blue-600 bg-blue-50' : 
                    e.status === '已结束' ? 'text-slate-500 bg-slate-100' : 
                    'text-red-500 bg-red-50'
                  }`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 w-fit ${
                    e.isLinked ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'
                  }`}>
                    {e.isLinked ? <><LinkIcon className="w-3 h-3" /> 已关联</> : <><LinkIcon className="w-3 h-3" /> 未关联</>}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{e.creator || "-"}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                      <Settings className="w-3.5 h-3.5" />
                      状态
                    </button>
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                      <Settings2 className="w-3.5 h-3.5" />
                      设置
                    </button>
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                      更多
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between bg-white border-t border-slate-100">
          <div className="text-sm text-slate-500">
            共14条
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium bg-blue-600 text-white">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
                2
              </button>
            </div>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 ml-4">
              <select className="px-2 py-1 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none">
                <option>10 条/页</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamManage;
