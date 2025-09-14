import React, { useState, useEffect } from 'react';
import "../Pages/Product.css"; 
import PopUpComponent from '../Components/PopUpComponent';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [popupMsg, setPopupMsg] = useState("");

  // Load cart items from localStorage on mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Update cart in state and localStorage
  const updateCartStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase/decrease quantity
  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    updateCartStorage(updatedCart);
  };

  // Remove a single item
  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCartStorage(updatedCart);
    setPopupMsg("Item removed from cart");
  };

  // Delete all items
  const handleDeleteAll = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setPopupMsg("All items deleted from cart");
  };

  // Pay Now button
  const handlePayNow = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setPopupMsg("Order will be delivered from 3 days now");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="text-center mt-10 text-xl">Your cart is empty.</div>;
  }

  return (
    <div className="cart-container mt-10 flex flex-col items-center gap-6">

      {/* Cart Items Grid */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {cartItems.map((item, index) => (
          <div key={index} className="product-card1 w-80 flex flex-col">
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
                <div className="price-in-dollar">${item.price * item.quantity}</div>
              </div>

              <div className="quantity-controls flex justify-between mt-2">
                <button
                  onClick={() => handleQuantityChange(index, -1)}
                  className="bg-gray-200 px-3 rounded"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, 1)}
                  className="bg-gray-200 px-3 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(index)}
                className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Buttons */}
      <div className="w-full flex flex-col items-center gap-4 mt-6">
        <div className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</div>

        <div className="flex gap-4">
          <button
            onClick={handlePayNow}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Pay Now
          </button>
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete All
          </button>
        </div>
      </div>

      {/* Popup Message */}
      <PopUpComponent msg={popupMsg} />
    </div>
  );
}

export default Cart;
