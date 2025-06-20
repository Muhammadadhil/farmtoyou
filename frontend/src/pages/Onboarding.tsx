import { Button } from "@/components/ui/button";
import { useOnboarding } from "../hooks/useOnboarding";
import { ProgressBar } from "../components/progress-bar";
import { LanguageStep } from "../components/language-step";
import { RoleStep } from "../components/role-step";
import { BuyerProfileStep } from "@/components/buyer-details-step";
import { FarmDetailsStep } from "@/components/farm-details-step";
import type { OnboardingStep } from "../types/onboarding";
import { OtpVerificationStep } from "@/components/otp-verification-step";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const steps: OnboardingStep[] = [
    {
        id: "language",
        title: "Select Your Language",
        subtitle: "Choose a language that's comfortable for you.",
        component: LanguageStep,
        validation: (data) => !!data.language,
    },
    {
        id: "role",
        title: "Choose Your Role",
        subtitle: "Select your role to get the best experience.",
        component: RoleStep,
        validation: (data) => !!data.role,
    },
    {
        id: "details",
        title: "Profile Details",
        subtitle: "Complete your profile information.",
        component: ({ onSelect, data }) => {
            if (data.role === "farmer") {
                return <FarmDetailsStep onUpdate={(details) => onSelect(details)} farmDetails={data.farmDetails} />;
            } else {
                return <BuyerProfileStep onUpdate={(details) => onSelect(details)} buyerDetails={data.buyerDetails} />;
            }
        },
        validation: (data) => {
            if (data.role === "farmer") {
                const farm = data.farmDetails;
                return !!(farm?.name && farm?.farmName && farm?.farmLocation && farm?.phoneNumber && farm?.produceType);
            } else {
                const buyer = data.buyerDetails;
                return !!(buyer?.name && buyer?.deliveryLocation && buyer?.phoneNumber);
            }
        },
    },
    {
        id: "otp",
        title: "OTP Verification",
        subtitle: "Verify your phone number.",
        component: OtpVerificationStep,
        validation: (data) => !!data.otpVerified,
    },
];

export default function Onboarding() {
    const { currentStep, data, isLoading, setIsLoading, updateData, nextStep } = useOnboarding();

    const currentStepData = steps[currentStep];
    const CurrentStepComponent = currentStepData?.component;
    const isLastStep = currentStep === steps.length - 1;
    const isDetailsStep = currentStep === steps.length - 2;
    const canContinue = currentStepData?.validation ? currentStepData.validation(data) : true;

    const navigate = useNavigate();

    const handleContinue = async () => {
        if (isDetailsStep) {
            setIsLoading(true);
            // api call for saving in db, and sent otp from backend
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
            nextStep();
        } else {
            nextStep();
        }
    };

    const handleDataUpdate = (key: string, value: any) => {
        if (key === "details") {
            if (data.role === "farmer") {
                updateData({ farmDetails: value });
            } else {
                updateData({ buyerDetails: value });
            }
        } else if (key === "otp") {
            otpVerification();
        } else {
            updateData({ [key]: value });
        }
    };

    const otpVerification = async () => {
        // api call for otp verification
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/dashboard");
        toast('Welcome to the farmers world')
    }

    if (!currentStepData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-green-600 mb-4">Welcome to FarmFresh!</h1>
                    <p className="text-gray-600">Onboarding completed successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6 lg:py-12">
                {/* Progress Bar */}
                <ProgressBar currentStep={currentStep} totalSteps={steps.length} className="mb-8 lg:mb-12" />

                {/* Step Content */}
                <div className="flex-1 flex flex-col justify-center">
                    {CurrentStepComponent && (
                        <CurrentStepComponent
                            onSelect={(value: any) => handleDataUpdate(currentStepData.id, value)}
                            data={data}
                            {...(currentStepData.id === "language" && { selectedLanguage: data.language })}
                            {...(currentStepData.id === "role" && { selectedRole: data.role })}
                            {...(currentStepData.id === "otp" && {
                                onVerify: (otp: string) => handleDataUpdate("otp", otp),
                                phoneNumber: data.role === "farmer" ? data.farmDetails?.phoneNumber : data.buyerDetails?.phoneNumber,
                            })}
                        />
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-center items-center mt-8 lg:mt-12">
                    {!isLastStep && (
                        <Button
                            onClick={handleContinue}
                            disabled={!canContinue || isLoading}
                            className="px-48 py-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full min-w-[120px]"
                        >
                            {isLoading ? "Loading..." : isLastStep ? "Get Started" : "Continue"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
