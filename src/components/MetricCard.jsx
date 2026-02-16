import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { colors, borderRadius, shadows } from '../styles/theme';
import { formatNumber, formatPercent } from '../utils/formatters';

const MetricCard = ({ label, value, change, trend, icon: Icon }) => {
  const cardStyle = {
    backgroundColor: colors.white,
    padding: '20px',
    borderRadius: borderRadius.lg,
    boxShadow: shadows.sm,
    border: `1px solid ${colors.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const labelStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
    fontWeight: '500'
  };

  const iconContainerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '15',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary
  };

  const valueStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: colors.textPrimary
  };

  const getTrendColor = () => {
    if (trend === 'up') return colors.success;
    if (trend === 'down') return colors.danger;
    return colors.textSecondary;
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={16} />;
    if (trend === 'down') return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  const changeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: '500',
    color: getTrendColor()
  };

  return (
    <div style={cardStyle} className="fade-in">
      <div style={headerStyle}>
        <span style={labelStyle}>{label}</span>
        {Icon && (
          <div style={iconContainerStyle}>
            <Icon size={20} />
          </div>
        )}
      </div>
      
      <div>
        <div style={valueStyle}>{typeof value === 'number' ? formatNumber(value) : value}</div>
        {change !== undefined && (
          <div style={changeStyle}>
            {getTrendIcon()}
            <span>{formatPercent(change)} from last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
