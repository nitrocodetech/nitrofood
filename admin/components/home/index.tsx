"use client";
import React, { useState } from "react";
import FormPage from "./login/FormPage";
import LoginIllustration from "./login/LoginIllustration";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/libs/graphql/mutations/auth";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const {
    setAccessToken,
    setRefreshToken,
    setUser,
    user,
    refreshToken,
    accessToken,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await login({
        variables: {
          loginInput: formData,
        },
      });

      const accessToken = response?.data?.login?.accessToken;
      const refreshToken = response?.data?.login?.refreshToken;
      const user = response?.data?.login?.user;

      if (accessToken && user) {
        toast.success("Login successful!");
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);
      } else {
        toast.error("Login failed: Missing token or user data.");
      }
    } catch (err: any) {
      const message =
        err?.graphQLErrors?.[0]?.message || err?.message || "Login failed.";
      toast.error(message);
    }
  };

  return (
    <div className="px-8 h-screen grid grid-cols-2 gap-4">
      <LoginIllustration />
      <FormPage
        formData={formData}
        handleOnChange={handleOnChange}
        handler={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
