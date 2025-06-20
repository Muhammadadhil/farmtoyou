import { useState } from "react";
import type { Language } from "../types/onboarding";

interface LanguageStepProps {
    onSelect: (language: string) => void;
    selectedLanguage?: string;
}

const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
];

export function LanguageStep({ onSelect, selectedLanguage }: LanguageStepProps) {
    const [selected, setSelected] = useState(selectedLanguage || "");

    const handleSelect = (code: string) => {
        setSelected(code);
        onSelect(code);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Select Your Language</h2>
                <p className="text-gray-600 text-base lg:text-lg">
                    Choose a language that's comfortable for you.
                    <br />
                    You can change this anytime in settings.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {languages.map((language) => (
                    <button
                        key={language.code}
                        onClick={() => handleSelect(language.code)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                            selected === language.code ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-25"
                        }`}
                    >
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                                selected === language.code ? "bg-green-500 text-white" : "bg-green-100 text-green-600"
                            }`}
                        >
                            {language.code.toUpperCase()}
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-900">{language.name}</div>
                            <div className="text-sm text-gray-600">{language.nativeName}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
