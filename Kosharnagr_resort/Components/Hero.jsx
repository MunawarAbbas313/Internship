import { useEffect, useRef } from "react";
import data from "../Data/data.json";
import  gsap from "gsap";

function Hero() {
    const heroRef = useRef(null);
    const starsRef = useRef(null);

    useEffect(()=>{
        gsap.fromTo(
            heroRef.current,
            {opacity: 0, y:70},
            {opacity:1 , y:0, duration: 1.8, ease: "power1.out"}
        );
       const stars = gsap.utils.toArray(".star"); 

  gsap.to(stars, {
    color: "#facc15", 
    duration: 0.8,
    repeat: -1, 
    yoyo: true,
    stagger: {
      each: 0.2,
      from: "start", 
    },
    ease: "power1.inOut",
  });
        
    },[])
  return (
    
    <div className="relative h-screen w-full pt-[80px] z-0 ">


      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      >
        <source src={data.heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div
       ref={heroRef}
      className="absolute inset-0 z-10 flex justify-center items-center flex-col text-white text-center px-4 bg-black/50 overflow-hidden  gap-5" >
        <div className="mt-[80px]">
            
          <h1 className="text-4xl font-serif font-bold flex flex-col md:text-6xl gap-6 p-2 text-gray-200 mt-[80px] mb-3">
            Experience Luxury  <span className="text-green-600">
                  Nature's Embrace
            </span>
          
          </h1>
          <h4 className="text-lg  md:text-xl font-serif">
            Discover a serene retreat in the hills of Murree, <br /> perfect for unforgettable memories.
          </h4>
        </div>

        <button className="bg-green-800 text-lg  rounded-4xl mt-3.5  px-15 py-2 cursor-pointer hover:bg-green-500 transistion-all duration-200">
          Book Now
        </button>

        <div ref={starsRef} className="stars mt-4 text-yellow-400">
  <span className="text-3xl space-x-1">
    {"★★★★★".split("").map((star, i) => (
      <span key={i} className="inline-block star text-white">
        {star}
      </span>
    ))}
  </span>
  <p className="text-white text-lg mt-2">Rated 5 Stars</p>
</div>

        </div>
      </div>

  );
}

export default Hero;
