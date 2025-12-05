function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">

        <h2 className="text-lg font-semibold">E-Shop</h2>

        <p className="text-gray-400 mt-1">
          © {new Date().getFullYear()} E-Shop. All rights reserved.
        </p>

        <p className="text-gray-500 text-sm mt-2">
          Built with React + Tailwind CSS
        </p>

      </div>
    </footer>
  );
}

export default Footer;
