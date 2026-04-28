import { APP_CONFIG } from '../config';

const STORAGE_KEYS = {
  PRODUCTS: 'chicken_sea_products',
  ORDERS: 'chicken_sea_orders',
  SETTINGS: 'chicken_sea_settings',
  CUSTOMERS: 'chicken_sea_customers',
  COUPONS: 'chicken_sea_coupons',
  ADMIN_AUTH: 'chicken_sea_admin',
  STAFF_AUTH: 'chicken_sea_staff',
  PRICE_LOGS: 'chicken_sea_price_logs',
  ADMIN_PASSWORD: 'chicken_sea_admin_password'
};

const DEFAULT_CREDENTIALS = {
  admin: { username: 'admin', password: 'admin123' },
  staff: { username: 'staff', password: 'staff123' }
};

export const DELIVERY_SLOTS = [
  { id: 'morning', label: 'Morning', time: '8:00 AM - 10:00 AM' },
  { id: 'late_morning', label: 'Late Morning', time: '10:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 2:00 PM' },
  { id: 'evening', label: 'Evening', time: '5:00 PM - 7:00 PM' },
  { id: 'night', label: 'Night', time: '7:00 PM - 9:00 PM' }
];

const getSavedAdminPassword = () => {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || DEFAULT_CREDENTIALS.admin.password;
};

export const storageService = {
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
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
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
    const filtered = products.filter((p) => p.id !== productId);
    await this.saveProducts(filtered);
  },

  async toggleStock(productId) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products[index].inStock = !products[index].inStock;
      await this.saveProducts(products);
      return products[index].inStock;
    }
    return null;
  },

  async getOrders() {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  async saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  async saveOrder(order) {
    const orders = await this.getOrders();
    orders.unshift(order);
    await this.saveOrders(orders);
  },

  async updateOrderStatus(orderId, status) {
    const orders = await this.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      orders[index].updatedAt = new Date().toISOString();
      await this.saveOrders(orders);
      return true;
    }
    return false;
  },

  async updateOrder(orderId, updatedFields) {
    const orders = await this.getOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updatedFields, updatedAt: new Date().toISOString() };
      await this.saveOrders(orders);
      return true;
    }
    return false;
  },

  async getCustomers() {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : [];
  },

  async saveCustomers(customers) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  },

  async addCustomer(customer) {
    const customers = await this.getCustomers();
    customers.unshift(customer);
    await this.saveCustomers(customers);
  },

  async updateCustomer(customerId, updatedFields) {
    const customers = await this.getCustomers();
    const index = customers.findIndex((customer) => customer.id === customerId);
    if (index !== -1) {
      customers[index] = { ...customers[index], ...updatedFields, updatedAt: new Date().toISOString() };
      await this.saveCustomers(customers);
      return true;
    }
    return false;
  },

  async getCoupons() {
    const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
    return data ? JSON.parse(data) : [];
  },

  async saveCoupons(coupons) {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  },

  async addCoupon(coupon) {
    const coupons = await this.getCoupons();
    coupons.unshift({
      id: crypto.randomUUID(),
      code: coupon.code.toUpperCase(),
      type: coupon.type,
      value: coupon.value,
      expiry: coupon.expiry || '',
      enabled: coupon.enabled ?? true,
      description: coupon.description || '',
      createdAt: new Date().toISOString()
    });
    await this.saveCoupons(coupons);
  },

  async updateCoupon(couponId, updatedFields) {
    const coupons = await this.getCoupons();
    const index = coupons.findIndex((coupon) => coupon.id === couponId);
    if (index !== -1) {
      coupons[index] = { ...coupons[index], ...updatedFields, updatedAt: new Date().toISOString() };
      await this.saveCoupons(coupons);
      return true;
    }
    return false;
  },

  async deleteCoupon(couponId) {
    const coupons = await this.getCoupons();
    const filtered = coupons.filter((coupon) => coupon.id !== couponId);
    await this.saveCoupons(filtered);
  },

  async toggleCoupon(couponId) {
    const coupons = await this.getCoupons();
    const index = coupons.findIndex((coupon) => coupon.id === couponId);
    if (index !== -1) {
      coupons[index].enabled = !coupons[index].enabled;
      await this.saveCoupons(coupons);
      return coupons[index].enabled;
    }
    return null;
  },

  async getActiveCoupons() {
    return (await this.getCoupons()).filter((coupon) => coupon.enabled);
  },

  async getSettings() {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data
      ? JSON.parse(data)
      : {
          shopName: APP_CONFIG.DEFAULT_SHOP_NAME,
          bannerUrls: [],
          contactWhatsApp: '',
          address: APP_CONFIG.DEFAULT_ADDRESS,
          phone: APP_CONFIG.PRIMARY_PHONE
        };
  },

  async updateSettings(newSettings) {
    const current = await this.getSettings();
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...current, ...newSettings }));
  },

  async adminLogin(username, password) {
    const savedPassword = getSavedAdminPassword();
    if (username === DEFAULT_CREDENTIALS.admin.username && password === savedPassword) {
      localStorage.setItem(
        STORAGE_KEYS.ADMIN_AUTH,
        JSON.stringify({ role: 'admin', username, loginAt: new Date().toISOString() })
      );
      return { success: true, role: 'admin' };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  async staffLogin(username, password) {
    if (username === DEFAULT_CREDENTIALS.staff.username && password === DEFAULT_CREDENTIALS.staff.password) {
      localStorage.setItem(
        STORAGE_KEYS.STAFF_AUTH,
        JSON.stringify({ role: 'staff', username, loginAt: new Date().toISOString() })
      );
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
    if (oldPassword !== getSavedAdminPassword()) {
      return { success: false, error: 'Current password is incorrect' };
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
    return { success: true };
  },

  async logPriceChange(itemName, oldPrice, newPrice) {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICE_LOGS) || '[]');
    logs.unshift({ itemName, oldPrice, newPrice, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.PRICE_LOGS, JSON.stringify(logs.slice(0, 50)));
  },

  async getPriceLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICE_LOGS) || '[]');
  }
};
