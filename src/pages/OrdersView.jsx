import { Package, Calendar, DollarSign, Truck, Eye } from 'lucide-react';
import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import OrderForm from '../components/OrderForm';
import OrderDetails from '../components/OrderDetails';
import { orders as initialOrders } from '../data/mockData';
import { colors, borderRadius } from '../styles/theme';
import { formatDate, formatCurrency, getStatusLabel } from '../utils/formatters';

const OrdersView = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const containerStyle = {
    padding: '32px'
  };

  const orderListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '20px'
  };

  const orderCardStyle = {
    padding: '20px',
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'all 0.2s ease'
  };

  const orderHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const orderIdStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.textPrimary
  };

  const orderDetailsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    padding: '16px',
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.md
  };

  const detailItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const detailLabelStyle = {
    fontSize: '12px',
    color: colors.textSecondary,
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const detailValueStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.textPrimary
  };

  const itemsListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    border: `1px solid ${colors.border}`
  };

  const itemNameStyle = {
    fontSize: '13px',
    color: colors.textPrimary
  };

  const itemQtyStyle = {
    fontSize: '12px',
    color: colors.textSecondary
  };

  const itemPriceStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.textPrimary
  };

  const actionsStyle = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    paddingTop: '12px',
    borderTop: `1px solid ${colors.border}`
  };

  const handleCreateOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setShowCreateModal(false);
    
    // Show success notification (you can enhance this with a toast notification)
    alert(`Order ${newOrder.id} created successfully!`);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  return (
    <div style={containerStyle}>
      <Card 
        title="Purchase Orders" 
        action={
          <Button 
            variant="primary" 
            onClick={() => setShowCreateModal(true)}
          >
            Create New Order
          </Button>
        }
      >
        <div style={orderListStyle}>
          {orders.map((order) => (
            <div 
              key={order.id} 
              style={orderCardStyle}
              className="fade-in"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 4px 12px ${colors.border}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={orderHeaderStyle}>
                <div style={orderIdStyle}>Order #{order.id}</div>
                <Badge status={order.status}>{getStatusLabel(order.status)}</Badge>
              </div>

              <div style={orderDetailsStyle} className="grid-cols-4">
                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>
                    <Calendar size={14} />
                    Date Placed
                  </div>
                  <div style={detailValueStyle}>{formatDate(order.orderDate)}</div>
                </div>

                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>
                    <Package size={14} />
                    Supplier
                  </div>
                  <div style={detailValueStyle}>{order.supplierName}</div>
                </div>

                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>
                    <DollarSign size={14} />
                    Total Amount
                  </div>
                  <div style={detailValueStyle}>{formatCurrency(order.totalAmount)}</div>
                </div>

                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>
                    <Truck size={14} />
                    Est. Delivery
                  </div>
                  <div style={detailValueStyle}>{formatDate(order.estimatedDelivery)}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: colors.textPrimary, marginBottom: '8px' }}>
                  Items ({order.items.length})
                </div>
                <div style={itemsListStyle}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={itemStyle}>
                      <div>
                        <div style={itemNameStyle}>{item.productName}</div>
                        <div style={itemQtyStyle}>Quantity: {item.quantity} units</div>
                      </div>
                      <div style={itemPriceStyle}>{formatCurrency(item.quantity * item.unitPrice)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={actionsStyle}>
                <Button 
                  variant="secondary" 
                  size="small"
                  icon={<Eye size={16} />}
                  onClick={() => handleViewDetails(order)}
                >
                  View Details
                </Button>
                <Button variant="ghost" size="small">Track Order</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Create Order Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Purchase Order"
        size="large"
      >
        <OrderForm
          onSubmit={handleCreateOrder}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Order Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Order Details"
        size="large"
      >
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>
    </div>
  );
};

export default OrdersView;
