import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { JwtPayload } from "jsonwebtoken";
import { getUserInfo } from "@/lib/getUserInfo";

// Define the shape of the context
interface AuthContextProps {
  user: JwtPayload | null; // User data
  setUser: React.Dispatch<React.SetStateAction<JwtPayload | null>>; // Setter for user data
}

// Create context with initial value
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define the provider's props
interface AuthContextProviderProps {
  children: ReactNode;
}

// AuthContextProvider component
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  const getUser = async () => {
    try {
      const response = await getUserInfo(); // Fetch user info
      setUser(response); // Set the user data
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null); // Clear user data on error
    }
  };

  useEffect(() => {
    getUser(); // Fetch user info on mount
    return () => {
      setUser(null); // Clear user data on unmount
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the AuthContext
export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
