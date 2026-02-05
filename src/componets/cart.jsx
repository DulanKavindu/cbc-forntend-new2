import {  useEffect, useState } from "react";
import { loadCart } from "../utils/cartfuntion";
import CartCard from "./CartCard";
import { FaShoppingBag, FaArrowRight, FaCreditCard } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [labalePrice, setLabalePrice] = useState(0);
   
    const navigation = useNavigate();

    useEffect(() => {
        const cartData = loadCart();
        setCart(cartData);

        if (cartData.length > 0) {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/order/getquoter`, {
                orderDetails: cartData
            }).then((res) => {
                console.log(res.data);
                setTotal(res.data.totalPrice);
                setLabalePrice(res.data.labaleTotal);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, []);
    function navigate(){
        navigation('/contactDetails',{state:{
            item:loadCart(),
        }
              
        });
    }

    

    return (
        <div className="min-h-screen bg-[#FAFBFF] p-6 md:p-12 text-left font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black text-gray-900 mb-10 flex items-center gap-4">
                    Shopping Bag <FaShoppingBag className="opacity-20 text-secondary" />
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {cart.length > 0 ? (
                            cart.map(item => (
                                <CartCard 
                                    key={item.productId} 
                                    productId={item.productId} 
                                    quantity={item.quantity} 
                                />
                            ))
                        ) : (
                            <p className="text-center p-20 bg-white rounded-[40px] font-bold text-gray-400 border-2 border-dashed">
                                Your bag is empty!
                            </p>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-10 rounded-[45px] shadow-xl border border-gray-50 sticky top-12 transition-all">
                            <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                                <FaCreditCard className="text-secondary" /> Summary
                            </h2>
                            <div className="space-y-6">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-black tracking-widest text-sm uppercase">Free</span>
                                </div>
                                <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                                    <span className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Labale Total</span>
                                    <span className="text-4xl font-black text-secondary">
                                        ${labalePrice ? labalePrice.toFixed(2) : "0.00"}
                                    </span>
                                </div>
                                
                                <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                                    <span className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Total Bill</span>
                                    <span className="text-4xl font-black text-secondary">
                                        ${total ? total.toFixed(2) : "0.00"}
                                    </span>
                                </div>
                                   <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                                    <span className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Discout Price</span>
                                    <span className="text-4xl font-black text-secondary">
                                        ${total ? (total - labalePrice).toFixed(2) : "0.00"}
                                    </span>
                                </div>

                                <button 
                                onClick={navigate}
                                   
                                    className="group w-full bg-secondary text-white py-6 rounded-[25px] font-black text-xl mt-4 flex items-center justify-center gap-4 transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-100"
                                >
                                    Checkout Now <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}