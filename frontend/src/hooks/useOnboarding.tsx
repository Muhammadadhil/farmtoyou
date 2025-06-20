import { useState, useCallback } from "react";
import type { OnboardingData } from "../types/onboarding";

export function useOnboarding() {

    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<OnboardingData>({});
    const [isLoading, setIsLoading] = useState(false);

    const updateData = useCallback((newData: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    }, []);

    const nextStep = useCallback(() => {
        setCurrentStep((prev) => prev + 1);
    }, []);

    const goToStep = useCallback((step: number) => {
        setCurrentStep(step);
    }, []);

    const resetOnboarding = useCallback(() => {
        setCurrentStep(0);
        setData({});
    }, []);

    return {
        currentStep,
        data,
        isLoading,
        setIsLoading,
        updateData,
        nextStep,
        goToStep,
        resetOnboarding,
    };
}
