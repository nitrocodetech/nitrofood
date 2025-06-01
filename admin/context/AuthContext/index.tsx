// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserType {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserType | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setUser: (user: UserType | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        setAccessToken,
        setRefreshToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
