import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '../services/storageService';
import { categories } from '../data/menuItems';

function AdminMenu() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [priceLogs, setPriceLogs] = useState([]);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'kg',
    category: 'chicken',
    emoji: '🐔',
    image: '',
    inStock: true,
    stock: 50,
    weightOptions: [0.5, 1, 1.5, 2],
    defaultWeight: 1,
    spiceLevel: 1
  });

  useEffect(() => {
    loadMenu();
    loadPriceLogs();
  }, []);

  const loadMenu = async () => {
    const products = await storageService.getProducts();
    setItems(products);
  };

  const loadPriceLogs = async () => {
    const logs = await storageService.getPriceLogs();
    setPriceLogs(logs);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      alert('Image size should be less than 500KB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      spiceLevel: parseInt(formData.spiceLevel) || 0,
      weightOptions: formData.unit === 'piece' ? [1, 2, 3, 6, 12] : [0.5, 1, 1.5, 2],
      defaultWeight: formData.unit === 'piece' ? 1 : 1
    };

    if (editingItem) {
      await storageService.updateProduct(editingItem.id, itemData);
      setEditingItem(null);
    } else {
      const newItem = {
        id: uuidv4(),
        ...itemData
      };
      await storageService.addProduct(newItem);
    }
    loadMenu();
    loadPriceLogs();
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setPreviewImage(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      unit: 'kg',
      category: 'chicken',
      emoji: '🐔',
      image: '',
      inStock: true,
      stock: 50,
      weightOptions: [0.5, 1, 1.5, 2],
      defaultWeight: 1,
      spiceLevel: 1
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price?.toString() || '',
      unit: item.unit || 'kg',
      category: item.category,
      emoji: item.emoji || '🐔',
      image: item.image || '',
      inStock: item.inStock ?? true,
      stock: item.stock || 50,
      spiceLevel: item.spiceLevel || 1
    });
    setPreviewImage(item.image || null);
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await storageService.deleteProduct(itemId);
      loadMenu();
    }
  };

  const toggleStock = async (itemId) => {
    await storageService.toggleStock(itemId);
    loadMenu();
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      chicken: 'text-fire-red',
      goat: 'text-red-600',
      duck: 'text-red-500',
      eggs: 'text-red-700'
    };
    return colors[categoryId] || 'text-stone-400';
  };

  const getCategoryBg = (categoryId) => {
    const colors = {
      chicken: 'bg-fire-red',
      goat: 'bg-red-700',
      duck: 'bg-red-600',
      eggs: 'bg-red-800'
    };
    return colors[categoryId] || 'bg-stone-600';
  };

  const formatPrice = (item) => {
    if (item.unit === 'piece') {
      return `₹${item.price}/pc`;
    }
    return `₹${item.price}/kg`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Management</h2>
          <p className="text-amber-100/60">{items.length} products</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            resetForm();
            setShowForm(true);
          }}
          className="bg-fire-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-800 rounded-3xl p-6 w-full max-w-lg my-8 border border-stone-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={resetForm} className="text-amber-100/60 hover:text-white text-2xl">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-amber-100/60 text-sm mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                  required
                />
              </div>

              <div>
                <label className="block text-amber-100/60 text-sm mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-100/60 text-sm mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-amber-100/60 text-sm mb-2">Stock Count</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-100/60 text-sm mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                  >
                    <option value="kg">Per Kg</option>
                    <option value="piece">Per Piece</option>
                  </select>
                </div>
                <div>
                  <label className="block text-amber-100/60 text-sm mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-100/60 text-sm mb-2">Emoji</label>
                  <input
                    type="text"
                    value={formData.emoji}
                    onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                    className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                  />
                </div>
                <div>
                  <label className="block text-amber-100/60 text-sm mb-2">Spice Level (0-3)</label>
                  <input
                    type="number"
                    min="0"
                    max="3"
                    value={formData.spiceLevel}
                    onChange={(e) => setFormData({...formData, spiceLevel: e.target.value})}
                    className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                    className="w-5 h-5 rounded accent-fire-red"
                  />
                  <span className="text-amber-100/60">In Stock</span>
                </label>
              </div>

              <div>
                <label className="block text-amber-100/60 text-sm mb-2">Product Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-fire-red file:text-white file:font-semibold file:cursor-pointer"
                />
                <p className="text-amber-100/40 text-xs mt-1">Max 500KB - paste image URL instead for larger images</p>
              </div>

              <div>
                <label className="block text-amber-100/60 text-sm mb-2">Image URL (optional)</label>
                <input
                  type="url"
                  value={formData.image && !previewImage ? formData.image : ''}
                  onChange={(e) => {
                    if (!previewImage) {
                      setFormData({ ...formData, image: e.target.value });
                    }
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-fire-red"
                />
              </div>

              {previewImage && (
                <div className="relative">
                  <img src={previewImage} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => { setPreviewImage(null); setFormData({...formData, image: ''}); }}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-stone-700 hover:bg-stone-600 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-fire-red hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-all"
                >
                  {editingItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className={`bg-stone-800/50 rounded-2xl p-4 border transition-all ${
            item.inStock ? 'border-stone-700 hover:border-fire-red/50' : 'border-red-500/30 opacity-75'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-16 h-16 bg-stone-700 rounded-xl flex items-center justify-center text-3xl overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  item.emoji
                )}
              </div>
              <button
                onClick={() => toggleStock(item.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  item.inStock 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {item.inStock ? '✓ In Stock' : '✕ Out'}
              </button>
            </div>
            
            <h4 className="font-bold text-white mb-1">{item.name}</h4>
            <p className="text-amber-100/40 text-sm mb-3 line-clamp-1">{item.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs px-2 py-1 rounded-full text-white ${getCategoryBg(item.category)}`}>
                {item.category}
              </span>
              <span className="text-fire-yellow font-bold">{formatPrice(item)}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-stone-700 hover:bg-stone-600 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-4 rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMenu;
