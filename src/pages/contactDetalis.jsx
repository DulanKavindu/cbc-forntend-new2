import { FaPhoneAlt, FaMapMarkerAlt, FaShoppingCart, FaReceipt, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function ContactDetails() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const location = useLocation();
    const nav = useNavigate();
    const [total, setTotal] = useState(0);
    const [labalePrice, setLabalePrice] = useState(0);
    const cart = location.state?.item;

    useEffect(() => {
        if (!cart) {
            toast.error("No items in cart");
            nav("/cart");
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/order/getquoter", {
            orderDetails: cart
        }).then((res) => {
            setTotal(res.data.totalPrice);
            setLabalePrice(res.data.labaleTotal);
        }).catch((err) => {
            console.error(err);
        });
    }, [cart, nav]);

    function onOderCheckout() {
        if (!phoneNumber || !address) {
            toast.error("Please fill in your details!");
            return;
        }
        const token = localStorage.getItem("token");
        if (token === null) {
            toast.error("Please login to proceed.");
            return;
        }

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/order`,
            {
                orderDetails: cart,
                address: address,
                phone: phoneNumber
            },
            {
                headers: { Authorization: "Bearer " + token }
            }
        ).then(() => {
            toast.success("Order placed successfully!");
            nav("/");
        }).catch((err) => {
            console.error(err);
            toast.error("Order failed!");
        });
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 md:p-10 font-sans">
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-100">
                                    <FaReceipt size={20} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800">Review Order</h2>
                            </div>
                            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                {cart?.length} Items
                            </span>
                        </div>

                        <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2 custom-scrollbar">
                            {cart?.map((item, index) => (
                                <div key={index} className="group flex items-center gap-5 bg-slate-50 p-4 rounded-[24px] border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-md transition-all duration-300">
                                    <div className="relative">
                                        <img 
                                            src={item.image} 
                                            alt="product" 
                                            className="w-24 h-24 object-cover rounded-2xl shadow-sm bg-white p-1" 
                                        />
                                        <span className="absolute -top-2 -right-2 bg-slate-800 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-slate-700 text-lg mb-1">{item.name || "Product Name"}</h3>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">ID: {item.productId}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <FaCheckCircle className="text-green-500 text-xs" />
                                            <span className="text-xs font-black text-slate-500 uppercase">Quality Checked</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-[40px] text-white shadow-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Original Price</p>
                                <p className="text-xl font-bold line-through opacity-40">${labalePrice.toFixed(2)}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Your Savings</p>
                                <p className="text-xl font-bold text-blue-400">-${(labalePrice - total).toFixed(2)}</p>
                            </div>
                            <div className="col-span-2 pt-6 mt-4 border-t border-slate-700 flex justify-between items-center">
                                <p className="text-lg font-black uppercase tracking-tighter">Grand Total</p>
                                <p className="text-5xl font-black text-white">${total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="bg-white p-10 rounded-[40px] shadow-xl shadow-slate-200/50 border border-gray-50 sticky top-10">
                        <div className="text-center mb-10">
                            <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600 transition-transform hover:rotate-12">
                                <FaShoppingCart size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Shipping</h2>
                            <p className="text-slate-400 font-bold text-sm mt-2">Where should we send it?</p>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-slate-400 text-[11px] uppercase tracking-[2.5px] font-black mb-3 ml-1 group-focus-within:text-blue-600 transition-colors">Phone Number</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-slate-300 group-focus-within:text-blue-400 transition-colors">
                                        <FaPhoneAlt size={16} />
                                    </span>
                                    <input 
                                        type="number" 
                                        placeholder="07x xxx xxxx" 
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-700 font-black focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-300 shadow-inner"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-slate-400 text-[11px] uppercase tracking-[2.5px] font-black mb-3 ml-1 group-focus-within:text-blue-600 transition-colors">Full Address</label>
                                <div className="relative">
                                    <span className="absolute top-6 left-0 flex items-start pl-5 text-slate-300 group-focus-within:text-blue-400 transition-colors">
                                        <FaMapMarkerAlt size={16} />
                                    </span>
                                    <textarea 
                                        placeholder="No, Street, City" 
                                        rows="4"
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-700 font-black focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none shadow-inner placeholder:text-slate-300"
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={onOderCheckout}
                                className="group w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 active:scale-[0.98] mt-8"
                            >
                                CONFIRM ORDER
                            </button>
                            
                            <p className="text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest mt-6">
                                SECURE 256-BIT SSL ENCRYPTED CHECKOUT
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}