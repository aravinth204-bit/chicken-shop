import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit3, Trash2, Package, Image, Eye, EyeOff, X, Save } from 'lucide-react';
import { defaultProducts } from '../data/menuItems';

function AdminMenu() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerKg: '',
    pricePerDozen: '',
    unit: 'kg',
    category: 'chicken',
    emoji: '🐔',
    available: true
  });

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = () => {
    const savedItems = JSON.parse(localStorage.getItem('poultryProducts') || 'null');
    if (savedItems) {
      setItems(savedItems);
    } else {
      setItems(defaultProducts);
      localStorage.setItem('poultryProducts', JSON.stringify(defaultProducts));
    }
  };

  const saveMenu = (newItems) => {
    setItems(newItems);
    localStorage.setItem('poultryProducts', JSON.stringify(newItems));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      pricePerKg: parseFloat(formData.pricePerKg) || 0,
      pricePerDozen: parseFloat(formData.pricePerDozen) || 0,
      image: previewImage || ''
    };

    if (editingItem) {
      const updatedItems = items.map(item => 
        item.id === editingItem.id ? { ...item, ...itemData } : item
      );
      saveMenu(updatedItems);
      setEditingItem(null);
    } else {
      const newItem = {
        id: Date.now(),
        ...itemData
      };
      saveMenu([...items, newItem]);
    }
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setPreviewImage(null);
    setFormData({
      name: '',
      description: '',
      pricePerKg: '',
      pricePerDozen: '',
      unit: 'kg',
      category: 'chicken',
      emoji: '🐔',
      available: true,
      image: ''
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
      pricePerKg: item.pricePerKg?.toString() || '',
      pricePerDozen: item.pricePerDozen?.toString() || '',
      unit: item.unit || 'kg',
      category: item.category,
      emoji: item.emoji || '🐔',
      available: item.available ?? true,
      image: item.image || ''
    });
    setPreviewImage(item.image || null);
    setShowForm(true);
  };

  const handleDelete = (itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      saveMenu(items.filter(item => item.id !== itemId));
    }
  };

  const toggleAvailability = (itemId) => {
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    );
    saveMenu(updatedItems);
  };

  const categories = [
    { id: 'chicken', label: '🐔 Chicken', color: 'text-amber-500' },
    { id: 'goat', label: '🐐 Mutton', color: 'text-red-500' },
    { id: 'duck', label: '🦆 Duck', color: 'text-blue-500' },
    { id: 'eggs', label: '🥚 Eggs', color: 'text-yellow-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Management</h2>
          <p className="text-slate-400">{items.length} products</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            resetForm();
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-3xl p-6 w-full max-w-lg my-8 border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={resetForm} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-slate-400 text-sm mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Price per Kg</label>
                  <input
                    type="number"
                    value={formData.pricePerKg}
                    onChange={(e) => setFormData({...formData, pricePerKg: e.target.value})}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Price per Dozen</label>
                  <input
                    type="number"
                    value={formData.pricePerDozen}
                    onChange={(e) => setFormData({...formData, pricePerDozen: e.target.value})}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
                  >
                    <option value="kg">Per Kg</option>
                    <option value="piece">Per Piece</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-slate-400 text-sm mb-2">Emoji</label>
                <input
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-400 text-sm mb-2">Product Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:font-semibold file:cursor-pointer"
                />
                <p className="text-slate-500 text-xs mt-1">Max 500KB</p>
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
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 hover:border-red-500/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center text-3xl">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  item.emoji
                )}
              </div>
              <button
                onClick={() => toggleAvailability(item.id)}
                className={`p-2 rounded-lg ${item.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
              >
                {item.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            
            <h4 className="font-bold text-white mb-1">{item.name}</h4>
            <p className="text-slate-400 text-sm mb-3 line-clamp-1">{item.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm ${categories.find(c => c.id === item.category)?.color}`}>
                {categories.find(c => c.id === item.category)?.label}
              </span>
              <span className="text-red-400 font-bold">₹{item.pricePerKg}/kg</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-4 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMenu;
