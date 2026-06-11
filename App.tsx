import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
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
import Profile from "./pages/Profile";
import OperationsDashboard from "./pages/OperationsDashboard";
import BigScreenDashboard from "./pages/BigScreenDashboard";
import PlatformOperationsDashboard from "./pages/PlatformOperationsDashboard";
import PlatformApplicationDashboard from "./pages/PlatformApplicationDashboard";
import SchoolDashboard from "./pages/SchoolDashboard";
import Products from "./pages/Products";

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accessNotice, setAccessNotice] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessNotice) return;
    const t = window.setTimeout(() => setAccessNotice(null), 4500);
    return () => window.clearTimeout(t);
  }, [accessNotice]);

  const handleRestrictedAccess = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (user.role === UserRole.STUDENT) {
      if (location.pathname.startsWith("/exams")) {
        navigate("/my-home/exams");
        setAccessNotice("已为你打开「我的考试」，可查看场次与进度。");
      } else {
        navigate("/my-home/learning");
        setAccessNotice("已为你打开「我的学习」。");
      }
      return;
    }
    if (user.role === UserRole.TEACHER && location.pathname.startsWith("/exams")) {
      navigate("/my-home/grading");
      setAccessNotice("已为你打开「评卷管理」入口。");
      return;
    }
    setAccessNotice(`${user.name}，如需报名或开通课程权限，请联系教务或平台管理员。`);
  };

  const handleLogin = (
    roles: UserRole[],
    name: string,
    organization?: { organizationName?: string; organizationSlug?: string },
  ) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      role: roles[0],
      roles: roles,
      avatar: "https://picsum.photos/100",
      organizationName: organization?.organizationName,
      organizationSlug: organization?.organizationSlug,
    };
    setUser(newUser);
  };

  const handleSwitchRole = (newRole: UserRole) => {
    if (user && user.roles?.includes(newRole)) {
      setUser({ ...user, role: newRole });
      navigate('/my-home'); // Redirect to home so the UI updates and resets to the default route for that role
    }
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

      {/* Independent Route for Operations Dashboard */}
      <Route path="/operations-dashboard" element={<OperationsDashboard />} />
      <Route path="/big-screen-dashboard" element={<BigScreenDashboard />} />
      <Route path="/platform-operations-dashboard" element={<PlatformOperationsDashboard />} />
      <Route path="/platform-application-dashboard" element={<PlatformApplicationDashboard />} />
      <Route path="/school-dashboard/:schoolName" element={<SchoolDashboard />} />

      {/* Main Application Routes with Layout */}
      <Route
        path="*"
        element={
          <Layout
            user={user}
            onLoginClick={() => navigate("/login", { state: { from: location.pathname } })}
            onLogoutClick={handleLogout}
            onSwitchRole={handleSwitchRole}
            accessNotice={accessNotice}
            onDismissAccessNotice={() => setAccessNotice(null)}
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
                        <Route path="/profile" element={<Profile user={user} />} />
                        {/* Add more sub-routes here as needed */}
                      </Routes>
                    </MyHomeLayout>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              
              <Route path="/courses" element={<Courses />} />
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
              <Route path="/products" element={<Products />} />
              <Route path="/config" element={<Config user={user} />} />
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
