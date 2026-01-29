import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ProductOverview() {
    const prarms =useParams();
    const productId=prarms.id;
    const [product, setProduct] = useState(null);
    const [state, setState] = useState("loading");

    console.log(prarms); 
    useEffect(()=>{
      axios.get(import.meta.env.VITE_BACKEND_URL+"/product/"+productId).then((res)=>{
        console.log(res.data);
      
      if(res.data==null){
        setState("not found");
      }
      if(res.data!=null){
        setProduct
        setState("loaded");
      }
        })
      
    },[])
    
   
    return (
        <div>
            {state==="loading" && (
                <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64 animate-spin">

                </div>
                </div>
                
            )}

            {state===null && (
               <ProductNotFound />
            )}
        
            {state==="loaded" && (
                <div className="p-4">
                    <h1 className="text-2xl font-bold">{product?.name}</h1>
                    <p className="text-gray-700">{product?.description}</p>
                </div>
            )}
        </div>
    )
}