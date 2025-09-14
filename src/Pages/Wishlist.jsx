import React, { useEffect, useState } from 'react';
import "../Pages/Product.css"; // optional, for styling

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Get wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(wishlist);
  }, []);

  const handleRemove = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (wishlistItems.length === 0) {
    return <div className="text-center mt-10 text-xl">Your wishlist is empty.</div>;
  }

  return (
    <div className="wishlist-container mt-10 flex flex-wrap justify-center gap-6">
      {wishlistItems.map((item) => (
        <div key={item.id} className="product-card1 w-64">
          <div className="image-container">
            <img src={item.image} alt={item.title} className="product-image1" />
            <span className="random-artist-name">{item.artistName}</span>
          </div>

          <div className="card-details">
            <h3 className="artist-name">{item.artistName}</h3>
            <h2 className="product-title">{item.title}</h2>
            <div className="product-info flex justify-between items-center mt-2">
              <div className="rating">
                <span>{item.rating}</span>
                <span className="star-symbol">&#9733;</span>
                <span>({item.personCount})</span>
              </div>
              <div className="price-in-dollar">${item.price}</div>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
