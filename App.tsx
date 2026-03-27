import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import MyHomeLayout from "./components/MyHomeLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Labs from "./pages/Labs";
import LabDetail from "./pages/LabDetail";
import LabSession from "./pages/LabSession";
import Exams from "./pages/Exams";
import About from "./pages/About";
import Config from "./pages/Config";
import CourseDetail from "./pages/CourseDetail";
import AIInteraction from "./pages/AIInteraction";
import Login from "./pages/Login";
import SmartAssistant from "./components/SmartAssistant";
import { User, UserRole } from "./types";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import SchoolAdminDashboard from "./pages/dashboards/SchoolAdminDashboard";
import SystemAdminDashboard from "./pages/dashboards/SystemAdminDashboard";
import GradingManagement from "./pages/dashboards/teacher/GradingManagement";
import MyCourses from "./pages/dashboards/teacher/MyCourses";
import MyTeaching from "./pages/dashboards/teacher/MyTeaching";
import MyExams from "./pages/dashboards/student/MyExams";
import MyLearning from "./pages/dashboards/student/MyLearning";

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Simple access check for courses/exams
  const handleRestrictedAccess = () => {
    if (!user) {
      navigate('/login');
    } else {
      alert(`访问许可：欢迎，${user.name}！正在打开资源...`);
    }
  };

  const handleLogin = (role: UserRole, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      role: role,
      avatar: "https://picsum.photos/100",
    };
    setUser(newUser);
    navigate('/my-home');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const renderDashboard = (user: User) => {
    switch (user.role) {
      case UserRole.STUDENT:
        return <StudentDashboard user={user} />;
      case UserRole.TEACHER:
        return <TeacherDashboard user={user} />;
      case UserRole.ADMIN_SCHOOL:
        return <SchoolAdminDashboard user={user} />;
      case UserRole.ADMIN_PLATFORM:
        return <SystemAdminDashboard user={user} />;
      default:
        return <StudentDashboard user={user} />;
    }
  };

  return (
    <Routes>
      {/* Independent Route for Lab Environment (Full Screen, No Navbar) */}
      <Route path="/lab-session/:id" element={<LabSession user={user} />} />
      
      {/* Independent Route for AI Interaction (Full Screen, No Navbar) */}
      <Route path="/ai-interaction/:courseId" element={<AIInteraction />} />
      
      {/* Independent Route for Login Page */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* Main Application Routes with Layout */}
      <Route
        path="*"
        element={
          <Layout
            user={user}
            onLoginClick={() => navigate('/login')}
            onLogoutClick={handleLogout}
          >
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              
              {/* My Home Routes */}
              <Route
                path="/my-home/*"
                element={
                  user ? (
                    <MyHomeLayout user={user}>
                      <Routes>
                        <Route path="/" element={renderDashboard(user)} />
                        {user.role === UserRole.TEACHER && (
                          <>
                            <Route path="/grading" element={<GradingManagement />} />
                            <Route path="/courses" element={<MyCourses />} />
                            <Route path="/teaching" element={<MyTeaching />} />
                          </>
                        )}
                        {user.role === UserRole.STUDENT && (
                          <>
                            <Route path="/exams" element={<MyExams />} />
                            <Route path="/learning" element={<MyLearning />} />
                          </>
                        )}
                        {/* Add more sub-routes here as needed */}
                      </Routes>
                    </MyHomeLayout>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              
              <Route
                path="/courses"
                element={<Courses onAccessTrigger={handleRestrictedAccess} />}
              />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route
                path="/labs"
                element={
                  <Labs
                    user={user}
                    onLoginRequest={() => navigate('/login')}
                  />
                }
              />
              <Route path="/labs/:id" element={<LabDetail user={user} onLoginRequest={() => navigate('/login')} />} />
              <Route
                path="/exams"
                element={<Exams onAccessTrigger={handleRestrictedAccess} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/config" element={<Config />} />
              {/* Redirect unknown routes within the layout to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Global Chat Assistant only on main site, Lab has its own */}
            <SmartAssistant />
          </Layout>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
