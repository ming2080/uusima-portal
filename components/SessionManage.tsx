import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Settings,
  MoreHorizontal
} from "lucide-react";

interface Session {
  id: number;
  name: string;
  examName: string;
  paperType: string;
  time: string;
  totalScore: number;
  passingScore: number;
  candidateCount: number;
  status: string;
  creator: string;
}

const SessionManage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const sessions: Session[] = [
    { id: 1, name: "实操 - 场次", examName: "实操题考试", paperType: "实操", time: "2026-03-09 00:00:00 ~ 2026-03-22 23:59:59", totalScore: 55, passingScore: 33, candidateCount: 1, status: "阅卷中", creator: "林娜 (超级管理员)" },
    { id: 2, name: "物联网 - 场次", examName: "物联网 - 场次", paperType: "理论", time: "2026-03-16 14:00:00 ~ 2027-03-19 23:59:59", totalScore: 100, passingScore: 60, candidateCount: 0, status: "考试中", creator: "林志斌" },
    { id: 3, name: "人工智能 - 场次", examName: "人工智能 - 场次", paperType: "理论", time: "2026-03-16 14:00:00 ~ 2027-03-05 23:59:59", totalScore: 100, passingScore: 60, candidateCount: 0, status: "考试中", creator: "林志斌" },
    { id: 4, name: "区块链 - 场次", examName: "区块链", paperType: "理论", time: "2026-03-16 14:00:00 ~ 2027-03-12 23:59:59", totalScore: 100, passingScore: 60, candidateCount: 0, status: "考试中", creator: "林志斌" },
    { id: 5, name: "大数据 - 场次", examName: "大数据 - 场次", paperType: "理论", time: "2026-03-16 14:00:00 ~ 2027-04-23 23:59:59", totalScore: 100, passingScore: 60, candidateCount: 1, status: "考试中", creator: "林志斌" },
    { id: 6, name: "学伴030919 - 场次", examName: "学伴考试26.03.09.19", paperType: "理论", time: "2026-03-09 00:00:00 ~ 2026-03-13 23:59:59", totalScore: 100, passingScore: 60, candidateCount: 0, status: "待阅卷", creator: "" },
    { id: 7, name: "实操试卷01 - 场次", examName: "实操题考试", paperType: "实操", time: "2026-02-12 00:00:00 ~ 2026-03-31 23:59:59", totalScore: 50, passingScore: 30, candidateCount: 1, status: "考试中", creator: "林娜 (超级管理员)" },
    { id: 8, name: "实操题试卷 01", examName: "实操题考试", paperType: "实操", time: "2026-01-16 17:00:00 ~ 2027-01-16 23:59:59", totalScore: 10, passingScore: 6, candidateCount: 1, status: "考试中", creator: "林娜 (超级管理员)" },
    { id: 9, name: "实操题试卷 - 场次3333333333", examName: "实操题考试", paperType: "实操", time: "2026-01-16 17:00:00 ~ 2026-01-31 23:59:59", totalScore: 10, passingScore: 6, candidateCount: 1, status: "待阅卷", creator: "郭尧锋" },
    { id: 10, name: "实操题试卷 - 场次3333333333-复制", examName: "已结束未发布考试", paperType: "实操", time: "2026-01-16 17:00:00 ~ 2026-01-31 23:59:59", totalScore: 10, passingScore: 6, candidateCount: 0, status: "待阅卷", creator: "林娜 (超级管理员)" },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === sessions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sessions.map(s => s.id));
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
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="场次开始时间"
              className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="w-40">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="场次结束时间"
              className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="w-40">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">选择试卷类型</option>
            <option value="theory">理论</option>
            <option value="practice">实操</option>
          </select>
        </div>
        <div className="w-48">
          <input
            type="text"
            placeholder="搜索场次名称"
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
                  checked={selectedIds.length === sessions.length && sessions.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">场次名称</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">考试名称</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">试卷类型</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">场次时间</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">总分</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">及格分</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">考试人数</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">状态</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">创建人</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(s.id)}
                    onChange={() => toggleSelect(s.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    {s.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.examName}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.paperType}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.time}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.totalScore}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.passingScore}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.candidateCount}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    s.status === '阅卷中' ? 'text-blue-600 bg-blue-50' : 
                    s.status === '考试中' ? 'text-emerald-600 bg-emerald-50' : 
                    'text-amber-600 bg-amber-50'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.creator || "-"}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                      <Settings className="w-3.5 h-3.5" />
                      状态
                    </button>
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                      更多功能
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
            共18条
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

export default SessionManage;
