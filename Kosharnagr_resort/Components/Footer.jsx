import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail, MdPhone } from "react-icons/md";
import { useState } from "react";
import { toast } from 'react-toastify';


function Footer() {
    const [email, setEmail] = useState("");
    const checkForEmail =(e)=>{
        e.preventDefault();
        const EmailKaRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!EmailKaRegx.test(email))
       {
          toast.error(" Invalid email address!");
       }
       else{
         toast.success(" Email is Sent!");
       }
    }
    
  return (
    <div className="bg-gray-700 text-white mt-7 w-full">
      <div className="flex flex-col md:flex-row justify-around items-center md:items-start p-7 gap-y-10 md:gap-y-0">
        {/* Retreat Section */}
        <div className="p-6 text-center md:text-left">
          <h1 className="text-4xl font-semibold font-sans">Retreat</h1>
          <p className="text-lg font-sans mt-7 max-w-xs">
            Experience luxury and nature in perfect harmony.
          </p>
          <div className="social flex justify-center md:justify-start gap-5 items-center mt-6 " >
            <a href="#"><FaFacebookSquare className="text-3xl hover:text-blue-400 transition-all duration-300" /></a>
            <a href="#"><FaInstagramSquare className="text-3xl hover:text-purple-500 transition-all duration-300" /></a>
            <a href="#"><AiFillTikTok className="text-3xl hover:text-black/50 transition-all duration-300" /></a>
            <a href="#"><BsTwitterX className="text-2xl hover:text-gray-300 transition-all duration-300" /></a>
          </div>
        </div>

        {/* Escape Section */}
        <div className="p-6 text-center md:text-left flex flex-col gap-4">
          <h1 className="text-4xl font-semibold font-sans">Escape</h1>
          <a href="mailto:info@kosharnagar.com" className="flex justify-center md:justify-start items-center text-lg font-sans gap-2">
            <MdEmail className="text-2xl text-green-400" />
            Email Us
          </a>
          <a href="tel:+923315100014" className="flex justify-center md:justify-start items-center text-lg font-sans gap-2">
            <MdPhone className="text-2xl text-green-400" />
            Call Us
          </a>
        </div>

        {/* Relax Section */}
        <div className="p-6 text-center md:text-left flex flex-col gap-4 w-full max-w-sm">
          <h1 className="text-4xl font-semibold font-sans">Relax</h1>
          <input
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
            className="outline-none px-5 py-3 rounded-lg bg-gray-300 text-black text-base w-full"
          />
          <button onClick={(e)=>checkForEmail(e)}
           className="bg-green-600 text-base font-sans border border-green-50 px-6 py-3 cursor-pointer hover:bg-green-700 transition-all duration-300 rounded-lg w-full">
            Submit your inquiry
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-sm md:text-base p-4">
        © 2025. All rights reserved... Developed by{" "}
        <span className="text-green-500 font-semibold">@Algobee Solutions</span>
      </p>
    </div>
  );
}

export default Footer;
