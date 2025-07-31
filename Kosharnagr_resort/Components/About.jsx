import { useEffect, useRef } from 'react';
import data from '../Data/data.json';
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const textRef = useRef(null);
  const imagesRef = useRef(null);
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: textRef.current,
      start: 'top 85%',
      end: 'bottom 10%',
      scrub: 1,
      toggleActions: 'play reverse play reverse',
      markers: false,
    },
  });

  // Animate Text Div (Right side)
  tl.fromTo(
    textRef.current,
    {
      y: 100,
      opacity: 0,
      scaleY: 0.8,
      transformOrigin: 'bottom center',
    },
    {
      y: 0,
      opacity: 1,
      scaleY: 1,
      duration: 1,
      ease: 'power3.out',
    }
  );

  // Animate each image with stagger
  gsap.fromTo(
    imagesRef.current.children,
    {
      y: 100,
      opacity: 0,
      scale: 0.8,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      scrollTrigger: {
        trigger: imagesRef.current,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 1,
      },
    }
  );

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);


  return (
    <div className=" md:flex justify-around items-center overflow-hidden mt-6">
      
      {/* Left Section */}
      <div ref={textRef} className=" space-y-6 text-center md:text-left">
        <h1 className="text-6xl text-gray-800 font-serif">
          About <span className="text-green-600">Kosharnagar</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed w-[100%]">
          Discover a serene resort in the hills of Bhamrot <br/> Sayedan,  offering luxury and nature's beauty for <br />
           unforgettable experiences.
        </p>
        <button className="cursor-pointer px-15 py-2 border-1 border-black rounded-4xl hover:bg-gray-200 duration-200">
          Explore
        </button>
      </div>

      {/* Right Section */}
      <div ref={imagesRef} className=" flex flex-col md:flex-row justify-between items-center p-4 gap-2">
        {data.aboutImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`About ${index}`}
            className=" sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[470px]  rounded-xl shadow-lg "
          />
        ))}
      </div>
    </div>
  );
}

export default About;
