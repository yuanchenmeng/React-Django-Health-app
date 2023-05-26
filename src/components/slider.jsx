import React, {useState} from 'react';

const SlideShower = ({slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="max-w-md mx-auto p-4 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-auto"
        />
        {isHovered && (
          <>
            <button
              onClick={goToPreviousSlide}
              disabled={currentSlide === 0}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNextSlide}
              disabled={currentSlide === slides.length - 1}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-75">
          <h3 className="text-lg font-semibold">{slides[currentSlide].title}</h3>
          <p className="mt-2">{slides[currentSlide].description}</p>
        </div>
      </div>
    </div>
  );
};

export default SlideShower;