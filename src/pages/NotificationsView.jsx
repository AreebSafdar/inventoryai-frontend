import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  TrendingUp,
  Package,
  ShoppingCart,
  Bot,
  X,
  Check,
  Trash2
} from 'lucide-react';
import { colors, borderRadius, spacing, transitions } from '../styles/theme';

const NotificationsView = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 'N001',
      type: 'error',
      title: 'Critical: Stock Out Alert',
      message: 'Organic Coffee Beans 1kg is completely out of stock. AI agent has automatically placed an order for 100 units.',
      timestamp: '2026-02-16T09:30:00',
      read: false,
      category: 'inventory',
      icon: Package
    },
    {
      id: 'N002',
      type: 'warning',
      title: 'Low Stock Warning',
      message: 'Winter Jacket - Premium has only 8 units remaining. Consider restocking soon.',
      timestamp: '2026-02-16T08:15:00',
      read: false,
      category: 'inventory',
      icon: Package
    },
    {
      id: 'N003',
      type: 'success',
      title: 'Order Delivered',
      message: 'Purchase order ORD004 from HomeGoods Direct has been successfully delivered.',
      timestamp: '2026-02-16T07:45:00',
      read: false,
      category: 'orders',
      icon: ShoppingCart
    },
    {
      id: 'N004',
      type: 'info',
      title: 'AI Recommendation',
      message: 'Better pricing found for Smartphone Cases at QuickTech Solutions - 15% cheaper than current supplier.',
      timestamp: '2026-02-15T16:20:00',
      read: true,
      category: 'ai',
      icon: Bot
    },
    {
      id: 'N005',
      type: 'success',
      title: 'Seasonal Trend Detected',
      message: 'Winter Jacket sales increased 340% compared to last month. High demand expected for next 30 days.',
      timestamp: '2026-02-15T14:30:00',
      read: true,
      category: 'analytics',
      icon: TrendingUp
    },
    {
      id: 'N006',
      type: 'info',
      title: 'New Feature Available',
      message: 'Advanced analytics dashboard is now available. Check out new sales forecasting tools.',
      timestamp: '2026-02-15T10:00:00',
      read: true,
      category: 'system',
      icon: Info
    },
    {
      id: 'N007',
      type: 'warning',
      title: 'Slow-Moving Product',
      message: 'LED Desk Lamp has low sales velocity (8 units in 7 days). Consider running a promotion.',
      timestamp: '2026-02-14T18:45:00',
      read: true,
      category: 'analytics',
      icon: TrendingUp
    },
    {
      id: 'N008',
      type: 'success',
      title: 'Order Confirmed',
      message: 'Purchase order ORD002 confirmed with TechSupply Co. Expected delivery: Feb 18, 2026.',
      timestamp: '2026-02-14T15:30:00',
      read: true,
      category: 'orders',
      icon: ShoppingCart
    }
  ]);

  const [filter, setFilter] = useState('all');

  const containerStyle = {
    padding: '32px',
    maxWidth: '900px'
  };

  const headerStyle = {
    marginBottom: spacing.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const filterStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: spacing.lg
  };

  const filterButtonStyle = (isActive) => ({
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '500',
    border: `1px solid ${isActive ? colors.primary : colors.border}`,
    backgroundColor: isActive ? colors.primary : colors.white,
    color: isActive ? colors.white : colors.textSecondary,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    transition: transitions.normal,
    outline: 'none'
  });

  const notificationItemStyle = (isRead) => ({
    padding: '16px',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    gap: '16px',
    backgroundColor: isRead ? colors.white : colors.gray50,
    transition: transitions.normal,
    cursor: 'pointer'
  });

  const iconWrapperStyle = (type) => {
    const iconColors = {
      error: { bg: colors.danger + '15', color: colors.danger },
      warning: { bg: colors.warning + '15', color: colors.warning },
      success: { bg: colors.success + '15', color: colors.success },
      info: { bg: colors.info + '15', color: colors.info }
    };
    const style = iconColors[type] || iconColors.info;
    
    return {
      width: '40px',
      height: '40px',
      borderRadius: borderRadius.md,
      backgroundColor: style.bg,
      color: style.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    };
  };

  const contentStyle = {
    flex: 1,
    minWidth: 0
  };

  const titleStyle = (isRead) => ({
    fontSize: '14px',
    fontWeight: isRead ? '500' : '600',
    color: colors.textPrimary,
    marginBottom: '4px'
  });

  const messageStyle = {
    fontSize: '13px',
    color: colors.textSecondary,
    lineHeight: '1.5',
    marginBottom: '8px'
  };

  const timestampStyle = {
    fontSize: '11px',
    color: colors.textTertiary
  };

  const actionsStyle = {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start'
  };

  const actionButtonStyle = {
    width: '32px',
    height: '32px',
    borderRadius: borderRadius.md,
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: colors.textSecondary,
    transition: transitions.normal
  };

  const getTypeIcon = (type) => {
    const icons = {
      error: AlertCircle,
      warning: AlertCircle,
      success: CheckCircle,
      info: Info
    };
    return icons[type] || Info;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: colors.textPrimary, marginBottom: '4px' }}>
            Notifications
          </h1>
          <p style={{ fontSize: '14px', color: colors.textSecondary }}>
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" size="small" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check size={14} /> Mark All Read
          </Button>
          <Button variant="ghost" size="small" onClick={clearAll} disabled={notifications.length === 0}>
            <Trash2 size={14} /> Clear All
          </Button>
        </div>
      </div>

      <div style={filterStyle}>
        <button 
          style={filterButtonStyle(filter === 'all')} 
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </button>
        <button 
          style={filterButtonStyle(filter === 'unread')} 
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button 
          style={filterButtonStyle(filter === 'inventory')} 
          onClick={() => setFilter('inventory')}
        >
          Inventory
        </button>
        <button 
          style={filterButtonStyle(filter === 'orders')} 
          onClick={() => setFilter('orders')}
        >
          Orders
        </button>
        <button 
          style={filterButtonStyle(filter === 'ai')} 
          onClick={() => setFilter('ai')}
        >
          AI Insights
        </button>
        <button 
          style={filterButtonStyle(filter === 'analytics')} 
          onClick={() => setFilter('analytics')}
        >
          Analytics
        </button>
      </div>

      <Card noPadding={true}>
        {filteredNotifications.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <Bell size={48} color={colors.gray300} style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '14px', color: colors.textSecondary }}>No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const TypeIcon = getTypeIcon(notification.type);
            
            return (
              <div
                key={notification.id}
                style={notificationItemStyle(notification.read)}
                onClick={() => markAsRead(notification.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = notification.read ? colors.gray50 : colors.gray100;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = notification.read ? colors.white : colors.gray50;
                }}
              >
                <div style={iconWrapperStyle(notification.type)}>
                  <TypeIcon size={20} />
                </div>
                <div style={contentStyle}>
                  <div style={titleStyle(notification.read)}>{notification.title}</div>
                  <div style={messageStyle}>{notification.message}</div>
                  <div style={timestampStyle}>{formatTimestamp(notification.timestamp)}</div>
                </div>
                <div style={actionsStyle}>
                  {!notification.read && (
                    <button
                      style={actionButtonStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.gray100;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    style={actionButtonStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.gray100;
                      e.currentTarget.style.color = colors.danger;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.textSecondary;
                    }}
                    title="Delete"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </Card>
    </div>
  );
};

export default NotificationsView;
