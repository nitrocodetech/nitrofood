"use client";
import React, { useEffect, useState } from "react";
import MainPage from "@/components/mainpage";
import LoginPage from "@/components/home";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Only runs on client
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return <div>{!isLoggedIn ? <MainPage /> : <LoginPage />}</div>;
}
