import React from 'react';

const About: React.FC = () => (
    <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
             <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                 {/* Hero Banner Section */}
                 <div className="relative h-[400px] w-full">
                     <img 
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600" 
                        alt="UUSIMA 平台概览" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                         <div className="p-8 md:p-16 w-full">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">关于 UUSIMA</h1>
                            <p className="text-blue-100 text-lg md:text-xl max-w-3xl leading-relaxed">
                                致力于用智能技术和虚拟仿真赋能职业教育，连接课堂与产业，打造下一代数字化教学平台。
                            </p>
                         </div>
                     </div>
                 </div>

                 <div className="p-8 md:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                                平台使命
                            </h2>
                            <div className="prose prose-blue max-w-none text-slate-600 leading-relaxed text-lg">
                                <p>
                                    UUSIMA 智慧教学实验平台覆盖物联网、人工智能、工业互联网、大数据等新一代信息技术专业教学实验及综合应用，构建了一套“学习-实践-评测”闭环的智慧教学实验平台。
                                </p>
                                <p className="mt-4">
                                    平台以真实产业项目为载体，融合项目教学法及 AI 赋能，支持师生随时随地开展线上实践。通过引入AI智能体到教学设计、课件制作、教案编制，辅助教师高效备课，提升教学质量；将AI大模型智能体融入到教学实验环境，指导学生完成实验步骤、优化代码逻辑，智能推荐项目与学习路径。
                                </p>
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">为什么选择 UUSIMA?</h3>
                            <ul className="space-y-4">
                                {[
                                    { title: "产业驱动", desc: "紧扣行业需求，真实项目实训" },
                                    { title: "AI 赋能", desc: "全过程智能辅助，提升教学效率" },
                                    { title: "虚拟仿真", desc: "打破时空限制，低成本高效率" },
                                    { title: "数据闭环", desc: "精准学情分析，助力教学闭环" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold">{i+1}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">核心模块</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    id: "01",
                                    title: "课程大厅",
                                    desc: "全面整合物联网、人工智能、大数据等前沿技术课程，提供系统化学习资源。支持云端同步更新，确保教学资源与行业发展同步。"
                                },
                                {
                                    id: "02",
                                    title: "实验大厅",
                                    desc: "融合 AI 实验环境、嵌入式仿真、3D 虚拟仿真，构建全方位实践生态。助力学生掌握前沿技术、提升实战能力。"
                                },
                                {
                                    id: "03",
                                    title: "学科大模型管理系统",
                                    desc: "基于大语言模型架构，构建知识智能底座。提供知识理解、语义检索、智能生成等系统能力，赋能业务场景。"
                                },
                                {
                                    id: "04",
                                    title: "AI技能助手系统",
                                    desc: "提供统一的大模型推理服务，实现高并发、可管理的智能服务体系。辅助用户进行内容生成、知识问答与代码编写。"
                                },
                                {
                                    id: "05",
                                    title: "AI教师助手系统",
                                    desc: "自动生成课件文稿、教学文案、目录结构。提供案例生成与课堂活动建议，让教学准备更高效、更专业。"
                                },
                                {
                                    id: "06",
                                    title: "AI技能分析系统",
                                    desc: "全程记录实验操作轨迹，通过可视化面板直观展现技能掌握程度。生成个性化技能画像，助力精准教学。"
                                },
                                {
                                    id: "07",
                                    title: "AI智能考试系统",
                                    desc: "提供从在线学习、能力训练到考试认证的完整流程。通过智能题库与过程监控，保障培训质量与认证权威性。"
                                }
                            ].map((module) => (
                                <div key={module.id} className="group p-8 bg-slate-50 hover:bg-white rounded-2xl border border-transparent hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                                    <span className="text-4xl font-black text-slate-200 group-hover:text-blue-100 transition-colors mb-4 block">{module.id}</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{module.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {module.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    </div>
);

export default About;
