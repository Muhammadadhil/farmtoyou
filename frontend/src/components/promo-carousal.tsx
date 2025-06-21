import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { PromoCard } from "../types/product";

interface PromoCarouselProps {
    cards: PromoCard[];
}

export function PromoCarousel({ cards }: PromoCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="px-4 py-4">
            <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {cards.map((card) => (
                            <div key={card.id} className="w-full flex-shrink-0">
                                <div className={`bg-gradient-to-r ${card.backgroundColor} rounded-3xl p-6 lg:p-8 relative overflow-hidden`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 text-white">
                                            {card.type === "offer" && <div className="text-xs font-semibold text-black mb-2 tracking-wider">{card.title}</div>}
                                            <h2 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                                                {card.type === "hero" ? card.title : card.subtitle}
                                                {card.type === "hero" && (
                                                    <>
                                                        <br />
                                                        {card.subtitle}
                                                    </>
                                                )}
                                            </h2>
                                            <p className="text-sm lg:text-base mb-4 opacity-90 max-w-xs">{card.description}</p>
                                            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full">{card.buttonText}</Button>
                                        </div>
                                        <div className="flex-shrink-0 ml-4">
                                            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-full flex items-center justify-center">
                                                <div className="text-4xl">{card.type === "hero" ? "👨‍🌾" : "🥭"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {cards.map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-gray-600" : "bg-gray-300"}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
