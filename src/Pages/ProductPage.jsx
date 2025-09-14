import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import '../Pages/Product.css';

const artists = ['DrMonekers', 'AlemaArt', 'NemiMakeit', 'palmstreet', 'turborat14'];

const ProductPage = ({ URL, Heading }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 filters
    const [filters, setFilters] = useState({
        price: "",
        rating: "",
        artist: "",
    });

    // 🔹 pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // show 15 cards per page

    useEffect(() => {
        const fetchProducts = async () => {
            try {
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

    if (loading) return <div className="loading-message">Loading products...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    // 🔹 filter handler
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1); // reset to page 1 when filter changes
    };

    // 🔹 reset filters
    const resetFilters = () => {
        setFilters({ price: "", rating: "", artist: "" });
        setCurrentPage(1); // reset to first page
    };

    // 🔹 filtering logic
    const filteredProducts = products.filter((product) => {
        let pass = true;

        if (filters.price) {
            const [min, max] = filters.price.split("-").map(Number);
            if (product.price < min || product.price > max) pass = false;
        }

        if (filters.rating) {
            if (product.rating < Number(filters.rating)) pass = false;
        }

        if (filters.artist && product.artist !== filters.artist) {
            pass = false;
        }

        return pass;
    });

    // 🔹 pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // 🔹 handle pagination
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <>
            {/* 🔹 Page Heading */}
            <h2
                className="mt-4 styledFont text-4xl mb-3 text-center"
                style={{ fontSize: "40px" }}
            >
                {Heading}
            </h2>

            {/* 🔹 Filter Section */}
            <div className="filter-section text-center mb-6">
                <select
                    name="price"
                    value={filters.price}
                    onChange={handleFilterChange}
                    className="filter-dropdown"
                >
                    <option value="">Filter by Price</option>
                    <option value="20-40">$20 - $40</option>
                    <option value="40-60">$40 - $60</option>
                </select>

                <select
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    className="filter-dropdown"
                >
                    <option value="">Filter by Rating</option>
                    <option value="4.5">Above 4.5</option>
                    <option value="4.0">Above 4.0</option>
                    <option value="3.5">Above 3.5</option>
                    <option value="3.0">Above 3.0</option>
                </select>

                <select
                    name="artist"
                    value={filters.artist}
                    onChange={handleFilterChange}
                    className="filter-dropdown"
                >
                    <option value="">Filter by Artist</option>
                    {artists.map((artist) => (
                        <option key={artist} value={artist}>
                            {artist}
                        </option>
                    ))}
                </select>

                <button onClick={resetFilters} className="reset-btn ml-2">
                    Reset
                </button>
            </div>

            {/* 🔹 Product Grid */}
            <div className="product-page1">
                <div className="product-grid">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* 🔹 Pagination Controls */}
            {filteredProducts.length > itemsPerPage && (
                <div className="pagination text-center mt-6">
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="page-btn"
                    >
                        Prev
                    </button>
                    <span className="mx-3">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="page-btn"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default ProductPage;
