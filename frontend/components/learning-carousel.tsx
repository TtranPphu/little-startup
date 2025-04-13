"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/section-3-1.png",
    title: "Học cùng Rewood – Hành trình của bạn luôn có người đồng hành",
    description:
      "Theo dõi tiến trình học tập và gợi ý bài học để phát triển hóa",
    progressPercent: "70%",
  },
  {
    id: 2,
    image: "/section-3-2.png",
    title: "Học cùng Rewood – Hành trình của bạn luôn có người đồng hành",
    description:
      "Giảng viên giàu kinh nghiệm hỗ trợ bạn trên từng bước đi trên lộ trình",
  },
  {
    id: 3,
    image: "/section-3-3.png",
    title: "Học cùng Rewood – Hành trình của bạn luôn có người đồng hành.",
    description: "Tham gia cộng đồng học viên nhiệt huyết, cùng học và chia sẻ",
  },
];

export default function LearningCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-[450px] md:h-[400px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out transform ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center h-full">
              <div className="md:w-1/2">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={`Learning with Rewood - Slide ${index + 1}`}
                  width={400}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
              <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
                {slide.progressPercent && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                      ✓
                    </div>
                    <span className="text-green-700 font-medium">
                      {slide.progressPercent}
                    </span>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-800">
                  {slide.title.split(" – ")[0]} – <br />
                  {slide.title.split(" – ")[1]}
                </h2>
                <p className="text-gray-700">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2 pb-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
