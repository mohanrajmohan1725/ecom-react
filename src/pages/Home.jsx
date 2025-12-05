import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen">

      {/* Banner */}
      <div className="bg-blue-600 text-white p-10 rounded-xl mb-8 text-center dark:bg-blue-500">
        <h1 className="text-4xl font-bold text-white">Welcome to Mohan-Shop</h1>
        <p className="text-lg mt-2">Best deals on electronics, fashion & more.</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
    
  );
  
}

export default Home;
