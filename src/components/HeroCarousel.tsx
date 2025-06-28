import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/lan_cmp/carousel";
import { Button } from "../components/lan_cmp/button";
import { ArrowRight } from 'lucide-react';

const HeroCarousel = () => {
  const slides = [
    {
      title: "Academic Excellence",
      subtitle: "Shaping Future Leaders",
      description: "Join our world-class programs designed to foster innovation and critical thinking",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore Programs"
    },
    {
      title: "Outstanding Placements",
      subtitle: "95% Placement Record",
      description: "Our students secure positions in top companies worldwide with excellent packages",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "View Placements"
    },
    {
      title: "Research & Innovation",
      subtitle: "Breakthrough Discoveries",
      description: "State-of-the-art research facilities fostering groundbreaking innovations",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Research Centers"
    },
    {
      title: "Campus Life",
      subtitle: "Vibrant Community",
      description: "Experience a rich campus culture with diverse activities and lifelong friendships",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Campus Tour"
    },
    {
      title: "Cultural Events",
      subtitle: "Celebrating Diversity",
      description: "Annual festivals, competitions, and cultural programs that enrich student life",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "View Events"
    }
  ];

  return (
    <section className="relative">
      <Carousel 
        className="w-full h-[600px] lg:h-[700px]"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl px-6">
                    <h2 className="text-5xl lg:text-7xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h2>
                    <p className="text-xl lg:text-2xl mb-2 text-yellow-400 font-semibold">
                      {slide.subtitle}
                    </p>
                    <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                      {slide.description}
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full">
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;