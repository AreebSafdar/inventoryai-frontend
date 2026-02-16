import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Bot, 
  Settings,
  Bell,
  LogOut
} from 'lucide-react';
import { colors, transitions } from '../styles/theme';

const Sidebar = ({ activeTab, onTabChange, onLogout, userEmail, userProfile }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'suppliers', icon: Users, label: 'Suppliers' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'ai-agent', icon: Bot, label: 'AI Agent' }
  ];

  const sidebarStyle = {
    width: '260px',
    height: '100vh',
    backgroundColor: colors.bgSidebar,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100
  };

  const logoStyle = {
    padding: '24px 20px',
    borderBottom: `1px solid ${colors.gray700}`,
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoIconStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: colors.primary,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white
  };

  const logoTextStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: colors.white
  };

  const menuStyle = {
    flex: 1,
    padding: '16px 12px',
    overflowY: 'auto'
  };

  const getMenuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    margin: '4px 0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: transitions.normal,
    backgroundColor: isActive ? colors.primary : 'transparent',
    color: isActive ? colors.white : colors.gray400
  });

  const footerStyle = {
    padding: '16px 20px',
    borderTop: `1px solid ${colors.gray700}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const userStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: colors.gray400,
    fontSize: '14px'
  };

  const avatarStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontWeight: '600',
    fontSize: '14px'
  };

  const logoutBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.gray400,
    cursor: 'pointer',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    transition: transitions.normal,
    width: '100%',
    textAlign: 'left'
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    const parts = email.split('@')[0].split('.');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <div style={logoIconStyle}>
          <Bot size={20} />
        </div>
        <span style={logoTextStyle}>InventoryAI</span>
      </div>

      <div style={menuStyle}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <div
              key={item.id}
              style={getMenuItemStyle(isActive)}
              onClick={() => onTabChange(item.id)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = colors.gray800;
                  e.currentTarget.style.color = colors.white;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.gray400;
                }
              }}
            >
              <Icon size={20} />
              <span style={{ fontWeight: '500' }}>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div style={footerStyle}>
        <div style={userStyle}>
          <div style={avatarStyle}>{getInitials(userProfile?.name || userEmail)}</div>
          <div>
            <div style={{ color: colors.white, fontWeight: '500', fontSize: '12px' }}>
              {userProfile?.name || (userEmail ? userEmail.split('@')[0] : 'User')}
            </div>
            <div style={{ fontSize: '11px', color: colors.gray500 }}>{userEmail || 'No email'}</div>
          </div>
        </div>
        <button
          style={logoutBtnStyle}
          onClick={onLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.gray800;
            e.currentTarget.style.color = colors.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.gray400;
          }}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
