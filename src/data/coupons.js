const coupons = [
  {
    code: "MOHAN10",
    type: "percentage",
    value: 10, // 10% OFF
    minPurchase: 500,
  },
  {
    code: "GET100",
    type: "flat",
    value: 100, // ₹100 OFF
    minPurchase: 800,
  },
  {
    code: "FREESHIP",
    type: "free_shipping",
    value: 50, // ₹50 shipping fee removed
    minPurchase: 0,
  }
];

export default coupons;
