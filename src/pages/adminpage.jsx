import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import ProductAddPage from "./admin/productaddapge";
import { 
  TbLayoutDashboardFilled, 
  TbPackage, 
  TbTruckDelivery, 
  TbUsers,
  TbSettings,
  TbLogout
} from "react-icons/tb";
import EditProductPage from "./admin/editproductpage";
import AdminOrder from "./admin/adminOdre";

export default function AdminPage() {
    return (
        <div className="bg-gray-100 flex w-full h-screen">
         
            <div className="bg-blue-700 w-[20%] flex flex-col h-screen text-gray-100 p-4 shadow-lg">
                <div className="text-xl font-bold mb-8 p-2 border-b border-blue-500">Admin Panel</div>
                
                <div className="flex flex-col space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg transition">
                        <TbLayoutDashboardFilled className="text-xl" />
                        <span>Dash Board</span>
                    </Link>

                    <Link to="/admin/products" className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg transition">
                        <TbPackage className="text-xl" />
                        <span>Products</span>
                    </Link>

                    <Link to="/admin/orders" className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg transition">
                        <TbTruckDelivery className="text-xl" />
                        <span>Orders</span>
                    </Link>

                    <Link to="/admin/customers" className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg transition">
                        <TbUsers className="text-xl" />
                        <span>Customers</span>
                    </Link>
                </div>

               
                <div className="mt-auto border-t border-blue-500 pt-4">
                    <Link to="/login" className="flex items-center gap-3 p-3 hover:bg-red-600 rounded-lg transition">
                        <TbLogout className="text-xl" />
                        <span>Logout</span>
                    </Link>
                </div>
            </div>


            <div className="w-[80%] h-screen text-gray-800 bg-white shadow-inner">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-semibold">Welcome Back, Admin!</h2>
                </div>
               <Routes path="/*"> 
                <Route path="/dashboard" element={<div className="p-6">This is the Admin Dashboard.</div>} />
                <Route path="/products" element={<AdminProductPage />} />
                <Route path="/product/orders" element={<div className="p-6">View and process Orders here.</div>} />
                <Route path="/product/customers" element={<div className="p-6">Customer information and management.</div>} />
                <Route path="/product/addProduct" element={<ProductAddPage />} />
                  <Route path="/product/productEdit" element={<EditProductPage />} />
                  <Route path ="/orders" element={<AdminOrder />} />
                <Route path="/*" element={<div className="p-6">this not an admin page.</div>} />
               </Routes>
            </div>
        </div>
    )
}