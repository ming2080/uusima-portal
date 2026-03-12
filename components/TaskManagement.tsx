import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Settings,
  ChevronLeft,
  Upload,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Table,
  Eye,
  Layout,
  Code2,
} from "lucide-react";

interface Task {
  id: string;
  name: string;
  type: string;
  course: string;
  status: string;
  participants: number;
}

const mockTasks: Task[] = [
  {
    id: "1",
    name: "2023秋季期中考试",
    type: "常规考试",
    course: "计算机网络基础",
    status: "进行中",
    participants: 120,
  },
  {
    id: "2",
    name: "Python数据分析技能认证",
    type: "认证评测",
    course: "Python数据分析",
    status: "未开始",
    participants: 45,
  },
  {
    id: "3",
    name: "全国大学生云计算竞赛校内选拔",
    type: "竞赛",
    course: "云计算架构设计",
    status: "已结束",
    participants: 300,
  },
];

const TaskManagement: React.FC = () => {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreate = () => {
    setEditingTask(null);
    setView("form");
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setView("form");
  };

  const renderListView = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">任务管理</h2>
          <p className="text-sm text-slate-500 mt-1">
            管理所有考试、认证及竞赛任务。
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          创建任务
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜索任务名称..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600">
            <option value="">全部类型</option>
            <option value="常规考试">常规考试</option>
            <option value="认证评测">认证评测</option>
            <option value="竞赛">竞赛</option>
          </select>
          <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600">
            <option value="">全部状态</option>
            <option value="未开始">未开始</option>
            <option value="进行中">进行中</option>
            <option value="已结束">已结束</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="px-6 py-4 font-medium">任务名称</th>
              <th className="px-6 py-4 font-medium">任务类型</th>
              <th className="px-6 py-4 font-medium">关联课程</th>
              <th className="px-6 py-4 font-medium">参考人数</th>
              <th className="px-6 py-4 font-medium">状态</th>
              <th className="px-6 py-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockTasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {task.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      task.type === "常规考试"
                        ? "bg-blue-50 text-blue-700"
                        : task.type === "认证评测"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {task.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {task.course}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {task.participants}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`flex items-center gap-1.5 ${
                      task.status === "进行中"
                        ? "text-emerald-600"
                        : task.status === "未开始"
                          ? "text-slate-500"
                          : "text-slate-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        task.status === "进行中"
                          ? "bg-emerald-500"
                          : task.status === "未开始"
                            ? "bg-slate-400"
                            : "bg-slate-300"
                      }`}
                    ></span>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="管理任务"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="编辑"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={() => setView("list")}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {editingTask ? "编辑任务" : "创建任务"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            填写任务的基本信息和配置规则。
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <form className="space-y-8 max-w-4xl">
          {/* 任务名称 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0">
              <span className="text-red-500 mr-1">*</span>任务名称：
            </label>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="请输入任务名称"
                defaultValue={editingTask?.name}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                0/150
              </span>
            </div>
          </div>

          {/* 任务类型 */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0 mt-3">
              <span className="text-red-500 mr-1">*</span>任务类型：
            </label>
            <div className="flex-1 flex flex-wrap gap-3">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="taskType"
                  className="peer sr-only"
                  defaultChecked={
                    !editingTask || editingTask.type === "常规考试"
                  }
                />
                <div className="px-6 py-3 rounded-xl border border-slate-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all text-center">
                  <div className="text-sm font-bold text-slate-900 peer-checked:text-blue-700">
                    常规考试
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    日常考试任务
                  </div>
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="taskType"
                  className="peer sr-only"
                  defaultChecked={editingTask?.type === "认证评测"}
                />
                <div className="px-6 py-3 rounded-xl border border-slate-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all text-center">
                  <div className="text-sm font-bold text-slate-900 peer-checked:text-blue-700">
                    认证评测
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    认证及技能评测
                  </div>
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="taskType"
                  className="peer sr-only"
                  defaultChecked={editingTask?.type === "竞赛"}
                />
                <div className="px-6 py-3 rounded-xl border border-slate-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all text-center">
                  <div className="text-sm font-bold text-slate-900 peer-checked:text-blue-700">
                    竞赛
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">竞赛任务</div>
                </div>
              </label>
            </div>
          </div>

          {/* 关联考试 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0">
              <span className="text-red-500 mr-1">*</span>关联考试：
            </label>
            <div className="flex-1 flex items-center gap-4">
              <select className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600 appearance-none">
                <option value="">请选择关联考试</option>
                <option value="1">2023秋季期中考试卷</option>
              </select>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
              >
                创建考试
              </button>
            </div>
          </div>

          {/* 参考人员 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0">
              参考人员：
            </label>
            <div className="flex-1">
              <select className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600 appearance-none">
                <option value="">请选择参考人员</option>
                <option value="class1">计科2101班</option>
                <option value="class2">计科2102班</option>
              </select>
            </div>
          </div>

          {/* 关联课程 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0">
              关联课程：
            </label>
            <div className="flex-1">
              <select className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600 appearance-none">
                <option value="">请选择课程</option>
                <option value="c1">计算机网络基础</option>
                <option value="c2">Python数据分析</option>
              </select>
            </div>
          </div>

          {/* 所属专业 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0">
              <span className="text-red-500 mr-1">*</span>所属专业：
            </label>
            <div className="flex-1">
              <select className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600 appearance-none">
                <option value="">请选择专业</option>
                <option value="m1">计算机科学与技术</option>
                <option value="m2">软件工程</option>
              </select>
            </div>
          </div>

          {/* 任务进入限制 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0">
              任务进入限制：
            </label>
            <div className="flex-1 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="entryLimit"
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  defaultChecked
                />
                <span className="text-sm text-slate-700">规定时间内</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="entryLimit"
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">开始时间后</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="entryLimit"
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">可提前进入</span>
              </label>
            </div>
          </div>

          {/* 公开程度 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0">
              公开程度：
            </label>
            <div className="flex-1 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  defaultChecked
                />
                <span className="text-sm text-slate-700">仅自己</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">参考人员</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">公开</span>
              </label>
            </div>
          </div>

          {/* 是否推荐 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0">
              是否推荐：
            </label>
            <div className="flex-1 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isRecommended"
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">是</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isRecommended"
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  defaultChecked
                />
                <span className="text-sm text-slate-700">否</span>
              </label>
            </div>
          </div>

          {/* 封面与海报 */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0 mt-2">
              <span className="text-red-500 mr-1">*</span>任务封面：
            </label>
            <div className="flex-1 flex flex-wrap gap-10">
              <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                <Plus className="w-6 h-6 mb-1" />
              </div>

              <div className="flex gap-4">
                <label className="text-sm font-medium text-slate-700 mt-2">
                  宣传海报：
                </label>
                <div>
                  <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                    <Plus className="w-6 h-6 mb-1" />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    推荐使用浅色背景，比例6.4 : 1
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 任务概述 */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0 mt-2">
              <span className="text-red-500 mr-1">*</span>任务概述：
            </label>
            <div className="flex-1">
              <textarea
                rows={3}
                placeholder="请输入任务概述"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          {/* 任务介绍 (Rich Text Editor Mock) */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
            <label className="md:w-32 text-sm font-medium text-slate-700 flex-shrink-0 mt-2">
              任务介绍：
            </label>
            <div className="flex-1 border border-slate-300 rounded-xl overflow-hidden">
              {/* Toolbar */}
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Underline className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Strikethrough className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <AlignRight className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Table className="w-4 h-4" />
                </button>
                <div className="flex-1"></div>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Layout className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"
                >
                  <Code2 className="w-4 h-4" />
                </button>
              </div>
              {/* Editor Area */}
              <textarea
                rows={10}
                placeholder="请输入正文"
                className="w-full px-4 py-3 bg-white text-sm focus:outline-none resize-y min-h-[200px]"
              ></textarea>
            </div>
          </div>
        </form>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="sticky bottom-0 mt-8 bg-white border-t border-slate-200 p-4 flex justify-center gap-4 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-b-2xl">
        <button
          onClick={() => setView("list")}
          className="px-8 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
        >
          取消
        </button>
        <button
          onClick={() => setView("list")}
          className="px-8 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          保存
        </button>
      </div>
    </div>
  );

  return view === "list" ? renderListView() : renderFormView();
};

export default TaskManagement;
