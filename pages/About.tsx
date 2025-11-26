import React from 'react';

const About: React.FC = () => (
    <div className="bg-white min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4">
             <h1 className="text-3xl font-bold text-gray-900 mb-6">关于 UUSIMA</h1>
             <div className="prose prose-blue text-gray-600">
                 <p className="mb-4">
                     UUSIMA 是一家致力于高等职业教育的领先智能教育解决方案提供商。
                     我们将尖端技术与教学专业知识相结合，创造沉浸式学习体验。
                 </p>
                 <p className="mb-4">
                     我们的平台集成了课程管理、虚拟仿真实验室和认证系统，
                     帮助学校培养符合行业需求的高质量技术人才。
                 </p>
                 <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">我们的使命</h2>
                 <p>通过数字创新弥合课堂理论与工业实践之间的差距。</p>
             </div>
        </div>
    </div>
);
export default About;