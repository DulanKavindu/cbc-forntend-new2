import { FaAward, FaTruck, FaHeadset } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white p-10 md:p-20 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Our Story</h1>
          <p className="text-slate-400 font-bold text-lg max-w-2xl mx-auto">
            We are dedicated to providing the highest quality products with a seamless shopping experience for our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-slate-50 p-10 rounded-[40px] text-center transition-transform hover:scale-105">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaAward size={30} />
            </div>
            <h3 className="font-black text-xl text-slate-800 mb-3">Premium Quality</h3>
            <p className="text-slate-500 text-sm font-medium">Only the best products sourced from trusted global partners.</p>
          </div>

          <div className="bg-slate-50 p-10 rounded-[40px] text-center transition-transform hover:scale-105 border-2 border-blue-100">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
              <FaTruck size={30} />
            </div>
            <h3 className="font-black text-xl text-slate-800 mb-3">Fast Delivery</h3>
            <p className="text-slate-500 text-sm font-medium">Safe and reliable shipping to your doorstep within 48 hours.</p>
          </div>

          <div className="bg-slate-50 p-10 rounded-[40px] text-center transition-transform hover:scale-105">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaHeadset size={30} />
            </div>
            <h3 className="font-black text-xl text-slate-800 mb-3">24/7 Support</h3>
            <p className="text-slate-500 text-sm font-medium">Our support team is always ready to help you with your needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}