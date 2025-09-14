import React, { useState } from 'react'; 
import "../Pages/Product.css"; 
import PopUpComponent from './PopUpComponent';

const getRandomArtistName = () => {
    const artists = ['DrMonekers', 'AlemaArt', 'NemiMakeit', 'palmstreet', 'turborat14'];
    return artists[Math.floor(Math.random() * artists.length)];
};

const getRandomRating = () => (Math.random() * 5).toFixed(1);
const getRandomPersonCount = () => Math.floor(Math.random() * 1000) + 100;

const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [popupMsg, setPopupMsg] = useState(""); // msg for PopUpComponent
    const [artistName] = useState(getRandomArtistName);
    const [rating] = useState(getRandomRating);
    const [personCount] = useState(getRandomPersonCount);

    const handleWishlistClick = () => {
        setIsWishlisted(!isWishlisted);

        // Set popup message
        setPopupMsg(!isWishlisted ? "Added to wishlist" : "Removed from wishlist");

        // Add to localStorage (wishlist array)
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (!isWishlisted) {
            // Add new item
            wishlist.push({ 
                ...product, 
                artistName, 
                rating, 
                personCount,
                quantity: 1
            });
        } else {
            // Remove item from wishlist if user unchecks heart
            const index = wishlist.findIndex(item => item.id === product.id);
            if (index !== -1) wishlist.splice(index, 1);
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    };

    const handleAddToCart = () => {
        // Set popup message
        setPopupMsg("Item added to cart");

        // Add to cart in localStorage (allow duplicates)
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ 
            ...product, 
            artistName, 
            rating, 
            personCount,
            quantity: 1 
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    return (
        <div className="product-card1">
            <div className="image-container">
                <img src={product.image} alt={product.title} className="product-image1" />
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
                
                <h3 className="artist-name">{artistName}</h3>
                <h2 className="product-title">{product.title}</h2>
                
                <div className="product-info">
                    <div className="rating">
                        <span>{rating}</span>
                        <span className="star-symbol">&#9733;</span>
                        <span>({personCount})</span>
                    </div>
                    <div className="price-in-dollar">${product.price}</div>
                </div>
            </div>

            {/* PopUpComponent with msg prop */}
            <PopUpComponent msg={popupMsg} />
        </div>
    );
};

export default ProductCard;
