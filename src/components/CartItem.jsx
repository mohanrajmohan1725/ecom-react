import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white">
      
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.title}
        className="h-20 w-20 object-contain"
      />

      {/* Title */}
      <div className="w-1/3">
        <p className="font-semibold text-gray-800">{item.title}</p>
        <p className="text-blue-600 font-bold">₹{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => decreaseQty(item.id)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          -
        </button>

        <span className="font-semibold">{item.qty}</span>

        <button
          onClick={() => increaseQty(item.id)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <p className="text-lg font-bold">
        ₹{(item.price * item.qty).toFixed(2)}
      </p>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Remove
      </button>
      
    </div>
  );
}

export default CartItem;
