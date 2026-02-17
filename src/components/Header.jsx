import { Bell, RefreshCw, Settings } from 'lucide-react';
import { getThemeColors, borderRadius, transitions } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';

const Header = ({ title, subtitle, onSettingsClick, onNotificationsClick }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const headerStyle = {
    backgroundColor: colors.bgCard,
    borderBottom: `1px solid ${colors.border}`,
    padding: '20px 32px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const titleContainerStyle = {
    flex: 1
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: '4px'
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: colors.textSecondary
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const iconButtonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bgCard,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: transitions.normal,
    color: colors.textSecondary
  };

  const notificationBadgeStyle = {
    position: 'relative'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    width: '18px',
    height: '18px',
    backgroundColor: colors.danger,
    color: colors.white,
    borderRadius: '50%',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${colors.white}`
  };

  return (
    <div style={headerStyle}>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>{title}</h1>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </div>
      
      <div style={actionsStyle}>
        <div
          style={iconButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.bgHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.bgCard;
          }}
        >
          <RefreshCw size={18} />
        </div>

        <div style={notificationBadgeStyle}>
          <div
            style={iconButtonStyle}
            onClick={onNotificationsClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgCard;
            }}
          >
            <Bell size={18} />
          </div>
          <div style={badgeStyle}>5</div>
        </div>

        <div
          style={iconButtonStyle}
          onClick={onSettingsClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.bgHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.bgCard;
          }}
        >
          <Settings size={18} />
        </div>
      </div>
    </div>
  );
};

export default Header;
