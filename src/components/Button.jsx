import { getThemeColors, borderRadius, transitions } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  icon,
  disabled = false,
  fullWidth = false
}) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  const getVariantStyles = () => {
    const variants = {
      primary: {
        bg: colors.primary,
        color: colors.white,
        hover: colors.primaryDark,
        border: 'transparent'
      },
      secondary: {
        bg: colors.bgCard,
        color: colors.primary,
        hover: colors.bgHover,
        border: colors.border
      },
      danger: {
        bg: colors.danger,
        color: colors.white,
        hover: colors.dangerDark,
        border: 'transparent'
      },
      success: {
        bg: colors.success,
        color: colors.white,
        hover: colors.successDark,
        border: 'transparent'
      },
      ghost: {
        bg: 'transparent',
        color: colors.textPrimary,
        hover: colors.gray100,
        border: 'transparent'
      }
    };

    return variants[variant] || variants.primary;
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: '6px 12px',
        fontSize: '12px'
      },
      medium: {
        padding: '8px 16px',
        fontSize: '14px'
      },
      large: {
        padding: '12px 24px',
        fontSize: '16px'
      }
    };

    return sizes[size] || sizes.medium;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: sizeStyles.padding,
    fontSize: sizeStyles.fontSize,
    fontWeight: '500',
    fontFamily: 'inherit',
    color: variantStyles.color,
    backgroundColor: variantStyles.bg,
    border: `1px solid ${variantStyles.border}`,
    borderRadius: borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: transitions.normal,
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    outline: 'none'
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = variantStyles.hover;
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = variantStyles.bg;
    }
  };

  return (
    <button
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
