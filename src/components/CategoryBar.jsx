import { Link } from "react-router-dom";
import {
  FaMobileAlt,
  FaTshirt,
  FaTv,
  FaHome,
  FaBlenderPhone,
  FaCouch,
  FaSpa,
  FaShoppingBasket,
  FaGamepad,
} from "react-icons/fa";

const categories = [
  { name: "Mobiles", slug: "mobiles", icon: <FaMobileAlt className="text-xl" /> },
  { name: "Fashion", slug: "fashion", icon: <FaTshirt className="text-xl" /> },
  { name: "Electronics", slug: "electronics", icon: <FaTv className="text-xl" /> },
  { name: "Home", slug: "home", icon: <FaHome className="text-xl" /> },
  { name: "Appliances", slug: "appliances", icon: <FaBlenderPhone className="text-xl" /> },
  { name: "Furniture", slug: "furniture", icon: <FaCouch className="text-xl" /> },
  { name: "Beauty", slug: "beauty", icon: <FaSpa className="text-xl" /> },
  { name: "Grocery", slug: "grocery", icon: <FaShoppingBasket className="text-xl" /> },
  { name: "Toys", slug: "toys", icon: <FaGamepad className="text-xl" /> },
];

function CategoryBar() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* Mobile Scroll + Desktop Grid */}
        <div className="
          flex md:grid md:grid-cols-9 
          items-center 
          gap-6 md:gap-2 
          overflow-x-auto md:overflow-visible 
          no-scrollbar
        ">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="flex flex-col items-center text-gray-700 dark:text-gray-200 
                         text-xs sm:text-sm font-medium 
                         hover:text-blue-600 dark:hover:text-blue-400
                         min-w-[60px] md:min-w-0"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-1">
                {cat.icon}
              </div>
              {cat.name}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CategoryBar;
