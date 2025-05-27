"use client";
import React, { useState } from "react";
import FormPage from "./login/FormPage";
import LoginIllustration from "./login/LoginIllustration";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/libs/graphql/mutations/auth";

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
  const handleLogin = () => {
    login({ variables: { loginInput: formData } });
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
