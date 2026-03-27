import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Copy
} from "lucide-react";

interface Paper {
  id: number;
  name: string;
  type: string;
  method: string;
  category: string;
  score: number;
  creator: string;
  manualGrading: boolean;
}

const PaperManagement: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const papers: Paper[] = [
    { id: 1, name: "区块链", type: "理论", method: "随机组卷", category: "理科", score: 100, creator: "林志斌", manualGrading: true },
    { id: 2, name: "大数据", type: "理论", method: "随机组卷", category: "理科", score: 100, creator: "林志斌", manualGrading: true },
    { id: 3, name: "物联网", type: "理论", method: "随机组卷", category: "理科", score: 100, creator: "林志斌", manualGrading: true },
    { id: 4, name: "人工智能", type: "理论", method: "随机组卷", category: "理科", score: 100, creator: "林志斌", manualGrading: true },
    { id: 5, name: "实操", type: "实操", method: "固定组卷", category: "理科1", score: 55, creator: "林娜 (超级管理员)", manualGrading: true },
    { id: 6, name: "学伴030919", type: "理论", method: "随机组卷", category: "理科1", score: 100, creator: "", manualGrading: true },
    { id: 7, name: "实操试卷01", type: "实操", method: "固定组卷", category: "理科1", score: 50, creator: "林娜 (超级管理员)", manualGrading: true },
    { id: 8, name: "实操题试卷", type: "实操", method: "固定组卷", category: "全部分类", score: 10, creator: "郭尧锋", manualGrading: true },
    { id: 9, name: "小锋测试试卷", type: "实操", method: "固定组卷", category: "全部分类", score: 1, creator: "郭尧锋", manualGrading: true },
    { id: 10, name: "测试试卷-13", type: "理论", method: "固定组卷", category: "社会学", score: 10, creator: "林明旭", manualGrading: false },
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === papers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(papers.map(p => p.id));
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
            <option value="">选择试卷分类</option>
            <option value="science">理科</option>
            <option value="social">社会学</option>
          </select>
        </div>
        <div className="w-40">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">选择试卷组卷方式</option>
            <option value="random">随机组卷</option>
            <option value="fixed">固定组卷</option>
          </select>
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
            placeholder="搜索试卷名称"
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
                  checked={selectedIds.length === papers.length && papers.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">试卷名称</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">试卷类型</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">组卷方式</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">试卷分类</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">总分</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">创建人</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-center">人工批阅</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((p) => (
              <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p.id)}
                    onChange={() => toggleSelect(p.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    {p.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{p.type}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{p.method}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{p.category}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{p.score}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{p.creator || "-"}</td>
                <td className="px-4 py-3 text-sm text-slate-600 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs ${p.manualGrading ? 'text-blue-600' : 'text-slate-400'}`}>
                    {p.manualGrading ? "是" : "否"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      预览
                    </button>
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                      复制
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
            共12条
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

export default PaperManagement;
