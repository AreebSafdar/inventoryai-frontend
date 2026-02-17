// Design tokens for the Autonomous Inventory & Purchasing Agent

// Helper function to get theme-aware colors
export const getThemeColors = (isDarkMode = false) => {
  if (isDarkMode) {
    return {
      // Primary colors
      primary: '#3b82f6',
      primaryDark: '#2563eb',
      primaryLight: '#60a5fa',
      
      // Secondary colors
      secondary: '#94a3b8',
      secondaryDark: '#64748b',
      secondaryLight: '#cbd5e1',
      
      // Status colors
      success: '#10b981',
      successLight: '#34d399',
      successDark: '#059669',
      
      warning: '#f59e0b',
      warningLight: '#fbbf24',
      warningDark: '#d97706',
      
      danger: '#ef4444',
      dangerLight: '#f87171',
      dangerDark: '#dc2626',
      
      info: '#3b82f6',
      infoLight: '#60a5fa',
      infoDark: '#2563eb',
      
      // AI accent
      aiPurple: '#8b5cf6',
      aiPurpleLight: '#a78bfa',
      aiPurpleDark: '#7c3aed',
      
      // Neutrals
      white: '#ffffff',
      black: '#000000',
      
      gray50: '#0f172a',
      gray100: '#1e293b',
      gray200: '#334155',
      gray300: '#475569',
      gray400: '#64748b',
      gray500: '#94a3b8',
      gray600: '#cbd5e1',
      gray700: '#e2e8f0',
      gray800: '#f1f5f9',
      gray900: '#f8fafc',
      
      // Background colors
      bgMain: '#0f172a',
      bgCard: '#1e293b',
      bgSidebar: '#0a0f1a',
      bgHover: '#334155',
      
      // Text colors
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      textWhite: '#ffffff',
      
      // Border colors
      border: '#334155',
      borderDark: '#475569',
    };
  }
  
  // Light mode (default)
  return {
    // Primary colors
    primary: '#2563eb',
    primaryDark: '#1e40af',
    primaryLight: '#3b82f6',
    
    // Secondary colors
    secondary: '#64748b',
    secondaryDark: '#475569',
    secondaryLight: '#94a3b8',
    
    // Status colors
    success: '#10b981',
    successLight: '#34d399',
    successDark: '#059669',
    
    warning: '#f59e0b',
    warningLight: '#fbbf24',
    warningDark: '#d97706',
    
    danger: '#ef4444',
    dangerLight: '#f87171',
    dangerDark: '#dc2626',
    
    info: '#3b82f6',
    infoLight: '#60a5fa',
    infoDark: '#2563eb',
    
    // AI accent
    aiPurple: '#8b5cf6',
    aiPurpleLight: '#a78bfa',
    aiPurpleDark: '#7c3aed',
    
    // Neutrals
    white: '#ffffff',
    black: '#000000',
    
    gray50: '#f8fafc',
    gray100: '#f1f5f9',
    gray200: '#e2e8f0',
    gray300: '#cbd5e1',
    gray400: '#94a3b8',
    gray500: '#64748b',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1e293b',
    gray900: '#0f172a',
    
    // Background colors
    bgMain: '#f8fafc',
    bgCard: '#ffffff',
    bgSidebar: '#0f172a',
    bgHover: '#f1f5f9',
    
    // Text colors
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textTertiary: '#94a3b8',
    textWhite: '#ffffff',
    
    // Border colors
    border: '#e2e8f0',
    borderDark: '#cbd5e1',
  };
};

// Default export for backward compatibility (light mode)
export const colors = getThemeColors(false);

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Courier New", Courier, monospace',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '30px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '200ms ease-in-out',
  slow: '300ms ease-in-out',
};
