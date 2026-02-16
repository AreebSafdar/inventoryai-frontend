// Mock data for demonstration

export const products = [
  {
    id: 'P001',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    stockLevel: 45,
    minStockLevel: 20,
    sales7d: 12,
    sales30d: 58,
    price: 79.99,
    status: 'in-stock',
    imageUrl: 'https://picsum.photos/seed/headphones/100/100',
    supplier: 'TechSupply Co',
    lastRestocked: '2026-02-01'
  },
  {
    id: 'P002',
    name: 'Winter Jacket - Premium',
    category: 'Clothing',
    stockLevel: 8,
    minStockLevel: 15,
    sales7d: 24,
    sales30d: 89,
    price: 149.99,
    status: 'low-stock',
    imageUrl: 'https://picsum.photos/seed/jacket/100/100',
    supplier: 'Fashion Hub',
    lastRestocked: '2026-01-15'
  },
  {
    id: 'P003',
    name: 'Organic Coffee Beans 1kg',
    category: 'Food & Beverages',
    stockLevel: 0,
    minStockLevel: 30,
    sales7d: 45,
    sales30d: 178,
    price: 24.99,
    status: 'out-of-stock',
    imageUrl: 'https://picsum.photos/seed/coffee/100/100',
    supplier: 'GlobalFood Inc',
    lastRestocked: '2026-01-20'
  },
  {
    id: 'P004',
    name: 'LED Desk Lamp',
    category: 'Home & Garden',
    stockLevel: 67,
    minStockLevel: 25,
    sales7d: 8,
    sales30d: 34,
    price: 39.99,
    status: 'in-stock',
    imageUrl: 'https://picsum.photos/seed/lamp/100/100',
    supplier: 'HomeGoods Direct',
    lastRestocked: '2026-02-05'
  },
  {
    id: 'P005',
    name: 'Yoga Mat Premium',
    category: 'Sports',
    stockLevel: 23,
    minStockLevel: 20,
    sales7d: 15,
    sales30d: 67,
    price: 34.99,
    status: 'in-stock',
    imageUrl: 'https://picsum.photos/seed/yoga/100/100',
    supplier: 'Sports World',
    lastRestocked: '2026-01-28'
  },
  {
    id: 'P006',
    name: 'Smartphone Case - Universal',
    category: 'Electronics',
    stockLevel: 12,
    minStockLevel: 40,
    sales7d: 28,
    sales30d: 134,
    price: 19.99,
    status: 'low-stock',
    imageUrl: 'https://picsum.photos/seed/phonecase/100/100',
    supplier: 'TechSupply Co',
    lastRestocked: '2026-01-10'
  },
  {
    id: 'P007',
    name: 'Cotton T-Shirt Pack (3)',
    category: 'Clothing',
    stockLevel: 156,
    minStockLevel: 50,
    sales7d: 42,
    sales30d: 189,
    price: 29.99,
    status: 'in-stock',
    imageUrl: 'https://picsum.photos/seed/tshirt/100/100',
    supplier: 'Fashion Hub',
    lastRestocked: '2026-02-08'
  },
  {
    id: 'P008',
    name: 'Green Tea Premium 50 Bags',
    category: 'Food & Beverages',
    stockLevel: 88,
    minStockLevel: 35,
    sales7d: 19,
    sales30d: 76,
    price: 12.99,
    status: 'in-stock',
    imageUrl: 'https://picsum.photos/seed/greentea/100/100',
    supplier: 'GlobalFood Inc',
    lastRestocked: '2026-02-03'
  }
];

export const suppliers = [
  {
    id: 'S001',
    name: 'TechSupply Co',
    rating: 4.8,
    priceTier: 'mid-range',
    deliveryTime: '3-5 days',
    productsSupplied: ['Electronics', 'Accessories'],
    contactEmail: 'orders@techsupply.com',
    contactPhone: '+1 (555) 123-4567',
    reliability: 96
  },
  {
    id: 'S002',
    name: 'Fashion Hub',
    rating: 4.5,
    priceTier: 'premium',
    deliveryTime: '5-7 days',
    productsSupplied: ['Clothing', 'Accessories'],
    contactEmail: 'sales@fashionhub.com',
    contactPhone: '+1 (555) 234-5678',
    reliability: 92
  },
  {
    id: 'S003',
    name: 'GlobalFood Inc',
    rating: 4.9,
    priceTier: 'mid-range',
    deliveryTime: '2-4 days',
    productsSupplied: ['Food & Beverages'],
    contactEmail: 'orders@globalfood.com',
    contactPhone: '+1 (555) 345-6789',
    reliability: 98
  },
  {
    id: 'S004',
    name: 'HomeGoods Direct',
    rating: 4.3,
    priceTier: 'budget',
    deliveryTime: '4-6 days',
    productsSupplied: ['Home & Garden', 'Furniture'],
    contactEmail: 'contact@homegoods.com',
    contactPhone: '+1 (555) 456-7890',
    reliability: 89
  },
  {
    id: 'S005',
    name: 'Sports World',
    rating: 4.6,
    priceTier: 'mid-range',
    deliveryTime: '3-5 days',
    productsSupplied: ['Sports', 'Fitness'],
    contactEmail: 'info@sportsworld.com',
    contactPhone: '+1 (555) 567-8901',
    reliability: 94
  }
];

export const orders = [
  {
    id: 'ORD001',
    orderDate: '2026-02-10',
    supplierId: 'S003',
    supplierName: 'GlobalFood Inc',
    items: [
      { productId: 'P003', productName: 'Organic Coffee Beans 1kg', quantity: 100, unitPrice: 24.99 }
    ],
    totalAmount: 2499,
    status: 'processing',
    estimatedDelivery: '2026-02-14'
  },
  {
    id: 'ORD002',
    orderDate: '2026-02-09',
    supplierId: 'S001',
    supplierName: 'TechSupply Co',
    items: [
      { productId: 'P006', productName: 'Smartphone Case - Universal', quantity: 50, unitPrice: 19.99 }
    ],
    totalAmount: 999.50,
    status: 'shipped',
    estimatedDelivery: '2026-02-13'
  },
  {
    id: 'ORD003',
    orderDate: '2026-02-08',
    supplierId: 'S002',
    supplierName: 'Fashion Hub',
    items: [
      { productId: 'P002', productName: 'Winter Jacket - Premium', quantity: 30, unitPrice: 149.99 }
    ],
    totalAmount: 4499.70,
    status: 'pending',
    estimatedDelivery: '2026-02-15'
  },
  {
    id: 'ORD004',
    orderDate: '2026-02-05',
    supplierId: 'S004',
    supplierName: 'HomeGoods Direct',
    items: [
      { productId: 'P004', productName: 'LED Desk Lamp', quantity: 25, unitPrice: 39.99 }
    ],
    totalAmount: 999.75,
    status: 'delivered',
    estimatedDelivery: '2026-02-11'
  }
];

export const aiActivities = [
  {
    id: 'A001',
    timestamp: '2026-02-13T08:30:00',
    type: 'detection',
    title: 'Low stock detected',
    description: 'Organic Coffee Beans 1kg is out of stock with high demand (45 sales in 7 days)',
    severity: 'error',
    actionTaken: 'Automated order placed with GlobalFood Inc for 100 units'
  },
  {
    id: 'A002',
    timestamp: '2026-02-13T07:15:00',
    type: 'recommendation',
    title: 'Supplier optimization',
    description: 'Better pricing found for Smartphone Cases at QuickTech Solutions (15% cheaper)',
    severity: 'info',
    actionTaken: null
  },
  {
    id: 'A003',
    timestamp: '2026-02-13T06:45:00',
    type: 'analysis',
    title: 'Seasonal trend detected',
    description: 'Winter Jacket sales increased 340% compared to last month. High demand expected for next 30 days.',
    severity: 'success',
    actionTaken: 'Restock recommendation sent to supplier'
  },
  {
    id: 'A004',
    timestamp: '2026-02-12T16:20:00',
    type: 'action',
    title: 'Purchase order confirmed',
    description: 'Order ORD002 confirmed with TechSupply Co. Expected delivery: Feb 13',
    severity: 'success',
    actionTaken: 'Email confirmation sent to store owner'
  },
  {
    id: 'A005',
    timestamp: '2026-02-12T14:10:00',
    type: 'detection',
    title: 'Slow-moving product alert',
    description: 'LED Desk Lamp has low sales velocity (8 units in 7 days). Consider promotion.',
    severity: 'warning',
    actionTaken: null
  }
];

export const salesData = [
  { date: '2026-01-07', revenue: 3450, units: 89 },
  { date: '2026-01-14', revenue: 4120, units: 102 },
  { date: '2026-01-21', revenue: 3890, units: 95 },
  { date: '2026-01-28', revenue: 5240, units: 134 },
  { date: '2026-02-04', revenue: 6780, units: 167 },
  { date: '2026-02-11', revenue: 7890, units: 198 },
];

export const categoryPerformance = [
  { category: 'Electronics', sales: 2340, units: 78 },
  { category: 'Clothing', sales: 3890, units: 112 },
  { category: 'Food & Beverages', sales: 4560, units: 267 },
  { category: 'Home & Garden', sales: 1890, units: 56 },
  { category: 'Sports', sales: 2210, units: 89 },
];

export const metrics = [
  {
    label: 'Total Products',
    value: 248,
    change: 5.2,
    trend: 'up'
  },
  {
    label: 'Low Stock Items',
    value: 23,
    change: -12.3,
    trend: 'down'
  },
  {
    label: 'Active Orders',
    value: 12,
    change: 8.7,
    trend: 'up'
  },
  {
    label: 'Total Revenue',
    value: '$67,890',
    change: 23.4,
    trend: 'up'
  }
];
