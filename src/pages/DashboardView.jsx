import { Package, TrendingDown, ShoppingCart, DollarSign, Sparkles } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Card from '../components/Card';
import AIActivityFeed from '../components/AIActivityFeed';
import { metrics, aiActivities, products } from '../data/mockData';
import { getThemeColors, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import Badge from '../components/Badge';

const DashboardView = () => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const containerStyle = {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px'
  };

  const contentGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  };

  const aiHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px'
  };

  const aiIconStyle = {
    width: '32px',
    height: '32px',
    borderRadius: borderRadius.md,
    backgroundColor: colors.aiPurple + '20',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.aiPurple
  };

  const aiTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.textPrimary
  };

  const lowStockProducts = products.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock');

  const productItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    marginBottom: '12px',
    transition: 'all 0.2s ease'
  };

  const productInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  };

  const productImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: borderRadius.sm,
    objectFit: 'cover',
    border: `1px solid ${colors.border}`
  };

  const productDetailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  };

  const productNameStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.textPrimary
  };

  const stockLevelStyle = {
    fontSize: '12px',
    color: colors.textSecondary
  };

  const metricIcons = [Package, TrendingDown, ShoppingCart, DollarSign];

  return (
    <div style={containerStyle}>
      {/* Metrics Grid */}
      <div style={gridStyle} className="grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metricIcons[index]}
          />
        ))}
      </div>

      {/* AI Recommendations & Low Stock */}
      <div style={contentGridStyle} className="grid-cols-2">
        <Card>
          <div style={aiHeaderStyle}>
            <div style={aiIconStyle}>
              <Sparkles size={18} />
            </div>
            <h3 style={aiTitleStyle}>AI Recommendations</h3>
          </div>
          <AIActivityFeed activities={aiActivities.slice(0, 4)} />
        </Card>

        <Card title="Low Stock Alerts" action={<Badge status="warning">{lowStockProducts.length} items</Badge>}>
          <div>
            {lowStockProducts.map((product) => (
              <div 
                key={product.id} 
                style={productItemStyle}
                className="fade-in"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.gray50;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={productInfoStyle}>
                  <img src={product.imageUrl} alt={product.name} style={productImageStyle} />
                  <div style={productDetailsStyle}>
                    <div style={productNameStyle}>{product.name}</div>
                    <div style={stockLevelStyle}>
                      Stock: {product.stockLevel} / Min: {product.minStockLevel}
                    </div>
                  </div>
                </div>
                <Badge status={product.status}>{product.status === 'out-of-stock' ? 'Out' : 'Low'}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
