import { defaultProducts } from '../data/menuItems';
import { storageService } from './storageService';

export const initializeDatabase = async () => {
  const currentProducts = await storageService.getProducts();
  
  if (currentProducts.length === 0) {
    console.log('Initializing database with default menu items...');
    await storageService.saveProducts(defaultProducts);
    console.log('Database initialized successfully!');
    return true;
  } else {
    console.log('Database already has products. Skipping migration.');
    return false;
  }
};
