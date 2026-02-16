import { Bot, Zap, Activity, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';
import Card from '../components/Card';
import AIActivityFeed from '../components/AIActivityFeed';
import Button from '../components/Button';
import { aiActivities } from '../data/mockData';
import { colors, borderRadius } from '../styles/theme';

const AIAgentView = () => {
  const [autonomousMode, setAutonomousMode] = useState(true);

  const containerStyle = {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '24px'
  };

  const agentStatusCardStyle = {
    padding: '24px',
    borderRadius: borderRadius.lg,
    background: `linear-gradient(135deg, ${colors.aiPurple} 0%, ${colors.primary} 100%)`,
    color: colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center'
  };

  const agentAvatarStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: colors.white + '20',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `4px solid ${colors.white}40`
  };

  const statusTextStyle = {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px'
  };

  const statusDescStyle = {
    fontSize: '14px',
    opacity: 0.9
  };

  const toggleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: colors.white + '20',
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    width: '100%',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    width: '100%',
    marginTop: '8px'
  };

  const statItemStyle = {
    padding: '16px',
    backgroundColor: colors.white + '15',
    borderRadius: borderRadius.md,
    textAlign: 'center'
  };

  const statValueStyle = {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '4px'
  };

  const statLabelStyle = {
    fontSize: '12px',
    opacity: 0.9
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="grid-cols-2">
        {/* Agent Status Panel */}
        <div>
          <div style={agentStatusCardStyle} className="fade-in">
            <div style={agentAvatarStyle}>
              <Bot size={60} strokeWidth={1.5} />
            </div>

            <div>
              <div style={statusTextStyle}>
                {autonomousMode ? 'Active & Learning' : 'Standby Mode'}
              </div>
              <div style={statusDescStyle}>
                {autonomousMode 
                  ? 'AI Agent is monitoring inventory and making autonomous decisions'
                  : 'AI Agent is paused and awaiting manual activation'}
              </div>
            </div>

            <div 
              style={toggleContainerStyle}
              onClick={() => setAutonomousMode(!autonomousMode)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.white + '30';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.white + '20';
              }}
            >
              {autonomousMode ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
              <span style={{ fontWeight: '600' }}>Autonomous Mode</span>
            </div>

            <div style={statsGridStyle}>
              <div style={statItemStyle}>
                <div style={statValueStyle}>24</div>
                <div style={statLabelStyle}>Actions Today</div>
              </div>
              <div style={statItemStyle}>
                <div style={statValueStyle}>156</div>
                <div style={statLabelStyle}>Total Actions</div>
              </div>
              <div style={statItemStyle}>
                <div style={statValueStyle}>98%</div>
                <div style={statLabelStyle}>Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <Card title="Recent AI Activity" action={<Button variant="ghost" size="small">View All</Button>}>
          <AIActivityFeed activities={aiActivities} />
        </Card>
      </div>

      {/* Agent Capabilities */}
      <Card title="AI Agent Capabilities">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            {
              icon: <Activity size={24} />,
              title: 'Inventory Monitoring',
              description: 'Continuously tracks stock levels and sales velocity'
            },
            {
              icon: <Zap size={24} />,
              title: 'Automated Ordering',
              description: 'Places orders automatically when stock is low'
            },
            {
              icon: <Bot size={24} />,
              title: 'Smart Recommendations',
              description: 'Suggests better suppliers and products based on data'
            }
          ].map((capability, idx) => (
            <div 
              key={idx}
              style={{
                padding: '20px',
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.border}`,
                textAlign: 'center'
              }}
              className="fade-in"
            >
              <div style={{ 
                color: colors.aiPurple, 
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {capability.icon}
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: colors.textPrimary,
                marginBottom: '8px'
              }}>
                {capability.title}
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: colors.textSecondary,
                lineHeight: '1.5'
              }}>
                {capability.description}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AIAgentView;
