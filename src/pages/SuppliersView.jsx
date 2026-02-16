import { Mail, Phone, Star, Clock, Package } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { suppliers } from '../data/mockData';
import { colors, borderRadius } from '../styles/theme';

const SuppliersView = () => {
  const containerStyle = {
    padding: '32px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px'
  };

  const supplierCardStyle = {
    padding: '24px',
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'all 0.2s ease'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  };

  const supplierInfoStyle = {
    flex: 1
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: '8px'
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: colors.warning,
    fontWeight: '500'
  };

  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  };

  const detailItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: colors.textSecondary
  };

  const iconStyle = {
    color: colors.primary,
    flexShrink: 0
  };

  const productsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  };

  const contactStyle = {
    display: 'flex',
    gap: '8px',
    paddingTop: '12px',
    borderTop: `1px solid ${colors.border}`
  };

  const getPriceTierColor = (tier) => {
    const colors_map = {
      'budget': 'success',
      'mid-range': 'info',
      'premium': 'warning'
    };
    return colors_map[tier] || 'info';
  };

  return (
    <div style={containerStyle}>
      <Card title="Supplier Directory" action={<Button variant="primary">Add Supplier</Button>}>
        <div style={gridStyle} className="grid-cols-2">
          {suppliers.map((supplier) => (
            <div 
              key={supplier.id} 
              style={supplierCardStyle}
              className="fade-in"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 16px ${colors.border}`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={headerStyle}>
                <div style={supplierInfoStyle}>
                  <div style={nameStyle}>{supplier.name}</div>
                  <div style={ratingStyle}>
                    <Star size={16} fill={colors.warning} />
                    <span>{supplier.rating}</span>
                    <span style={{ color: colors.textTertiary }}>({supplier.reliability}% reliable)</span>
                  </div>
                </div>
                <Badge status={getPriceTierColor(supplier.priceTier)}>
                  {supplier.priceTier}
                </Badge>
              </div>

              <div style={detailsGridStyle}>
                <div style={detailItemStyle}>
                  <Clock size={16} style={iconStyle} />
                  <span>Delivery: {supplier.deliveryTime}</span>
                </div>
                <div style={detailItemStyle}>
                  <Package size={16} style={iconStyle} />
                  <span>{supplier.productsSupplied.length} Categories</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '8px' }}>
                  Supplies:
                </div>
                <div style={productsStyle}>
                  {supplier.productsSupplied.map((product, idx) => (
                    <Badge key={idx} status="info">{product}</Badge>
                  ))}
                </div>
              </div>

              <div style={contactStyle}>
                <Button 
                  variant="secondary" 
                  size="small" 
                  icon={<Mail size={14} />}
                  fullWidth
                >
                  Email
                </Button>
                <Button 
                  variant="secondary" 
                  size="small" 
                  icon={<Phone size={14} />}
                  fullWidth
                >
                  Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SuppliersView;
