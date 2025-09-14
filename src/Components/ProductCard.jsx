import React, { useState } from 'react';
import "../Pages/Product.css"; 

// Utility function to get a random artist name from a predefined list.
// This is used to display a random artist for the card's branding.
const getRandomArtistName = () => {
    const artists = ['Ariana Grande', 'The Weeknd', 'Taylor Swift', 'Dua Lipa', 'Puma'];
    // Math.random() generates a number between 0 and 1.
    // We multiply it by the number of artists and use Math.floor() to get a random index.
    return artists[Math.floor(Math.random() * artists.length)];
};


const getRandomRating = () => {
    return (Math.random() * 5).toFixed(1); 
};

const getRandomPersonCount = () => {
    return Math.floor(Math.random() * 1000) + 100;
};

// ProductCard is a functional component that receives 'product' data as a prop.
const ProductCard = ({ product }) => {

    const [isWishlisted, setIsWishlisted] = useState(false);
    

    const [showCartMessage, setShowCartMessage] = useState(false);


    const handleWishlistClick = () => {
        setIsWishlisted(!isWishlisted);
    };

    // This function is called when the add-to-cart button is clicked.
    const handleAddToCart = () => {
        // First, it sets the showCartMessage state to true to make the message visible.
        setShowCartMessage(true);
        
        // Then, it uses setTimeout to hide the message after 2000 milliseconds (2 seconds).
        setTimeout(() => {
            setShowCartMessage(false);
        }, 2000);
    };

    // The component's return statement contains the JSX (HTML-like structure) for the card.
    return (
        <div className="product-card">
            {/* Image container with hover effect and a random artist name tag */}
            <div className="image-container">
                <img src={product.image} alt={product.title} className="product-image" />
                <span className="random-artist-name">{getRandomArtistName()}</span>
            </div>
            
            {/* Container for the product details and actions */}
            <div className="card-details">
                <div className="actions">
                    {/* Wishlist button that changes the heart icon's color on click */}
                    <button onClick={handleWishlistClick} className="action-btn">
                        <span className={`heart-symbol ${isWishlisted ? 'wishlisted' : ''}`}>&#x2764;</span>
                    </button>
                    {/* Add to cart button that triggers the success message */}
                    <button onClick={handleAddToCart} className="action-btn">
                        <span className="plus-symbol">&#x2b;</span>
                    </button>
                </div>
                
                {/* The main artist name, which is randomly generated for each card */}
                <h3 className="artist-name">{getRandomArtistName()}</h3>
                
                {/* The product title, taken directly from the API data */}
                <h2 className="product-title">{product.title}</h2>
                
                {/* Container for rating and price information */}
                <div className="product-info">
                    <div className="rating">
                        {/* Random rating score and star symbol */}
                        <span>{getRandomRating()}</span>
                        <span className="star-symbol">&#9733;</span>
                        {/* Random number of ratings */}
                        <span>({getRandomPersonCount()})</span>
                    </div>
                    {/* The price, taken directly from the API data */}
                    <div className="price-in-dollar">${product.price}</div>
                </div>
            </div>
            
            {/* The cart message, which is conditionally rendered based on the showCartMessage state */}
            {showCartMessage && (
                <div className="cart-message">
                    Item added to cart
                </div>
            )}
        </div>
    );
};

export default ProductCard;