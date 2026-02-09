import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaRegStar, FaUserCircle, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ReviewSection({ productId }) {
    
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    
    const fetchReviews = () => {
        if (!productId) return;
        
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/${productId}`)
            .then(res => {
                console.log("Backend Response:", res.data);
              
                setReviews(res.data || []);
            })
            .catch(err => {
                console.log(err);
                setReviews([]); 
            });
    };

    
    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login to write a review");
            return;
        }

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/review`, {
            productId,
            rating,
            comment
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            toast.success("Review added!");
            setComment("");
            fetchReviews(); 
        }).catch(() => {
            toast.error("Failed to add review. Make sure you are logged in.");
        });
    };

    return (
        <div className="mt-16 w-full bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-tighter">Customer Reviews</h2>

            <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 p-6 rounded-[30px]">
                <p className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">Rate this product</p>
                <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setRating(star)}>
                            {star <= rating ? <FaStar className="text-yellow-400" size={20} /> : <FaRegStar className="text-gray-300" size={20} />}
                        </button>
                    ))}
                </div>
                <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-gray-700 font-medium focus:ring-2 focus:ring-secondary outline-none transition-all resize-none"
                    rows="3"
                    required
                />
                <button type="submit" className="mt-4 bg-secondary text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md">
                    Submit Review <FaPaperPlane size={14} />
                </button>
            </form>

            <div className="space-y-8">
               
                {reviews && reviews.length > 0 ? (
                    reviews.map((rev, index) => (
                        <div key={index} className="flex gap-4 border-b border-gray-50 pb-6">
                            <FaUserCircle size={40} className="text-gray-200" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-bold text-gray-800 text-sm">{rev.userName || "Anonymous"}</p>
                                    <div className="flex text-yellow-400 gap-0.5">
                                        {[...Array(rev.rating || 0)].map((_, i) => <FaStar key={i} size={10} />)}
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed italic">"{rev.comment}"</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-300 font-medium py-10">No reviews yet for this product.</p>
                )}
            </div>
        </div>
    );
}