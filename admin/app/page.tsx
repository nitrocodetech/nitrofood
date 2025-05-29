"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "@/components/home";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/dashboard");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) return null;

  return <LoginPage />;
}
