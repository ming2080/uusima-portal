import React, { useState } from "react";
import {
  BookOpen,
  Award,
  CheckSquare,
  LayoutTemplate,
  HardDrive,
  Database,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Filter,
  Settings,
  Clock,
  Users,
  Star,
  Send,
  Eye,
  Copy,
  Paperclip,
  AlertCircle
} from "lucide-react";
import TaskManagement from "../components/TaskManagement";
import CourseEditor from "../components/CourseEditor";
import CourseFilterHeader from "../components/CourseFilterHeader";

const Config: React.FC = () => {
  const [activeModule, setActiveModule] = useState("course");
  const [activeSubModule, setActiveSubModule] = useState("course-list");
  const [view, setView] = useState<"list" | "editor">("list");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<string>("");

  const courses = [
    "计算机网络基础",
    "Python数据分析",
    "云计算架构设计",
    "人工智能导论",
    "前端工程化实践",
    "网络安全实战",
  ];

  const modules = [
    {
      id: "course",
      label: "课程管理",
      icon: <BookOpen className="w-5 h-5" />,
      subModules: [{ id: "course-list", label: "课程列表管理" }],
    },
    {
      id: "exam",
      label: "考试竞赛",
      icon: <Award className="w-5 h-5" />,
      subModules: [
        { id: "task", label: "任务管理" },
        { id: "question", label: "试题管理" },
        { id: "question-bank", label: "题库管理" },
        { id: "paper", label: "试卷管理" },
        { id: "exam-manage", label: "考试管理" },
        { id: "session", label: "场次管理" },
        { id: "grading", label: "阅卷管理" },
      ],
    },
    {
      id: "auto-grade",
      label: "自动评分",
      icon: <CheckSquare className="w-5 h-5" />,
      subModules: [
        { id: "grade-rule", label: "评分规则" },
        { id: "grade-template", label: "评分模板" },
      ],
    },
    {
      id: "portal",
      label: "门户管理",
      icon: <LayoutTemplate className="w-5 h-5" />,
      subModules: [
        { id: "announcement", label: "公告管理" },
        { id: "article", label: "文章管理" },
        { id: "template", label: "模板管理" },
        { id: "column", label: "栏目管理" },
        { id: "attribute", label: "属性管理" },
      ],
    },
    {
      id: "disk",
      label: "磁盘管理",
      icon: <HardDrive className="w-5 h-5" />,
      subModules: [
        { id: "disk-clean", label: "磁盘清理" },
        { id: "clean-record", label: "清理记录" },
      ],
    },
    {
      id: "resource",
      label: "资源管理",
      icon: <Database className="w-5 h-5" />,
      subModules: [{ id: "data-annotation", label: "数据标注" }],
    },
  ];

  const renderCourseManagement = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setView("editor")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            创建新课程
          </button>
        </div>

        <CourseFilterHeader 
          title="课程列表管理" 
          subtitle="管理平台所有课程，支持创建、编辑和删除操作" 
          icon={<Settings className="w-6 h-6" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => {
            const courseName = courses[i - 1];
            return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col relative"
            >
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/course${i}/600/400`}
                  alt="Course Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-600 shadow-sm">
                  已发布
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <Clock className="w-3 h-3" /> 12小时
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {courseName}
                  </h3>
                  <div className="relative">
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === i ? null : i)}
                      className="bg-blue-500 text-white p-1.5 rounded-md hover:bg-blue-600 transition-colors flex-shrink-0"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    
                    {/* Extended Menu */}
                    {activeMenuId === i && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setActiveMenuId(null)}
                        ></div>
                        <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-fade-in">
                          <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-t border-l border-slate-100 rotate-45"></div>
                          <button className="w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-blue-50 flex items-center gap-2 transition-colors relative z-10">
                            <Send className="w-4 h-4" /> 发布
                          </button>
                          <button 
                            onClick={() => { setView("editor"); setActiveMenuId(null); }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors relative z-10"
                          >
                            <Edit className="w-4 h-4" /> 编辑
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors relative z-10">
                            <Eye className="w-4 h-4" /> 查看
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors relative z-10">
                            <Copy className="w-4 h-4" /> 复制
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors relative z-10">
                            <Paperclip className="w-4 h-4" /> 标签绑定
                          </button>
                          <button 
                            onClick={() => {
                              setCourseToDelete(courseName);
                              setDeleteConfirmId(i);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors relative z-10"
                          >
                            <Trash2 className="w-4 h-4" /> 删除
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded">人工智能/基础</span>
                  <span className="text-blue-500 font-medium">281 人在学</span>
                </div>
                
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1 leading-relaxed">
                  <span className="text-slate-400">课程概述：</span> 本课程旨在帮助学生掌握核心概念与实战技能，结合丰富的实验环境，提升动手能力。
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>环境：</span>
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                      <img src="https://api.iconify.design/logos:python.svg" alt="Python" className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">确认删除课程？</h3>
                    <p className="text-sm text-slate-500 mt-1">您即将删除课程 <span className="font-semibold text-slate-800">"{courseToDelete}"</span>，此操作不可恢复。</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-8">
                  <button 
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => {
                      // Handle delete logic here
                      setDeleteConfirmId(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
                  >
                    确认删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPlaceholder = (title: string) => {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 animate-fade-in">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
          <LayoutTemplate className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-lg font-medium text-slate-600 mb-2">{title}</h3>
        <p className="text-sm text-slate-400">
          该功能模块正在开发中，敬请期待...
        </p>
      </div>
    );
  };

  const renderContent = () => {
    if (activeModule === "course" && activeSubModule === "course-list") {
      return view === "list" ? (
        renderCourseManagement()
      ) : (
        <CourseEditor onBack={() => setView("list")} />
      );
    }

    if (activeModule === "exam" && activeSubModule === "task") {
      return <TaskManagement />;
    }

    const currentModule = modules.find((m) => m.id === activeModule);
    const currentSubModule = currentModule?.subModules.find(
      (s) => s.id === activeSubModule,
    );

    return renderPlaceholder(currentSubModule?.label || "未知模块");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row min-h-[calc(100vh-80px)] gap-6 lg:gap-8 py-6 lg:py-8">
        {/* Sidebar */}
        <aside className="w-full md:w-52 flex-shrink-0 flex flex-col h-auto md:sticky md:top-28 md:h-[calc(100vh-140px)]">
          <div className="mb-6 px-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              配置管理
            </h1>
            <p className="text-sm text-slate-500 mt-1">系统设置与偏好</p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
            <nav className="space-y-6">
              {modules.map((module) => (
                <div key={module.id}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 cursor-pointer transition-colors ${
                      activeModule === module.id
                        ? "bg-white shadow-sm text-blue-700 ring-1 ring-slate-200/50"
                        : "text-slate-600 hover:bg-slate-200/50"
                    }`}
                    onClick={() => {
                      setActiveModule(module.id);
                      setActiveSubModule(module.subModules[0].id);
                    }}
                  >
                    <div
                      className={`p-1.5 rounded-lg ${activeModule === module.id ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"}`}
                    >
                      {module.icon}
                    </div>
                    <span className="font-semibold text-sm">{module.label}</span>
                  </div>

                  {activeModule === module.id && (
                    <div className="ml-11 mt-1 space-y-1 relative before:absolute before:left-0 before:top-0 before:bottom-4 before:w-px before:bg-slate-200">
                      {module.subModules.map((sub) => (
                        <div
                          key={sub.id}
                          className={`relative px-3 py-2 text-sm rounded-lg cursor-pointer transition-all ${
                            activeSubModule === sub.id
                              ? "text-blue-600 font-medium bg-blue-50/50"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                          }`}
                          onClick={() => setActiveSubModule(sub.id)}
                        >
                          {activeSubModule === sub.id && (
                            <div className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-[16px] h-px bg-blue-300"></div>
                          )}
                          {sub.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Config;
