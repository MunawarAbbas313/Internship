import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../Data/data.json";

gsap.registerPlugin(ScrollTrigger);

function Resort() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image pop from bottom
      gsap.from(".resort-image", {
        scrollTrigger: {
          trigger: ".resort-image",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Right content fade up one by one
      gsap.utils.toArray(".resort-text > div").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.2,
        });
      });

      // Heading and paragraph
      gsap.from(".resort-header", {
        scrollTrigger: {
          trigger: ".resort-header",
          start: "top 90%",
          toggleActions: "play none none reset",
        },
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(".resort-subtext", {
        scrollTrigger: {
          trigger: ".resort-subtext",
          start: "top 90%",
          toggleActions: "play none none reset",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-gray-900/40 mt-7 overflow-hidden"
    >
      <div className="flex flex-col justify-center items-center gap-5 mt-7 p-8 font-serif">
        <h1 className="text-black text-5xl font-semibold text-center resort-header">
          Exceptional Resort <span className="text-pink-900"> Services</span>
        </h1>
        <p className="text-center text-lg w-[50%] resort-subtext">
          Discover our luxurious accommodations and breathtaking views for a
          perfect nature retreat.
        </p>
      </div>

      <div className="md:flex justify-around items-center p-14 gap-8">
        {/* Image */}
        <div className="left flex justify-center">
          <img
            src={data.services}
            alt=""
            className="w-[350px] h-[400px] shadow-xl md:w-[550px] md:h-[450px] rounded-2xl resort-image"
          />
        </div>

        {/* Text Content */}
        <div className="right resort-text flex flex-col gap-12 mt-8">
          <div>
            <h2 className="text-xl text-black font-semibold font-serif">
              Relaxation and Wellness
            </h2>
            <p>
              Indulge in spa treatments and wellness programs designed for
              ultimate relaxation.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-black font-semibold font-serif">
              Luxurious Accommodation Options
            </h2>
            <p>
              Experience comfort and elegance in our beautifully designed rooms
              and suites.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-black font-semibold font-serif">
              Nature Exploration Activities
            </h2>
            <p>
              Engage in hiking, bird watching, and exploring the stunning
              landscapes around our resort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resort;
