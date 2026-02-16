import { useState } from 'react';
import Card from '../components/Card';
import InventoryTable from '../components/InventoryTable';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import { products } from '../data/mockData';
import { colors, borderRadius, spacing } from '../styles/theme';

const InventoryView = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    stockLevel: '',
    minStockLevel: '',
    price: '',
    supplier: '',
    imageUrl: ''
  });

  const containerStyle = {
    padding: '32px'
  };

  const formGroupStyle = {
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
    color: colors.textPrimary,
    boxSizing: 'border-box'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.md,
    marginBottom: spacing.md
  };

  const formActionsStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTop: `1px solid ${colors.border}`
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Adding product:', formData);
    // Reset form and close modal
    setFormData({
      name: '',
      category: 'Electronics',
      stockLevel: '',
      minStockLevel: '',
      price: '',
      supplier: '',
      imageUrl: ''
    });
    setIsAddProductModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      category: 'Electronics',
      stockLevel: '',
      minStockLevel: '',
      price: '',
      supplier: '',
      imageUrl: ''
    });
    setIsAddProductModalOpen(false);
  };

  return (
    <div style={containerStyle}>
      <Card 
        title="Product Inventory" 
        action={
          <Button 
            variant="primary" 
            icon={<Plus size={16} />}
            onClick={() => setIsAddProductModalOpen(true)}
          >
            Add Product
          </Button>
        }
      >
        <InventoryTable products={products} />
      </Card>

      <Modal
        isOpen={isAddProductModalOpen}
        onClose={handleCancel}
        title="Add New Product"
        size="large"
      >
        <div style={formGroupStyle}>
          <label style={labelStyle}>Product Name *</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div style={formGridStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Category *</label>
            <select
              style={inputStyle}
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
              <option value="Toys">Toys</option>
              <option value="Beauty">Beauty</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Supplier *</label>
            <select
              style={inputStyle}
              value={formData.supplier}
              onChange={(e) => handleInputChange('supplier', e.target.value)}
            >
              <option value="">Select a supplier</option>
              <option value="TechSupply Co">TechSupply Co</option>
              <option value="Fashion Hub">Fashion Hub</option>
              <option value="GlobalFood Inc">GlobalFood Inc</option>
              <option value="HomeGoods Direct">HomeGoods Direct</option>
              <option value="Sports World">Sports World</option>
            </select>
          </div>
        </div>

        <div style={formGridStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Initial Stock Level *</label>
            <input
              type="number"
              style={inputStyle}
              value={formData.stockLevel}
              onChange={(e) => handleInputChange('stockLevel', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Minimum Stock Level *</label>
            <input
              type="number"
              style={inputStyle}
              value={formData.minStockLevel}
              onChange={(e) => handleInputChange('minStockLevel', e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div style={formGridStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Price (USD) *</label>
            <input
              type="number"
              style={inputStyle}
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Product Image URL</label>
            <input
              type="url"
              style={inputStyle}
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div style={formActionsStyle}>
          <Button variant="secondary" size="medium" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            size="medium" 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.stockLevel || !formData.minStockLevel || !formData.price || !formData.supplier}
          >
            Add Product
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryView;
