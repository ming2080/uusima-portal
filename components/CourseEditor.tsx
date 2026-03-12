import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Eye, XCircle, Edit3, Book, Settings as SettingsIcon, 
  ListTree, Bot, Network, Plus, Trash2, ChevronDown, ChevronRight,
  FileText, Wrench, Video, Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, Quote, List, ListOrdered,
  Link as LinkIcon, Image as ImageIcon, Code, Table, Layout, Code2,
  Sparkles, Tag, Layers, Bookmark, GripVertical, CheckCircle2, AlertCircle,
  UploadCloud, FileQuestion, FlaskConical, FileBarChart
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
  
  // Drag and Drop State
  const [draggedChapterIdx, setDraggedChapterIdx] = useState<number | null>(null);
  const [draggedTaskInfo, setDraggedTaskInfo] = useState<{cIdx: number, tIdx: number} | null>(null);

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
    if(confirm('确定要删除该章节及其所有任务吗？')) {
      const newChapters = [...chapters];
      newChapters.splice(cIdx, 1);
      setChapters(newChapters);
    }
  };

  const handleDeleteTask = (cIdx: number, tIdx: number) => {
    if(confirm('确定要删除该任务吗？')) {
      const newChapters = [...chapters];
      newChapters[cIdx].tasks.splice(tIdx, 1);
      setChapters(newChapters);
    }
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
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium flex items-center gap-1.5 hover:bg-blue-100 transition-colors">
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
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg group transition-all border ${draggedTaskInfo?.cIdx === cIdx && draggedTaskInfo?.tIdx === tIdx ? 'opacity-50 border-blue-300 bg-blue-50' : 'border-transparent hover:border-slate-100 hover:bg-slate-50'}`}
                      draggable
                      onDragStart={(e) => onTaskDragStart(e, cIdx, tIdx)}
                      onDragOver={(e) => onTaskDragOver(e, cIdx, tIdx)}
                      onDragEnd={onDragEnd}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500">
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
                              onClick={() => handleEditTask(cIdx, tIdx)}
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
                          onClick={() => handleToggleTrial(cIdx, tIdx)}
                          className={`text-xs px-2 py-1 rounded transition-colors ${task.isTrial ? 'text-orange-600 hover:bg-orange-50' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}
                        >
                          {task.isTrial ? '取消试学' : '设为试学'}
                        </button>
                        <button onClick={() => handleDeleteTask(cIdx, tIdx)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

        <div className="flex items-center gap-6">
          <label className="w-24 text-sm font-medium text-slate-700">
            <span className="text-red-500 mr-1">*</span>资源属性
          </label>
          <div className="flex items-center gap-6">
            {['公开', '非公开'].map(attr => (
              <label key={attr} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="attribute" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" defaultChecked={attr === '公开'} />
                <span className="text-sm text-slate-700">{attr}</span>
              </label>
            ))}
          </div>
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

  return (
    <div className="flex flex-col h-full animate-fade-in relative">
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
    </div>
  );
};

export default CourseEditor;
