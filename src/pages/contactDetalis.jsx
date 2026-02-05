import { useEffect, useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { loadCart } from "../utils/cartfuntion";

export default function ContactDetails() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [cart,setCart] = useState([]);

    useEffect(()=>{
    const data =loadCart();
    setCart(data);},[])
     
    console.log("Order placed:", { phoneNumber, address });
  
    function onOderCheckout() {
        if (!phoneNumber || !address) {
            alert("Please fill in your details!");
            return;
        }
        const token = localStorage.getItem("token");
        if (token === null) {
            alert("Please login to proceed to checkout.");
            return;
        }

        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/order`, 
            {
                orderDetails: cart,
                address: address,
                phone: phoneNumber
            }, 
            {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }
        ).then((res) => {
            console.log(res.data);
            alert("Order placed successfully!");
        }).catch((err) => {
            console.error(err);
            alert("Order failed!");
        });
    }

    return (
        <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center p-6 font-sans text-left">
            <div className="max-w-md w-full bg-white p-10 rounded-[45px] shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-gray-50">
                
                <div className="text-center mb-10">
                    <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaShoppingCart className="text-secondary text-2xl" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900">Checkout</h2>
                    <p className="text-gray-400 font-medium mt-2">Enter your delivery details below</p>
                </div>

                <div className="space-y-8">
                  
                    <div>
                        <label className="block text-gray-400 text-xs uppercase tracking-widest font-black mb-3 ml-1">
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-300">
                                <FaPhoneAlt size={14} />
                            </span>
                            <input 
                                type="number" 
                                placeholder="07x xxx xxxx" 
                                className="w-full pl-12 pr-4 py-5 bg-gray-50 border-none rounded-[25px] text-gray-700 font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs uppercase tracking-widest font-black mb-3 ml-1">
                            Delivery Address
                        </label>
                        <div className="relative">
                            <span className="absolute top-6 left-0 flex items-start pl-4 text-gray-300">
                                <FaMapMarkerAlt size={14} />
                            </span>
                            <textarea 
                                placeholder="Enter your full address" 
                                rows="3"
                                className="w-full pl-12 pr-4 py-5 bg-gray-50 border-none rounded-[25px] text-gray-700 font-bold focus:ring-2 focus:ring-secondary/20 transition-all outline-none resize-none"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    {(phoneNumber || address) && (
                        <div className="bg-blue-50/50 p-6 rounded-[30px] border border-blue-100/50">
                            <p className="text-gray-500 text-sm font-bold flex gap-2">
                                <span className="text-secondary opacity-50">To:</span> {address || "..."}
                            </p>
                            <p className="text-gray-500 text-sm font-bold mt-1 flex gap-2">
                                <span className="text-secondary opacity-50">Tel:</span> {phoneNumber || "..."}
                            </p>
                        </div>
                    )}

                  
                    <button 
                        onClick={onOderCheckout}
                        className="w-full bg-secondary text-white py-6 rounded-[25px] font-black text-xl flex items-center justify-center gap-4 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 active:scale-95 mt-4"
                    >
                        BUY NOW
                    </button>
                </div>
            </div>
        </div>
    );
}