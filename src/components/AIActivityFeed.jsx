import { Bot, AlertTriangle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { colors, borderRadius } from '../styles/theme';
import { formatTimeAgo } from '../utils/formatters';
import Badge from './Badge';

const AIActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      detection: AlertTriangle,
      recommendation: Info,
      action: CheckCircle,
      analysis: TrendingUp
    };
    return icons[type] || Info;
  };

  const getActivityColor = (severity) => {
    const colorMap = {
      error: colors.danger,
      warning: colors.warning,
      success: colors.success,
      info: colors.info
    };
    return colorMap[severity] || colors.info;
  };

  const feedStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxHeight: '500px',
    overflowY: 'auto',
    padding: '4px'
  };

  const activityItemStyle = (severity) => ({
    display: 'flex',
    gap: '12px',
    padding: '16px',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.white,
    transition: 'all 0.2s ease'
  });

  const iconContainerStyle = (severity) => ({
    width: '40px',
    height: '40px',
    borderRadius: borderRadius.md,
    backgroundColor: getActivityColor(severity) + '15',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: getActivityColor(severity)
  });

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px'
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.textPrimary
  };

  const timeStyle = {
    fontSize: '12px',
    color: colors.textSecondary,
    whiteSpace: 'nowrap'
  };

  const descriptionStyle = {
    fontSize: '13px',
    color: colors.textSecondary,
    lineHeight: '1.5'
  };

  const actionStyle = {
    fontSize: '12px',
    color: colors.success,
    fontWeight: '500',
    padding: '8px 12px',
    backgroundColor: colors.success + '10',
    borderRadius: borderRadius.sm,
    marginTop: '4px',
    display: 'inline-block'
  };

  return (
    <div style={feedStyle}>
      {activities.map((activity) => {
        const Icon = getActivityIcon(activity.type);
        
        return (
          <div 
            key={activity.id} 
            style={activityItemStyle(activity.severity)}
            className="fade-in"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 12px ${colors.border}`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={iconContainerStyle(activity.severity)}>
              <Icon size={20} />
            </div>
            
            <div style={contentStyle}>
              <div style={headerStyle}>
                <div>
                  <div style={titleStyle}>{activity.title}</div>
                  <div style={timeStyle}>{formatTimeAgo(activity.timestamp)}</div>
                </div>
                <Badge status={activity.severity}>{activity.type}</Badge>
              </div>
              
              <div style={descriptionStyle}>{activity.description}</div>
              
              {activity.actionTaken && (
                <div style={actionStyle}>
                  ✓ {activity.actionTaken}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AIActivityFeed;
