import data from "../Data/data.json";

function AccomdationComp(){
    return(
        <>
         <div className="bg-[#2f3f4f] text-white px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
        Tranquil Retreat Awaits
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Book your luxurious stay at Kosharnagar and immerse yourself in nature's breathtaking beauty today.
      </p>
      <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 cursor-pointer rounded-full text-lg font-semibold transition">
        Reserve
      </button>
    </div>
    <div className="py-16 bg-white">
      <h2 className="text-5xl font-serif text-center mb-10">Guest Reviews</h2>
      <p className="text-xl font-serif text-gray-500 text-center mb-10">Discover what our guests say about their <br /> unforgettable stays with us.</p>
      <div className="flex flex-wrap justify-center gap-6 max-w-8xl mx-auto">
        {data.ReviewCards.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-90 border-1 border-gray-400">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">"{review.text}"</p>
            <div className="text-yellow-500 text-center text-3xl">
              {"★".repeat(review.stars)}
              {"☆".repeat(5 - review.stars)}
            </div>
          </div>
        ))}
      </div>
    </div>
 
        </>
    )
}
export default AccomdationComp
