import { Package, Calendar, DollarSign, Truck, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getThemeColors, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import Badge from './Badge';
import { formatDate, formatCurrency, getStatusLabel, formatDateTime } from '../utils/formatters';
import { suppliers } from '../data/mockData';

const OrderDetails = ({ order }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  const supplier = suppliers.find(s => s.id === order.supplierId);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const sectionStyle = {
    padding: '20px',
    backgroundColor: colors.bgHover,
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  };

  const detailItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const labelStyle = {
    fontSize: '12px',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '500'
  };

  const valueStyle = {
    fontSize: '14px',
    color: colors.textPrimary,
    fontWeight: '500'
  };

  const itemsTableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '12px'
  };

  const thStyle = {
    padding: '12px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    borderBottom: `2px solid ${colors.border}`,
    backgroundColor: colors.bgHover
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: `1px solid ${colors.border}`,
    fontSize: '14px',
    color: colors.textPrimary,
    backgroundColor: colors.bgCard
  };

  const timelineStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '12px'
  };

  const timelineItemStyle = (isActive) => ({
    display: 'flex',
    gap: '12px',
    opacity: isActive ? 1 : 0.5
  });

  const timelineDotStyle = (isActive) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: isActive ? colors.success : colors.border,
    marginTop: '4px',
    flexShrink: 0
  });

  const timelineContentStyle = {
    flex: 1
  };

  const timelineSteps = [
    { status: 'pending', label: 'Order Placed', date: order.orderDate },
    { status: 'processing', label: 'Processing Order', date: null },
    { status: 'shipped', label: 'Shipped', date: null },
    { status: 'delivered', label: 'Delivered', date: order.estimatedDelivery }
  ];

  const getStatusIndex = () => {
    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    return statusOrder.indexOf(order.status);
  };

  const currentStatusIndex = getStatusIndex();

  return (
    <div style={containerStyle}>
      {/* Order Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingBottom: '16px',
        borderBottom: `2px solid ${colors.border}`
      }}>
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: colors.textPrimary, marginBottom: '4px' }}>
            Order #{order.id}
          </h3>
          <p style={{ fontSize: '14px', color: colors.textSecondary }}>
            Placed on {formatDate(order.orderDate)}
          </p>
        </div>
        <Badge status={order.status}>{getStatusLabel(order.status)}</Badge>
      </div>

      {/* Order Information */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>
          <Package size={20} />
          Order Information
        </div>
        <div style={gridStyle}>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Order ID</span>
            <span style={valueStyle}>{order.id}</span>
          </div>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Order Date</span>
            <span style={valueStyle}>{formatDate(order.orderDate)}</span>
          </div>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Total Amount</span>
            <span style={{ ...valueStyle, fontSize: '18px', color: colors.primary }}>
              {formatCurrency(order.totalAmount)}
            </span>
          </div>
          <div style={detailItemStyle}>
            <span style={labelStyle}>Estimated Delivery</span>
            <span style={valueStyle}>{formatDate(order.estimatedDelivery)}</span>
          </div>
        </div>
      </div>

      {/* Supplier Information */}
      {supplier && (
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>
            <Truck size={20} />
            Supplier Details
          </div>
          <div style={gridStyle}>
            <div style={detailItemStyle}>
              <span style={labelStyle}>Supplier Name</span>
              <span style={valueStyle}>{supplier.name}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={labelStyle}>Delivery Time</span>
              <span style={valueStyle}>{supplier.deliveryTime}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={labelStyle}>Email</span>
              <span style={valueStyle}>{supplier.contactEmail}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={labelStyle}>Phone</span>
              <span style={valueStyle}>{supplier.contactPhone}</span>
            </div>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>
          <Package size={20} />
          Order Items ({order.items.length})
        </div>
        <table style={itemsTableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Unit Price</th>
              <th style={thStyle}>Quantity</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{item.productName}</td>
                <td style={tdStyle}>{formatCurrency(item.unitPrice)}</td>
                <td style={tdStyle}>{item.quantity} units</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: '600' }}>
                  {formatCurrency(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" style={{ 
                ...tdStyle, 
                textAlign: 'right', 
                fontWeight: '600',
                fontSize: '16px',
                backgroundColor: colors.gray50 
              }}>
                Grand Total:
              </td>
              <td style={{ 
                ...tdStyle, 
                textAlign: 'right', 
                fontWeight: '700',
                fontSize: '18px',
                color: colors.primary,
                backgroundColor: colors.gray50
              }}>
                {formatCurrency(order.totalAmount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Timeline */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>
          <Clock size={20} />
          Order Timeline
        </div>
        <div style={timelineStyle}>
          {timelineSteps.map((step, idx) => {
            const isActive = idx <= currentStatusIndex;
            return (
              <div key={idx} style={timelineItemStyle(isActive)}>
                <div style={timelineDotStyle(isActive)} />
                <div style={timelineContentStyle}>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: isActive ? colors.textPrimary : colors.textSecondary 
                  }}>
                    {step.label}
                  </div>
                  {step.date && (
                    <div style={{ fontSize: '12px', color: colors.textSecondary, marginTop: '2px' }}>
                      {formatDate(step.date)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
