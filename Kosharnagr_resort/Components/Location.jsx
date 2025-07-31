import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Location() {
  const textRef = useRef(null);
  const mapRef = useRef(null);
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse", // 👈 Animate on enter/leave
        },
      }
    );

    gsap.fromTo(
      mapRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse", // 👈 Animate every time
        },
      }
    );
  });

  return () => ctx.revert();
}, []);



  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="flex flex-col justify-around md:flex-row items-center md:items-start px-8 py-16 gap-15">

        {/* Text Side */}
        <div
          ref={textRef}
          className="md:w-1/2 text-center md:text-left mt-8"
        >
          <h2 className="text-4xl font-bold mb-6 font-serif">Our Location</h2>
          <p className="text-lg text-gray-700 mb-6 font-serif">
            Nestled in the scenic hills of Bhamrot Sayedan, Murree, our resort offers a peaceful retreat surrounded by nature’s beauty.
          </p>
          <div>
            <h3 className="text-xl font-semibold font-serif">Serenity</h3>
            <p className="text-gray-800 font-serif">
              Tourism Highway, New Patriata, Rawalpindi, Punjab
            </p>
          </div>
        </div>

        {/* Map Side */}
        <div ref={mapRef} className="md:w-1/2 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13266.523264671316!2d73.46544861079936!3d33.82518750000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e077cacdc67f4d%3A0x2806ddaf58dca4bc!2sKohsarNagar%20Resort!5e0!3m2!1sen!2s!4v1722427280000!5m2!1sen!2s"
            width="90%"
            height="370"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-lg border border-gray-200"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Location;
