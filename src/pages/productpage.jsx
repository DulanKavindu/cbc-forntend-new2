import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProductCard from "../componets/productcard";

export default function ProductPage() {
    const [product, setProduct] = useState([]);
    const [state, setState] = useState("loading");

    useEffect(() => {
        if (state === "loading") {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/product")
                .then((res) => {
                    console.log(res.data);
                    setProduct(res.data);
                    setState("loaded");
                  
                    toast.success("product data fetched successfully");
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to fetch product data");
                });
        }
    }, [state]); 

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
           
            {product?.map((item) => {
                return <ProductCard key={item.productid} product={item} />;
            })}
        </div>
    );
}