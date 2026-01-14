import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Navigation Bar --- */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center px-10">
        <h1 className="text-2xl font-bold text-blue-600">CBC Store</h1>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium">Products</Link>
          <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Login</Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">CBC Store</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Discover the best products at unbeatable prices. Fast delivery and top-notch quality 
          just for you. Start your shopping journey today!
        </p>
        
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition">
            Shop Now
          </button>
          <Link 
            to="/login" 
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* --- Features Section (Optional) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 mt-20">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl mb-3">🚚</div>
          <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
          <p className="text-gray-500 text-sm">Get your orders delivered within 24 hours.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="font-bold text-xl mb-2">Secure Payment</h3>
          <p className="text-gray-500 text-sm">100% secure payment methods for your safety.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-3xl mb-3">⭐</div>
          <h3 className="font-bold text-xl mb-2">Top Quality</h3>
          <p className="text-gray-500 text-sm">We provide only the best and original products.</p>
        </div>
      </div>
    </div>
  )
}