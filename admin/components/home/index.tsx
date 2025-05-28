"use client";
import React, { useState } from "react";
import FormPage from "./login/FormPage";
import LoginIllustration from "./login/LoginIllustration";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/libs/graphql/mutations/auth";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN);

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
      const { data } = await login({
        variables: {
          loginInput: formData,
        },
      });

      // Assuming the response has a structure like: data.login.user
      const user = data?.login?.user;
      const token = data?.login?.token;

      if (user && token) {
        toast.success("Login successful!");
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        toast.error("Login failed: Missing user data.");
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
