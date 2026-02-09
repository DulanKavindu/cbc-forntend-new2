import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-10 md:p-16 rounded-[50px] shadow-2xl shadow-slate-200/50 border border-slate-50">
        

        <div className="space-y-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">Get in Touch</h2>
            <p className="text-slate-400 font-bold">Have a question? We'd love to hear from you.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaPhoneAlt size={20} />
              </div>
              <p className="font-black text-slate-700">+94 71 234 5678</p>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaEnvelope size={20} />
              </div>
              <p className="font-black text-slate-700">support@store.com</p>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaMapMarkerAlt size={20} />
              </div>
              <p className="font-black text-slate-700">123 Business Rd, Colombo</p>
            </div>
          </div>
        </div>

       
        <div className="bg-slate-50 p-8 rounded-[40px] space-y-6">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-5 bg-white border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-5 bg-white border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <textarea 
            placeholder="Tell us about it..." 
            rows="4"
            className="w-full p-5 bg-white border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          />
          <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-blue-100">
            <FaPaperPlane /> Send Message
          </button>
        </div>

      </div>
    </div>
  );
}