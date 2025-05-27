// LoginPage.tsx
"use client";
import React, { useState } from "react";
import FormPage from "./login/FormPage";
import LoginIllustration from "./login/LoginIllustration";

const LoginPage = () => {
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

  return (
    <div className="px-8 h-screen grid grid-cols-2 gap-4">
      <LoginIllustration />
      <FormPage formData={formData} handleOnChange={handleOnChange} />
    </div>
  );
};

export default LoginPage;
