import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-pink-600">
              VougeView
            </Link>
          </div>

          <div className="hidden sm:flex sm:space-x-8">
            <Link
              href="/"
              className="text-gray-900 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-900 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="/reviews"
              className="text-gray-900 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Reviews
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-900 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/add-review"
              className="bg-pink-600 text-white hover:bg-pink-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Add Review
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
