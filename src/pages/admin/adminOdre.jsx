import axios from "axios";
import { useEffect, useState } from "react";
import { FaBoxOpen, FaHashtag, FaMoneyBillWave, FaSave, FaUser, FaStickyNote, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [noteText, setNoteText] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const fetchOrders = () => {
        if (token) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/order/`, {
                headers: { Authorization: 'Bearer ' + token }
            }).then((res) => {
                setOrders(res.data.list);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    };

    const updateOrderData = (orderId, updatedFields) => {
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/order/${orderId}`, 
            updatedFields,
            { headers: { Authorization: 'Bearer ' + token } }
        ).then(() => {
            toast.success("Updated Successfully!");
            setOrders((prevOrders) => 
                prevOrders.map((order) => 
                    order.orderId === orderId ? { ...order, ...updatedFields } : order
                )
            );
            setSelectedOrder(null);
        }).catch((err) => {
            toast.error("Update failed!");
            console.error(err);
        });
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-green-500 text-white';
            case 'shipped': return 'bg-blue-500 text-white';
            case 'cancelled': return 'bg-red-500 text-white';
            case 'pending': return 'bg-yellow-500 text-white';
            default: return 'bg-slate-500 text-white';
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans relative">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Orders</h1>
                        <p className="text-slate-400 font-bold mt-2 uppercase text-xs tracking-widest">Management Dashboard</p>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-[25px] shadow-sm border border-slate-100 flex items-center gap-4">
                        <FaBoxOpen className="text-blue-600" size={24} />
                        <span className="text-slate-700 font-black text-lg">{orders.length} Orders</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((item) => (
                            <div key={item.orderId} className="bg-white rounded-[40px] shadow-xl border border-slate-50 overflow-hidden transition-all hover:shadow-2xl">
                                <div className="p-8 bg-slate-50/50 border-b flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex gap-10">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"><FaHashtag className="inline" /> ID</p>
                                            <p className="font-black text-slate-800">{item.orderId}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"><FaUser className="inline" /> Customer</p>
                                            <p className="font-bold text-slate-600 text-sm truncate max-w-[150px]">{item.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"><FaMoneyBillWave className="inline" /> Total</p>
                                            <p className="font-black text-blue-600 text-lg">${item.totalPrice?.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => { setSelectedOrder(item); setNoteText(item.notes || ""); }}
                                            className="flex items-center gap-2 bg-white border-2 border-slate-200 px-5 py-3 rounded-2xl text-slate-600 font-black text-xs hover:bg-slate-800 hover:text-white transition-all shadow-sm"
                                        >
                                            <FaStickyNote /> {item.notes ? "Edit Note" : "Add Note"}
                                        </button>

                                        <select 
                                            value={item.status || "pending"}
                                            onChange={(e) => updateOrderData(item.orderId, { status: e.target.value })}
                                            className={`pl-5 pr-10 py-3 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer shadow-lg transition-all ${getStatusStyle(item.status)}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>

                                {item.notes && (
                                    <div className="px-10 py-6 bg-yellow-50/30 border-b border-yellow-50">
                                        <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-2">Admin Note</p>
                                        <p className="text-slate-600 font-medium italic text-sm">"{item.notes}"</p>
                                    </div>
                                )}

                                <div className="p-10 overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-slate-400 text-[10px] uppercase tracking-[2px] font-black border-b border-slate-50">
                                                <th className="pb-4">Product</th>
                                                <th className="pb-4 text-center">Qty</th>
                                                <th className="pb-4 text-right">Price</th>
                                                <th className="pb-4 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {item.orderedItems?.map((p, i) => (
                                                <tr key={i} className="group">
                                                    <td className="py-4 font-bold text-slate-700">{p.name}</td>
                                                    <td className="py-4 text-center font-black text-slate-400">{p.quantity}</td>
                                                    <td className="py-4 text-right text-slate-500 font-bold">${p.price?.toFixed(2)}</td>
                                                    <td className="py-4 text-right font-black text-slate-800">${(p.price * p.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedOrder && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
                    <div className="bg-white w-full max-w-lg rounded-[50px] shadow-2xl p-12 animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Order Note</h2>
                            <button onClick={() => setSelectedOrder(null)} className="text-slate-300 hover:text-slate-800 transition-colors">
                                <FaTimes size={24}/>
                            </button>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-6">Internal Note for #{selectedOrder.orderId}</p>
                        <textarea 
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full p-8 bg-slate-50 border-none rounded-[35px] text-slate-700 font-bold focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none shadow-inner"
                            rows="6"
                            placeholder="Type internal memo here..."
                        />
                        <button 
                            onClick={() => updateOrderData(selectedOrder.orderId, { notes: noteText })}
                            className="w-full bg-blue-600 text-white py-6 rounded-[30px] font-black text-xl mt-8 shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                        >
                            SAVE CHANGES
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}