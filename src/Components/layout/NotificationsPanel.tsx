import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/Components/global/sheet";
import { Button } from "@/Components/global/button";
import { X } from "lucide-react";
import { mockNotifications } from "@/data/mockNotifications";
import { useNavigate } from "react-router-dom";

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationsPanel = ({ open, onOpenChange }: NotificationsPanelProps) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    onOpenChange(false);
    navigate("/notifications");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              Notifications ({mockNotifications.length})
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-80px)]">
          <div className="flex-1 overflow-y-auto">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className="px-6 py-4 border-b border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-sm font-medium text-foreground">
                      {notification.initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {notification.senderName} ({notification.senderRole}) messaged to{" "}
                      {notification.receiverName} ({notification.receiverRole})
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {notification.timestamp} | {notification.courseCode}
                    </p>
                    <p className="text-sm text-foreground">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-border">
            <Button
              variant="link"
              className="text-primary font-medium w-full"
              onClick={handleViewAll}
            >
              VIEW ALL
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
