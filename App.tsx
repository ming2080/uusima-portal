import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Labs from "./pages/Labs";
import LabSession from "./pages/LabSession";
import Exams from "./pages/Exams";
import Products from "./pages/Products";
import About from "./pages/About";
import Config from "./pages/Config";
import LoginModal from "./components/LoginModal";
import SmartAssistant from "./components/SmartAssistant";
import { User, UserRole } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Simple access check for courses/exams
  const handleRestrictedAccess = () => {
    if (!user) {
      setIsLoginModalOpen(true);
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
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Independent Route for Lab Environment (Full Screen, No Navbar) */}
        {/* Pass user prop to LabSession */}
        <Route path="/lab/:id" element={<LabSession user={user} />} />

        {/* Main Application Routes with Layout */}
        <Route
          path="*"
          element={
            <Layout
              user={user}
              onLoginClick={() => setIsLoginModalOpen(true)}
              onLogoutClick={handleLogout}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/courses"
                  element={<Courses onAccessTrigger={handleRestrictedAccess} />}
                />
                <Route
                  path="/labs"
                  element={
                    <Labs
                      user={user}
                      onLoginRequest={() => setIsLoginModalOpen(true)}
                    />
                  }
                />
                <Route
                  path="/exams"
                  element={<Exams onAccessTrigger={handleRestrictedAccess} />}
                />
                <Route path="/products" element={<Products />} />
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

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </HashRouter>
  );
};

export default App;
