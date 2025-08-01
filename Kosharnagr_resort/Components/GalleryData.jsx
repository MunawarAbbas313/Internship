import data from '../Data/gallerAss.json';

function GalleryData() {
  const images = data.gallerySixImg;
  const twoImg = data.twoImgsNature;
  const TwoView = data.twoImgsViews;

  return (
    <>
      <div>
        {/* Header */}
        <div className="head p-9">
          <h1 className='text-center text-5xl font-serif'>
            Scenic Retreat
          </h1>
          <p className='text-center text-gray-700 p-5 font-serif text-lg'>
            Experience luxury and nature's beauty at our tranquil resort <br /> getaway.
          </p>
        </div>

        {/* Gallery Section */}
        <div className="px-6 md:px-20 py-1 bg-white mb-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {images.map((item, idx) => (
                <div key={idx} className="w-full overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={item.image}
                    alt={item.category}
                    className="w-full h-80 object-cover hover:scale-105 transform transition duration-300 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
         <div className="head p-9">
          <h1 className='text-center text-5xl font-serif'>
         Nature Retreat
          </h1>
          <p className='text-center text-gray-700 p-5 font-serif text-lg'>
            Experience luxurious stays and breathtaking views in  <br />tranquility.
          </p>
        </div>
        <div className="px-3 sm:px-6 py-4 bg-white mb-6">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-3">
      {twoImg.map((item, idx) => (
        <div key={idx} className="w-full h-[240px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl">
          <img
            src={item.image}
            alt={item.category}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
</div>

<div className="bg-white mb-6 px-3 sm:px-6 py-4">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
    
    {/* Left Side */}
    <div className="text-center sm:text-left">
      <h1 className="text-3xl font-serif">
        Scenic  <span className="text-green-800">Views</span>
      </h1>
      <p className="text-gray-600 text-base font-serif">
        njoy nature's beauty and peaceful surroundings at our resort.
      </p>
    </div>

    {/* Right Side Button */}
    <div>
      <button className="border border-gray-400 font-serif cursor-pointer hover:bg-gray-300 duration-300 px-8 sm:px-12 py-2 sm:py-3 rounded-full">
        Explore
      </button>
    </div>

  </div>
</div>
     <div className="px-3 sm:px-6 py-4 bg-white mb-6">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-3">
      {TwoView.map((item, idx) => (
        <div key={idx} className="w-full h-[240px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl">
          <img
            src={item.image}
            alt={item.category}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
</div>
</div>

<div className="bg-white mb-6 px-3 sm:px-6 py-4">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
    
    {/* Left Side */}
    <div className="text-center sm:text-left">
      <h1 className="text-3xl font-serif">
        Luxurious <span className="text-green-800">Stay</span>
      </h1>
      <p className="text-gray-600 text-base font-serif">
        Unforgettable memories await in our serene getaway.
      </p>
    </div>

    {/* Right Side Button */}
    <div>
      <button className="border border-gray-400 font-serif cursor-pointer hover:bg-gray-300 duration-300 px-8 sm:px-12 py-2 sm:py-3 rounded-full">
        Explore
      </button>
    </div>

  </div>
</div>


      </div>
    </>
  );
}

export default GalleryData;
