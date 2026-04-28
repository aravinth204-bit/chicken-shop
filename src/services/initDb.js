import { defaultProducts } from '../data/menuItems';
import { storageService } from './storageService';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_CUSTOMERS = [
  {
    id: uuidv4(),
    name: 'Arun Kumar',
    phone: '+919876543210',
    email: 'arun.k@example.com',
    notes: 'Prefers morning delivery',
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Meena R.',
    phone: '+919812345678',
    email: 'meena.r@example.com',
    notes: 'Regular weekly order',
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Karthik S.',
    phone: '+919998887776',
    email: 'karthik.s@example.com',
    notes: 'Calls before delivery',
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString()
  }
];

const DEFAULT_COUPONS = [
  {
    id: uuidv4(),
    code: 'CRISPY20',
    type: 'percent',
    value: 20,
    expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
    enabled: true,
    description: 'Crispy chicken discount for first-time customers',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    code: 'HOT15',
    type: 'percent',
    value: 15,
    expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString().split('T')[0],
    enabled: true,
    description: 'Hot deal coupon',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    code: 'FRESH10',
    type: 'fixed',
    value: 100,
    expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().split('T')[0],
    enabled: true,
    description: 'Fresh order discount',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_ORDERS = [
  {
    id: uuidv4(),
    customerId: DEFAULT_CUSTOMERS[0].id,
    customerName: DEFAULT_CUSTOMERS[0].name,
    customerPhone: DEFAULT_CUSTOMERS[0].phone,
    customerLocation: 'Erode, TN',
    items: [
      { name: 'Naatu Koli', quantity: 2, price: 300, category: 'chicken' },
      { name: 'Chicken Curry Cut', quantity: 1, price: 280, category: 'chicken' }
    ],
    total: 880,
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString()
  },
  {
    id: uuidv4(),
    customerId: DEFAULT_CUSTOMERS[1].id,
    customerName: DEFAULT_CUSTOMERS[1].name,
    customerPhone: DEFAULT_CUSTOMERS[1].phone,
    customerLocation: 'Sathyamangalam, TN',
    items: [
      { name: 'Kili Raja', quantity: 1, price: 420, category: 'chicken' },
      { name: 'Chicken Fry', quantity: 1, price: 250, category: 'chicken' }
    ],
    total: 670,
    status: 'ready',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
  },
  {
    id: uuidv4(),
    customerId: DEFAULT_CUSTOMERS[2].id,
    customerName: DEFAULT_CUSTOMERS[2].name,
    customerPhone: DEFAULT_CUSTOMERS[2].phone,
    customerLocation: 'Salem, TN',
    items: [
      { name: 'Mutton Keema', quantity: 1, price: 580, category: 'goat' }
    ],
    total: 580,
    status: 'preparing',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString()
  }
];

export const initializeDatabase = async () => {
  const [currentProducts, currentCustomers, currentCoupons, currentOrders] = await Promise.all([
    storageService.getProducts(),
    storageService.getCustomers(),
    storageService.getCoupons(),
    storageService.getOrders()
  ]);

  const seeded = [];

  if (!currentProducts.length) {
    await storageService.saveProducts(defaultProducts);
    seeded.push('products');
  }
  if (!currentCustomers.length) {
    await storageService.saveCustomers(DEFAULT_CUSTOMERS);
    seeded.push('customers');
  }
  if (!currentCoupons.length) {
    await storageService.saveCoupons(DEFAULT_COUPONS);
    seeded.push('coupons');
  }
  if (!currentOrders.length) {
    await storageService.saveOrders(DEFAULT_ORDERS);
    seeded.push('orders');
  }

  if (seeded.length > 0) {
    console.log('Initialized database with:', seeded.join(', '));
    return true;
  }

  console.log('Database already initialized.');
  return false;
};
