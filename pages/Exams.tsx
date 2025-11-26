import React from 'react';
import { Exam } from '../types';
import { FileText, Clock, CheckCircle } from 'lucide-react';

interface ExamsProps {
  onAccessTrigger: () => void;
}

const EXAMS_DATA: Exam[] = [
    { id: '1', title: 'Python 助理工程师认证', duration: '90 分钟', questions: 60, certification: 'Python 入门程序员认证' },
    { id: '2', title: '云架构基础', duration: '120 分钟', questions: 80, certification: '云基础证书' },
    { id: '3', title: '网络安全基础', duration: '60 分钟', questions: 45, certification: '网络安全助理' },
];

const Exams: React.FC<ExamsProps> = ({ onAccessTrigger }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">考试中心</h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
           <table className="min-w-full divide-y divide-gray-200">
             <thead className="bg-gray-50">
               <tr>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">考试名称</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">时长</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">题量</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">认证证书</th>
                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
               </tr>
             </thead>
             <tbody className="bg-white divide-y divide-gray-200">
               {EXAMS_DATA.map((exam) => (
                 <tr key={exam.id} className="hover:bg-gray-50 transition">
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                         <FileText className="w-5 h-5" />
                       </div>
                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                         <div className="text-xs text-gray-500 sm:hidden">{exam.duration} • {exam.questions} 题</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                     <div className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {exam.duration}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                     {exam.questions}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {exam.certification}
                      </span>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button onClick={onAccessTrigger} className="text-blue-600 hover:text-blue-900 font-semibold border border-blue-200 px-4 py-1 rounded hover:bg-blue-50 transition">
                       开始考试
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Exams;