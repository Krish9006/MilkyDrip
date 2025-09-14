import React, { useState, useRef } from 'react'; // 🔹 added useRef for timeout cleanup
import "../Pages/Product2.css"; 

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

const ProductCard2 = ({ product }) => {
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
        <div className="product-card2z">
            <div className="image-containerz">
                <img src={product.image} alt={product.title} className="product-image2z" />
                {/* 🔹 use stored artistName instead of generating again */}
                <span className="random-artist-namez">{artistName}</span>
            </div>
            
            <div className="card-detailsz">
                <div className="actionsz">
                    <button onClick={handleWishlistClick} className="action-btnz">
                        <span className={`heart-symbolz ${isWishlisted ? 'wishlistedz' : ''}`}>&#x2764;</span>
                    </button>
                    <button onClick={handleAddToCart} className="action-btnz">
                        <span className="plus-symbolz">&#x2b;</span>
                    </button>
                </div>
                
                {/* 🔹 use the same artistName for consistency */}
                <h3 className="artist-namez">{artistName}</h3>
                
                <h2 className="product-titlez">{product.title}</h2>
                
                <div className="product-infoz">
                    <div className="ratingz">
                        <span>{product.rating}</span>
                        <span className="star-symbolz">&#9733;</span>
                        <span>({personCount})</span>
                    </div>
                    <div className="price-in-dollarz">${product.price}</div>
                </div>
            </div>
            
            {showCartMessage && (
                <div className="cart-messagez">
                    Item added to cart
                </div>
            )}
        </div>
    );
};

export default ProductCard2;
