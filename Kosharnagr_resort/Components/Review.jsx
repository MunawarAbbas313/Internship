import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../Data/data.json";

gsap.registerPlugin(ScrollTrigger);

function Review() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const containerRef = useRef(null);

  const review = data.reviews[1]; // 2nd review

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
        markers: false, // set to true for debugging
      },
    });

    tl.fromTo(
      leftRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      rightRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex  md:max-w-7xl mx-auto px-6 md:flex text-white shadow-xl">
      {/* Left Image */}
      <div
        ref={leftRef}
        className="w-1/2 h-[450px] flex justify-center items-center rounded-xl"
      >
        <img
          src={data.reviews[0].leftImg}
          alt="Resort"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Review Content */}
      <div
        ref={rightRef}
        className="w-1/2 text-center flex flex-col items-center justify-center gap-4 bg-green-600 h-[450px] rounded-xl"
      >
        {/* Stars */}
        <div className="text-2xl text-yellow-500">★★★★★</div>

        {/* Comment */}
        <p className="text-xl font-medium max-w-md text-white">
          {review.comment}
        </p>

        {/* Avatar */}
        <img
          src={review.avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-green-700"
        />

        {/* Reviewer Name */}
        <p className=" font-semibold text-white text-xl" >
          {review.name || "John Doe"}
        </p>
      </div>
    </div>
  );
}

export default Review;
