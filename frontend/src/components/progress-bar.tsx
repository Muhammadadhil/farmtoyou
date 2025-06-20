interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {

    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className={`w-full ${className} `}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Onboarding process</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-green-600">{Math.round(progress)}% to complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 relative">
                <div className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />

                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-1">
                    {Array.from({ length: totalSteps }, (_, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full border-2 ${i == currentStep ? "bg-green-500 border-green-500" : "bg-white border-white"}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
