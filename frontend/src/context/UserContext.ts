import React, { createContext, useState, useContext, type ReactNode } from "react";

interface User {
    name: string;
    id: string;
    role: string;
}

interface UserContextProps {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Load user from localStorage if available
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return React.createElement(UserContext.Provider, { value: { user, login, logout } }, children);
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
