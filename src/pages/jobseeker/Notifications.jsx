import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Check } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, timestamp: '2023-10-01T12:00:00Z', read: false },
    { id: 2, timestamp: '2023-10-02T14:30:00Z', read: false },
    { id: 3, timestamp: '2023-10-02T14:30:00Z', read: false },
    { id: 4, timestamp: '2023-10-02T14:30:00Z', read: false },
    { id: 5, timestamp: '2023-10-02T14:30:00Z', read: false },
    { id: 6, timestamp: '2023-10-02T14:30:00Z', read: false },
    { id: 7, timestamp: '2023-10-02T14:30:00Z', read: false },
  ]);
  const [hasMore, setHasMore] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(1);

  const fetchNotifications = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newNotifications = Array.from({ length: 5 }, (_, index) => ({
      id: (page * 5) + index + 1,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      read: false,
    }));

    return newNotifications;
  };

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const loadMoreNotifications = async () => {
    const newNotifications = await fetchNotifications();
    setNotifications(prev => [...prev, ...newNotifications]);
    setPage(prev => prev + 1);
    if (page > 5) setHasMore(false);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  return (
    <div className=" bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold dark:text-white">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount}</Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-1" />
                Mark all as seen
              </Button>
            )}
          </div>

          <Card className="bg-white dark:bg-gray-800">
            <div id="scrollableDiv" className="h-[72vh] overflow-auto">
              <InfiniteScroll
                dataLength={notifications.length}
                next={loadMoreNotifications}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                loader={
                  <div className="flex justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                  </div>
                }
                endMessage={
                  <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                    No more profile views
                  </div>
                }
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={() => {
                      setNotifications(prev =>
                        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
                      );
                    }}
                  />
                ))}
              </InfiniteScroll>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const NotificationCard = ({ notification, onMarkAsRead }) => {
  return (
    <div 
      className={`
        p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
        ${notification.read ? 'opacity-75' : 'bg-blue-50 dark:bg-blue-900/20'}
      `}
    >
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
          <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            A recruiter viewed your profile
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatDistanceToNow(new Date(notification.timestamp))} ago
          </p>
        </div>
        {!notification.read && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onMarkAsRead}
            className="text-blue-600 dark:text-blue-400"
          >
            <Check className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Notifications;