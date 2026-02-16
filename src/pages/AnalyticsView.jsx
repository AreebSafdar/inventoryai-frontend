import Card from '../components/Card';
import { SalesTrendChart, CategoryChart } from '../components/SalesChart';
import { salesData, categoryPerformance } from '../data/mockData';
import { colors, borderRadius } from '../styles/theme';
import { TrendingUp, Package, DollarSign } from 'lucide-react';

const AnalyticsView = () => {
  const containerStyle = {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const chartsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  };

  const insightsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  };

  const insightCardStyle = {
    padding: '20px',
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const insightHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.primary
  };

  const insightTitleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.textSecondary
  };

  const insightValueStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: colors.textPrimary
  };

  const insightDescStyle = {
    fontSize: '13px',
    color: colors.textSecondary,
    lineHeight: '1.5'
  };

  const insights = [
    {
      icon: <TrendingUp size={20} />,
      title: 'Winter Trend',
      value: '+340%',
      description: 'Winter clothing sales increased significantly. High demand expected for next 30 days.',
      color: colors.success
    },
    {
      icon: <Package size={20} />,
      title: 'Top Category',
      value: 'Food & Beverages',
      description: 'Highest performing category with $4,560 in sales and 267 units sold.',
      color: colors.primary
    },
    {
      icon: <DollarSign size={20} />,
      title: 'Growth Rate',
      value: '+23.4%',
      description: 'Month-over-month revenue growth showing strong upward trajectory.',
      color: colors.aiPurple
    }
  ];

  return (
    <div style={containerStyle}>
      {/* Charts */}
      <div style={chartsGridStyle} className="grid-cols-2">
        <Card title="Sales Trends">
          <SalesTrendChart data={salesData} />
        </Card>

        <Card title="Category Performance">
          <CategoryChart data={categoryPerformance} />
        </Card>
      </div>

      {/* Insights */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
          Key Insights
        </h3>
        <div style={insightsGridStyle} className="grid-cols-3">
          {insights.map((insight, index) => (
            <div key={index} style={insightCardStyle} className="fade-in">
              <div style={{ ...insightHeaderStyle, color: insight.color }}>
                {insight.icon}
                <span style={insightTitleStyle}>{insight.title}</span>
              </div>
              <div style={insightValueStyle}>{insight.value}</div>
              <div style={insightDescStyle}>{insight.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
