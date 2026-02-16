import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Bot,
  Mail,
  Lock,
  Globe,
  Moon,
  Sun
} from 'lucide-react';
import { colors, borderRadius, spacing } from '../styles/theme';

const SettingsView = ({ userProfile, userEmail, onProfileUpdate }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    lowStock: true,
    orderUpdates: true,
    aiRecommendations: true
  });
  const [profile, setProfile] = useState({
    name: userProfile.name || '',
    email: userEmail || '',
    phone: userProfile.phone || '',
    timezone: userProfile.timezone || 'UTC-5'
  });

  const containerStyle = {
    padding: '32px',
    maxWidth: '1200px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  };

  const sectionStyle = {
    marginBottom: spacing.lg
  };

  const sectionTitleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const inputGroupStyle = {
    marginBottom: spacing.md
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: '6px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    outline: 'none',
    fontFamily: 'inherit',
    color: colors.textPrimary
  };

  const toggleRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: `1px solid ${colors.border}`
  };

  const toggleLabelStyle = {
    fontSize: '14px',
    color: colors.textPrimary,
    fontWeight: '500'
  };

  const toggleDescStyle = {
    fontSize: '12px',
    color: colors.textSecondary,
    marginTop: '2px'
  };

  const switchStyle = (isOn) => ({
    width: '44px',
    height: '24px',
    backgroundColor: isOn ? colors.primary : colors.gray300,
    borderRadius: borderRadius.full,
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  });

  const switchKnobStyle = (isOn) => ({
    width: '18px',
    height: '18px',
    backgroundColor: colors.white,
    borderRadius: '50%',
    position: 'absolute',
    top: '3px',
    left: isOn ? '23px' : '3px',
    transition: 'left 0.2s'
  });

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    // Save to parent component and localStorage
    onProfileUpdate({
      name: profile.name,
      phone: profile.phone,
      timezone: profile.timezone
    });
    alert('Profile saved successfully!');
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        {/* Profile Settings */}
        <Card title="Profile Settings" noPadding={false}>
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
              <User size={16} />
              Personal Information
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                style={inputStyle}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                style={{...inputStyle, backgroundColor: colors.gray100, cursor: 'not-allowed'}}
                value={profile.email}
                disabled
              />
              <div style={{ fontSize: '11px', color: colors.textTertiary, marginTop: '4px' }}>
                Email cannot be changed
              </div>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                style={inputStyle}
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Timezone</label>
              <select style={inputStyle} value={profile.timezone} onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <Button variant="primary" size="medium" onClick={handleSaveProfile}>Save Profile</Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card title="Notification Preferences" noPadding={false}>
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
              <Bell size={16} />
              Notification Channels
            </div>
            <div style={toggleRowStyle}>
              <div>
                <div style={toggleLabelStyle}>Email Notifications</div>
                <div style={toggleDescStyle}>Receive updates via email</div>
              </div>
              <div 
                style={switchStyle(notifications.email)} 
                onClick={() => handleNotificationToggle('email')}
              >
                <div style={switchKnobStyle(notifications.email)} />
              </div>
            </div>
            <div style={toggleRowStyle}>
              <div>
                <div style={toggleLabelStyle}>Push Notifications</div>
                <div style={toggleDescStyle}>Get real-time browser alerts</div>
              </div>
              <div 
                style={switchStyle(notifications.push)} 
                onClick={() => handleNotificationToggle('push')}
              >
                <div style={switchKnobStyle(notifications.push)} />
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
              <Bot size={16} />
              Alert Types
            </div>
            <div style={toggleRowStyle}>
              <div>
                <div style={toggleLabelStyle}>Low Stock Alerts</div>
                <div style={toggleDescStyle}>When inventory falls below minimum</div>
              </div>
              <div 
                style={switchStyle(notifications.lowStock)} 
                onClick={() => handleNotificationToggle('lowStock')}
              >
                <div style={switchKnobStyle(notifications.lowStock)} />
              </div>
            </div>
            <div style={toggleRowStyle}>
              <div>
                <div style={toggleLabelStyle}>Order Updates</div>
                <div style={toggleDescStyle}>Status changes on purchase orders</div>
              </div>
              <div 
                style={switchStyle(notifications.orderUpdates)} 
                onClick={() => handleNotificationToggle('orderUpdates')}
              >
                <div style={switchKnobStyle(notifications.orderUpdates)} />
              </div>
            </div>
            <div style={{ ...toggleRowStyle, borderBottom: 'none' }}>
              <div>
                <div style={toggleLabelStyle}>AI Recommendations</div>
                <div style={toggleDescStyle}>Smart insights from AI agent</div>
              </div>
              <div 
                style={switchStyle(notifications.aiRecommendations)} 
                onClick={() => handleNotificationToggle('aiRecommendations')}
              >
                <div style={switchKnobStyle(notifications.aiRecommendations)} />
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card title="Security & Privacy" noPadding={false}>
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
              <Lock size={16} />
              Password & Authentication
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Current Password</label>
              <input
                type="password"
                style={inputStyle}
                placeholder="••••••••"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>New Password</label>
              <input
                type="password"
                style={inputStyle}
                placeholder="••••••••"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Confirm New Password</label>
              <input
                type="password"
                style={inputStyle}
                placeholder="••••••••"
              />
            </div>
            <Button variant="primary" size="medium">Update Password</Button>
          </div>

          <div style={{ ...sectionStyle, marginBottom: 0 }}>
            <div style={sectionTitleStyle}>
              <Shield size={16} />
              Two-Factor Authentication
            </div>
            <p style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: spacing.md }}>
              Add an extra layer of security to your account by enabling 2FA.
            </p>
            <Button variant="secondary" size="medium">Enable 2FA</Button>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card title="Appearance & Preferences" noPadding={false}>
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
              <Palette size={16} />
              Theme
            </div>
            <div style={{ ...toggleRowStyle, borderBottom: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {darkMode ? <Moon size={18} color={colors.textSecondary} /> : <Sun size={18} color={colors.textSecondary} />}
                <div>
                  <div style={toggleLabelStyle}>Dark Mode</div>
                  <div style={toggleDescStyle}>Use dark theme across the app</div>
                </div>
              </div>
              <div 
                style={switchStyle(darkMode)} 
                onClick={() => setDarkMode(!darkMode)}
              >
                <div style={switchKnobStyle(darkMode)} />
              </div>
            </div>
          </div>

          <div style={{ ...sectionStyle, marginBottom: 0 }}>
            <div style={sectionTitleStyle}>
              <Globe size={16} />
              Language & Region
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Language</label>
              <select style={inputStyle}>
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div style={{ ...inputGroupStyle, marginBottom: 0 }}>
              <label style={labelStyle}>Currency</label>
              <select style={inputStyle}>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* AI Agent Settings */}
        <Card title="AI Agent Configuration" noPadding={false}>
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
              <Bot size={16} />
              Automation Settings
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Auto-Reorder Threshold</label>
              <select style={inputStyle}>
                <option>Conservative (When stock &lt; 30%)</option>
                <option selected>Balanced (When stock &lt; 50%)</option>
                <option>Aggressive (When stock &lt; 70%)</option>
              </select>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Order Approval Mode</label>
              <select style={inputStyle}>
                <option>Fully Automatic</option>
                <option selected>Require Approval for Orders &gt; $1000</option>
                <option>Always Require Approval</option>
              </select>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>AI Confidence Level</label>
              <select style={inputStyle}>
                <option>High Confidence Only (&gt; 90%)</option>
                <option selected>Medium Confidence (&gt; 70%)</option>
                <option>All Recommendations (&gt; 50%)</option>
              </select>
            </div>
          </div>

          <div style={{ ...sectionStyle, marginBottom: 0 }}>
            <div style={sectionTitleStyle}>
              <Database size={16} />
              Data & Analytics
            </div>
            <p style={{ fontSize: '13px', color: colors.textSecondary, marginBottom: spacing.md }}>
              Control how long historical data is retained for AI analysis and reporting.
            </p>
            <div style={{ ...inputGroupStyle, marginBottom: 0 }}>
              <label style={labelStyle}>Data Retention Period</label>
              <select style={inputStyle}>
                <option>3 Months</option>
                <option>6 Months</option>
                <option selected>12 Months</option>
                <option>24 Months</option>
                <option>Unlimited</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Integrations */}
        <Card title="Integrations & API" noPadding={false}>
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
              <Mail size={16} />
              Connected Services
            </div>
            <div style={{ ...inputGroupStyle, marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textPrimary }}>Email Service</div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary }}>SendGrid • Connected</div>
                </div>
                <Button variant="secondary" size="small">Configure</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: `1px solid ${colors.border}` }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textPrimary }}>Payment Gateway</div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary }}>Stripe • Not Connected</div>
                </div>
                <Button variant="secondary" size="small">Connect</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: `1px solid ${colors.border}` }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textPrimary }}>Analytics</div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary }}>Google Analytics • Connected</div>
                </div>
                <Button variant="secondary" size="small">Configure</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Save Changes Footer */}
      <div style={{ 
        position: 'sticky', 
        bottom: 0, 
        backgroundColor: colors.white, 
        padding: '16px 0',
        borderTop: `1px solid ${colors.border}`,
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end'
      }}>
        <Button variant="secondary" size="medium">Reset to Defaults</Button>
        <Button variant="primary" size="medium">Save All Changes</Button>
      </div>
    </div>
  );
};

export default SettingsView;
