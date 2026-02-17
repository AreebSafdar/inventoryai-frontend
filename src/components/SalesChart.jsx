import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getThemeColors } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/formatters';

export const SalesTrendChart = ({ data }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: colors.bgCard,
          padding: '12px',
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{payload[0].payload.date}</p>
          <p style={{ margin: '4px 0', color: colors.primary }}>
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p style={{ margin: '4px 0', color: colors.success }}>
            Units: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
        <XAxis 
          dataKey="date" 
          tick={{ fill: colors.textSecondary, fontSize: 12 }}
          tickFormatter={(value) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <YAxis 
          tick={{ fill: colors.textSecondary, fontSize: 12 }}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke={colors.primary} 
          strokeWidth={3}
          dot={{ fill: colors.primary, r: 4 }}
          activeDot={{ r: 6 }}
          name="Revenue"
        />
        <Line 
          type="monotone" 
          dataKey="units" 
          stroke={colors.success} 
          strokeWidth={3}
          dot={{ fill: colors.success, r: 4 }}
          activeDot={{ r: 6 }}
          name="Units Sold"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const CategoryChart = ({ data }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: colors.bgCard,
          padding: '12px',
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{payload[0].payload.category}</p>
          <p style={{ margin: '4px 0', color: colors.primary }}>
            Sales: {formatCurrency(payload[0].value)}
          </p>
          <p style={{ margin: '4px 0', color: colors.textSecondary }}>
            Units: {payload[0].payload.units}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
        <XAxis 
          dataKey="category" 
          tick={{ fill: colors.textSecondary, fontSize: 11 }}
          angle={-15}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tick={{ fill: colors.textSecondary, fontSize: 12 }}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="sales" 
          fill={colors.primary}
          radius={[8, 8, 0, 0]}
          name="Sales"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
