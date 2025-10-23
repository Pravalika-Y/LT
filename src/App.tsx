import { Toaster } from "@/Components/global/toaster";
import { Toaster as Sonner } from "@/Components/global/sonner";
import { TooltipProvider } from "@/Components/global/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import FacultyList from "./Components/Faculty/FacultyList";
import FacultyDetail from "./Components/Faculty/FacultyDetail";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Layout><FacultyList /></Layout>} />
          <Route path="/faculty" element={<Layout><FacultyList /></Layout>} />
          <Route path="/faculty/:id" element={<Layout><FacultyDetail /></Layout>} />
          <Route path="/dashboard" element={<Layout><div className="text-center py-12 text-muted-foreground">Dashboard - Coming Soon</div></Layout>} />
          <Route path="/students" element={<Layout><div className="text-center py-12 text-muted-foreground">Students - Coming Soon</div></Layout>} />
          <Route path="/courses" element={<Layout><div className="text-center py-12 text-muted-foreground">Courses - Coming Soon</div></Layout>} />
          <Route path="/notifications" element={<Layout><NotificationsPage /></Layout>} />
          <Route path="/settings" element={<Layout><div className="text-center py-12 text-muted-foreground">Settings - Coming Soon</div></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
