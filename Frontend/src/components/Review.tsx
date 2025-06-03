import {useRef} from "react";
import StarRating from "./StarRating";
import reviews from "../assets/reviews";

export default function Review() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollToRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative flex justify-center mx-auto items-center mt-60 w-[64%] h-full">
    <button onClick={scrollToLeft} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#28282817] text-white p-1 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide space-x-4 mx-auto w-[100%]  mt-10 mb-10">

     {reviews.map((review, idx) =>
      (
       
        <div key={idx} className="bg-[#282828] p-6 rounded-lg shadow-lg w-[300px] h-[350px] flex flex-col items-center justify-between mt-4">
        <div className=" flex  w-[100%] items-center justify-between m-4">
            <h2 className="text-xl p-5 font-semibold mb-4">{review.user}</h2>
           
            <StarRating rating={review.rating} />
        </div>
    
        <div className="list-disc mb-20 list-inside text-gray-300">
          <p>{review.text}</p>
        </div>
      </div>
       
      
      )
      
   )}
    </div>
    <button onClick={scrollToRight} className="absolute top-1/2 right-0 transform -translate-y-1/2  bg-[#28282817] text-white p-1 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
   </div>
  );
}

