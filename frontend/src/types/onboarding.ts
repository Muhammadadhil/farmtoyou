import type React from "react";
export interface Language {
    code: string;
    name: string;
    nativeName: string;
}

export interface UserRole {
    id: string;
    title: string;
    description: string;
    icon: string;
}

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

export interface OnboardingStep {
    id: string;
    title: string;
    subtitle: string;
    component: React.ComponentType<any>;
    validation?: (data: OnboardingData) => boolean;
}
