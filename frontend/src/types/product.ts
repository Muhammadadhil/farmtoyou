export interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    image: string;
    farmer: string;
    location: string;
    inStock: boolean;
    discount?: number;
}

export interface PromoCard {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    backgroundColor: string;
    image: string;
    type: "hero" | "offer";
}
