import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lab, User } from '../types';
import { Play } from 'lucide-react';

interface LabsProps {
  user: User | null;
  onLoginRequest: () => void;
}

const LABS_DATA: Lab[] = [
    { 
        id: '1', 
        title: 'Linux 服务器管理', 
        description: '在实时 CentOS 7 实例上练习命令行管理。', 
        tools: ['Bash', 'SSH', 'Vim'], 
        thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
    { 
        id: '2', 
        title: 'Cisco Packet Tracer', 
        description: '设计和配置复杂的网络拓扑结构。', 
        tools: ['Routers', 'Switches', 'Firewall'], 
        thumbnail: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
    { 
        id: '3', 
        title: 'Kubernetes 集群', 
        description: '部署和管理容器化应用程序。', 
        tools: ['K8s', 'Docker', 'Helm'], 
        thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=800', 
        status: '维护中' 
    },
    { 
        id: '4', 
        title: 'IoT 智能家居', 
        description: '模拟传感器数据流向 MQTT 代理。', 
        tools: ['MQTT', 'Node-RED'], 
        thumbnail: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
];

const Labs: React.FC<LabsProps> = ({ user, onLoginRequest }) => {
  const navigate = useNavigate();

  const handleEnterLab = (labId: string) => {
    if (user) {
        navigate(`/lab/${labId}`);
    } else {
        onLoginRequest();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">实验大厅</h1>
          <p className="text-gray-600 mt-2">直接在浏览器中访问高性能虚拟环境。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {LABS_DATA.map((lab) => (
                <div key={lab.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                    <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-100 rounded-lg overflow-hidden relative flex-shrink-0">
                         <img src={lab.thumbnail} alt={lab.title} className="w-full h-full object-cover" />
                         <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold shadow-sm ${lab.status === '运行中' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                             {lab.status}
                         </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {lab.title}
                            </h3>
                            <p className="text-gray-500 mt-2 text-sm">{lab.description}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                                {lab.tools.map(t => (
                                    <span key={t} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border border-gray-200">{t}</span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <button 
                                onClick={() => handleEnterLab(lab.id)}
                                disabled={lab.status !== '运行中'}
                                className={`flex items-center justify-center w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition ${
                                    lab.status === '运行中' 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <Play className="w-4 h-4 mr-2" />
                                进入实验室
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Labs;