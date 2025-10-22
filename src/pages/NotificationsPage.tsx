import { mockNotifications, olderNotifications } from "@/data/mockNotifications";

const NotificationsPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
        NOTIFICATIONS
      </h1>

      {/* Unread Notifications Section */}
      <div className="mb-8">
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold mb-6 text-foreground">
            Unread Notifications ({mockNotifications.length})
          </h2>
          <div className="space-y-6">
            {mockNotifications.map((notification) => (
              <div key={notification.id} className="flex gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-sm font-medium text-foreground">
                    {notification.initials}
                  </span>
                </div>
                <div className="flex-1">
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
            ))}
          </div>
        </div>
      </div>

      {/* Older Notifications Section */}
      <div>
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold mb-6 text-foreground">
            Older Notifications
          </h2>
          <div className="space-y-6">
            {olderNotifications.map((notification) => (
              <div key={notification.id} className="flex gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-sm font-medium text-foreground">
                    {notification.initials}
                  </span>
                </div>
                <div className="flex-1">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
