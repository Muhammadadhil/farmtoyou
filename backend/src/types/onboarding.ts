export interface FarmDetails {
    name: string;
    farmName: string;
    farmLocation: string;
    phoneNumber: string;
    produceType: string;
}

export interface BuyerDetails {
    name: string;
    deliveryLocation: string;
    phoneNumber: string;
}

export interface OnboardingData {
    language?: string;
    role: string;
    farmDetails?: FarmDetails;
    buyerDetails?: BuyerDetails;
    otpVerified?: boolean;
}
