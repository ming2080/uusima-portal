import React, { useState } from "react";
import {
  Plus,
  Search,
  RotateCcw,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Users,
  Lock,
  UserCheck,
  UserX,
  UserPlus2
} from "lucide-react";

interface StudentData {
  id: number;
  name: string;
  studentId: string;
  phone: string;
  org: string;
  status: boolean;
}

const StudentManagement: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState("新大陆大学");
  const [expandedOrgs, setExpandedOrgs] = useState<string[]>(["新大陆大学"]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const students: StudentData[] = [
    { id: 1, name: "18259183400", studentId: "18259183400", phone: "18259183400", org: "物联网", status: true },
    { id: 2, name: "林连杰", studentId: "--", phone: "15806025022", org: "新大陆大学", status: true },
    { id: 3, name: "考生002", studentId: "--", phone: "19859100025", org: "考试班级", status: true },
    { id: 4, name: "考生001", studentId: "--", phone: "19859100024", org: "考试班级", status: true },
    { id: 5, name: "王恢镇", studentId: "--", phone: "18060506047", org: "新大陆大学", status: true },
    { id: 6, name: "杨克强", studentId: "--", phone: "18960921912", org: "新大陆大学", status: true },
    { id: 7, name: "谢进荣", studentId: "--", phone: "15159663385", org: "新大陆大学", status: true },
    { id: 8, name: "江杰", studentId: "--", phone: "15959081656", org: "新大陆大学", status: true },
    { id: 9, name: "18060481111", studentId: "--", phone: "18060481111", org: "新大陆大学", status: true },
    { id: 10, name: "张明辉", studentId: "--", phone: "15306915029", org: "新大陆大学", status: true },
  ];

  const toggleOrg = (name: string) => {
    setExpandedOrgs(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-full bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
      {/* Left Organization Tree */}
      <div className="w-64 border-r border-slate-100 flex flex-col">
        <div className="p-4 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="请输入组织名称搜索"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <div className="group">
              <div 
                className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${selectedOrg === '新大陆大学' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-700'}`}
                onClick={() => setSelectedOrg('新大陆大学')}
              >
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); toggleOrg('新大陆大学'); }}>
                    {expandedOrgs.includes('新大陆大学') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  <span className="text-sm font-medium">新大陆大学</span>
                </div>
              </div>
              
              {expandedOrgs.includes('新大陆大学') && (
                <div className="ml-6 mt-1 space-y-1">
                  {['物联网', '考试班级', '三年四班'].map(item => (
                    <div 
                      key={item}
                      className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${selectedOrg === item ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-600'}`}
                      onClick={() => setSelectedOrg(item)}
                    >
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Filters */}
        <div className="p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 whitespace-nowrap">组织范围:</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="scope" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">本级及子级</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="scope" className="text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">仅本级</span>
                </label>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 whitespace-nowrap">搜索字段:</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="field" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">姓名</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="field" className="text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">手机号</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2 ml-auto">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <Search className="w-4 h-4" />
                查询
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                <RotateCcw className="w-4 h-4" />
                重置
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 whitespace-nowrap">搜索值:</span>
              <input
                type="text"
                placeholder="请输入关键字搜索"
                className="w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 whitespace-nowrap">状态:</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">启用</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">禁用</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 items-center flex-wrap">
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <UserPlus className="w-4 h-4" />
            单个新增
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Users className="w-4 h-4" />
            批量新增
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
            <Trash2 className="w-4 h-4" />
            批量删除
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <UserPlus2 className="w-4 h-4" />
            批量新增考生
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-colors">
            <UserX className="w-4 h-4" />
            用户禁用
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-lg cursor-not-allowed">
            <UserCheck className="w-4 h-4" />
            用户启用
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-lg cursor-not-allowed">
            <Lock className="w-4 h-4" />
            密码重置
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === students.length && students.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">序号</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">学生姓名</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">学号</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">手机号码</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">所属组织</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">状态</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(s.id)}
                      onChange={() => toggleSelect(s.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                      {s.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{s.studentId}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{s.phone}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{s.org}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${s.status ? 'bg-blue-500' : 'bg-slate-300'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${s.status ? 'left-4.5' : 'left-0.5'}`}></div>
                      </div>
                      <span className={`text-xs font-medium ${s.status ? 'text-blue-600' : 'text-slate-400'}`}>
                        {s.status ? '启用' : '禁用'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">查看</button>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">编辑</button>
                      <button className="text-xs font-medium text-red-500 hover:text-red-600">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-end gap-4 text-sm text-slate-500">
            <span>共 10 条</span>
            <select className="px-2 py-1 border border-slate-200 rounded bg-white">
              <option>10条/页</option>
            </select>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span>前往</span>
              <input type="text" defaultValue="1" className="w-10 px-1 py-1 border border-slate-200 rounded text-center" />
              <span>页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
