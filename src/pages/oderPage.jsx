import axios from "axios";
import { useEffect, useState } from "react";
import { FaBoxOpen, FaCalendarAlt, FaHashtag, FaMoneyBillWave, FaChevronRight } from "react-icons/fa";

export default function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/order/`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((res) => {
                setOrders(res.data.list);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans">
            <div className="max-w-5xl mx-auto">
              
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Order History</h1>
                        <p className="text-slate-400 font-bold mt-2 uppercase text-xs tracking-[2px]">Manage and track your previous purchases</p>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-[25px] shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                            <FaBoxOpen size={20} />
                        </div>
                        <span className="text-slate-700 font-black text-lg">{orders.length} Total Orders</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map((item) => (
                            <div key={item.orderId} className="bg-white rounded-[40px] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden transition-all hover:scale-[1.01]">
                               
                                <div className="p-8 border-b border-slate-50 bg-slate-50/50 grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <FaHashtag /> Order ID
                                        </p>
                                        <p className="text-lg font-black text-slate-800">{item.orderId}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <FaCalendarAlt /> Placed On
                                        </p>
                                        <p className="text-lg font-black text-slate-800">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <FaMoneyBillWave /> Total Amount
                                        </p>
                                        <p className="text-2xl font-black text-blue-600">${item.totalPrice?.toFixed(2) || "0.00"}</p>
                                    </div>
                                    <div className="flex items-center md:justify-end">
                                        <span className="bg-green-100 text-green-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                                            Confirmed
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
                                                <th className="pb-4">Item Details</th>
                                                <th className="pb-4 text-center">Qty</th>
                                                <th className="pb-4 text-right">Unit Price</th>
                                                <th className="pb-4 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {item.orderedItems?.map((product, idx) => (
                                                <tr key={idx} className="group">
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                                                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                            <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{product.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-center font-black text-slate-500">{product.quantity}</td>
                                                    <td className="py-5 text-right font-bold text-slate-500">${product.price?.toFixed(2)}</td>
                                                    <td className="py-5 text-right font-black text-slate-800">${(product.price * product.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
                        <FaBoxOpen className="mx-auto text-slate-200 mb-6" size={80} />
                        <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">No orders found</h2>
                        <button className="mt-6 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black transition-all hover:bg-blue-700 active:scale-95">
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}