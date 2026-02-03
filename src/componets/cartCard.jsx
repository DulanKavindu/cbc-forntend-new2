import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export default function CartCard({ productId, quantity, handleQuantity, handleRemove }) {
    const [product, setProduct] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${productId}`)
            .then((res) => {
                if (res.data) {
                    setProduct(res.data);
                    setLoaded(true);
                }
            })
            .catch((err) => console.error(err));
    }, [productId]);

    if (!loaded) return <div className="h-32 w-full bg-gray-100 animate-pulse rounded-[35px]"></div>;

    return (
        <div className="group bg-white p-5 rounded-[35px] shadow-sm border border-gray-50 flex items-center gap-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
            <div className="w-24 h-24 bg-[#F8F9FB] rounded-[25px] overflow-hidden flex-shrink-0">
                <img src={product?.image?.[0]} alt="" className="w-full h-full object-contain p-3" />
            </div>

            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800">{product?.productname}</h3>
                <span className="text-secondary font-black text-xl">${product?.price}</span>
            </div>

            <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
                <button onClick={() => handleQuantity(productId, -1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-red-500 transition-all">
                    <FaMinus size={12} />
                </button>
                <span className="px-5 font-black text-gray-800">{quantity}</span>
                <button onClick={() => handleQuantity(productId, 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-green-500 transition-all">
                    <FaPlus size={12} />
                </button>
            </div>

            <button onClick={() => handleRemove(productId)} className="p-4 text-gray-300 hover:text-red-500 transition-all">
                <FaTrash size={18} />
            </button>
        </div>
    );
}