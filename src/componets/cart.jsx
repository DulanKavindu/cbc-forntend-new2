import { useEffect, useState } from "react";
import { loadCart, addToCart, saveCart } from "../utils/cartfuntion";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(loadCart());
    }, []);

   
    function handleQuantity(productId, amount) {
        addToCart(productId, amount);
        setCart(loadCart()); 
    }


    function handleRemove(productId) {
        const updatedCart = cart.filter(item => item.productId !== productId);
        saveCart(updatedCart);
        setCart(updatedCart);
    }
    const newproductid= saveCart().productId;
    
    return (
        <div className="min-h-screen bg-primary p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
            
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-secondary p-4 rounded-2xl">
                        <FaShoppingBag className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-800">Your Shopping Cart</h1>
                        <p className="text-gray-400 font-medium">{cart.length} items</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
       
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.productId} className="bg-white p-5 rounded-[30px] flex items-center gap-6 shadow-sm">
                                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-secondary font-bold">
                                    IMG
                                </div>

                                <div className="flex-grow">
                                    <h2 className="text-lg font-bold">Product #{item.productId}</h2>
                                    <p className="text-accent font-black text-xl">$ 0.00</p>
                                </div>

                                
                                <div className="flex items-center bg-primary rounded-xl p-1 gap-3">
                                    <button onClick={() => handleQuantity(item.productId, -1)} className="w-8 h-8 bg-white rounded-lg">
                                        <FaMinus size={10} />
                                    </button>
                                    <span className="font-black">{item.quantity}</span>
                                    <button onClick={() => handleQuantity(item.productId, 1)} className="w-8 h-8 bg-white rounded-lg">
                                        <FaPlus size={10} />
                                    </button>
                                </div>

                                <button onClick={() => handleRemove(item.productId)} className="p-3 text-gray-300 hover:text-red-500">
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

             
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[40px] shadow-xl sticky top-10">
                            <h3 className="text-xl font-black mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>$ 0.00</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold">
                                    <span>Total Price</span>
                                    <span className="text-2xl text-secondary">$ 0.00</span>
                                </div>
                            </div>
                            <button className="w-full bg-secondary text-white py-5 rounded-2xl font-bold shadow-lg shadow-blue-100">
                                Checkout Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}