import React, { useState, useRef } from 'react'; // 🔹 added useRef for timeout cleanup
import "../Pages/Product.css"; 

// Utility function to get a random artist name from a predefined list.
const getRandomArtistName = () => {
    const artists = ['DrMonekers', 'AlemaArt', 'NemiMakeit', 'palmstreet', 'turborat14'];
    return artists[Math.floor(Math.random() * artists.length)];
};


const getRandomRating = () => {
    return (Math.random() * 5).toFixed(1); 
};

const getRandomPersonCount = () => {
    return Math.floor(Math.random() * 1000) + 100;
};

const ProductCard = ({ product }) => {


    const [isWishlisted, setIsWishlisted] = useState(false);
    

    const [showCartMessage, setShowCartMessage] = useState(false);


    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showCartMessage, setShowCartMessage] = useState(false);

    // 🔹 store random values in state so they don’t change on every re-render
    const [artistName] = useState(getRandomArtistName);
    const [rating] = useState(getRandomRating);
    const [personCount] = useState(getRandomPersonCount);

    // 🔹 ref to manage timeout cleanup for cart message
    const timeoutRef = useRef(null);


    const handleWishlistClick = () => {
        setIsWishlisted(!isWishlisted);
    };

    const handleAddToCart = () => {
        setShowCartMessage(true);

        // 🔹 clear previous timeout if button clicked again
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setShowCartMessage(false);
        }, 2000);
    };


    return (
        <div className="product-card1">
            <div className="image-container">
                <img src={product.image} alt={product.title} className="product-image1" />
                {/* 🔹 use stored artistName instead of generating again */}
                <span className="random-artist-name">{artistName}</span>
            </div>
            
            <div className="card-details">
                <div className="actions">
                    <button onClick={handleWishlistClick} className="action-btn">
                        <span className={`heart-symbol ${isWishlisted ? 'wishlisted' : ''}`}>&#x2764;</span>
                    </button>
                    <button onClick={handleAddToCart} className="action-btn">
                        <span className="plus-symbol">&#x2b;</span>
                    </button>
                </div>
                
                {/* 🔹 use the same artistName for consistency */}
                <h3 className="artist-name">{artistName}</h3>
                
                <h2 className="product-title">{product.title}</h2>
                
                <div className="product-info">
                    <div className="rating">
                        <span>{product.rating}</span>
                        <span className="star-symbol">&#9733;</span>
                        <span>({personCount})</span>
                    </div>
                    <div className="price-in-dollar">${product.price}</div>
                </div>
            </div>
            
            {showCartMessage && (
                <div className="cart-message">
                    Item added to cart
                </div>
            )}
        </div>
    );
};

export default ProductCard;
