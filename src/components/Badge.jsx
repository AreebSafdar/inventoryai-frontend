import { getThemeColors } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';

const Badge = ({ status, children }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  const getStatusStyles = () => {
    const styles = {
      'in-stock': {
        bg: colors.success + '15',
        color: colors.successDark,
        border: colors.success
      },
      'low-stock': {
        bg: colors.warning + '15',
        color: colors.warningDark,
        border: colors.warning
      },
      'out-of-stock': {
        bg: colors.danger + '15',
        color: colors.dangerDark,
        border: colors.danger
      },
      'pending': {
        bg: colors.warning + '15',
        color: colors.warningDark,
        border: colors.warning
      },
      'processing': {
        bg: colors.info + '15',
        color: colors.infoDark,
        border: colors.info
      },
      'shipped': {
        bg: colors.info + '15',
        color: colors.infoDark,
        border: colors.info
      },
      'delivered': {
        bg: colors.success + '15',
        color: colors.successDark,
        border: colors.success
      },
      'cancelled': {
        bg: colors.danger + '15',
        color: colors.dangerDark,
        border: colors.danger
      },
      'success': {
        bg: colors.success + '15',
        color: colors.successDark,
        border: colors.success
      },
      'warning': {
        bg: colors.warning + '15',
        color: colors.warningDark,
        border: colors.warning
      },
      'error': {
        bg: colors.danger + '15',
        color: colors.dangerDark,
        border: colors.danger
      },
      'info': {
        bg: colors.info + '15',
        color: colors.infoDark,
        border: colors.info
      }
    };

    return styles[status] || {
      bg: colors.gray200,
      color: colors.gray700,
      border: colors.gray400
    };
  };

  const statusStyles = getStatusStyles();

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: statusStyles.bg,
    color: statusStyles.color,
    border: `1px solid ${statusStyles.border}40`,
    whiteSpace: 'nowrap'
  };

  return <span style={badgeStyle}>{children}</span>;
};

export default Badge;
