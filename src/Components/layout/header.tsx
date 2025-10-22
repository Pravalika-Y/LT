import { Bell } from "lucide-react";
import { Button } from "@/Components/global/button";
import { useState } from "react";
import NotificationsPanel from "./NotificationsPanel";

export const Header = () => {
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <button
          className="relative"
          onClick={() => setNotificationsPanelOpen(true)}
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
            2
          </span>
        </button>
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-medium text-sm">A</span>
        </div>
      </div>

      <NotificationsPanel
        open={notificationsPanelOpen}
        onOpenChange={setNotificationsPanelOpen}
      />
    </header>
  );
};