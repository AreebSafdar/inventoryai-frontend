import { colors, borderRadius, shadows } from '../styles/theme';

const Card = ({ children, title, action, noPadding = false, className = '' }) => {
  const cardStyle = {
    backgroundColor: colors.bgCard,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.sm,
    border: `1px solid ${colors.border}`,
    overflow: 'hidden'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: `1px solid ${colors.border}`
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.textPrimary
  };

  const bodyStyle = {
    padding: noPadding ? '0' : '20px'
  };

  return (
    <div style={cardStyle} className={`fade-in ${className}`}>
      {title && (
        <div style={headerStyle}>
          <h3 style={titleStyle}>{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div style={bodyStyle}>{children}</div>
    </div>
  );
};

export default Card;
