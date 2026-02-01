import { useEffect, useState } from "react";
import { loardCart } from "../utils/cartfuntion";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";

export default function Cart() {
    const [cart,setCart] = useState([]);

    useEffect(() => {
        const data= loardCart();
        setCart(data);
    }, []);

    return (
        <div className="min-h-screen bg-primary p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-secondary p-4 rounded-2xl shadow-lg shadow-blue-100">
                        <FaShoppingBag className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-800">Your Shopping Cart</h1>
                        <p className="text-gray-400 font-medium">{cart.length} items in your bag</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               
                    <div className="lg:col-span-2 space-y-4">
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <div key={item.productId} className="bg-white p-5 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-all group">
                                    
                                 
                                    <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-secondary font-bold text-xs uppercase tracking-tighter">
                                        IMG
                                    </div>

                               
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-bold text-gray-800">Product #{item.productId}</h2>
                                        <p className="text-accent font-black text-xl mt-1">$ 0.00</p> {/* Price එක DB එකෙන් ගන්න ඕනේ */}
                                    </div>

                                  
                                    <div className="flex items-center bg-primary rounded-xl p-1 gap-3">
                                        <button className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-secondary transition-colors">
                                            <FaMinus size={12} />
                                        </button>
                                        <span className="font-black text-gray-700 min-w-[20px] text-center">{item.quantity}</span>
                                        <button className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-secondary transition-colors">
                                            <FaPlus size={12} />
                                        </button>
                                    </div>

                                    
                                    <button className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-20 rounded-[40px] text-center border-2 border-dotted border-gray-200">
                                <p className="text-gray-400 font-bold">Your cart is empty!</p>
                            </div>
                        )}
                    </div>

                    {/* 💰 Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-50 sticky top-10">
                            <h3 className="text-xl font-black text-gray-800 mb-6">Order Summary</h3>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span>$ 0.00</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-bold">FREE</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                                    <span className="font-bold text-gray-800">Total Price</span>
                                    <span className="text-3xl font-black text-secondary">$ 0.00</span>
                                </div>
                            </div>

                            <button className="w-full bg-secondary text-white py-5 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                                Checkout Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}