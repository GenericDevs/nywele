// the existing code for /app/admin/page.jsx code is:

'use client';
import './admin.css';
import Link from "next/link";

import React, { useState, useEffect,useRef } from 'react';
import { useRouter } from "next/navigation";
import { logout } from '../lib/auth';


const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const API_URL = '/api/products'; // fixed relative URL for Next.js App Router

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    colors: '',
    images: [],
  });
  const [editingProduct, setEditingProduct] = useState(null);
  
  const router = useRouter();
  const logoutTimer = useRef(null);

  const resetTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    logoutTimer.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT_MS);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };



  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);

    // Colors (comma-separated → JSON array)
    if (form.colors) {
      const colorArray = form.colors
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
      formData.append('colors', JSON.stringify(colorArray));
    }

    // Images
    if (form.images && form.images.length > 0) {
      form.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const url = editingProduct ? `${API_URL}/${editingProduct.id}` : API_URL;
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        alert(`Product ${editingProduct ? 'updated' : 'added'} successfully!`);
        setForm({ title: '', description: '', price: '', colors: '', images: [] });
        setEditingProduct(null);
        fetchProducts();
      } else {
        const err = await response.json();
        alert(`Failed to ${editingProduct ? 'update' : 'add'} product: ${err.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      colors: product.variants.map((v) => v.color).join(','), // preload colors
      images: [],
    });
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (response.status === 204) {
          alert('Product deleted successfully!');
          fetchProducts();
        } else {
          alert('Failed to delete product.');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };



 useEffect(() => {
    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    resetTimer();

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);


  return (
    <div className="admin-dashboard">
        <div className="dashboard-header">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <Link href="/" className="back-link">← Back to Site</Link>

      <form action={handleLogout}>
        <button type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >Logout</button>
      </form>
      
    </div>

      <form onSubmit={handleSubmit} className="product-form">

        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
        <input type="text" name="title" placeholder="Product Title" value={form.title} onChange={handleFormChange} required/>
        <textarea name="description" placeholder="Product Description" value={form.description} onChange={handleFormChange} required/>
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleFormChange} step="0.01" required />
        <input  name="colors"  placeholder="Colors (e.g., #000000,#8B4513)"   value={form.colors}   onChange={handleFormChange}  required={!editingProduct}  />
        <input  type="file"  name="images"  onChange={handleFormChange}  multiple   required={!editingProduct} />

        <button type="submit">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
        {editingProduct && (
          <button type="button" onClick={() => setEditingProduct(null)}>
            Cancel
          </button>
        )}
      </form>

      <div className="product-list">
        <h3>Current Products</h3>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-details">
                <img
                  src={product.variants[0]?.image_url}
                  alt={product.title}
                />
                <h4>{product.title}</h4>
                <p>${product.price}</p>
              </div>
              <div className="product-actions">
                <button onClick={() => handleEditClick(product)}>Edit</button>
                <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

