/**
 * Chicken Sea - Centralized Storage Service v2
 * Cloud-Ready Architecture with Stock, Roles, and Delivery Slots
 */

const STORAGE_KEYS = {
  PRODUCTS: 'chicken_sea_products',
  ORDERS: 'chicken_sea_orders',
  SETTINGS: 'chicken_sea_settings',
  ADMIN_AUTH: 'chicken_sea_admin',
  STAFF_AUTH: 'chicken_sea_staff',
  PRICE_LOGS: 'chicken_sea_price_logs'
};

// Default Admin credentials (for demo - can be changed later)
const DEFAULT_CREDENTIALS = {
  admin: { username: 'admin', password: 'admin123' },
  staff: { username: 'staff', password: 'staff123' }
};

// Delivery Time Slots
export const DELIVERY_SLOTS = [
  { id: 'morning', label: 'Morning', time: '8:00 AM - 10:00 AM' },
  { id: 'late_morning', label: 'Late Morning', time: '10:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 2:00 PM' },
  { id: 'evening', label: 'Evening', time: '5:00 PM - 7:00 PM' },
  { id: 'night', label: 'Night', time: '7:00 PM - 9:00 PM' }
];

export const storageService = {
  // --- PRODUCTS ---
  async getProducts() {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  async saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  async addProduct(product) {
    const products = await this.getProducts();
    products.unshift(product);
    await this.saveProducts(products);
  },

  async updateProduct(productId, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      // Log price changes
      if (updatedFields.price && updatedFields.price !== products[index].price) {
        await this.logPriceChange(products[index].name, products[index].price, updatedFields.price);
      }
      products[index] = { ...products[index], ...updatedFields };
      await this.saveProducts(products);
      return true;
    }
    return false;
  },

  async deleteProduct(productId) {
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id !== productId);
    await this.saveProducts(filtered);
  },

  async toggleStock(productId) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products[index].inStock = !products[index].inStock;
      await this.saveProducts(products);
      return products[index].inStock;
    }
    return null;
  },

  // --- PRICE LOGS ---
  async logPriceChange(itemName, oldPrice, newPrice) {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICE_LOGS) || '[]');
    logs.unshift({
      itemName,
      oldPrice,
      newPrice,
      timestamp: new Date().toISOString()
    });
    // Keep only last 50 logs
    localStorage.setItem(STORAGE_KEYS.PRICE_LOGS, JSON.stringify(logs.slice(0, 50)));
  },

  async getPriceLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICE_LOGS) || '[]');
  },

  // --- ORDERS ---
  async getOrders() {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  async saveOrder(order) {
    const orders = await this.getOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  async updateOrderStatus(orderId, status) {
    const orders = await this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      orders[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      return true;
    }
    return false;
  },

  async updateOrder(orderId, updatedFields) {
    const orders = await this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updatedFields };
      orders[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      return true;
    }
    return false;
  },

  // --- SETTINGS ---
  async getSettings() {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      shopName: 'Chicken Sea',
      bannerUrls: [],
      contactWhatsApp: '',
      address: 'Erode, Tamil Nadu',
      phone: '+91 98765 43210'
    };
  },

  async updateSettings(newSettings) {
    const current = await this.getSettings();
    await localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...current, ...newSettings }));
  },

  // --- ADMIN AUTHENTICATION ---
  async adminLogin(username, password) {
    if (username === DEFAULT_CREDENTIALS.admin.username && 
        password === DEFAULT_CREDENTIALS.admin.password) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify({
        role: 'admin',
        username,
        loginAt: new Date().toISOString()
      }));
      return { success: true, role: 'admin' };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  async staffLogin(username, password) {
    if (username === DEFAULT_CREDENTIALS.staff.username && 
        password === DEFAULT_CREDENTIALS.staff.password) {
      localStorage.setItem(STORAGE_KEYS.STAFF_AUTH, JSON.stringify({
        role: 'staff',
        username,
        loginAt: new Date().toISOString()
      }));
      return { success: true, role: 'staff' };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  async checkAuth() {
    const adminAuth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    const staffAuth = localStorage.getItem(STORAGE_KEYS.STAFF_AUTH);
    
    if (adminAuth) {
      return { authenticated: true, role: 'admin', ...JSON.parse(adminAuth) };
    }
    if (staffAuth) {
      return { authenticated: true, role: 'staff', ...JSON.parse(staffAuth) };
    }
    return { authenticated: false, role: null };
  },

  async logout(role = 'admin') {
    if (role === 'staff') {
      localStorage.removeItem(STORAGE_KEYS.STAFF_AUTH);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      localStorage.removeItem(STORAGE_KEYS.STAFF_AUTH);
    }
  },

  async changePassword(role, oldPassword, newPassword) {
    if (role !== 'admin') return { success: false, error: 'Only admin can change passwords' };
    
    if (oldPassword !== DEFAULT_CREDENTIALS.admin.password) {
      return { success: false, error: 'Current password is incorrect' };
    }
    
    // In a real app, this would update a database
    // For localStorage demo, we'll use a separate key
    localStorage.setItem('chicken_sea_admin_new_password', newPassword);
    return { success: true };
  }
};
