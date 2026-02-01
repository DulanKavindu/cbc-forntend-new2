import { Link } from "react-router-dom"
import { FaShoppingCart, FaStar } from "react-icons/fa"

export default function ProductCard(props) {
    const { product } = props;

    return (
        <div className="group bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row gap-6 items-center relative overflow-hidden w-full max-w-4xl mx-auto">
            
            {/* 🖼️ Image Section - වම් පැත්තේ පින්තූරය */}
            <Link 
                to={`/productImfro/${product?.productid}`} 
                className="w-full md:w-64 h-56 rounded-3xl bg-primary flex items-center justify-center overflow-hidden relative flex-shrink-0"
            >
                <img 
                    src={product?.image?.[0]} 
                    alt={product?.productname} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                />
                
                {/* Accent Color Badge */}
                <span className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-orange-100">
                    Popular
                </span>
            </Link>

            {/* 📝 Content Section - මැද විස්තර ටික */}
            <div className="flex-grow flex flex-col justify-between h-full w-full py-2">
                <Link to={`/productImfro/${product?.productid}`} className="space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                        <FaStar size={12} />
                        <span className="text-xs font-bold uppercase tracking-widest">Premium Quality</span>
                    </div>
                    
                    <h2 className="text-2xl font-black text-gray-800 group-hover:text-secondary transition-colors duration-300">
                        {product?.productname}
                    </h2>
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 max-w-md">
                        {product?.description || "High-quality product designed for the best user experience and durability."}
                    </p>

                    <span className="inline-block text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                        Product ID: {product?.productid}
                    </span>
                </Link>

                {/* 💰 Price & Action - දකුණු පැත්ත */}
                <div className="flex items-center justify-between mt-6 md:mt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
                        <p className="text-3xl font-black text-secondary">
                            ${product?.price}
                        </p>
                    </div>

                  
                </div>
            </div>

            {/* Subtle Design Element - පසුබිමේ පොඩි effect එකක් */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary rounded-full opacity-50 group-hover:bg-blue-50 transition-colors duration-500 -z-10"></div>
        </div>
    )
}