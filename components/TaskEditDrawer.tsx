import React, { useState } from 'react';
import { 
  X, Upload, Plus, Trash2, ArrowUp, ArrowDown, Link as LinkIcon, 
  Image as ImageIcon, Code, Layout, Eye, Code2, Bold, Italic, 
  Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, 
  Quote, List, ListOrdered, Box, FileText, CheckCircle2, ChevronRight, ChevronDown,
  UploadCloud, Video, AlertCircle, Terminal, Cpu, Globe, Database
} from 'lucide-react';

export type TaskType = 'text' | 'video' | 'exercise' | 'experiment' | 'report';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  isTrial: boolean;
}

interface TaskEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (updatedTask: Task) => void;
}

const TaskEditDrawer: React.FC<TaskEditDrawerProps> = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [type, setType] = useState<TaskType>(task?.type || 'text');

  // Video upload simulation state
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Experiment resource upload simulation state
  const [expUploadStatus, setExpUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [expUploadProgress, setExpUploadProgress] = useState(0);
  const [expFiles, setExpFiles] = useState([
    { id: 1, name: '深度学习实验指导书.pdf', size: '2.4 MB', type: 'pdf', status: 'success' },
    { id: 2, name: 'mnist_dataset.zip', size: '15.8 MB', type: 'zip', status: 'success' }
  ]);

  // Experiment Environment State
  const [environments, setEnvironments] = useState([
    { id: 'env-1', name: '人工智能 Jupyter', desc: '包含 PyTorch, TensorFlow，适用于深度学习', icon: 'python', cpu: '4核', ram: '8GB', gpu: '无' },
    { id: 'env-2', name: 'Web 前端开发', desc: 'Node.js, React, Vue，适用于全栈开发', icon: 'node', cpu: '2核', ram: '4GB', gpu: '无' },
    { id: 'env-3', name: 'Linux 基础终端', desc: 'Ubuntu 22.04 LTS，适用于系统运维与基础实验', icon: 'terminal', cpu: '2核', ram: '2GB', gpu: '无' },
  ]);
  const [selectedEnvId, setSelectedEnvId] = useState('env-1');
  const [isEnvModalOpen, setIsEnvModalOpen] = useState(false);
  const [newEnvName, setNewEnvName] = useState('');
  const [newEnvDesc, setNewEnvDesc] = useState('');
  const [newEnvTemplate, setNewEnvTemplate] = useState('python');
  const [newEnvHardware, setNewEnvHardware] = useState('standard');
  const [customCpu, setCustomCpu] = useState('8核');
  const [customRam, setCustomRam] = useState('16GB');
  const [customGpu, setCustomGpu] = useState('无');
  const [saveAsHwTemplate, setSaveAsHwTemplate] = useState(false);
  const [customHwName, setCustomHwName] = useState('');
  const [hardwareOptions, setHardwareOptions] = useState([
    { id: 'basic', name: '基础型', spec: '2核 CPU / 4GB 内存', price: '免费', isCustom: false },
    { id: 'standard', name: '标准型', spec: '4核 CPU / 8GB 内存', price: '标准计费', isCustom: false },
    { id: 'gpu', name: 'GPU 计算型', spec: '8核 CPU / 32GB 内存 / T4 GPU', price: '高级计费', isCustom: false },
    { id: 'custom', name: '自定义配置', spec: '按需选择 CPU / 内存 / GPU', price: '按量计费', isCustom: true },
  ]);

  // Update local state when task changes
  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setType(task.type);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    onSave({ ...task, title, type });
    onClose();
  };

  const handleUploadVideo = () => {
    if (uploadStatus === 'uploading' || uploadStatus === 'success') return;
    setUploadStatus('uploading');
    setUploadProgress(0);
    setVideoUrl('');
    
    // Simulate a 20% chance of failure for demonstration purposes
    const willFail = Math.random() < 0.2;
    const failAt = Math.floor(Math.random() * 40) + 30; // Fail between 30% and 70%

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (willFail && prev >= failAt) {
          clearInterval(interval);
          setUploadStatus('error');
          return prev;
        }
        
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          setVideoUrl('https://vod.huaweicloud.com/asset/v1/video_7a8b9c.mp4');
          
          // Reset to idle after 3 seconds so they can upload again if they want
          setTimeout(() => {
            setUploadStatus('idle');
          }, 3000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleUploadExpResource = () => {
    if (expUploadStatus === 'uploading') return;
    setExpUploadStatus('uploading');
    setExpUploadProgress(0);
    
    // Add a temporary uploading file
    const newFileId = Date.now();
    setExpFiles(prev => [
      { id: newFileId, name: '新实验代码包_v2.zip', size: '8.5 MB', type: 'zip', status: 'uploading' },
      ...prev
    ]);

    const interval = setInterval(() => {
      setExpUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExpUploadStatus('success');
          
          // Update the file status to success
          setExpFiles(prevFiles => 
            prevFiles.map(f => f.id === newFileId ? { ...f, status: 'success' } : f)
          );
          
          setTimeout(() => {
            setExpUploadStatus('idle');
          }, 2000);
          
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const removeExpFile = (id: number) => {
    setExpFiles(prev => prev.filter(f => f.id !== id));
  };

  const renderIcon = (type: string) => {
    switch(type) {
      case 'code': return <Code2 className="w-5 h-5" />;
      case 'layout': return <Layout className="w-5 h-5" />;
      case 'box': return <Box className="w-5 h-5" />;
      case 'python': return <Terminal className="w-5 h-5" />;
      case 'java': return <Code className="w-5 h-5" />;
      case 'node': return <Globe className="w-5 h-5" />;
      case 'cpp': return <Cpu className="w-5 h-5" />;
      case 'terminal': return <Terminal className="w-5 h-5" />;
      default: return <Box className="w-5 h-5" />;
    }
  };

  const handleSaveNewEnv = () => {
    if (!newEnvName.trim()) return;
    
    let cpu = '2核', ram = '4GB', gpu = '无';
    
    if (newEnvHardware === 'custom') { 
      cpu = customCpu; 
      ram = customRam; 
      gpu = customGpu; 
      
      if (saveAsHwTemplate && customHwName.trim()) {
        const newHw = {
          id: `hw-${Date.now()}`,
          name: customHwName.trim(),
          spec: `${customCpu} CPU / ${customRam} 内存${customGpu !== '无' ? ` / ${customGpu} GPU` : ''}`,
          price: '自定义计费',
          isCustom: false
        };
        setHardwareOptions(prev => {
          const customIdx = prev.findIndex(h => h.id === 'custom');
          const newOpts = [...prev];
          newOpts.splice(customIdx, 0, newHw);
          return newOpts;
        });
      }
    } else {
      const selectedHw = hardwareOptions.find(h => h.id === newEnvHardware);
      if (selectedHw) {
        // Parse spec string to get cpu, ram, gpu
        const specParts = selectedHw.spec.split(' / ');
        cpu = specParts[0].replace(' CPU', '');
        ram = specParts[1].replace(' 内存', '');
        if (specParts.length > 2) {
          gpu = specParts[2].replace(' GPU', '');
        }
      }
    }

    let icon = 'box';
    if (newEnvTemplate === 'python') icon = 'python';
    if (newEnvTemplate === 'node') icon = 'node';
    if (newEnvTemplate === 'java') icon = 'java';
    if (newEnvTemplate === 'cpp') icon = 'cpp';

    const templateNames: Record<string, string> = {
      python: 'Python 3.10',
      java: 'Java 17',
      node: 'Node.js 18',
      cpp: 'C/C++ GCC'
    };

    const newEnv = {
      id: `env-${Date.now()}`,
      name: newEnvName,
      desc: newEnvDesc.trim() || `基于 ${templateNames[newEnvTemplate] || newEnvTemplate} 模板`,
      icon,
      cpu,
      ram,
      gpu
    };

    setEnvironments([...environments, newEnv]);
    setSelectedEnvId(newEnv.id);
    setIsEnvModalOpen(false);
    setNewEnvName('');
    setNewEnvDesc('');
    setNewEnvTemplate('python');
    setNewEnvHardware('standard');
    setCustomCpu('8核');
    setCustomRam('16GB');
    setCustomGpu('无');
    setSaveAsHwTemplate(false);
    setCustomHwName('');
  };

  const renderRichTextEditor = () => (
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
        className="w-full p-4 text-sm outline-none resize-y min-h-[200px]" 
        placeholder="请输入正文"
      ></textarea>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
      <Box className="w-16 h-16 text-slate-200 mb-4" />
      <p className="text-sm">暂无数据</p>
    </div>
  );

  const renderContentByType = () => {
    switch (type) {
      case 'text':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <span className="text-red-500 mr-1">*</span>图文内容编辑
              </label>
              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="editMode" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">在线编辑</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="editMode" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" defaultChecked />
                  <span className="text-sm text-slate-700">上传文档 (PDF/Word)</span>
                </label>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                <Upload className="w-4 h-4" /> 本地上传
              </button>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-700">指令配置</span>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                  新增指令
                </button>
              </div>
              {renderEmptyState()}
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="space-y-8">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-slate-800">
                  <span className="text-red-500 mr-1">*</span>视频资源配置
                </label>
                <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded">华为云 VOD 服务</span>
              </div>
              
              <div className="space-y-4">
                {/* Upload Area */}
                <div 
                  onClick={handleUploadVideo}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                    uploadStatus === 'uploading' ? 'border-blue-400 bg-blue-50' :
                    uploadStatus === 'success' ? 'border-emerald-400 bg-emerald-50' :
                    uploadStatus === 'error' ? 'border-red-400 bg-red-50' :
                    'border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  {uploadStatus === 'uploading' && (
                    <div className="w-full max-w-xs text-center">
                      <div className="mb-2 flex justify-between text-xs text-blue-600 font-medium">
                        <span>正在上传至华为云 VOD...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-200" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {uploadStatus === 'success' && (
                    <div className="text-center animate-fade-in">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-3 mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-emerald-700 mb-1">上传成功！</p>
                      <p className="text-xs text-emerald-600/70">视频已保存至华为云 VOD</p>
                    </div>
                  )}
                  {uploadStatus === 'error' && (
                    <div className="text-center animate-fade-in">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-3 mx-auto">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-red-700 mb-1">上传失败</p>
                      <p className="text-xs text-red-600/70">网络连接中断，点击重试</p>
                    </div>
                  )}
                  {uploadStatus === 'idle' && (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-3 mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 mb-1">点击上传视频至华为云 VOD</p>
                      <p className="text-xs text-slate-400">支持 MP4, WebM, FLV 格式，最大 2GB</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-xs text-slate-400">或手动输入视频链接</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">视频播放地址 (URL)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="https://..."
                        className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                      />
                    </div>
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 border border-slate-300 rounded-lg text-sm hover:bg-slate-200 transition-colors">
                      预览
                    </button>
                  </div>
                </div>
                
                {/* Video Metadata Mock (Shows when URL is present) */}
                {videoUrl && (
                  <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-lg animate-fade-in">
                    <div className="w-24 h-16 bg-slate-800 rounded flex items-center justify-center relative overflow-hidden">
                      <img src="https://picsum.photos/seed/video/300/200" className="w-full h-full object-cover opacity-50" alt="thumbnail" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm">
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 line-clamp-1">{title || '未命名视频'}.mp4</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span>时长: 12:45</span>
                        <span>大小: 156 MB</span>
                        <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 转码完成</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-700">指令配置</span>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                  新增指令
                </button>
              </div>
              {renderEmptyState()}
            </div>
          </div>
        );

      case 'exercise':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">题目列表：</label>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">新建题目</button>
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg text-sm hover:bg-blue-50 transition-colors">从题库导入</button>
                </div>
                <div className="flex gap-6 text-sm">
                  <span className="text-slate-600">总分数: <span className="text-red-500 font-bold">18</span>分</span>
                  <span className="text-slate-600">评分项个数: <span className="text-blue-500 font-bold">10</span>个</span>
                </div>
              </div>
              
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-3 font-medium w-12"></th>
                    <th className="py-3 font-medium">名称</th>
                    <th className="py-3 font-medium w-24">题目类型</th>
                    <th className="py-3 font-medium w-32">分数</th>
                    <th className="py-3 font-medium w-32">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: 1, name: '数据标注在机器学习中的作用是（ ）。', type: '单选题', score: 3 },
                    { id: 2, name: '智能家居安防系统中应用的生物识别技术有（ ）。', type: '多选题', score: 5 },
                    { id: 3, name: '智能音箱本质上是音箱、智能语音交互系统、互联网、内容叠加的产物。', type: '判断题', score: 2 },
                  ].map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50">
                      <td className="py-3 text-slate-400"><ChevronRight className="w-4 h-4" /></td>
                      <td className="py-3 text-slate-700 pr-4">{q.id}. {q.name}</td>
                      <td className="py-3 text-slate-600">{q.type}</td>
                      <td className="py-3">
                        <div className="flex items-center border border-slate-300 rounded overflow-hidden w-20">
                          <button className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border-r border-slate-300">-</button>
                          <input type="text" className="w-full text-center py-1 text-sm outline-none" value={q.score} readOnly />
                          <button className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border-l border-slate-300">+</button>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2 text-slate-400">
                          <button className="hover:text-blue-500"><Code2 className="w-4 h-4" /></button>
                          <button className="hover:text-red-500"><X className="w-4 h-4" /></button>
                          <button className="hover:text-slate-600"><ArrowUp className="w-4 h-4" /></button>
                          <button className="hover:text-slate-600"><ArrowDown className="w-4 h-4" /></button>
                          <button className="hover:text-blue-500"><LinkIcon className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-700">指令配置</span>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                  新增指令
                </button>
              </div>
              {renderEmptyState()}
            </div>
          </div>
        );

      case 'experiment':
        return (
          <div className="space-y-8">
            {/* 实验环境选择 */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-slate-800">
                  <span className="text-red-500 mr-1">*</span>实验环境选择
                </label>
                <button 
                  onClick={() => setIsEnvModalOpen(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> 新建环境
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {environments.map((env) => (
                  <label key={env.id} className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all ${selectedEnvId === env.id ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 bg-white hover:border-blue-300'}`}>
                    <input 
                      type="radio" 
                      name="lab-env" 
                      className="absolute opacity-0" 
                      checked={selectedEnvId === env.id} 
                      onChange={() => setSelectedEnvId(env.id)} 
                    />
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${selectedEnvId === env.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {renderIcon(env.icon)}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm mb-1">{env.name}</span>
                    <span className="text-xs text-slate-500">{env.desc}</span>
                    {selectedEnvId === env.id && (
                      <div className="absolute top-3 right-3 text-blue-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 pt-4 border-t border-slate-200">
                <span className="text-sm text-slate-600">环境配置：</span>
                <span className="text-xs px-2 py-1 bg-white border border-slate-200 rounded text-slate-600">CPU: {environments.find(e => e.id === selectedEnvId)?.cpu || '2核'}</span>
                <span className="text-xs px-2 py-1 bg-white border border-slate-200 rounded text-slate-600">内存: {environments.find(e => e.id === selectedEnvId)?.ram || '4GB'}</span>
                <span className="text-xs px-2 py-1 bg-white border border-slate-200 rounded text-slate-600">GPU: {environments.find(e => e.id === selectedEnvId)?.gpu || '无'}</span>
                <button className="text-xs text-blue-600 hover:underline ml-auto">修改配置</button>
              </div>
            </div>

            {/* 实验资源上传 */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <label className="block text-sm font-bold text-slate-800 mb-1">
                实验资源上传
              </label>
              <p className="text-xs text-slate-500 mb-4">
                支持上传实验指导书、代码包、数据集等资源（支持 .zip, .pdf, .ipynb 格式，单个文件不超过 500MB）
              </p>
              
              <div 
                onClick={handleUploadExpResource}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer mb-4 ${
                  expUploadStatus === 'uploading' ? 'border-blue-400 bg-blue-50' :
                  expUploadStatus === 'success' ? 'border-emerald-400 bg-emerald-50' :
                  'border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                {expUploadStatus === 'uploading' ? (
                  <div className="w-full max-w-xs text-center">
                    <div className="mb-2 flex justify-between text-xs text-blue-600 font-medium">
                      <span>正在上传资源文件...</span>
                      <span>{expUploadProgress}%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-200" 
                        style={{ width: `${expUploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : expUploadStatus === 'success' ? (
                  <div className="text-center animate-fade-in">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-3 mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-emerald-700 mb-1">上传成功！</p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-slate-700 mb-1">点击或拖拽文件到此处上传</p>
                    <p className="text-xs text-slate-400">支持批量上传多个文件</p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {expFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${
                        file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
                      }`}>
                        {file.type === 'pdf' ? <FileText className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{file.name}</p>
                        <p className="text-xs text-slate-400">
                          {file.size} • {file.status === 'uploading' ? <span className="text-blue-500">上传中...</span> : '上传成功'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeExpFile(file.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">实验正文</label>
              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="expEditMode" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">在线编辑</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="expEditMode" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500" defaultChecked />
                  <span className="text-sm text-slate-700">上传PDF</span>
                </label>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors mb-4">
                <Upload className="w-4 h-4" /> 本地上传
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FileText className="w-4 h-4" />
                <span>项目一实训指导手册_计算机视觉技术应...</span>
                <div className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-700">指令配置</span>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                  新增指令
                </button>
              </div>
              {renderEmptyState()}
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="space-y-6">
            {renderRichTextEditor()}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-700">指令配置</span>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                  新增指令
                </button>
              </div>
              {renderEmptyState()}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[800px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">编辑任务</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="space-y-8 max-w-3xl mx-auto">
            
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="text-red-500 mr-1">*</span>步骤名称
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">{title.length}/50</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="text-red-500 mr-1">*</span>步骤类型
                </label>
                <div className="relative">
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as TaskType)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm appearance-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="text">图文学习</option>
                    <option value="video">视频学习</option>
                    <option value="exercise">习题与测试</option>
                    <option value="experiment">实验与实训</option>
                    <option value="report">报告与描述</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">技能点</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm appearance-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-slate-400">
                  <option value="">请选择</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Dynamic Content based on Type */}
            {renderContentByType()}

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center gap-4">
          <button onClick={onClose} className="px-8 py-2.5 bg-slate-400 text-white rounded-lg text-sm font-medium hover:bg-slate-500 transition-colors">
            取消
          </button>
          <button onClick={handleSave} className="px-8 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
            保存
          </button>
        </div>
      </div>

      {/* New Environment Modal */}
      {isEnvModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEnvModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">新建实验环境</h3>
              <button onClick={() => setIsEnvModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">环境名称</label>
                <input 
                  type="text" 
                  value={newEnvName} 
                  onChange={e => setNewEnvName(e.target.value)} 
                  placeholder="例如：Python 数据分析环境" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">环境简介</label>
                <input 
                  type="text" 
                  value={newEnvDesc} 
                  onChange={e => setNewEnvDesc(e.target.value)} 
                  placeholder="例如：用于深度学习模型训练（选填）" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">基础镜像 / 模板</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'python', name: 'Python 3.10', desc: '基础 Python 环境' },
                    { id: 'java', name: 'Java 17', desc: 'Spring Boot 开发' },
                    { id: 'node', name: 'Node.js 18', desc: '前端/全栈开发' },
                    { id: 'cpp', name: 'C/C++ GCC', desc: '底层与算法开发' },
                  ].map(tpl => (
                    <label key={tpl.id} className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${newEnvTemplate === tpl.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                      <input 
                        type="radio" 
                        name="env-tpl" 
                        className="mt-1 mr-3 text-blue-600 focus:ring-blue-500" 
                        checked={newEnvTemplate === tpl.id} 
                        onChange={() => setNewEnvTemplate(tpl.id)} 
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{tpl.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{tpl.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">硬件配置</label>
                <div className="space-y-3">
                  {hardwareOptions.map(hw => (
                    <div key={hw.id}>
                      <label className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${newEnvHardware === hw.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            name="env-hw" 
                            className="mr-3 text-blue-600 focus:ring-blue-500" 
                            checked={newEnvHardware === hw.id} 
                            onChange={() => setNewEnvHardware(hw.id)} 
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-800">{hw.name}</p>
                            <p className="text-xs text-slate-500">{hw.spec}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-white rounded border border-slate-200 text-slate-600">{hw.price}</span>
                      </label>
                      {newEnvHardware === 'custom' && hw.id === 'custom' && (
                        <div className="mt-3 p-4 bg-white border border-blue-100 rounded-lg animate-fade-in">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs text-slate-500 mb-1">CPU</label>
                              <select value={customCpu} onChange={e => setCustomCpu(e.target.value)} className="w-full text-sm border border-slate-200 rounded p-1.5 outline-none focus:border-blue-500">
                                <option value="2核">2核</option>
                                <option value="4核">4核</option>
                                <option value="8核">8核</option>
                                <option value="16核">16核</option>
                                <option value="32核">32核</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs text-slate-500 mb-1">内存</label>
                              <select value={customRam} onChange={e => setCustomRam(e.target.value)} className="w-full text-sm border border-slate-200 rounded p-1.5 outline-none focus:border-blue-500">
                                <option value="4GB">4GB</option>
                                <option value="8GB">8GB</option>
                                <option value="16GB">16GB</option>
                                <option value="32GB">32GB</option>
                                <option value="64GB">64GB</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs text-slate-500 mb-1">GPU</label>
                              <select value={customGpu} onChange={e => setCustomGpu(e.target.value)} className="w-full text-sm border border-slate-200 rounded p-1.5 outline-none focus:border-blue-500">
                                <option value="无">无</option>
                                <option value="T4 (16GB)">T4 (16GB)</option>
                                <option value="A10 (24GB)">A10 (24GB)</option>
                                <option value="A100 (40GB)">A100 (40GB)</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100">
                            <input 
                              type="checkbox" 
                              id="save-hw-tpl" 
                              checked={saveAsHwTemplate} 
                              onChange={e => setSaveAsHwTemplate(e.target.checked)} 
                              className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer" 
                            />
                            <label htmlFor="save-hw-tpl" className="text-sm text-slate-600 cursor-pointer">保存为常用硬件模板</label>
                            {saveAsHwTemplate && (
                              <input 
                                type="text" 
                                value={customHwName} 
                                onChange={e => setCustomHwName(e.target.value)} 
                                placeholder="模板名称 (如: 大数据计算型)" 
                                className="ml-2 flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsEnvModalOpen(false)} className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">取消</button>
              <button 
                onClick={handleSaveNewEnv} 
                className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors ${newEnvName.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'}`}
                disabled={!newEnvName.trim()}
              >
                确认创建
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskEditDrawer;
