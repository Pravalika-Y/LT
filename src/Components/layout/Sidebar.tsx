import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  Bell,
  Settings,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: GraduationCap, label: "Students", path: "/students" },
  { icon: Users, label: "Faculty", path: "/faculty" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-52 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">LEARNTEK</h1>
            <p className="text-xs text-gray-500">Stay Ahead</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = 
              location.pathname === item.path ||
              (item.path === "/faculty" && (location.pathname === "/" || location.pathname.startsWith("/faculty")));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

