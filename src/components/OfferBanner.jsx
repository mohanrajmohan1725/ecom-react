import { FaTags, FaMoneyBillWave, FaGift, FaCreditCard } from "react-icons/fa";

const offers = [
  {
    icon: <FaTags className="text-blue-600 text-2xl" />,
    title: "Extra 10% OFF",
    desc: "Use code MOHAN10 on orders above ₹500",
  },
  {
    icon: <FaMoneyBillWave className="text-green-600 text-2xl" />,
    title: "Flat ₹100 OFF",
    desc: "Apply GET100 on ₹800+ orders",
  },
  {
    icon: <FaCreditCard className="text-purple-600 text-2xl" />,
    title: "Bank Offer",
    desc: "5% Cashback with HDFC Credit Cards",
  },
  {
    icon: <FaGift className="text-pink-600 text-2xl" />,
    title: "Free Shipping",
    desc: "Use code FREESHIP at checkout",
  },
];

function OfferBanner() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-lg p-4 my-4">
      <h2 className="text-xl font-semibold mb-3">🔥 Special Offers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {offers.map((offer, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border dark:border-gray-600 hover:shadow-md transition"
          >
            {offer.icon}
            <div>
              <p className="font-bold">{offer.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {offer.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferBanner;
