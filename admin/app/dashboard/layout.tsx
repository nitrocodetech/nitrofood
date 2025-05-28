"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainPage from "@/components/mainpage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/"); // redirect to login if not logged in
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn === null) return null;

  return <MainPage>{children}</MainPage>;
}
