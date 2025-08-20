"use client"
import React, { useState, useEffect } from 'react';
import './FeaturedWigs.css';

const FeaturedWigs = () => {
    const [products, setProducts] = useState([]);
    const [selectedImages, setSelectedImages] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);

                // Initialize selectedImages with the first image of each product's variants
                const initialImages = {};
                data.forEach(product => {
                    if (product.variants && product.variants.length > 0) {
                        initialImages[product.id] = product.variants[0].image_url;
                    }
                });
                setSelectedImages(initialImages);

            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    // The handleColorClick function now works with the fetched data
    const handleColorClick = (productId, imageUrl) => {
        setSelectedImages(prevImages => ({
            ...prevImages,
            [productId]: imageUrl
        }));
    };

    return (
        <section className="featured"id="featured">
            <h2 className="section-title">✨ Featured Wigs ✨</h2>
            <p className="section-subtitle">
                Discover our most popular styles loved by our customers.
            </p>
            <div className="wig-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="wig-card">
                            <div className="wig-image-container">
                                <img
                                    src={selectedImages[product.id]}
                                    alt={product.title}
                                    className="wig-img"
                                />
                                {console.log(`Image for ${product.title}: ${selectedImages[product.id]}`)}
                            </div>
                            <h3 className="wig-name">{product.title}</h3>
                            <p className="wig-description">{product.description}</p>
                            
                            {/* <div className="color-options">
                                {product.variants.map((variant, i) => (
                                    <span
                                        key={i}
                                        className="color-dot"
                                        style={{ backgroundColor: variant.color }}
                                        onClick={() => handleColorClick(product.id, variant.image_url)}
                                        title={`Color option`}
                                    ></span>
                                ))}
                            </div> */}
                            
                            <p className="wig-price">${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading featured wigs...</p>
                )}
            </div>
        </section>
    );
};

export default FeaturedWigs;