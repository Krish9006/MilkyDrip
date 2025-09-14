import React, { useEffect, useState } from 'react';
import ProductCard2 from '../Components/ProductCard2';
import '../Pages/Product2.css';

const ProductPage2 = ({URL,Heading}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // The API endpoint has been updated here
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [URL]);

    if (loading) return <div className="loading-messagez">Loading products...</div>;
    if (error) return <div className="error-messagez">Error: {error}</div>;


    return (
        <>
            <h2 className="mt-4 styledFont text-4xl mb-3 ml-2" style={{fontSize:"40px"}}> {Heading} </h2>
            <div className="product-page2z">
                <div className="product-flexz">
                    {products.map(product => (
                        <ProductCard2 key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductPage2;