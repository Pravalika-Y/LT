import { Bell } from "lucide-react";
import { useState } from "react";
import NotificationsPanel from "./NotificationsPanel";

export const Header = () => {
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            className="relative hover:bg-gray-100 p-2 rounded-lg transition-colors"
            onClick={() => setNotificationsPanelOpen(true)}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
              2
            </span>
          </button>
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
            <span className="text-white font-medium text-sm">A</span>
          </div>
        </div>
      </header>

      <NotificationsPanel
        open={notificationsPanelOpen}
        onOpenChange={setNotificationsPanelOpen}
      />
    </>
  );
};