import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../componets/productcard";

export default function ProductPage() {
    const [product, setProduct] = useState([]);
    const [state, setState] = useState("loading");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm === "") {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/product")
                .then((res) => {
                    setProduct(res.data);
                    setState("loaded");
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to fetch product data");
                });
        } else {
            const delayDebounceFn = setTimeout(() => {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/product/query/" + searchTerm)
                    .then((res) => {
                        setProduct(res.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchTerm, state]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
            <div className="w-full max-w-md mb-10">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
                {product?.map((item) => {
                    return <ProductCard key={item.productid} product={item} />;
                })}
            </div>
        </div>
    );
}