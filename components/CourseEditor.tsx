import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Eye, XCircle, Edit3, Book, Settings as SettingsIcon, 
  ListTree, Bot, Network, Plus, Trash2, ChevronDown, ChevronRight,
  FileText, Wrench, Video, Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, Quote, List, ListOrdered,
  Link as LinkIcon, Image as ImageIcon, Code, Table, Layout, Code2,
  Sparkles, Tag, Layers, Bookmark, GripVertical, CheckCircle2, AlertCircle,
  UploadCloud, FileQuestion, FlaskConical, FileBarChart, Clock, BookOpen,
  BarChart, GraduationCap, Users, Play, Cpu, Database, Box, MessageSquare,
  User, ArrowUp
} from 'lucide-react';
import TaskEditDrawer, { Task, TaskType } from './TaskEditDrawer';

interface CourseEditorProps {
  onBack: () => void;
}

interface Chapter {
  id: string;
  title: string;
  isExpanded: boolean;
  tasks: Task[];
}

const initialChapters: Chapter[] = [
  {
    id: 'c1',
    title: '第一章：手写数字图像处理',
    isExpanded: true,
    tasks: [
      { id: 't1-1', title: '1-1 任务1：边缘检测与滤波去噪（理论）', type: 'text', isTrial: true },
      { id: 't1-2', title: '1-2 任务1：边缘检测与滤波去噪（实操）', type: 'experiment', isTrial: true },
      { id: 't1-3', title: '1-3 任务1：边缘检测与滤波去噪（视频）', type: 'video', isTrial: false },
    ]
  },
  {
    id: 'c2',
    title: '第二章：YOLO目标检测项目开发与部署实战',
    isExpanded: true,
    tasks: [
      { id: 't2-1', title: '2-1 任务1：准备数据集并执行训练脚本（理论）', type: 'text', isTrial: false },
      { id: 't2-2', title: '2-2 任务1：准备数据集并执行训练脚本（实操）', type: 'experiment', isTrial: false },
    ]
  }
];

const CourseEditor: React.FC<CourseEditorProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('chapters');
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewTask, setPreviewTask] = useState<Task | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<'intro' | 'syllabus'>('intro');
  const [previewView, setPreviewView] = useState<'detail' | 'learning'>('detail');
  
  // Drag and Drop State
  const [draggedChapterIdx, setDraggedChapterIdx] = useState<number | null>(null);
  const [draggedTaskInfo, setDraggedTaskInfo] = useState<{cIdx: number, tIdx: number} | null>(null);

  // Multi-select state
  const [selectedChapters, setSelectedChapters] = useState<Set<string>>(new Set());
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  // Inline Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingTaskIndices, setEditingTaskIndices] = useState<{cIdx: number, tIdx: number} | null>(null);

  // Dropdown States for Header
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [courseInfo, setCourseInfo] = useState({
    major: '计算机视觉',
    type: '专业核心课',
    level: '高职',
    tag: '暂无标签'
  });

  // Cover Image State
  const [coverImage, setCoverImage] = useState('https://picsum.photos/seed/cv/600/400');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  // Dropdown State for Add Task
  const [addTaskDropdownIdx, setAddTaskDropdownIdx] = useState<number | null>(null);

  // Delete Confirmation State
  const [deleteConfirmInfo, setDeleteConfirmInfo] = useState<{ type: 'chapter' | 'task' | 'batch', cIdx?: number, tIdx?: number } | null>(null);

  const tabs = [
    { id: 'basic', label: '基本信息', icon: FileText },
    { id: 'settings', label: '课程设置', icon: SettingsIcon },
    { id: 'chapters', label: '课程章节', icon: ListTree },
    { id: 'ai', label: 'AI技能助手', icon: Bot },
    { id: 'graph', label: '技能图谱', icon: Network },
  ];

  // --- Trial Logic ---
  const handleToggleTrial = (cIdx: number, tIdx?: number) => {
    const newChapters = [...chapters];
    
    const totalTrialTasks = newChapters.flatMap(c => c.tasks).filter(t => t.isTrial).length;
    const trialChaptersCount = newChapters.filter(c => c.tasks.some(t => t.isTrial)).length;

    if (tIdx !== undefined) {
      // Toggle Single Task
      const task = newChapters[cIdx].tasks[tIdx];
      const isCurrentlyTrial = task.isTrial;
      const isCurrentChapterTrial = newChapters[cIdx].tasks.some(t => t.isTrial);

      if (!isCurrentlyTrial) {
        if (totalTrialTasks >= 6) {
          alert("试学任务最多不能超过 6 个！");
          return;
        }
        if (!isCurrentChapterTrial && trialChaptersCount >= 2) {
          alert("试学任务最多只能分布在 2 个章节中！");
          return;
        }
      }
      task.isTrial = !isCurrentlyTrial;
    } else {
      // Toggle Entire Chapter
      const chapter = newChapters[cIdx];
      const hasTrialTasks = chapter.tasks.some(t => t.isTrial);

      if (hasTrialTasks) {
        // Turn OFF all
        chapter.tasks.forEach(t => t.isTrial = false);
      } else {
        // Turn ON all (up to limit)
        if (trialChaptersCount >= 2 && !chapter.tasks.some(t => t.isTrial)) {
          alert("试学任务最多只能分布在 2 个章节中！");
          return;
        }
        let allowed = 6 - totalTrialTasks;
        if (allowed <= 0) {
          alert("试学任务名额已满（最多6个）！");
          return;
        }
        let added = 0;
        chapter.tasks.forEach(t => {
          if (!t.isTrial && added < allowed) {
            t.isTrial = true;
            added++;
          }
        });
        if (added > 0 && added < chapter.tasks.length) {
          alert(`由于名额限制，仅将前 ${added} 个任务设为试学。`);
        }
      }
    }
    setChapters(newChapters);
  };

  // --- CRUD Logic ---
  const handleAddChapter = () => {
    const newChapter: Chapter = {
      id: `c${Date.now()}`,
      title: `新章节 ${chapters.length + 1}`,
      isExpanded: true,
      tasks: []
    };
    setChapters([...chapters, newChapter]);
  };

  const handleAddTask = (cIdx: number, type: TaskType) => {
    const newChapters = [...chapters];
    const typeLabel = {
      'text': '图文学习',
      'video': '视频学习',
      'exercise': '习题与测试',
      'experiment': '实验与实训',
      'report': '报告与描述'
    }[type];
    
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: `新任务 (${typeLabel})`,
      type,
      isTrial: false
    };
    newChapters[cIdx].tasks.push(newTask);
    newChapters[cIdx].isExpanded = true;
    setChapters(newChapters);
    setAddTaskDropdownIdx(null);
  };

  const handleDeleteChapter = (cIdx: number) => {
    setDeleteConfirmInfo({ type: 'chapter', cIdx });
  };

  const handleDeleteTask = (cIdx: number, tIdx: number) => {
    setDeleteConfirmInfo({ type: 'task', cIdx, tIdx });
  };

  const handleBatchDelete = () => {
    if (selectedChapters.size === 0 && selectedTasks.size === 0) return;
    setDeleteConfirmInfo({ type: 'batch' });
  };

  const confirmDelete = () => {
    if (!deleteConfirmInfo) return;

    if (deleteConfirmInfo.type === 'chapter' && deleteConfirmInfo.cIdx !== undefined) {
      const newChapters = [...chapters];
      newChapters.splice(deleteConfirmInfo.cIdx, 1);
      setChapters(newChapters);
    } else if (deleteConfirmInfo.type === 'task' && deleteConfirmInfo.cIdx !== undefined && deleteConfirmInfo.tIdx !== undefined) {
      const newChapters = [...chapters];
      newChapters[deleteConfirmInfo.cIdx].tasks.splice(deleteConfirmInfo.tIdx, 1);
      setChapters(newChapters);
    } else if (deleteConfirmInfo.type === 'batch') {
      const newChapters = chapters
        .filter(c => !selectedChapters.has(c.id))
        .map(c => ({
          ...c,
          tasks: c.tasks.filter(t => !selectedTasks.has(t.id))
        }));
      setChapters(newChapters);
      setSelectedChapters(new Set());
      setSelectedTasks(new Set());
    }

    setDeleteConfirmInfo(null);
  };

  const toggleExpand = (cIdx: number) => {
    const newChapters = [...chapters];
    newChapters[cIdx].isExpanded = !newChapters[cIdx].isExpanded;
    setChapters(newChapters);
  };

  const handleEditTask = (cIdx: number, tIdx: number) => {
    setEditingTask(chapters[cIdx].tasks[tIdx]);
    setEditingTaskIndices({ cIdx, tIdx });
    setIsDrawerOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    if (editingTaskIndices) {
      const newChapters = [...chapters];
      newChapters[editingTaskIndices.cIdx].tasks[editingTaskIndices.tIdx] = updatedTask;
      setChapters(newChapters);
    }
  };

  // --- Drag and Drop Logic ---
  const onChapterDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggedChapterIdx(idx);
  };

  const onChapterDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedChapterIdx === null || draggedChapterIdx === idx) return;
    const newChapters = [...chapters];
    const dragged = newChapters[draggedChapterIdx];
    newChapters.splice(draggedChapterIdx, 1);
    newChapters.splice(idx, 0, dragged);
    setChapters(newChapters);
    setDraggedChapterIdx(idx);
  };

  const onTaskDragStart = (e: React.DragEvent, cIdx: number, tIdx: number) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    setDraggedTaskInfo({ cIdx, tIdx });
  };

  const onTaskDragOver = (e: React.DragEvent, cIdx: number, tIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedTaskInfo) return;
    if (draggedTaskInfo.cIdx === cIdx && draggedTaskInfo.tIdx === tIdx) return;

    const newChapters = [...chapters];
    const sourceChapter = newChapters[draggedTaskInfo.cIdx];
    const targetChapter = newChapters[cIdx];

    const draggedTask = sourceChapter.tasks[draggedTaskInfo.tIdx];
    sourceChapter.tasks.splice(draggedTaskInfo.tIdx, 1);
    targetChapter.tasks.splice(tIdx, 0, draggedTask);

    setChapters(newChapters);
    setDraggedTaskInfo({ cIdx, tIdx });
  };

  const onDragEnd = () => {
    setDraggedChapterIdx(null);
    setDraggedTaskInfo(null);
  };

  const getTaskIcon = (type: TaskType) => {
    switch (type) {
      case 'text': return <FileText className="w-3.5 h-3.5" />;
      case 'video': return <Video className="w-3.5 h-3.5" />;
      case 'exercise': return <FileQuestion className="w-3.5 h-3.5" />;
      case 'experiment': return <FlaskConical className="w-3.5 h-3.5" />;
      case 'report': return <FileBarChart className="w-3.5 h-3.5" />;
    }
  };

  const getTaskColor = (type: TaskType) => {
    switch (type) {
      case 'text': return 'bg-blue-50 text-blue-600';
      case 'video': return 'bg-purple-50 text-purple-600';
      case 'exercise': return 'bg-orange-50 text-orange-600';
      case 'experiment': return 'bg-emerald-50 text-emerald-600';
      case 'report': return 'bg-indigo-50 text-indigo-600';
    }
  };

  // --- Renderers ---
  const renderHeader = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6 p-6">
      <div className="flex flex-col md:flex-row gap-8 items-start relative">
        {/* Action Buttons (Top Right) */}
        <div className="absolute top-0 right-0 flex gap-3 z-10">
          <button onClick={onBack} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回
          </button>
          <button 
            onClick={() => {
              setIsPreviewMode(true);
              setPreviewView('detail');
              setActivePreviewTab('intro');
              setPreviewTask(null);
            }}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium flex items-center gap-1.5 hover:bg-blue-100 transition-colors"
          >
            <Eye className="w-4 h-4" /> 预览
          </button>
          <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-1.5 hover:bg-red-100 transition-colors">
            <XCircle className="w-4 h-4" /> 取消发布
          </button>
        </div>

        {/* Course Cover */}
        <div className="w-64 h-40 rounded-xl overflow-hidden relative group flex-shrink-0 border border-slate-200 shadow-sm">
          <img src={coverImage} alt="Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div 
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-white flex flex-col items-center gap-2">
              <UploadCloud className="w-8 h-8" />
              <span className="text-sm font-medium">更换封面</span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleCoverUpload} 
          />
        </div>

        {/* Course Info */}
        <div className="flex-1 pt-2 pr-64">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">计算机视觉技术应用</h2>
            <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {/* Major */}
            <div className="flex items-center gap-1.5 relative">
              <span className="text-slate-500 flex items-center gap-1.5 whitespace-nowrap">
                <Book className="w-4 h-4 text-blue-400" /> 专业：
              </span>
              <span className="font-medium text-slate-800 max-w-[150px] truncate" title={courseInfo.major}>{courseInfo.major}</span>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'major' ? null : 'major')}
                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex-shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'major' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1">
                  {['云平台', '设备影子', 'OTA', '数字孪生', '通用', '行业应用', '人工智能', '计算机视觉', '这是一个非常非常长的专业名称用来测试折叠效果'].map(item => (
                    <div 
                      key={item} 
                      className={`px-4 py-2 hover:bg-slate-50 cursor-pointer truncate ${courseInfo.major === item ? 'text-emerald-500 font-medium' : 'text-slate-600'}`}
                      onClick={() => { setCourseInfo({...courseInfo, major: item}); setActiveDropdown(null); }}
                      title={item}
                    >
                      {item}
                    </div>
                  ))}
                  <div className="border-t border-slate-100 my-1"></div>
                  <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-slate-500 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Layout className="w-4 h-4" /> 管理专业分类</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>

            {/* Type */}
            <div className="flex items-center gap-1.5 relative">
              <span className="text-slate-500 flex items-center gap-1.5 whitespace-nowrap">
                <Layers className="w-4 h-4 text-blue-400" /> 课程类型：
              </span>
              <span className="font-medium text-slate-800 max-w-[150px] truncate" title={courseInfo.type}>{courseInfo.type}</span>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex-shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'type' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1">
                  {['专业基础课', '专业核心课', '专业拓展课', '公共基础课'].map(item => (
                    <div 
                      key={item} 
                      className={`px-4 py-2 hover:bg-slate-50 cursor-pointer truncate ${courseInfo.type === item ? 'text-emerald-500 font-medium' : 'text-slate-600'}`}
                      onClick={() => { setCourseInfo({...courseInfo, type: item}); setActiveDropdown(null); }}
                      title={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Level */}
            <div className="flex items-center gap-1.5 relative">
              <span className="text-slate-500 flex items-center gap-1.5 whitespace-nowrap">
                <Bookmark className="w-4 h-4 text-blue-400" /> 层次：
              </span>
              <span className="font-medium text-slate-800 max-w-[150px] truncate" title={courseInfo.level}>{courseInfo.level}</span>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'level' ? null : 'level')}
                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex-shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'level' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1">
                  {['中职', '高职', '本科', '研究生'].map(item => (
                    <div 
                      key={item} 
                      className={`px-4 py-2 hover:bg-slate-50 cursor-pointer truncate ${courseInfo.level === item ? 'text-emerald-500 font-medium' : 'text-slate-600'}`}
                      onClick={() => { setCourseInfo({...courseInfo, level: item}); setActiveDropdown(null); }}
                      title={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tag */}
            <div className="flex items-center gap-1.5 relative">
              <span className="text-slate-500 flex items-center gap-1.5 whitespace-nowrap">
                <Tag className="w-4 h-4 text-blue-400" /> 课程标签：
              </span>
              <span className="font-medium text-slate-800 max-w-[150px] truncate" title={courseInfo.tag}>{courseInfo.tag}</span>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'tag' ? null : 'tag')}
                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex-shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'tag' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1">
                  {['暂无标签', '热门', '推荐', '最新', '这是一个非常非常长的标签用来测试折叠效果'].map(item => (
                    <div 
                      key={item} 
                      className={`px-4 py-2 hover:bg-slate-50 cursor-pointer truncate ${courseInfo.tag === item ? 'text-emerald-500 font-medium' : 'text-slate-600'}`}
                      onClick={() => { setCourseInfo({...courseInfo, tag: item}); setActiveDropdown(null); }}
                      title={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChapters = () => (
    <div className="space-y-4 animate-fade-in pb-20">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={handleAddChapter} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1.5 hover:bg-blue-700 transition-colors shadow-sm font-medium">
            <Plus className="w-4 h-4" /> 新增章节
          </button>
          {(selectedChapters.size > 0 || selectedTasks.size > 0) && (
            <button 
              onClick={handleBatchDelete} 
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center gap-1.5 hover:bg-red-100 transition-colors shadow-sm font-medium animate-fade-in"
            >
              <Trash2 className="w-4 h-4" /> 批量删除 ({selectedChapters.size + selectedTasks.size})
            </button>
          )}
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            支持拖拽排序，试学任务最多2个章节、6个任务
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-900 transition-colors shadow-sm font-medium">保存目录</button>
        </div>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, cIdx) => (
          <div 
            key={chapter.id} 
            className={`bg-white border rounded-xl overflow-hidden transition-all ${draggedChapterIdx === cIdx ? 'opacity-50 border-blue-400 shadow-md' : 'border-slate-200 shadow-sm'}`}
            draggable
            onDragStart={(e) => onChapterDragStart(e, cIdx)}
            onDragOver={(e) => onChapterDragOver(e, cIdx)}
            onDragEnd={onDragEnd}
          >
            {/* Chapter Header */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50/80 group">
              <div className="flex items-center gap-2 flex-1">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  checked={selectedChapters.has(chapter.id)}
                  onChange={(e) => {
                    const newSet = new Set(selectedChapters);
                    if (e.target.checked) newSet.add(chapter.id);
                    else newSet.delete(chapter.id);
                    setSelectedChapters(newSet);
                  }}
                />
                <div className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600">
                  <GripVertical className="w-4 h-4" />
                </div>
                <button onClick={() => toggleExpand(cIdx)} className="p-1 text-slate-500 hover:text-blue-600 transition-colors">
                  {chapter.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                
                {editingId === chapter.id ? (
                  <input 
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => {
                      const newChapters = [...chapters];
                      newChapters[cIdx].title = editValue || '未命名章节';
                      setChapters(newChapters);
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                    className="px-2 py-1 text-sm font-bold text-slate-800 border-b-2 border-blue-500 bg-transparent outline-none w-1/2"
                  />
                ) : (
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    {chapter.title}
                    <Edit3 
                      className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => { setEditingId(chapter.id); setEditValue(chapter.title); }}
                    />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Add Task Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setAddTaskDropdownIdx(addTaskDropdownIdx === cIdx ? null : cIdx)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> 增加子任务 <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {addTaskDropdownIdx === cIdx && (
                    <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1">
                      <button onClick={() => handleAddTask(cIdx, 'text')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><FileText className="w-4 h-4"/> 图文学习</button>
                      <button onClick={() => handleAddTask(cIdx, 'video')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><Video className="w-4 h-4"/> 视频学习</button>
                      <button onClick={() => handleAddTask(cIdx, 'exercise')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><FileQuestion className="w-4 h-4"/> 习题与测试</button>
                      <button onClick={() => handleAddTask(cIdx, 'experiment')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><FlaskConical className="w-4 h-4"/> 实验与实训</button>
                      <button onClick={() => handleAddTask(cIdx, 'report')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"><FileBarChart className="w-4 h-4"/> 报告与描述</button>
                    </div>
                  )}
                </div>

                <div className="w-px h-4 bg-slate-300"></div>
                <button 
                  onClick={() => handleToggleTrial(cIdx)}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${chapter.tasks.some(t => t.isTrial) ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {chapter.tasks.some(t => t.isTrial) ? '取消试学' : '设为试学'}
                </button>
                <button onClick={() => handleDeleteChapter(cIdx)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tasks List */}
            {chapter.isExpanded && (
              <div className="p-2 space-y-1 bg-white">
                {chapter.tasks.length === 0 ? (
                  <div className="text-center py-6 text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-lg m-2">
                    暂无任务，请点击上方按钮添加
                  </div>
                ) : (
                  chapter.tasks.map((task, tIdx) => (
                    <div 
                      key={task.id} 
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg group transition-all border cursor-pointer ${draggedTaskInfo?.cIdx === cIdx && draggedTaskInfo?.tIdx === tIdx ? 'opacity-50 border-blue-300 bg-blue-50' : 'border-transparent hover:border-slate-100 hover:bg-slate-50'}`}
                      draggable
                      onDragStart={(e) => onTaskDragStart(e, cIdx, tIdx)}
                      onDragOver={(e) => onTaskDragOver(e, cIdx, tIdx)}
                      onDragEnd={onDragEnd}
                      onClick={() => handleEditTask(cIdx, tIdx)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                          checked={selectedTasks.has(task.id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const newSet = new Set(selectedTasks);
                            if (e.target.checked) newSet.add(task.id);
                            else newSet.delete(task.id);
                            setSelectedTasks(newSet);
                          }}
                        />
                        <div 
                          className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GripVertical className="w-3.5 h-3.5" />
                        </div>
                        <div className={`p-1.5 rounded-md ${getTaskColor(task.type)}`}>
                          {getTaskIcon(task.type)}
                        </div>
                        
                        {editingId === task.id ? (
                          <input 
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onBlur={() => {
                              const newChapters = [...chapters];
                              newChapters[cIdx].tasks[tIdx].title = editValue || '未命名任务';
                              setChapters(newChapters);
                              setEditingId(null);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                            className="px-2 py-1 text-sm text-slate-700 border-b border-blue-500 bg-transparent outline-none w-1/2"
                          />
                        ) : (
                          <span className="text-sm text-slate-700 flex items-center gap-2">
                            {task.title}
                            <button 
                              className="text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" 
                              onClick={(e) => { e.stopPropagation(); handleEditTask(cIdx, tIdx); }}
                              title="编辑任务详情"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        )}
                        
                        {task.isTrial && (
                          <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-md border border-orange-100 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> 试学
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleToggleTrial(cIdx, tIdx); }}
                          className={`text-xs px-2 py-1 rounded transition-colors ${task.isTrial ? 'text-orange-600 hover:bg-orange-50' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}
                        >
                          {task.isTrial ? '取消试学' : '设为试学'}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(cIdx, tIdx); }} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">基本信息</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">保存信息</button>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500">*</span>
          <span className="text-sm font-medium text-slate-700">课程概述</span>
          <button className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs border border-indigo-100 hover:bg-indigo-100 transition-colors ml-2">
            <Sparkles className="w-3 h-3" /> AI生文
          </button>
        </div>
        <div className="relative">
          <textarea 
            className="w-full border border-slate-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition-all" 
            rows={3} 
            defaultValue="熟悉计算机视觉技术应用"
          ></textarea>
          <span className="absolute bottom-3 right-4 text-xs text-slate-400">11/255</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-500">*</span>
          <span className="text-sm font-medium text-slate-700">课程说明（请输入适用人群、课程背景、课程需求以及课程实现方案等说明）</span>
          <button className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs border border-indigo-100 hover:bg-indigo-100 transition-colors ml-2">
            <Sparkles className="w-3 h-3" /> AI生文
          </button>
        </div>
        <div className="border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1">
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Bold className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Italic className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Underline className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Strikethrough className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><AlignLeft className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><AlignCenter className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><AlignRight className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Quote className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><List className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><ListOrdered className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><LinkIcon className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><ImageIcon className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Code className="w-4 h-4" /></button>
            <div className="flex-1"></div>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Layout className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Eye className="w-4 h-4" /></button>
            <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Code2 className="w-4 h-4" /></button>
          </div>
          <textarea 
            className="w-full p-4 text-sm outline-none resize-y min-h-[300px]" 
            defaultValue="本课程培养学生熟悉计算机视觉应用开发的相关操作，具备对人工智能技术领域出现的新技术、新思想进一步学习的能力。加深对计算机视觉技术的理解，为进一步研究和从事人工智能技术实践提供良好的基础和参考"
          ></textarea>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">课程设置</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">保存设置</button>
      </div>
      
      <div className="max-w-2xl space-y-8">
        <div className="flex items-center gap-6">
          <label className="w-24 text-sm font-medium text-slate-700">课时</label>
          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border-r border-slate-300">-</button>
            <input type="text" className="w-16 text-center py-1.5 text-sm outline-none" defaultValue="68" />
            <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border-l border-slate-300">+</button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="w-24 text-sm font-medium text-slate-700">资源难度</label>
          <div className="flex items-center gap-6">
            {['入门', '容易', '较难', '高阶'].map(level => (
              <label key={level} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="difficulty" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" defaultChecked={level === '容易'} />
                <span className="text-sm text-slate-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="w-24 text-sm font-medium text-slate-700">排序号</label>
          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border-r border-slate-300">-</button>
            <input type="text" className="w-16 text-center py-1.5 text-sm outline-none" defaultValue="57" />
            <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border-l border-slate-300">+</button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="w-24 text-sm font-medium text-slate-700">是否显示</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        <div className="flex items-center gap-6">
          <label className="w-24 text-sm font-medium text-slate-700">是否推荐</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="flex flex-col items-center justify-center h-64 text-slate-400 animate-fade-in">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
        <SettingsIcon className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-base font-medium text-slate-600 mb-1">{title}</h3>
      <p className="text-sm text-slate-400">该模块正在开发中...</p>
    </div>
  );

  const renderPreview = () => {
    if (previewView === 'detail') {
      return (
        <div className="fixed inset-0 z-[100] bg-slate-50 overflow-y-auto animate-fade-in pb-20">
          {/* Preview Top Bar */}
          <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPreviewMode(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-slate-200"></div>
              <span className="text-sm font-bold text-slate-700">预览模式：课程详情页</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 italic">当前正在预览编辑中的内容</span>
              <button 
                onClick={() => setIsPreviewMode(false)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-colors"
              >
                退出预览
              </button>
            </div>
          </div>

          {/* Header Banner */}
          <div className="bg-white border-b border-slate-200 pt-8 pb-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-12">
                  <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">计算机视觉技术应用</h1>
                  <p className="text-slate-500 mb-8">熟悉计算机视觉技术应用，掌握人工智能领域新技术。</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>课时：<span className="font-medium text-slate-900">68</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span>课程类型：<span className="font-medium text-slate-900">{courseInfo.type}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-blue-500" />
                      <span>课程标签：<span className="font-medium text-slate-900">{courseInfo.tag}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart className="w-4 h-4 text-blue-500" />
                      <span>难度：<span className="font-medium text-slate-900">容易</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      <span>专业：<span className="font-medium text-slate-900">{courseInfo.major}</span></span>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-[400px] h-[220px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-100">
                  <img src={coverImage} alt="Course Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray={176} strokeDashoffset={176} strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-sm font-bold text-slate-700">0%</span>
                </div>
                <div>
                  <p className="text-slate-500 text-sm">已学 0 节 | 学完 0%</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-slate-500 text-sm">已有 <span className="font-bold text-slate-900">0</span> 人在学</p>
                </div>
                <button 
                  onClick={() => {
                    setPreviewView('learning');
                    if (chapters.length > 0 && chapters[0].tasks.length > 0) {
                      setPreviewTask(chapters[0].tasks[0]);
                    }
                  }}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" /> 开始学习
                </button>
                <div className="hidden xl:block w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column: Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {/* Tabs */}
                <div className="flex border-b border-slate-100">
                  <button 
                    onClick={() => setActivePreviewTab('intro')}
                    className={`px-8 py-4 text-sm font-bold transition-all relative ${activePreviewTab === 'intro' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    介绍
                    {activePreviewTab === 'intro' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
                  </button>
                  <button 
                    onClick={() => setActivePreviewTab('syllabus')}
                    className={`px-8 py-4 text-sm font-bold transition-all relative ${activePreviewTab === 'syllabus' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    目录
                    {activePreviewTab === 'syllabus' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  {activePreviewTab === 'intro' ? (
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-600 leading-relaxed">
                        本课程培养学生熟悉计算机视觉技术应用的相关操作，具备对人工智能技术领域出现的新技术、新思想进一步学习的能力。加深对计算机视觉技术的理解，为进一步研究和从事人工智能技术实践提供良好的基础 and 参考。
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {chapters.map((chapter, idx) => (
                        <div key={chapter.id} className="space-y-4">
                          <h3 className="text-blue-600 font-bold flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                            {chapter.title}
                          </h3>
                          <div className="space-y-2">
                            {chapter.tasks.map((task) => (
                              <div 
                                key={task.id} 
                                className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-pointer"
                                onClick={() => {
                                  setPreviewView('learning');
                                  setPreviewTask(task);
                                }}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTaskColor(task.type)}`}>
                                    {getTaskIcon(task.type)}
                                  </div>
                                  <span className="text-slate-700 font-medium">{task.title}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  {task.isTrial && (
                                    <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded border border-orange-100">试学</span>
                                  )}
                                  <button className="px-4 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    开始学习
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-6">
              {/* AI Tools */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                  AI工具
                </h3>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 cursor-pointer hover:scale-105 transition-transform">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">AI工具</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                  课程开发人员
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-md">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">管理员</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">讲师</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">课程负责人</p>
                  </div>
                </div>
              </div>

              {/* Lab Environment */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                  实验环境
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-500 border border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] text-slate-500 text-center font-medium">视觉实训环境</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-500 border border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Database className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] text-slate-500 text-center font-medium">数据集管理</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-500 border border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Box className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] text-slate-500 text-center font-medium">模型部署</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Buttons */}
          <div className="fixed right-8 bottom-8 flex flex-col gap-4 z-50">
            <button className="w-14 h-14 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col items-center justify-center text-blue-600 hover:bg-blue-50 transition-all group">
              <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold mt-1">申请试用</span>
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 bg-white rounded-2xl shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all group"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      );
    }

    // Learning View
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-fade-in">
        {/* Learning Header */}
        <div className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPreviewView('detail')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-white/20"></div>
            <h2 className="text-lg font-bold truncate max-w-md">计算机视觉技术应用</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-emerald-500"></div>
              </div>
              <span className="text-xs font-medium text-white/60">进度 0%</span>
            </div>
            <button 
              onClick={() => setIsPreviewMode(false)}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors"
            >
              退出预览
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Catalog */}
          <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50 shrink-0">
            <div className="p-4 border-b border-slate-200 bg-white">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ListTree className="w-4 h-4 text-blue-500" />
                课程目录
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-4">
              {chapters.map((chapter, cIdx) => (
                <div key={chapter.id} className="space-y-1">
                  <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    第 {cIdx + 1} 章：{chapter.title}
                  </div>
                  {chapter.tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setPreviewTask(task)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${previewTask?.id === task.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-white text-slate-600 hover:text-slate-900'}`}
                    >
                      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${previewTask?.id === task.id ? 'bg-white/20' : getTaskColor(task.type)}`}>
                        {getTaskIcon(task.type)}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-medium truncate">{task.title}</div>
                        <div className={`text-[10px] mt-0.5 ${previewTask?.id === task.id ? 'text-white/60' : 'text-slate-400'}`}>
                          {task.type === 'video' ? '视频学习' : task.type === 'experiment' ? '实操练习' : '图文内容'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {previewTask ? (
              <>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getTaskColor(previewTask.type)}`}>
                        {previewTask.type}
                      </span>
                      <span className="text-xs text-slate-400">任务 ID: {previewTask.id}</span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900">{previewTask.title}</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                      完成并继续
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="max-w-4xl mx-auto">
                    {previewTask.type === 'video' ? (
                      <div className="aspect-video bg-slate-900 rounded-3xl flex items-center justify-center group cursor-pointer relative overflow-hidden shadow-2xl">
                        <img src="https://picsum.photos/seed/video/1280/720" alt="Video Placeholder" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                            <Play className="w-8 h-8 text-white fill-current" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <span>00:00 / 15:00</span>
                            <div className="flex-1 h-1 bg-white/20 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    ) : previewTask.type === 'experiment' ? (
                      <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
                          <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                            <Wrench className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-blue-900 mb-1">实验实训环境</h3>
                            <p className="text-sm text-blue-700 mb-4">本任务包含在线实操环境，点击下方按钮进入实训。</p>
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
                              <Cpu className="w-4 h-4" /> 进入实训环境
                            </button>
                          </div>
                        </div>
                        <div className="prose prose-slate max-w-none">
                          <h3>实验目标</h3>
                          <ul>
                            <li>掌握基础环境配置</li>
                            <li>理解核心算法流程</li>
                            <li>完成指定功能模块开发</li>
                          </ul>
                          <h3>实验步骤</h3>
                          <p>1. 登录实训环境...</p>
                          <p>2. 执行初始化脚本...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="prose prose-slate max-w-none">
                        <h2>任务详情</h2>
                        <p>这里是图文学习内容的预览区域。在实际应用中，这里将展示富文本编辑器编辑后的内容。</p>
                        <img src="https://picsum.photos/seed/content/800/400" alt="Content" className="rounded-2xl shadow-lg my-8" referrerPolicy="no-referrer" />
                        <p>课程内容涵盖了对人工智能技术领域出现的新技术、新思想进一步学习的能力。</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <BookOpen className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-lg font-medium text-slate-500">请从左侧目录选择一个任务开始预览</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full animate-fade-in relative">
      {isPreviewMode && renderPreview()}
      {renderHeader()}

      {/* Main Editor Area */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 py-3 overflow-hidden sticky top-0">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all relative
                  ${activeTab === tab.id 
                    ? 'text-blue-700 bg-blue-50/50' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                {activeTab === tab.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"></div>
                )}
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} /> 
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'basic' && renderBasicInfo()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'chapters' && renderChapters()}
          {activeTab === 'ai' && renderPlaceholder('AI技能助手')}
          {activeTab === 'graph' && renderPlaceholder('技能图谱')}
        </div>
      </div>

      <TaskEditDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        task={editingTask}
        onSave={handleSaveTask}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmInfo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {deleteConfirmInfo.type === 'chapter' ? '删除章节' : deleteConfirmInfo.type === 'task' ? '删除任务' : '批量删除'}
                  </h3>
                  <p className="text-slate-500 mt-1">
                    {deleteConfirmInfo.type === 'chapter' 
                      ? '确定要删除该章节及其所有任务吗？此操作不可恢复。' 
                      : deleteConfirmInfo.type === 'task'
                      ? '确定要删除该任务吗？此操作不可恢复。'
                      : `确定要删除选中的 ${selectedChapters.size} 个章节和 ${selectedTasks.size} 个任务吗？此操作不可恢复。`}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
              <button 
                onClick={() => setDeleteConfirmInfo(null)} 
                className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                取消
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-sm"
              >
                确定删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEditor;
