import { MoreVertical, Eye, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { colors, borderRadius } from '../styles/theme';
import Badge from './Badge';
import Button from './Button';
import { getStatusLabel, formatCurrency, formatDate } from '../utils/formatters';

const InventoryTable = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: `2px solid ${colors.border}`,
    backgroundColor: colors.gray50
  };

  const tdStyle = {
    padding: '16px',
    borderBottom: `1px solid ${colors.border}`,
    fontSize: '14px',
    color: colors.textPrimary
  };

  const productCellStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const productImageStyle = {
    width: '48px',
    height: '48px',
    borderRadius: borderRadius.md,
    objectFit: 'cover',
    border: `1px solid ${colors.border}`
  };

  const productInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  };

  const productNameStyle = {
    fontWeight: '500',
    color: colors.textPrimary
  };

  const productCategoryStyle = {
    fontSize: '12px',
    color: colors.textSecondary
  };

  const actionButtonStyle = {
    width: '32px',
    height: '32px',
    borderRadius: borderRadius.sm,
    border: `1px solid ${colors.border}`,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: colors.textSecondary
  };

  const filterBarStyle = {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'center'
  };

  const searchInputStyle = {
    flex: 1,
    minWidth: '250px',
    padding: '10px 16px',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    fontSize: '14px',
    outline: 'none'
  };

  const selectStyle = {
    padding: '10px 16px',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    fontSize: '14px',
    outline: 'none',
    backgroundColor: colors.white,
    cursor: 'pointer'
  };

  const categories = ['All Categories', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div style={filterBarStyle}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={selectStyle}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Stock Level</th>
              <th style={thStyle}>Sales (7d)</th>
              <th style={thStyle}>Sales (30d)</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Last Restocked</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="fade-in">
                <td style={tdStyle}>
                  <div style={productCellStyle}>
                    <img src={product.imageUrl} alt={product.name} style={productImageStyle} />
                    <div style={productInfoStyle}>
                      <div style={productNameStyle}>{product.name}</div>
                      <div style={productCategoryStyle}>{product.category}</div>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: '600' }}>{product.stockLevel}</span>
                  <span style={{ color: colors.textSecondary, fontSize: '12px' }}> / {product.minStockLevel}</span>
                </td>
                <td style={tdStyle}>{product.sales7d}</td>
                <td style={tdStyle}>{product.sales30d}</td>
                <td style={tdStyle}>{formatCurrency(product.price)}</td>
                <td style={tdStyle}>
                  <Badge status={product.status}>{getStatusLabel(product.status)}</Badge>
                </td>
                <td style={tdStyle}>{formatDate(product.lastRestocked)}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={actionButtonStyle} title="View Details">
                      <Eye size={16} />
                    </button>
                    <button style={actionButtonStyle} title="Reorder">
                      <RefreshCw size={16} />
                    </button>
                    <button style={actionButtonStyle} title="More Options">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: colors.textSecondary 
        }}>
          No products found matching your criteria
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
