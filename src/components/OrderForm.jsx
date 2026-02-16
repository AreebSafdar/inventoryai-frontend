import { useState } from 'react';
import { Package, Plus, Trash2 } from 'lucide-react';
import Button from './Button';
import { colors, borderRadius } from '../styles/theme';
import { suppliers, products } from '../data/mockData';

const OrderForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    supplierId: '',
    items: [{ productId: '', quantity: 1 }]
  });

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: '4px'
  };

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    backgroundColor: colors.white
  };

  const itemRowStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 40px',
    gap: '12px',
    alignItems: 'end'
  };

  const deleteButtonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: colors.danger,
    transition: 'all 0.2s ease'
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    paddingTop: '20px',
    borderTop: `1px solid ${colors.border}`
  };

  const infoBoxStyle = {
    padding: '16px',
    backgroundColor: colors.info + '10',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.info}40`,
    fontSize: '13px',
    color: colors.textSecondary
  };

  const handleSupplierChange = (e) => {
    setFormData({ ...formData, supplierId: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: '', quantity: 1 }]
    });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.supplierId || formData.items.some(item => !item.productId)) {
      alert('Please fill in all required fields');
      return;
    }

    const supplier = suppliers.find(s => s.id === formData.supplierId);
    const orderItems = formData.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        productName: product.name,
        quantity: parseInt(item.quantity),
        unitPrice: product.price
      };
    });

    const totalAmount = orderItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    const newOrder = {
      id: `ORD${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      orderDate: new Date().toISOString().split('T')[0],
      supplierId: formData.supplierId,
      supplierName: supplier.name,
      items: orderItems,
      totalAmount: totalAmount,
      status: 'pending',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    onSubmit(newOrder);
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      if (item.productId && item.quantity) {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.price * parseInt(item.quantity) : 0);
      }
      return sum;
    }, 0);
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div style={infoBoxStyle}>
        <Package size={16} style={{ display: 'inline', marginRight: '8px' }} />
        Fill in the details below to create a new purchase order. The order will be sent to the selected supplier.
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>
          Supplier <span style={{ color: colors.danger }}>*</span>
        </label>
        <select
          style={inputStyle}
          value={formData.supplierId}
          onChange={handleSupplierChange}
          required
        >
          <option value="">Select a supplier</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name} - {supplier.priceTier} ({supplier.deliveryTime})
            </option>
          ))}
        </select>
      </div>

      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={labelStyle}>
            Order Items <span style={{ color: colors.danger }}>*</span>
          </label>
          <Button
            type="button"
            variant="ghost"
            size="small"
            icon={<Plus size={16} />}
            onClick={addItem}
          >
            Add Item
          </Button>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} style={itemRowStyle}>
            <div>
              <select
                style={inputStyle}
                value={item.productId}
                onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                required
              >
                <option value="">Select product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                style={inputStyle}
                placeholder="Quantity"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              style={deleteButtonStyle}
              onClick={() => removeItem(index)}
              disabled={formData.items.length === 1}
              onMouseEnter={(e) => {
                if (formData.items.length > 1) {
                  e.currentTarget.style.backgroundColor = colors.danger + '10';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.white;
              }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {calculateTotal() > 0 && (
        <div style={{
          padding: '16px',
          backgroundColor: colors.gray50,
          borderRadius: borderRadius.md,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: '600', fontSize: '16px' }}>Estimated Total:</span>
          <span style={{ fontSize: '24px', fontWeight: '700', color: colors.primary }}>
            ${calculateTotal().toFixed(2)}
          </span>
        </div>
      )}

      <div style={footerStyle}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Place Order
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
