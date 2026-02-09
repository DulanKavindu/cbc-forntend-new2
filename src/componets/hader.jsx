import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
    const navi = useNavigate()
    function gotoLogin(){
        navi("/login")
    }
    return (
        <div className="bottom-1">
        <nav className="w-full shadow-md sticky top-0 z-50">
            
            <div className="w-full h-[4px] bg-accent"></div>

            
            <div className="w-full h-[70px] bg-white px-6 md:px-12 flex items-center justify-between">
                
                
                <div className="flex items-center">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-accent shadow-sm">
                        <img 
                            src="logo.avif" 
                            alt="Logo" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>

              
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-gray-600 font-bold text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group">
                        HOME
                        <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    
                    <Link to="/product" className="text-gray-600 font-bold text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group">
                        PRODUCT
                        <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link to="/contactus" className="text-gray-600 font-bold text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group">
                        CONTACT US
                        <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link to="/aboutus" className="text-gray-600 font-bold text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group">
                        ABOUT US
                        <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>

        
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/cart" className="text-gray-600 hover:text-secondary transition-all relative">
                        <FaShoppingCart size={22} />
                    </Link>
                    <button className="bg-secondary text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-blue-700 transition-all shadow-md active:scale-95"
                     onClick={gotoLogin}
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        </nav>
    </div>
    );
}