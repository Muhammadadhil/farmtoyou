import { Button } from "@/components/ui/button";
import { Wheat } from "lucide-react";
import { Link } from "react-router-dom";

export default function LadingPage() {
    const farmImages = [
        "/assets/woman-holding-basket-full-different-vegetables.jpg",
        "/assets/shelley-pauls-Zaiuy5dKeCk-unsplash.jpg",
        "/assets/organic-food-farm.jpg",
        "/assets/julian-hanslmaier-bWg-BeVJPG4-unsplash.jpg",
        "/assets/farmer-holds-rice-hand.jpg",
        "/assets/eugene-golovesov-M7Mb3hRvoh0-unsplash.jpg",
        "/assets/farmer-holds-rice-hand.jpg",
        "/assets/hari-gaddigopula-xZEYonpj41o-unsplash.jpg",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br tracking-tighter">
            <div className="container mx-auto px-4 py-8 lg:py-16">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12 lg:mb-16 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-3xl p-8 lg:p-12  shadow-lg">
                        <div className="flex items-start gap-6 mb-2">
                            <div className="flex-1">
                                <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                                    <span className="text-yellow-300">Fresh</span> from
                                    <br />
                                    <span className="text-white">Farmer to</span>
                                    <br />
                                    <span className="text-white">Your Doorstep</span>
                                </h1>
                            </div>
                            <Wheat className="w-8 h-8 lg:w-12 lg:h-12 text-yellow-300 flex-shrink-0 mt-2" />
                        </div>

                        <p className="text-white/90 text-lg lg:text-xl max-w-4xl leading-relaxed">
                            Shop directly from local farmers and enjoy fresh, organic produce at fair prices. No middlemen, just quality you can trust!
                        </p>
                    </div>

                    {/* Images Grid */}
                    <div className="mb-12 lg:mb-14">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 lg:gap-4 max-w-2xl mx-auto">
                            {farmImages.map((src, index) => (
                                <div key={index} className="aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                    <img
                                        src={src || "/placeholder.svg"}
                                        alt={`Farm scene ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}

                    <div className="text-center ">
                        <Link to={"/onboarding"}>
                            <Button
                                size="lg"
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base md:text-lg px-8 md:px-32 lg:px-[170px] py-4 md:py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            >
                                Continue Signup
                            </Button>
                        </Link>
                    </div>
                    <div className="text-center mt-2">
                        <Link to={"/login"}>
                            <Button
                                size="lg"
                                className="bg-green-400 hover:bg-green-500 text-black font-semibold text-base md:text-lg px-8 md:px-32 lg:px-[170px] py-4 md:py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            >
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
