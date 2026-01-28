import { Link } from "react-router-dom";

export default function Header() {
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
                    
                    <Link to="/admin/products" className="text-gray-600 font-bold text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group">
                        ADMIN
                        <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link to="/contact" className="text-gray-600 font-bold text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group">
                        CONTACT US
                        <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link to="/about" className="text-gray-600 font-bold text-sm tracking-widest hover:text-secondary transition-all duration-300 relative group">
                        ABOUT US
                        <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>

        
                <div className="hidden md:block">
                    <button className="bg-secondary text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-blue-700 transition-all shadow-md active:scale-95">
                        LOGIN
                    </button>
                </div>
            </div>
        </nav>
    </div>
    );
}